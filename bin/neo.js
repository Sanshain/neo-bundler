#!/usr/bin/env node

'use strict';

var require$$0 = require('fs');
var require$$1 = require('path');
var require$$3 = require('perf_hooks');
var require$$4 = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var __bin = {};

var main = {};

//@ts-check

// import "fs";

const fs$1 = require$$0__default["default"];
const path$1 = require$$1__default["default"];
// const { encodeLine, decodeLine } = require("./__map");





/**
 * @typedef {[number, number, number, number, number?]} VArray
 */

let startWrapLinesOffset = 1;
let endWrapLinesOffset = 5;

const extensions = ['.ts', '.js'];
var rootOffset = 0;
/**
 * @description expoerted files for uniqie control inside getContent
 * @type {string[]}
 */
var exportedFiles = [];

let logLinesOption = false;
let incrementalOption = false;


// integrate("base.ts", 'result.js')


// exports = {
//     default: combine,
//     build: combine,
//     combine: combine,
//     integrate,
// }



/**
 * @description remove lazy and import inserts into content
 * @param {string} content - source code content;
 * @param {string} dirpath - path to source directory name
 * @param {BuildOptions} options - options
 * @return {string} code with imported involves
 */
function combineContent(content, dirpath, options) {

    logLinesOption = options.logStub;
    incrementalOption = options.advanced ? options.advanced.incremental : false;
    if (incrementalOption) {
        // look up 
        startWrapLinesOffset = 3;  // start_WrapLinesOffset + 2
        endWrapLinesOffset = 8;   // end_WrapLinesOffset + 3
    }

    exportedFiles = [];

    if (options.removeLazy) {
        if (options.sourceMaps || options.getSourceMap) {
            console.warn('\x1B[33m' + 'removeLazy option uncompatible with sourceMap generation now. Therefore it`s passed' + '\x1B[0m');
            options.sourceMaps = null;
            options.getSourceMap = null;
        }
        content = removeLazy(content);
    }

    content = importInsert(content, dirpath, options);

    if (options.advanced && options.advanced.ts) {

        content = options.advanced.ts(content);
    }

    return content;
}

/**
 * 
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns 
 */
function integrate(from, to, options) {

    let originContent = fs$1.readFileSync(from).toString();
    let filename = path$1.resolve(from);

    let contents = combineContent(originContent, path$1.dirname(filename), Object.assign({ entryPoint: path$1.basename(filename), release: false }, options));

    to = to || path$1.parse(filename).dir + path$1.sep + path$1.parse(filename).name + '.js';

    //@ts-expect-error
    if (options.getSourceMap || (options.sourceMaps == 'external' || options.sourceMaps)) {
        /**
         * @type {string[]}
         */
        const moduleContents = Object.values(modules);
        
        // let mapping = sourcemaps.reduce((acc, s) => acc + ';' + s.mappings, '').slice(1) + ';'
        

        // let accumDebugInfo = sourcemaps.reduce((p, n) => p.debugInfo.concat(n.debugInfo));
        /**
         * @_type {Array<Array<VArray | null>}
         */             
        let accumDebugInfo = sourcemaps.map(s => s.debugInfo).reduce((p, n) => p.concat(n));
        
        accumDebugInfo.push(null);                                                           // \n//# sourceMappingURL=${path.basename(to)}.map`                

        if (options.getSourceMap) options.getSourceMap({
            //@ts-expect-error
            mapping: accumDebugInfo,
            sourcesContent: moduleContents.map(c => c.split('\n').slice(startWrapLinesOffset, -endWrapLinesOffset).join('\n')).concat([originContent]),
            files: sourcemaps.map(s => s.name)
        });

        if (options.sourceMaps) {            

            // const mapping = accumDebugInfo.map(line => line ? encodeLine(line) + ',' + encodeLine([7, line[1], line[2], 7]) : '').join(';')
            // const mapping = accumDebugInfo.map(line => line ? encodeLine(line) : '').join(';')

            // let mapping1 = accumDebugInfo.map(line => line ? line.map(c => encodeLine(c)).join(',') : '').join(';')            

            const handledDataMap = accumDebugInfo.map(line => line ? line : []);
            //@ts-expect-error
            let mapping = options.sourceMaps.encode(handledDataMap);
            // console.log(decodeLine);
            // console.log(decode);

            const mapObject = {
                version: 3,
                file: path$1.basename(to),
                sources: sourcemaps.map(s => s.name),
                sourcesContent: moduleContents.map(c => c.split('\n').slice(startWrapLinesOffset, -endWrapLinesOffset).join('\n')).concat([originContent]),
                names: [],
                mappings: mapping
            };

            if (options.sourceMaps.external) {
                fs$1.writeFileSync(to + '.map', JSON.stringify(mapObject));
                contents += `\n//# sourceMappingURL=${path$1.basename(to)}.map`;
            }
            else {
                // TODO inline as one line of base64
                contents += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,` + Buffer.from(JSON.stringify(mapObject)).toString('base64');
            }
        }
    }

    fs$1.writeFileSync(to, contents);

    return contents
}


/**
 * path manager
 */
class PathMan {
    /**
     * @param {string} dirname
     * @param { (fileName: fs.PathOrFileDescriptor) => string} pullContent
     */
    constructor(dirname, pullContent) {
        this.dirPath = dirname;
        this.getContent = pullContent || getContent;
    }
}


class Importer {
    constructor(pathMan) {
        this.namedImportsApply = namedImports;
        this.moduleStamp = moduleSealing;
        this.pathMan = pathMan;
    }
}



/**
 * @typedef {{
 *    entryPoint: string;                                                               // 
 *    release?: boolean;                                                                // = false (=> remove comments|logs?|minify?? or not)
 *    removeLazy?: boolean,
 *    getContent?: (filename: fs.PathOrFileDescriptor) => string
 *    logStub?: boolean,                                                                 // replace standard log to ...
 *    getSourceMap?: (                                                                   // conditions like sourceMaps
 *      arg: {
 *          mapping: Array<number[]>, files: string[], sourcesContent?: string[]
 *      }) => void
 *    sourceMaps?: {                                                                    // = false. Possible true if [release=false] & [treeShaking=false] & [!removeLazy]
 *      encode(
 *          arg: Array<Array<[number] | [number, number, number, number, number?]>>
 *      ): string,
 *      external?: boolean
 *      charByChar?: boolean
 *    }
 *    advanced?: {
 *        incremental?: boolean,                                                        // possible true if [release=false]
 *        treeShaking?: false                                                           // Possible true if [release=true => default>true].
 *        ts?: Function;
 *    }
 * }} BuildOptions
 */


/**
 * 
 * @param {string} content - content (source code)
 * @param {string} dirpath - source directory name
 * @param {BuildOptions} options - options
 */
function importInsert(content, dirpath, options) {
    
    let pathman = new PathMan(dirpath, options.getContent || getContent);
    const needMap = !!(options.sourceMaps || options.getSourceMap);

    if (logLinesOption) {
        content = content.replace(/console.log\(/g, function () {
            let line = arguments[2].slice(0, arguments[1]).split('\n').length.toString();
            return 'console.log("' + options.entryPoint + ':' + line + ':", '
        });
    }
    
    const charByChar = options.sourceMaps && options.sourceMaps.charByChar;

    // let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
    // content = new Importer(pathman).namedImportsApply(content, undefined, (options.getSourceMap && !options.sourceMaps) ? 1 : needMap);
    content = new Importer(pathman).namedImportsApply(
        content, undefined, (options.sourceMaps && options.sourceMaps.charByChar) ? 1 : needMap
    );

    const moduleContents = Object.values(modules);
    content = '\n\n//@modules:\n\n\n' + moduleContents.join('\n\n') + `\n\n\n//@${options.entryPoint}: \n` + content;


    const emptyLineInfo = null;

    if (needMap) {
        rootOffset += 5 + (sourcemaps.length * 2 - 2) + 3;

        if (sourcemaps[0]) {
            // sourcemaps[0].mappings = ';;;' + sourcemaps[0].mappings
            sourcemaps[0].debugInfo.unshift(emptyLineInfo, emptyLineInfo, emptyLineInfo);
        }
        sourcemaps.forEach(sm => {
            // sm.mappings = ';;' + sm.mappings
            sm.debugInfo.unshift(emptyLineInfo, emptyLineInfo);
        });

        const linesMap = content.split('\n').slice(rootOffset).map((line, i) => {
            // /** @type {[number, number, number, number, number?]} */
            // let r = [0, sourcemaps.length, i, 0];
            
            /** @type {Array<[number, number, number, number, number?]>} */
            let r = charByChar
                ? [[0, sourcemaps.length, i, 0]]
                : [].map.call(line, (ch, j) => [j, sourcemaps.length, i, j]);
            return r;
        });

        sourcemaps.push({
            name: options.entryPoint,
            // mappings: linesMap.map(line => encodeLine(line)).join(';'),
            // mappings: linesMap.map(line => line.map(charDebugInfo => encodeLine(charDebugInfo)).join(',')).join(';'),
            // mappings: ';;;' + linesMap.map(line => encodeLine(line)).join(';'),
            debugInfo: [emptyLineInfo, emptyLineInfo, emptyLineInfo].concat(linesMap)
        });
    }


    ///* not recommended, but easy for realization:
    // const regex = /^import \"\.\/(?<filename>\w+)\"/gm;    
    // content = content.replace(regex, allocPack.bind(pathman)); //*/

    // regex = /^import {([\w, ]+)} from \".\/(\w+)\"/gm
    // content = content.replace(moduleSealing.bind(pathman)); //*/

    if (options && options.release) {
        
        if (options.sourceMaps) {
            console.warn('Generate truth sourcemaps with options `release = true` is not guaranteed');
        }

        // remove comments:
        
        // keeps line by line sourcemaps:
        content = content.replace(/console.log\([\s\S]+?\)\n/g, options.sourceMaps ? '\n' : '');    //*/ remove logs
        content = content.replace(/\/\/[\s\S]*?\n/g, options.sourceMaps ? '\n' : '');               //*/ remove comments
        content = content.replace(/^[\s]*/gm, ''); //*/                                             // remove unnecessary whitespaces in line start

        // drop sourcemaps:
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');                                          // remove multiline comments
        content = content.replace(/\n[\n]+/g, '\n');                                                 // remove unnecessary \n
    }

    return content
}


const modules = {};
/**
 * @type {Array<{
 *      name: string,
 *      mappings?: never,
 *      debugInfo?: Array<VArray | Array<VArray>>                                           // Array<VArray> | Array<Array<VArray>>
 * }>}
 */
const sourcemaps = [];


/**
 * replace imports to object spreads and separate modules
 * @param {string} content
 * @param {?string} [root]
 * @param {boolean | 1?} [_needMap]
 * @this {Importer} *
 * @example :

Supports following forms:

```
import defaultExport from "module_name";
import * as name from "./module-name"
import { export } from "./module_name"
import { export as alias } from "./module_name"
import { export1, export2 } from "./module_name"
import { export1, export2 as a } from "./module_name"
import "./module_name"
```

Unsupported yet:
```
import defaultExport, * as name from "./module-name";
import defaultExport, { tt } from "./module-name";
```
 */
function namedImports(content, root, _needMap) {

    // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?".\/([\w\-\/]+)"/gm;
    const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\".\/([\w\-\/]+)\"/gm;    
    const imports = new Set();

    const _content = content.replace(regex, (match, __, $, $$, /** @type string */ classNames, defauName, moduleName, fileName, offset, source) => {

        const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

        if (!modules[fileStoreName]) {
            let moduleInfo = this.moduleStamp(fileName, root || undefined, _needMap);
            if (moduleInfo) {
                // .slice(moduleInfo.wrapperLinesOffset) =>? .slice(moduleInfo.wrapperLinesOffset, -5?) -> inside moduleSealing

                const linesMap = moduleInfo.lines.map(([moduleInfoLineNumber, isEmpty], i) => {
                    /**
                        номер столбца в сгенерированном файле (#2);
                        индекс исходника в «sources» (#3);
                        номер строки исходника (#4);
                        номер столбца исходника (#5);
                        индекс имени переменной/функции из списка «names»;
                    */
                    
                    /**
                     * @type {string}
                    */
                    //@ts-expect-error
                    let lineValue = isEmpty;
                    
                    if (i >= (moduleInfo.lines.length - endWrapLinesOffset) || i < startWrapLinesOffset) {                        
                        return null;
                    }

                    /** @type {VArray | Array<VArray>} */
                    let r = _needMap === 1
                        ? [].map.call(lineValue, (ch, i) => [i, (sourcemaps.length - 1) + 1, moduleInfoLineNumber - startWrapLinesOffset, i]) // i + 1
                        : [[0, (sourcemaps.length - 1) + 1, moduleInfoLineNumber - startWrapLinesOffset, 1]];

                    return r
                });
                sourcemaps.push({
                    name: fileStoreName.replace(/\$/g, '/') + '.js',
                    // mappings: linesMap.map(line => line ? encodeLine(line) : '').join(';'),
                    debugInfo: linesMap
                });
            }

        }
        if (defauName && inspectUnique(defauName)) return `const { default: ${defauName} } = $$${fileStoreName}Exports;`;
        else if (moduleName) {
            return `const ${moduleName.split(' ').pop()} = $$${fileStoreName}Exports;`;
        }
        else {
            let entities = classNames.split(',').map(w => (~w.indexOf(' as ') ? (`${w.trim().split(' ').shift()}: ${w.trim().split(' ').pop()}`) : w).trim());
            for (let entity of entities) {
                if (~entity.indexOf(':')) {
                    entity = entity.split(': ').pop();
                }
                inspectUnique(entity);
            }
            return `const { ${entities.join(', ')} } = $$${fileStoreName}Exports;`;
        }
    });


    return _content;


    /**
     * @param {string} entity
     */
    function inspectUnique(entity) {

        if (imports.has(entity)) {
            console.warn('Duplicating the imported name');
            return false
        }
        else {
            imports.add(entity);
            return true;
        }
    }
}



/**
 * seal module
 * @param {string} fileName
 * @param {string?} root
 * @param {boolean | 1?} __needMap
 * @this {Importer} 
 * @returns {{
 *      fileStoreName: string, 
 *      updatedRootOffset?: number,
 *      lines: Array<[number, boolean]>
 * }}
 * 
 *      start_WrapLinesOffset: number,                                                // by default = 1
 *      end_WrapLinesOffset: number,
 * 
 */
function moduleSealing(fileName, root, __needMap) {

    // extract path:

    let content = this.pathMan.getContent(fileName);

    const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

    if (content == '') return null;
    else {
        let execDir = path$1 ? path$1.dirname(fileName) : fileName.split('/').slice(0, -1).join('/');
        // let execDir = path.dirname(fileName)
        
        if (logLinesOption) {
            content = content.replace(/console.log\(/g, function () {
                let line = arguments[2].slice(0, arguments[1]).split('\n').length.toString();
                return 'console.log("' + fileName + '.js:' + line + ':", '
            });
        }

        execDir = (execDir === '.' ? '' : execDir);
        const _root = (root ? (root + (execDir ? '/' : '')) : '') + execDir;        
        content = namedImports(content, _root);
    }    

    // matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) = [^\n]+/gm))
    // matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))
    // matches3 = Array.from(content.matchAll(/^export (class) (\w+)([\s]*{[\w\W]*?\n})/gm))
    // var matches = matches1.concat(matches2, matches3);

    let matches = Array.from(content.matchAll(/^export (class|function|let|const|var) ([\w_\n]+)?[\s]*=?[\s]*/gm));
    let _exports = matches.map(u => u[2]).join(', ');

    let defauMatch = content.match(/^export default \b([\w_]+)\b( [\w_\$]+)?/m);
    if (defauMatch) {
        if (~['function', 'class'].indexOf(defauMatch[1])) {
            if (!defauMatch[2]) {
                content = content.replace(/^export default \b([\w_]+)\b/m, 'export default $1 $default');
            }
            _exports += ', default: ' + (defauMatch[2] || '$default');
        }
        else {
            _exports += ', default: ' + defauMatch[1];
        }
    }

    _exports = `exports = { ${_exports} };` + '\n'.repeat(startWrapLinesOffset);

    content = content.replace(/^export (default )?/gm, '') + '\n\n' + _exports + '\n' + 'return exports';
    modules[fileStoreName] = `const $$${fileStoreName}Exports = (function (exports) {\n ${content.split('\n').join('\n\t')} \n})({})`;

    /// TO DO for future feature `incremental build` :
    if (incrementalOption) {
        // the generated module name can be used as the same role: const $$${fileStoreName}Exports?

        modules[fileStoreName] = `\n/*start of ${fileName}*/\n${modules[fileStoreName]}\n/*end*/\n\n`;
    }
    

    if (!__needMap) return null; // content
    else {
        // TO DO only inline sourcemap:

        let lines = modules[fileStoreName].split('\n');
        rootOffset += lines.length;

        return {
            fileStoreName,                                                      // ==
            // start_WrapLinesOffset,                                               // ?
            // end_WrapLinesOffset,                                                 // ?
            updatedRootOffset: rootOffset,                                      // ?
            // => [1, true], [2, false], [3, true] ... => [1, 3, ...]
            lines: lines.map((line, i) => [i, line])   //  [i, !!(line.trim())]  // .filter(([i, f]) => f).map(([i, f]) => i)
        }
    }

}




/**
 * @param {fs.PathOrFileDescriptor} fileName
 */
function getContent(fileName) {

    fileName = path$1.normalize(this.dirPath + path$1.sep + fileName);

    for (let ext of extensions) {
        if (fs$1.existsSync(fileName + ext)) {
            fileName = fileName + ext;
            break;
        }
    }

    if (exportedFiles.includes(fileName)) {

        // let lineNumber = source.substr(0, offset).split('\n').length
        console.warn(`attempting to re-import '${fileName}' into 'base.ts' has been rejected`);
        return ''
    }
    else exportedFiles.push(fileName);


    var content = fs$1.readFileSync(fileName).toString();

    // content = Convert(content)

    return content;
}


/**
 * Remove code fragments marked as lazy inclusions
 * @param {string} content - content
 */
function removeLazy(content) {

    return content.replace(/\/\*@lazy\*\/[\s\S]*?\/\*_lazy\*\//, '');
}


main.default = main.build = main.buildFile = main.combine = combineContent;
main.integrate = main.pack = main.buildContent = integrate;

//@ts-check

const build = main.integrate;
const path = require$$1__default["default"];
const fs = require$$0__default["default"];
require$$3__default["default"].performance;
const { execSync } = require$$4__default["default"];


if (~process.argv.indexOf('-h')) {
    console.log(`
-s 		- source file name (could be passed as first arg without the flag -s)
-t 		- target file name (required)
-m 		- generate sourcemap file 	(optional)
--time 	- verbose build time  		(optional)
    `);
    process.exit(0);
}


function getArgv(argk) {
    let index = process.argv.indexOf(argk) + 1;
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
};

let source = resolveFile('s', 1);
let target = resolveFile('t', false);

const sourcemapInline = ~process.argv.indexOf('--inline-m');
const sourcemap = sourcemapInline || ~process.argv.indexOf('-m');
const release = ~process.argv.indexOf('-r');
if (release && sourcemap) {
    console.log(`\x1B[34m >> using the -k option in conjunction with - is not recommended, since these options have not been tested together.\x1B[0m`);
}


console.time('built in');

let r = build(source, target, {
    release: !!release == true,
    sourceMaps: sourcemap
        ? (() => {
            // also look at cjs-to-es6 ?
            
            // let encode = null;
            const packageName = 'sourcemap-codec';

            try { var { encode } = commonjsRequire(packageName); }
            catch (err) {
                console.log('\x1B[33mThe package needed to generate the source map has not been found and will be installed automatically\x1B[0m');
                console.log(execSync('npm i sourcemap-codec').toString());                                                                              // -D?
                
                var {encode} = commonjsRequire(packageName);
            }

            return {
                encode,
                external: !!sourcemapInline == true
            }
        })()
        : undefined
     
});



if (r) {    
    console.log(`\x1B[34m${source} => ${target}\x1B[0m`);
    if (sourcemap && !!sourcemapInline == false) {
        console.log(`\x1B[34m${'.'.repeat(source.length)} => ${target}.map\x1B[0m`);
    }
    if (~process.argv.indexOf('--time')) {
        console.timeEnd('built in');
    }
}




/**
 * @param {keyof typeof helpers} flag 
 * @param {boolean|1} [check=undefined] 
 * @returns {string}
 */
function resolveFile(flag, check) {
    
    let target = getArgv('-' + flag) || (check === 1 ? process.argv[check + 1] : null);

    if (!target) {
        const errMessage = `the path is not specified (use the -${flag} <filename> option for specify ${helpers[flag]})`;
        console.warn('\x1B[31m' + errMessage + '\x1B[0m');
        process.exit(1);
    }

    if (!path.isAbsolute(target)) {
        target = path.resolve(process.cwd(), target);
    }

    if (check && check !== undefined && !fs.existsSync(target)) {
        console.log(process.cwd);
        console.warn('\x1B[31m' + `${target} file not found` + '\x1B[0m');
        // throw new Error(`${target} file not found`);
        process.exit(1);
    }

    return target;
}

module.exports = __bin;
