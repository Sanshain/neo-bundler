
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
const { encode } = require("sourcemap-codec")




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
    
    // test_buildToFile() {

    //     const r = buildFile(this.entryPoint, this.targetPoint, {
    //         // entryPoint: path.basename(entryPoint)
    //     })

    //     assert(r);
    // },

    // test_buildContent() {

    //     const content = fs.readFileSync(this.entryPoint).toString();

    //     const r = pack(content, '', {
    //         entryPoint: 'app.ts'
    //     })

    //     let expected = fs.readFileSync(this.targetPoint).toString()
    //     assert.equal(r, expected.replace('index.ts', 'app.ts'))
    
    // },

    // test_getContent() {
    //     const content = fs.readFileSync(this.entryPoint).toString();

    //     const customStore = {
    //         "nested_directory/common": fs.readFileSync(path.join(__dirname, "./source/nested_directory/common.ts")).toString(),
    //     }
        
    //     const r = pack(content, '', {
    //         entryPoint: 'app.ts',
    //         getContent: (filename) => {
    //             return customStore[filename]
    //         }
    //     })

    //     let expected = fs.readFileSync(this.targetPoint).toString()
    //     assert.equal(r, expected.replace('index.ts', 'app.ts'))
    // },
    // async test_inBrowserEnv() {

    //     // console.warn('>>> this check does not cover testing in a real browser. Instead look up `index2.html` in the root directory for manual testing');
        
    //     const browser = createEnv('../../build/builder.js')
    //     const files = ['index', "nested_directory/common"]
    //     const store = files
    //         .map(file => [file, fs.readFileSync(path.join(__dirname, `./source/${file}.ts`)).toString()])
    //         .reduce((acc, el) => ((acc[el[0]] = el[1]), acc), {})

    //     return new Promise((resolve) => {

    //         browser.test(({ mocha, test, after, window, browserAssert, builder }) => {

    //             const r = builder.pack(store[files[0]], '', {
    //                 entryPoint: 'app.ts',
    //                 getContent: (filename) => { return store[filename + ''] }
    //             })

    //             test('#test_inBrowserEnv', function () { assert(r) });

    //             mocha.run();

    //             after(() => {

    //                 const testFails = Array.from(window.document.querySelectorAll('.test.fail'));
    //                 const testsSucc = [].slice.call(window.document.querySelectorAll('.test.pass.fast'));

    //                 let r = ({
    //                     testsSucc: testsSucc.map(q => q.querySelector('h2').textContent),
    //                     testFails: testFails.map(q => [
    //                         q.querySelector('h2').textContent, q.querySelector('.error').textContent
    //                     ])
    //                 })

    //                 browserAssert.equal(r.testFails, 0)
    //                 browserAssert.isTrue(!!r.testsSucc)

    //                 resolve(r)
    //             })
    //         })
    //     })
        
    // },

    test_ts() {

        const r = buildFile(this.entryPoint, this.targetPoint, {
            // entryPoint: 'index.js',
            sourceMaps: {
                encode,
                external: true,
                // charByChar: true
             },
            // advanced: {
            //     ts: (code) => {
            //         return ts.transpile(code, {sourceMap: true, inlineSourceMap: true})
            //     }
            // }
            getSourceMap(arg) {
                sourceMapInfo = arg
            }
        })

        assert(r);
    }
}



Object.entries(Tests).map(([name, test]) => [name, typeof test == 'function' ? test.bind(testOptions) : test]).forEach(async ([name, test]) => {

    if (typeof test == 'function') {
        
        console.time(name)
        {
            if (Object.getPrototypeOf(test).constructor.name.startsWith('Async')) {
                await test()
            }
            else {
                test();
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
        const errorLines = err.stack.split('\n');
        const message = errorLines[0]
        let [line, ch] = errorLines[1].split(':').slice(-2)
        const lineDebugInfo = sourceMapInfo.mapping[line - 1];
        if (typeof lineDebugInfo[2] === 'number') {
            // is number
            console.log(`${message}\n\t at line ${lineDebugInfo[2] + 1} in "./${sourceMapInfo.files[lineDebugInfo[1]]}"`);
        }
        else {
            // is Array
            const debugInfo = lineDebugInfo[0];
            console.log(`${message}\n\t at line ${debugInfo[2] + 1} in "./${sourceMapInfo.files[debugInfo[1]]}"`);
        }
        // console.log(r);
    }