//@ts-check

// import "fs";

const fs = require("fs");
const path = require('path');
const { encodeLine } = require("./__map");

const extensions = ['.ts', '.js']
var rootOffset = 0;
/**
 * @description expoerted files for uniqie control inside getContent
 * @type {string[]z}
 */
var exportedFiles = []

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
function combine(content, dirpath, options) {

    exportedFiles = []

    content = removeLazy(content)

    content = importInsert(content, dirpath, options);

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

    let originContent = fs.readFileSync(from).toString();
    let filename = path.resolve(from);

    let contents = combine(originContent, path.dirname(filename), Object.assign({ entryPoint: path.basename(filename), release: false }, options))

    to = to || path.parse(filename).dir + path.sep + path.parse(filename).name + '.js';

    if (options.sourceMaps == 'external' || options.sourceMaps) {
        /**
         * @type {string[]}
         */
        const moduleContents = Object.values(modules);
        let mapping = sourcemaps.reduce((acc, s) => acc + s.mappings, '')
        const mapObject = {
            version: 3,
            file: options.entryPoint,
            sources: sourcemaps.map(s => s.name),
            sourcesContent: moduleContents.map(c => c.split('\n').slice(1, -5).join('\n')).concat([originContent]),
            names: [],
            mappings: mapping
        }

        if (options.sourceMaps || true) {
            fs.writeFileSync(to + '.map', JSON.stringify(mapObject))
            contents += `\n//# sourceMappingURL=${path.basename(to)}.map`
        }
    }

    fs.writeFileSync(to, contents)

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
 *    getContent?: (filename: fs.PathOrFileDescriptor) => string
 *    sourceMaps?: boolean | 'external',                                                // = false. Possible true if [release=false] & [treeShaking=false]
 *    advanced?: {
 *        incremental?: false,                                                          // possible true if [release=false]
 *        treeShaking?: false                                                           // Possible true if [release=true => default>true].
 *        ts?: false;
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

    // let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
    content = new Importer(pathman).namedImportsApply(content, undefined, !!options.sourceMaps);

    const moduleContents = Object.values(modules);
    content = '\n\n//@modules:\n\n\n' + moduleContents.join('\n\n') + `\n\n\n//@${options.entryPoint}: \n` + content;


    if (options.sourceMaps) {
        rootOffset += 5 + sourcemaps.length * 2 + 4;

        const linesMap = content.split('\n').slice(rootOffset).map((line, i) => {
            // /** @type {[number, number, number, number, number?]} */
            // let r = [0, sourcemaps.length, rootOffset + i, 0];
            /** @type {Array<[number, number, number, number, number?]>} */
            let r = [].map.call(line, (char, i) => [0, sourcemaps.length, rootOffset + i, i]);
            return r;
        })
        sourcemaps.push({
            name: options.entryPoint,
            // mappings: linesMap.map(line => encodeLine(line)).join(';'),
            mappings: linesMap.map(line => line.map(charDebugInfo => encodeLine(charDebugInfo)).join(',')).join(';'),
        })
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
        content = content.replace(/\/\*[\s\S]*?\*\//g, '')                                          // remove multiline comments
        content = content.replace(/\n[\n]+/g, '\n')                                                 // remove unnecessary \n
    }

    return content
}


const modules = {};
/**
 * @type {Array<{
 *      name: string,
 *      mappings: string,
 *      debugInfo?: Array<Array<[number, number, number, number, number?]>> | Array<[number, number, number, number, number?]>
 * }>}
 */
const sourcemaps = []


/**
 * replace imports to object spreads and separate modules
 * @param {string} content
 * @param {?string} [root]
 * @param {boolean} [genSourceMap]
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
function namedImports(content, root, genSourceMap) {

    // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?".\/([\w\-\/]+)"/gm;
    const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\".\/([\w\-\/]+)\"/gm;
    const imports = new Set();

    const _content = content.replace(regex, (match, __, $, $$, /** @type string */ classNames, defauName, moduleName, fileName, offset, source) => {

        const fileStoreName = ((root || '') + fileName).replace(/\//g, '$')

        if (!modules[fileStoreName]) {
            let moduleInfo = this.moduleStamp(fileName, root || undefined, genSourceMap);
            if (moduleInfo){
                const linesMap = moduleInfo.lines.slice(moduleInfo.wrapperLinesOffset).map(([moduleInfoLineNumber, isEmpty], i) => {
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
                    
                    /** @type {Array<[number, number, number, number, number?]>} */
                    let r = [].map.call(lineValue, (k, i) => [0, (sourcemaps.length - 1) + 1, moduleInfoLineNumber, i + 1]);

                    /** @type {[number, number, number, number, number?]} */
                    // let r = [0, (sourcemaps.length - 1) + 1, moduleInfoLineNumber, 1]
                    return r
                })
                sourcemaps.push({
                    name: fileStoreName.replace(/\$/g, '/') + '.js',
                    // mappings: linesMap.map(line => encodeLine(line)).join(';'),
                    mappings: linesMap.map(chars => chars.map(c => encodeLine(c)).join(',')).join(';'),
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
                    entity = entity.split(': ').pop()
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
            console.warn('Duplicating the imported name')
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
 * @param {boolean?} getSourcemap
 * @this {Importer} 
 * @returns {{
 *      fileStoreName: string, 
 *      wrapperLinesOffset: number,                                                // by default = 1
 *      updatedRootOffset?: number,
 *      lines: Array<[number, boolean]>
 * }}
 */
function moduleSealing(fileName, root, getSourcemap) {

    // extract path:

    let content = this.pathMan.getContent(fileName);

    const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

    if (content == '') return null;
    else {
        let execDir = path ? path.dirname(fileName) : fileName.split('/').slice(0, -1).join('/');
        // let execDir = path.dirname(fileName)
        
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
                content = content.replace(/^export default \b([\w_]+)\b/m, 'export default $1 $default')
            }
            _exports += ', default: ' + (defauMatch[2] || '$default')
        }
        else {
            _exports += ', default: ' + defauMatch[1]
        }
    }

    _exports = `exports = { ${_exports} };\n`

    content = content.replace(/^export (default )?/gm, '') + '\n\n' + _exports + '\n' + 'return exports';
    content = `const $$${fileStoreName}Exports = (function (exports) {\n ${content.split('\n').join('\n\t')} \n})({})`

    modules[fileStoreName] = content;

    /// TO DO for future feature `incremental build` :
    // content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n` 

    if (!getSourcemap) return null; // content
    else {
        // TO DO only inline sourcemap:

        let lines = content.split('\n')
        rootOffset += lines.length

        return {
            fileStoreName,
            wrapperLinesOffset: 1,
            updatedRootOffset: rootOffset,
            // => [1, true], [2, false], [3, true] ... => [1, 3, ...]
            lines: lines.map((line, i) => [i, line])   //  [i, !!(line.trim())]  // .filter(([i, f]) => f).map(([i, f]) => i)
        }
    }

}




/**
 * @param {fs.PathOrFileDescriptor} fileName
 */
function getContent(fileName) {

    fileName = path.normalize(this.dirPath + path.sep + fileName)

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
 * Remove code fragments marked as lazy inclusions
 * @param {string} content - content
 */
function removeLazy(content) {

    return content.replace(/\/\*@lazy\*\/[\s\S]*?\/\*_lazy\*\//, '');
}


exports.default = exports.build = exports.combine = combine;
exports.integrate = exports.pack = integrate;