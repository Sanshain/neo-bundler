var builder = (function (exports, require$$0, require$$1) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

    var browser = {};

    var main = {};

    //@ts-check

    // import "fs";

    const fs = require$$0__default["default"];
    const path = require$$1__default["default"];
    // const { encodeLine, decodeLine } = require("./__map");





    /**
     * @typedef {[number, number, number, number, number?]} VArray
     */

    const startWrapLinesOffset = 1;
    const endWrapLinesOffset = 5;

    const extensions = ['.ts', '.js'];
    var rootOffset = 0;
    /**
     * @description expoerted files for uniqie control inside getContent
     * @type {string[]}
     */
    var exportedFiles = [];
    let logLines = false;

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

        logLines = options.logStub;

        exportedFiles = [];

        content = removeLazy(content);

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

        let contents = combine(originContent, path.dirname(filename), Object.assign({ entryPoint: path.basename(filename), release: false }, options));

        to = to || path.parse(filename).dir + path.sep + path.parse(filename).name + '.js';

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
                sourcesContent: moduleContents.map(c => c.split('\n').slice(1, -5).join('\n')).concat([originContent]),
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
                    file: path.basename(to),
                    sources: sourcemaps.map(s => s.name),
                    sourcesContent: moduleContents.map(c => c.split('\n').slice(1, -5).join('\n')).concat([originContent]),
                    names: [],
                    mappings: mapping
                };

                if (options.sourceMaps.external) {
                    fs.writeFileSync(to + '.map', JSON.stringify(mapObject));
                    contents += `\n//# sourceMappingURL=${path.basename(to)}.map`;
                }
                else {
                    // TODO inline as one line of base64
                    contents += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,` + Buffer.from(JSON.stringify(mapObject)).toString('base64');
                }
            }
        }

        fs.writeFileSync(to, contents);

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
     *    }
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
        const needMap = !!(options.sourceMaps || options.getSourceMap);

        if (logLines) {
            content = content.replace(/console.log\(/g, function () {
                let line = arguments[2].slice(0, arguments[1]).split('\n').length.toString();
                return 'console.log("' + options.entryPoint + ':' + line + ':", '
            });
        }

        // let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
        content = new Importer(pathman).namedImportsApply(content, undefined, (options.getSourceMap && !options.sourceMaps) ? 1 : needMap);

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
                /** @type {[number, number, number, number, number?]} */
                let r = [0, sourcemaps.length, rootOffset + i, 0];
                // /** @type {Array<[number, number, number, number, number?]>} */
                // let r = [].map.call(line, (ch, i) => [i, sourcemaps.length, rootOffset + i, i]);
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
                            return null
                        }

                        /** @type {VArray | Array<VArray>} */
                        let r = _needMap === 1
                            ? [0, (sourcemaps.length - 1) + 1, moduleInfoLineNumber, 1]
                            : [].map.call(lineValue, (ch, i) => [i, (sourcemaps.length - 1) + 1, moduleInfoLineNumber - startWrapLinesOffset, i]); // i + 1

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
     *      startWrapLinesOffset: number,                                                // by default = 1
     *      endWrapLinesOffset: number,
     *      updatedRootOffset?: number,
     *      lines: Array<[number, boolean]>
     * }}
     */
    function moduleSealing(fileName, root, __needMap) {

        // extract path:

        let content = this.pathMan.getContent(fileName);

        const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

        if (content == '') return null;
        else {
            let execDir = path ? path.dirname(fileName) : fileName.split('/').slice(0, -1).join('/');
            // let execDir = path.dirname(fileName)
            
            if (logLines) {
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
        // content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n` 

        if (!__needMap) return null; // content
        else {
            // TO DO only inline sourcemap:

            let lines = modules[fileStoreName].split('\n');
            rootOffset += lines.length;

            return {
                fileStoreName,                                                      // ==
                startWrapLinesOffset: startWrapLinesOffset,                         // ?
                endWrapLinesOffset: 5,                                              // ?
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

        fileName = path.normalize(this.dirPath + path.sep + fileName);

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
        else exportedFiles.push(fileName);


        var content = fs.readFileSync(fileName).toString();

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


    main.default = main.build = main.combine = combine;
    main.integrate = main.pack = integrate;

    const pack = main.combine;

    var pack_1 = browser.pack = pack;

    exports["default"] = browser;
    exports.pack = pack_1;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, null, null);
