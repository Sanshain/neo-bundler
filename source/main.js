//@ts-check
// import "fs";

const extensions = ['.ts', '.js']
var exportedFiles = []

// integrate("base.ts", 'result.js')

exports.combine = combine;
// exports.integrate = integrate;

/**
 * @param {string} content
 * @param {string} dirpath
 * @param {any} options
 */
function combine(content, dirpath, options) {

    exportedFiles = []

    content = removeLazy(content)

    content = importInsert(content, dirpath, options);

    return content;
}

// function integrate(from, to, options){    

//     let content = fs.readFileSync(from).toString();        
//     let filename = path.resolve(from);

//     content = combine(content, path.dirname(filename), options)

//     to = to || path.parse(filename).dir + path.sep + path.parse(filename).name + '.js';

//     fs.writeFileSync(to, content)    
// }

class pathMan {
    /**
     * @param {string} dirname
     * @param {any} _getContent
     */
    constructor(dirname, _getContent) {
        this.dirPath = dirname;
        this.getContent = _getContent;
    }
}

/**
 * @param {string} content
 * @param {string} dirpath
 * @param {{ getContent: Function; release: any; }} options
 */
function importInsert(content, dirpath, options) {

    console.log('importInsert...');

    let pathman = new pathMan(dirpath, options.getContent || getContent);

    let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\";?/gm;
    content = content.replace(regex, unitsPack.bind(pathman));

    ///* not recommended, but easy for realization:
    // regex = /^import \"\.\/(?<filename>\w+)\"/gm;
    // content = content.replace(regex, allocPack.bind(pathman)); //*/    

    regex = /^import {([\w, ]+)} from ['"]\.\/([\w\.]+)['"];?/gm
    content = content.replace(regex, wrapsPack.bind(pathman)); //*/

    regex = /^import ([\w, ]+) from ['"].\/([\w\.\/]+)['"];?/gm;
    content = content.replace(regex, defaultPack.bind(pathman)); //*/

    if (options && options.release) {
        // remove comments:
        content = content.replace(/\/\*[\s\S]*?\*\//g, '')
        content = content.replace(/\/\/[\s\S]*?\n/g, '\n'); //*/
    }

    return content
}


/**
 * @param {string} match
 * @param {string|string[]} classNames
 * @param {any} fileName
 * @param {any} offset
 * @param {any} source
 */
function defaultPack(match, classNames, fileName, offset, source) {

    var content = this.getContent(fileName)
    if (content == '' || !content) return ''

    //@ts-ignore
    classNames = classNames.split(',').map(s => s.trim())
    const matches = Array.from(content.matchAll(/^export default (function|class) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))

    console.log(match);
    match = '';
    for (let unit of matches) {
        if (classNames.includes(unit[2])) {

            match += unit[0].substr(7).replace('default ', '') + '\n\n'
        }
    }

    content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n`

    return content;
}


/**
 * @param {string} match
 * @param {string} classNames
 * @param {any} fileName
 * @param {any} offset
 * @param {any} source
 */
function wrapsPack(match, classNames, fileName, offset, source) {

    console.log('wrapsPack...');

    var content = this.getContent(fileName)
    if (content == '' || !content) return ''

    //@ts-ignore
    classNames = classNames.split(',').map(s => s.trim())

    // let matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) = [^\n]+/gm))
    // with ts support:
    let matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) ?(\: [\<\>\[\]\w\|]+)? = [^\n]+/gm))

    // let matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))
    // with ts support:
    let matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, \:\<\>\[\]\|&\{\}]*\)(: [\w\|\<\>\{\} :]+)?[\s]*{[\w\W]*?\n}/gm))


    let matches3 = Array.from(content.matchAll(/^export (class) (\w+)([\s]*{[\w\W]*?\n})/gm))
    var matches = matches1.concat(matches2, matches3);

    match = ''
    for (let unit of matches) {
        if (classNames.includes(unit[2])) {

            match += unit[0].substr(7) + '\n\n'
        }
    }

    content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n`

    return content;
}



/**
 * @param {any} match
 * @param {any} modulName
 * @param {any} fileName
 * @param {any} offset
 * @param {any} source
 */
function unitsPack(match, modulName, fileName, offset, source) {

    var content = this.getContent(fileName)
    if (content == '' || !content) return ''

    let exportList = []

    content = content.replace(/^(let|var) /gm, 'let ')
    content = content.replace(/^export (let|var|function|class) (\w+)/gm,
        function (/** @type {any} */ match, /** @type {string} */ declType, /** @type {string} */ varName, /** @type {any} */ offset, /** @type {any} */ source) {
            // exportList[varName] = varName

            let postfix = ''
            if (declType == 'function') postfix = '.bind(window)'
            exportList.push('\t\t' + varName + ":" + varName)
            return declType + ' ' + varName;
        });

    var unitObj = exportList.join(',\n')
    content += `\n\nvar ${modulName} = {\n ${unitObj} \n}`

    content = '{\n' + content.replace(/^([\S \t])/gm, '    $1') + '\n}'

    content = `\n/*start of ${fileName}*/\n${content}\n/*end*/\n\n`

    return content;
}





/**
 * Obsolete!
 * @param {RegExp} match regular expression
 * @param {string} fileName file name
 * @param {*} offset 
 * @param {string} source 
 * @returns {string}
 */
function allocPack(match, fileName, offset, source) {

    var content = this.getContent(fileName)
    if (content == '') return ''

    var simple = false;
    if (simple) {
        // w/o unique check of variable names! ie- supports
        content = content.replace(/^export /gm, '')
    }
    else {
        // vs unique check of variable names! ie11+
        content = content.replace(/^(let|var) /gm, 'let ')
        content = content.replace(/^export (let|var) /gm, 'let ')
        content = content.replace(/^export function (?<funcname>\w+)\(/gm, 'let $1 = function(')

        var warn = /^export (class) (\w+)/gm.exec(content);
        if (warn) {
            throw new Error(`use "import {${warn[2]}} from './${fileName}'" ` +
                `statement for class import instead of common import *`)
        }
        content = '{\n' + content.replace(/^([\S])/gm, '    $1') + '\n}'

    }

    content = `\n/*start of ${fileName}*/\n${content}\n/*end*/\n\n`

    return content;
}



/**
 * @param {fs.PathOrFileDescriptor} fileName
 */
function getContent(fileName) {

    const fs = require("fs");

    fileName = this.dirPath + '/' + fileName

    for (let ext of extensions) {
        if (fs.existsSync(fileName + ext)) {
            fileName = fileName + ext;
            break;
        }
    }

    if (exportedFiles.includes(fileName)) {

        // let lineNumber = source.substr(0, offset).split('\n').length
        console.warn(`attempting to re-import '${fileName}' into 'base.ts' has been rejected`);
        return ''
    }
    else exportedFiles.push(fileName)


    var content = fs.readFileSync(fileName).toString()

    // content = Convert(content)

    return content;
}

/**
 * Remove lazy-marked chunk of code:
 * 
 * @param {string} content : content;
 * @returns {string}
 */
function removeLazy(content) {

    return content.replace(/\/\*-lazy\*\/[\s\S]*?\/\*lazy-\*\//, '');
}
