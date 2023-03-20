

//@ts-check


// TODO remove:
// const { jest } = require('@jest/globals');
// const jest = require('jest');

// const { expect, jest, test } = require('jest-without-globals');
// test('buildInBrowser', () => {
//     expect(Math.max(1, 5, 10)).toBe(10);
// });
// test.only()

// const mocha = require('mocha')           // hard integration w browser. Mere by time and buty jest using.
// const assert = require("assert");
// import { assert } from 'chai';
// const jsdom = require("jsdom").JSDOM;


// const test = require('ava');
// const testling = require('testling');
// test('addition', t => {
//     t.is(add(2, 3), 5);
// });

// testling(test);



var buildFile = require('../../source/main').integrate
var pack = require('../../source/main').combine
const createEnv = require('../mocha').createEnv;
const ts = require('typescript');
const { encode, decode } = require("sourcemap-codec")




// let builder = {
//     pack
// }

const path = require('path');
const assert = require('assert');
const fs = require('fs');
// const { execSync } = require("child_process");


/**
 * @type {{
 *  mapping: number[][]
 *  files: string[]
 * }}
 */
let sourceMapInfo = null;


const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./source/index.ts"),
    targetPoint: path.join(__dirname, "./build/app.js"),
})



const Tests = { ...testOptions,
    
    test_buildToFile() {

        const r = buildFile(this.entryPoint, this.targetPoint, {
            // entryPoint: path.basename(entryPoint)
            advanced: {
                ts: (/** @type {string} */ code) => ts.transpile(code)
            }
        })

        assert(r);
    },

    test_buildContent() {

        const content = fs.readFileSync(this.entryPoint).toString();

        const r = pack(content, '', {
            entryPoint: 'app.ts',
            advanced: {
                ts: (/** @type {string} */ code) => ts.transpile(code)
            }
        })

        let expected = fs.readFileSync(this.targetPoint).toString()
        assert.equal(r, expected.replace('index.ts', 'app.ts'))
    
    },

    test_getContent() {
        const content = fs.readFileSync(this.entryPoint).toString();

        const customStore = {
            "nested_directory/common": fs.readFileSync(path.join(__dirname, "./source/nested_directory/common.ts")).toString(),
        }
        
        const r = pack(content, '', {
            entryPoint: 'app.ts',
            getContent: (filename) => {
                return customStore[filename]
            },
            advanced: {
                ts: (/** @type {string} */ code) => ts.transpile(code)
            }
        })

        let expected = fs.readFileSync(this.targetPoint).toString()
        assert.equal(r, expected.replace('index.ts', 'app.ts'))
    },
    async test_ts() {
        
        const r = buildFile(this.entryPoint, this.targetPoint, {
            // entryPoint: 'index.js',
            sourceMaps: {
                encode,
                // external: true,
                // charByChar: true
             },
            advanced: {
                ts: (/** @type {string} */ code) => {                    

                    const tsMapToken = '//# sourceMappingURL=data:application/json;base64,';

                    var [jsMap, mapInfo, code] = extractEmbedMap(code);

                    const js = ts.transpile(code, { sourceMap: true, inlineSourceMap: true, inlineSources: true })                    

                    var [code, mergedMap] = mergeMaps(js, jsMap, tsMapToken)
                    
                    mapInfo.mappings = encode(mergedMap); mapInfo.file = ''

                    code += '\n' + tsMapToken + Buffer.from(JSON.stringify(mapInfo)).toString('base64')

                    sourceMapInfo = { files: mapInfo.sources,
                        //@ts-expect-error ?
                        mapping: mergedMap
                    }

                    return code
                }
            },
            // getSourceMap(arg) {
            //     sourceMapInfo = arg
            // }
        })

        assert(r);
    },
    async test_inBrowserEnv() {

        // console.warn('>>> this check does not cover testing in a real browser. Instead look up `index2.html` in the root directory for manual testing');

        const browser = createEnv('../../build/builder.js')
        const files = ['index', "nested_directory/common"]
        const store = files
            .map(file => [file, fs.readFileSync(path.join(__dirname, `./source/${file}.ts`)).toString()])
            .reduce((acc, el) => ((acc[el[0]] = el[1]), acc), {})

        return new Promise((resolve) => {

            browser.test(({ mocha, test, after, window, browserAssert, builder }) => {

                const r = builder.pack(store[files[0]], '', {
                    entryPoint: 'app.ts',
                    getContent: (filename) => { return store[filename + ''] }
                })

                test('#test_inBrowserEnv', function () { assert(r) });

                mocha.run();

                after(() => {

                    const testFails = Array.from(window.document.querySelectorAll('.test.fail'));
                    const testsSucc = [].slice.call(window.document.querySelectorAll('.test.pass.fast'));

                    let r = ({
                        testsSucc: testsSucc.map(q => q.querySelector('h2').textContent),
                        testFails: testFails.map(q => [
                            q.querySelector('h2').textContent, q.querySelector('.error').textContent
                        ])
                    })

                    browserAssert.equal(r.testFails, 0)
                    browserAssert.isTrue(!!r.testsSucc)

                    resolve(r)
                })
            })
        })

    },
}



Object.entries(Tests).map(([name, test]) => [name, typeof test == 'function' ? test.bind(testOptions) : test]).forEach(async ([name, test]) => {

    if (typeof test == 'function') {
        
        console.time(name)
        {
            if (Object.getPrototypeOf(test).constructor.name.startsWith('Async')) {
                await test()
            }
            else {
                setTimeout(test);
            }
            console.log(`\x1B[34m${name} test is success\x1B[36m`)
        }
        console.timeEnd(name)

        console.log('\x1B[0m');
    }
    else if (typeof test !== 'string'){
        console.log(test);
    }

});

// exports.testOptions = testOptions;


if (sourceMapInfo) try {
    require(testOptions.targetPoint)
}
catch (err) {

    const linePattern = 9;                           // content.indexOf('console.log(fff);') ... => line
    const filePattern = path.basename(Tests.entryPoint);                // './index.ts'

    const errorLines = err.stack.split('\n');
    const message = errorLines[0]
    const [line, ch] = errorLines[1].split(':').slice(-2)
    
    const lineDebugInfo = sourceMapInfo.mapping[line - 1];
    
    /**
     * @type {Array<number>|number}
     */
    const debugInfo = typeof lineDebugInfo[2] === 'number' ? lineDebugInfo : lineDebugInfo[0]

    const lineNumber = debugInfo[2] + 1;
    const file = sourceMapInfo.files[debugInfo[1]]

    {
        assert.equal(lineNumber, linePattern, '\x1B[33m' + `wrong line number thrown error detected: ${lineNumber} intead of ${linePattern}` + '\x1B[0m');
        assert.equal(file, filePattern, '\x1B[33m' + "wrong file thrown error detected" + '\x1B[0m');
    }

    if (Object.keys(Tests).length < 4) {
        console.log(`${message}\n\t at line ${debugInfo[2] + 1} in "./${sourceMapInfo.files[debugInfo[1]]}"`);
    }

    // console.log(r);
}








/**
 * @param {string} [code]
 * @param {string?} [sourceMapToken=null]
 * @returns {[import('sourcemap-codec').SourceMapMappings, {sourcesContent: string[], sources: string[], mappings: string, file: string, files: string[]}, string]}
 */
function extractEmbedMap(code, sourceMapToken) {
    
    sourceMapToken = sourceMapToken || '//# sourceMappingURL=data:application/json;charset=utf-8;base64,'

    const sourceMapIndex = code.lastIndexOf(sourceMapToken);

    const baseOriginSourceMap = code.slice(sourceMapIndex + sourceMapToken.length);
    const originSourceMap = JSON.parse(Buffer.from(baseOriginSourceMap, 'base64').toString());
    const jsMap = decode(originSourceMap.mappings);

    return [jsMap, originSourceMap, code.slice(0, sourceMapIndex)];
}


/**
 * @param {string} originCode
 * @param {import('sourcemap-codec').SourceMapMappings} originMapSheet
 * @param {?string} [mapStartToken='']
 * @returns {[string, import('sourcemap-codec').SourceMapMappings]}
 */
function mergeMaps(originCode, originMapSheet, mapStartToken) {    

    const [tsMap, $, code] = extractEmbedMap(originCode, mapStartToken);

    // jsMap[tsMap.map(el => el ? el[0] : null)[2][2]]

    const mergedMap = tsMap.map(line => line ? line[0] : null).map(line => originMapSheet[line[2]] || [])
    // tsMap.map(line => jsMap[line[0][2]])

    // let mergedMap = tsMap.map(m => m.map(c => jsMap[c[2]]));         // its wrong fow some reason and ts swears!!!

    return [code, mergedMap];
}








// var [tsMap, $, code] = extractEmbedMap(js, tsMapToken);

// // jsMap[tsMap.map(el => el ? el[0] : null)[2][2]]

// const mergedMap = tsMap.map(el => el ? el[0] : null).map(m => jsMap[m[2]])
// // tsMap.map(m => jsMap[m[0][2]])

// // let mergedMap = tsMap.map(m => m.map(c => jsMap[c[2]]));         // its wrong fow some reason and ts swears!!!