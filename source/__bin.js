//@ts-check

const build = require('./main').integrate;
const path = require('path')
const fs = require('fs')
const performance = require('perf_hooks').performance;
const { execSync } = require('child_process')


if (~process.argv.indexOf('-h')) {
    console.log(`
-s 		- source file name (could be passed as first arg without the flag -s)
-t 		- target file name (required)
-m 		- generate sourcemap file 	(optional)
--time 	- verbose build time  		(optional)
    `);
    process.exit(0)
};



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

const sourcemapInline = ~process.argv.indexOf('--inline-m');
const sourcemap = sourcemapInline || ~process.argv.indexOf('-m');
const release = ~process.argv.indexOf('-r');
if (release && sourcemap) {
    console.log(`\x1B[34m >> using the -k option in conjunction with - is not recommended, since these options have not been tested together.\x1B[0m`);
}


console.time('built in')

let r = build(source, target, {
    release: !!release == true,
    sourceMaps: sourcemap
        ? (() => {
            // also look at cjs-to-es6 ?
            
            // let encode = null;
            const packageName = 'sourcemap-codec'

            try { var { encode } = require(packageName); }
            catch (err) {
                console.log('\x1B[33mThe package needed to generate the source map has not been found and will be installed automatically\x1B[0m');
                console.log(execSync('npm i sourcemap-codec').toString());                                                                              // -D?
                
                var {encode} = require(packageName);
            }

            return {
                encode,
                external: !!sourcemapInline == true
            }
        })()
        : undefined
     
})



if (r) {    
    console.log(`\x1B[34m${source} => ${target}\x1B[0m`);
    if (sourcemap && !!sourcemapInline == false) {
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


