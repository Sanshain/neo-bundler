//@ts-check

const build = require('./main').integrate;
const path = require('path')
const fs = require('fs')
const performance = require('perf_hooks').performance;
const { execSync } = require('child_process')


function getArgv(argk) {
    let index = process.argv.indexOf(argk) + 1
    if (index) {
        return process.argv[index]
    }
    else {
        return null;
    }
}

const helpers = {
    s: 'source file',
    t: 'target file'
}

let source = resolveFile('s', 1);
let target = resolveFile('t', false);
const sourcemap = ~process.argv.indexOf('-m');



console.time('built in')

let r = build(source, target, {    
    sourceMaps: sourcemap
        ? (() => {
            // also look at cjs-to-es6 ?

            /**
             * @type {(arg: ([number] | [number, number, number, number, number?])[][]) => string}
             */
            let encode = null;
            const packageName = 'sourcemap-codec'
            try {
                ({ encode } = require(packageName));
            }
            catch (err) {

                console.log(
                    '\x1B[33mThe package needed to generate the source map has not been found and will be installed automatically\x1B[0m'
                );
                let r = execSync('npm i sourcemap-codec').toString()
                console.log(r);
                
                ({encode} = require(packageName));
            }

            return {
                encode,
                external: true
            }
        })()
        : undefined
     
})



if (r) {    
    console.log(`\x1B[34m${source} => ${target}\x1B[0m`);
    if (sourcemap) {
        console.log(`\x1B[34m${'.'.repeat(source.length)} => ${target}.map\x1B[0m`)
    }
    if (~process.argv.indexOf('--time')) {
        console.timeEnd('built in')
    }
}




/**
 * @param {keyof typeof helpers} flag 
 * @param {boolean|1} [check=undefined] 
 * @returns {string}
 */
function resolveFile(flag, check) {
    
    let target = getArgv('-' + flag) || (check === 1 ? process.argv[check + 1] : null)

    if (!target) {
        const errMessage = `the path is not specified (use the -${flag} <filename> option for specify ${helpers[flag]})`;
        console.warn('\x1B[31m' + errMessage + '\x1B[0m')
        process.exit(1)
    }

    if (!path.isAbsolute(target)) {
        target = path.resolve(process.cwd(), target);
    }

    if (check && check !== undefined && !fs.existsSync(target)) {
        console.log(process.cwd);
        console.warn('\x1B[31m' + `${target} file not found` + '\x1B[0m')
        // throw new Error(`${target} file not found`);
        process.exit(1)
    }

    return target;
}
