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

let source = resolveFile('s');  
let target = resolveFile('t', false);

let r = build(source, target, {})


/**
 * @param {keyof typeof helpers} flag 
 * @param {boolean} [check=undefined] 
 * @returns {string}
 */
function resolveFile(flag, check) {
    
    let target = getArgv('-' + flag)

    if (!target)
        throw new Error(`the path is not specified (use the -${flag} <filename> option for specify ${helpers[flag]})`);

    if (!path.isAbsolute(target)) {
        target = path.resolve(process.cwd(), target);
    }

    if (check === false && !fs.existsSync(target)) {
        console.log(process.cwd);
        throw new Error(`${target} file not found`);
    }

    return target;
}
