//@ts-check

const build = require('./main').integrate;
const path = require('path')
const fs = require('fs')


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

let r = build(source, target, {})
if (r) {    
    console.log(`\x1B[34m${source} => ${target}\x1B[0m`);
}


/**
 * @param {keyof typeof helpers} flag 
 * @param {boolean|1} [check=undefined] 
 * @returns {string}
 */
function resolveFile(flag, check) {
    
    let target = getArgv('-' + flag) || (check === 1 ? process.argv[check + 1] : null)

    if (!target)
        throw new Error(`the path is not specified (use the -${flag} <filename> option for specify ${helpers[flag]})`);

    if (!path.isAbsolute(target)) {
        target = path.resolve(process.cwd(), target);
    }

    if (check && check !== undefined && !fs.existsSync(target)) {
        console.log(process.cwd);
        throw new Error(`${target} file not found`);
    }

    return target;
}
