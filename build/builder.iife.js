var builder = (function (exports, require$$0, require$$1) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

    var browser = {};

    var main = {};

    var utils = {};

    //@ts-check
    //\/ <reference path="../types/utils.d.ts" />



    /**
     * @typedef {import("sourcemap-codec").SourceMapMappings} SourceMapMappings
     * @typedef {{
     *      sources: string[],
     *      sourcesContent: string[],
     *      mappings?: string
     * }} MapInfo
     */



    /**
     * @description Merge advanced map (`externalMap`) for preprocessed multifiles with inside maps based also on multi files
     * 
     * @param {{ mapping: SourceMapMappings; sourcesContent: string[]; files: string[]; }} insideMapInfo
     * @param {{ 
     *   outsideMapInfo: MapInfo,
     *   outsideMapping: SourceMapMappings; 
     * }} externalMap
     * @param {(arg: import("sourcemap-codec").SourceMapSegment[][]) => string} [encode]
     * @returns {{
     *   outsideMapInfo: MapInfo,
     *   mergedMap: import("sourcemap-codec").SourceMapSegment[][],
     * }}
     */
     function deepMergeMap$1(insideMapInfo, externalMap, encode) {

        const { outsideMapInfo, outsideMapping } = externalMap;
        const { sourcesContent, files } = insideMapInfo;

        /// update file links inside:

        const mapping = insideMapInfo.mapping.map(line => {

            if (line && line.length) {
                line.forEach((ch, i) => {
                    if (line[i][1] < files.length - 1) line[i][1] += outsideMapInfo.sources.length;
                });
                return line;
            }

            return [];
        });

        /// merge itself SourceMapMappings (reduce whatever lines to root lines):
        
        let mergedMap = mapping.map((line, i) => {

            if (!line || !line.length) return [];

            let _line = (line || []).map((ch, j, arr) => {

                const origCharMap = outsideMapping[line[j][2]];

                if (origCharMap && origCharMap.length) return origCharMap[0];
                else {
                    if (ch[1] > outsideMapInfo.sources.length - 1) return ch;
                    else {
                        return null;
                    }
                }
            });

            return _line.filter(l => l);
        });

        outsideMapInfo.sources = outsideMapInfo.sources.concat(files.slice(0, -1));
        outsideMapInfo.sourcesContent = outsideMapInfo.sourcesContent.concat((sourcesContent || []).slice(0, -1));
         
         if (encode) {
            outsideMapInfo.mappings = encode(mergedMap);
         }

        return { mergedMap, outsideMapInfo }

        /// Further: outsideMap.mappings = encode(mergedMap);
    }



    //  * @param {{
    //  *      mapStartToken?: string,                                 // [mapStartToken='//# sourceMappingURL=data:application/json;charset=utf-8;base64,']
    //  *      pluginMapping?: import('./utils').SourceMapMappings,
    //  *      decode: (arg: string) => ([number] | [number, number, number, number] | [number, number, number, number, number])[][]
    //  * }} options 

    //  * @template P
    //  * @typedef {P extends SourceMapMappings ? {} 
    //  *    : { 
    //  *       decode: (arg: string) => ([number] | [number, number, number, number] | [number, number, number, number, number])[][]
    //  *    }
    //  * } MergeMapsOptions


    /**
     * @description merge advancedMap for preprocessed finished single file (code) with origin map based on multi files
     * @param {string} builtCode
     * @param {import('sourcemap-codec').SourceMapMappings} originMapSheet
     * @param {{
     *      mapStartToken?: string,                                 // [mapStartToken='//# sourceMappingURL=data:application/json;charset=utf-8;base64,']
     *      pluginMapping?: import('./utils').SourceMapMappings,
     *      decode?: (arg: string) => SourceMapMappings
     * }} options 
     * @returns {[string, import('sourcemap-codec').SourceMapMappings]}
     */
    function mergeFlatMaps(builtCode, originMapSheet, options) {

        const { mapStartToken, pluginMapping, decode } = options || {};

        if (pluginMapping) var advancedMap = pluginMapping;
        else {
            var [advancedMap, $, code] = extractEmbedMap(builtCode, { sourceMapToken: mapStartToken, decode });
        }

        // jsMap[tsMap.map(el => el ? el[0] : null)[2][2]]

        
        /// CHECKED (TS?)?
        const mergedMap = advancedMap.map(line => line ? line[0] : []).map(line => originMapSheet[line[2]]);

        
        /// CHECKED ON CODEPEN WITH BUBLE
        // const mergedMap = advancedMap.map(line => (line && line.length) ? [line[0]] : []).map(line => line.length ? (originMapSheet[line[0][2]] || []) : [])


        /// ALERNATIVES (SIMPLEST. NOT CHECKED YET): 

        // tsMap.map(line => jsMap[line[0][2]])
        // or
        // let mergedMap = tsMap.map(m => m.map(c => jsMap[c[2]]));         // its wrong fow some reason and ts swears!!!

        return [code || builtCode, mergedMap];
    }



    /**
     * @description extract origin sourcemap from inline code
     * @param {string} code
     * @param {{
     *      sourceMapToken?: string, 
     *      decode: (arg: string) => SourceMapMappings
     * }} options
     * @returns {[import('sourcemap-codec').SourceMapMappings, {sourcesContent: string[], sources: string[], mappings: string, file: string, files: string[]}, string]}
     */
    function extractEmbedMap(code, options) {

        let { sourceMapToken } = options || {};

        sourceMapToken = sourceMapToken || '//# sourceMappingURL=data:application/json;charset=utf-8;base64,';

        const sourceMapIndex = code.lastIndexOf(sourceMapToken);

        const baseOriginSourceMap = code.slice(sourceMapIndex + sourceMapToken.length);

        const originSourceMap = JSON.parse(globalThis.document
            ? globalThis.atob(baseOriginSourceMap)
            : Buffer.from(baseOriginSourceMap, 'base64').toString()
        );

        const jsMap = options.decode(originSourceMap.mappings);

        return [jsMap, originSourceMap, code.slice(0, sourceMapIndex)];
    }




    utils.deepMergeMap = deepMergeMap$1;
    utils.mergeFlatMaps = mergeFlatMaps;
    utils.extractEmbedMap = extractEmbedMap;

    //@ts-check

    // import "fs";

    const fs = require$$0__default["default"];
    const path = require$$1__default["default"];
    const { deepMergeMap } = utils;

    // const { encodeLine, decodeLine } = require("./__map");


    /**
     * @type {{
     *      sameAsImport: 'same as imports'
     * }}
     */
    const requireOptions = {
        sameAsImport: 'same as imports'
    };

    // /**
    //  * @type {{
    //  *   ModuleNotFound: {
    //  *       doNothing: 0,
    //  *       useDefaultHandler: 1,
    //  *       raiseError: 2
    //  *   }
    //  * }}
    //  */
    // export const OnErrorActions = {
    //     ModuleNotFound: {
    //         doNothing: 0,        
    //         useDefaultHandler: 1,
    //         raiseError: 2
    //     }
    // }


    /**
     * @typedef {[number, number, number, number, number?]} VArray
     * @typedef {import("fs").PathOrFileDescriptor} PathOrFileDescriptor
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
     * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */

    function combineContent(content, rootPath, options, onSourceMap) {

        globalOptions = options;    

        const originContent = content;
        
        /// initial global options:

        rootOffset = 0;

        sourcemaps.splice(0, sourcemaps.length);

        Object.keys(modules).forEach(key => delete modules[key]);
        


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

        content = importInsert(content, rootPath, options);
        
        content = mapGenerate({
            target: options.targetFname,
            options,
            originContent,
            content,        
            // cachedMap: mapping
        });

        // here plugins

        if (options.advanced && options.advanced.ts) {
            // exportedFiles.some(w => w.endsWith('.ts') || w.endsWith('.tsx'))

            // sourcemaps for ts is not supported now        
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
    function buildFile(from, to, options) {

        const originContent = fs.readFileSync(from).toString();
        const srcFileName = path.resolve(from);    

        const targetFname = to || path.parse(srcFileName).dir + path.sep + path.parse(srcFileName).name + '.js';
        const buildOptions = Object.assign(
            {
                entryPoint: path.basename(srcFileName),
                release: false,
                targetFname
            },
            options
        );

        // let mapping = null;
        
        let content = combineContent(originContent, path.dirname(srcFileName), buildOptions
            // function onSourceMap() {
            //     // sourcemaps adds to content with targetName
            //     mapping = sourcemaps.map(s => s.debugInfo).reduce((p, n) => p.concat(n));
            //     mapping.push(null); // \n//# sourceMappingURL=${path.basename(to)}.map`
            //     return mapping;
            // }
        );
        
        // content = mapGenerate({
        //     target: targetFname,
        //     options,
        //     originContent,
        //     content,
        //     cachedMap: mapping
        // });

        fs.writeFileSync(targetFname, content);

        return content
    }


    /**
     * path manager
     */
    class PathMan {
        /**
         * @param {string} dirname
         * @param { (fileName: PathOrFileDescriptor) => string} pullContent
         */
        constructor(dirname, pullContent) {
            /**
             * root directory of source  code (not project path. it's different)
             */
            this.dirPath = dirname;
            this.getContent = pullContent || getContent;
        }
    }


    class Importer {

        /**
         * @type {PathMan}
         */
        pathMan

        /**
         * 
         * @param {PathMan} pathMan 
         */
        constructor(pathMan) {
            this.namedImportsApply = namedImports;
            /*
            * module sealing ()
            */
            this.moduleStamp = moduleSealing;
            this.pathMan = pathMan;
        }
    }



    /**
     * @param {{ 
     *      options?: Omit<BuildOptions, "entryPoint"> & { entryPoint?: string; }; 
     *      target?: string; originContent?: string; 
     *      content?: string; 
     *      sourceMaps?: any; 
     *      cachedMap?: Array<Array<VArray | null>>
     * }} options
     */
    function mapGenerate({ options, content, originContent, target, cachedMap}) {
        
        let pluginsPerformed = false;

        if (options.getSourceMap || options.sourceMaps) {
            /**
             * @type {string[]}
             */
            const moduleContents = Object.values(modules);

            // let mapping = sourcemaps.reduce((acc, s) => acc + ';' + s.mappings, '').slice(1) + ';'
            // let accumDebugInfo = sourcemaps.reduce((p, n) => p.debugInfo.concat(n.debugInfo));
            /**
             * @_type {Array<Array<VArray | null>}
             */
            
            let accumDebugInfo = cachedMap || sourcemaps.map(s => s.debugInfo).reduce((p, n) => p.concat(n));

            !cachedMap && accumDebugInfo.push(null); // \n//# sourceMappingURL=${path.basename(to)}.map`

            if (options.getSourceMap) {
                options.getSourceMap({
                    //@ts-expect-error
                    mapping: accumDebugInfo,
                    sourcesContent: moduleContents.map(c => c.split('\n').slice(startWrapLinesOffset, -endWrapLinesOffset).join('\n')).concat([originContent]),
                    files: sourcemaps.map(s => s.name)
                });
                // if (modifiedMap) accumDebugInfo = modifiedMap;
            }

            if (options.sourceMaps) {

                // const mapping = accumDebugInfo.map(line => line ? encodeLine(line) + ',' + encodeLine([7, line[1], line[2], 7]) : '').join(';')
                // const mapping = accumDebugInfo.map(line => line ? encodeLine(line) : '').join(';')
                // let mapping1 = accumDebugInfo.map(line => line ? line.map(c => encodeLine(c)).join(',') : '').join(';')            
                
                let rawMapping = accumDebugInfo.map((/** @type {any} */ line) => line ? line : []);

                if (options.sourceMaps.shift) rawMapping = Array(options.sourceMaps.shift).fill([]).concat(rawMapping);

                let mapping = options.sourceMaps.encode(rawMapping);

                const targetFile = (path && target) ? path.basename(target) : '';
                const mapObject = {
                    version: 3,
                    file: targetFile,
                    sources: sourcemaps.map(s => s.name),
                    sourcesContent: moduleContents.map(c => c.split('\n').slice(startWrapLinesOffset, -endWrapLinesOffset).join('\n')).concat([originContent]),
                    names: [],
                    mappings: mapping
                };

                /// TODO move to external (to getSourceMap) - DONE 
                if (options.sourceMaps.injectTo) {
                                    
                    // let rootMappings = injectMap(options.sourceMaps.injectTo, mapObject);
                    // //_ts-expect-error
                    // mapObject.mappings = options.sourceMaps.encode(handledDataMap.concat(rootMappings))
                    
                    /// As checked alternative:

                    const rootMaps = options.sourceMaps.injectTo;
                    // TODO decode case like injectMap
                    const { mergedMap, outsideMapInfo } = deepMergeMap({ ...mapObject, files: mapObject.sources, mapping: rawMapping }, {
                        outsideMapInfo: rootMaps,
                        outsideMapping: rootMaps.maps || globalOptions.sourceMaps.decode(rootMaps.mappings)
                    });
                    
                    outsideMapInfo.mappings = options.sourceMaps.encode(rawMapping = mergedMap);
                    mapObject.sources = outsideMapInfo.sources;
                    mapObject.sourcesContent = outsideMapInfo.sourcesContent;
                                
                }

                if (options.plugins) (pluginsPerformed = true) && options.plugins.forEach(plugin => {
                    if (plugin.bundle) {
                        content = plugin.bundle(content, {target, maps: mapObject, rawMap: rawMapping});
                    }
                });

                if (options.sourceMaps.verbose) console.log(mapObject.sources, mapObject.sourcesContent, rawMapping);

                if (fs && options.sourceMaps.external === true) {
                    fs.writeFileSync(target + '.map', JSON.stringify(mapObject));
                    content += `\n//# sourceMappingURL=${targetFile}.map`;
                }
                // else if (options.sourceMaps.external === 'monkeyPatch') {           
                    
                //     const _content = new String(content);
                //     _content['maps'] = mapObject;
                //     return _content;
                // }
                else {                
                    
                    const encodedMap = globalThis.document
                        ? btoa(JSON.stringify(mapObject))                                        // <= for browser
                        : Buffer.from(JSON.stringify(mapObject)).toString('base64');             // <= for node

                    content += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,` + encodedMap;
                    // content += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,` + 
                }
            }
        }   
        if (options.plugins && !pluginsPerformed) options.plugins.forEach(plugin => {   // if plugins has not performed erlier with sourcemaps:
            if (plugin.bundle) {
                content = plugin.bundle(content, {target});
            }
        });
        return content;
    }

    /**
     * @typedef {[number, number, number, number, number][][]} RawMapping
     * @typedef {{
     *    entryPoint: string;                                                               // only for sourcemaps and logging
     *    release?: boolean;                                                                // = false (=> remove comments|logs?|minify?? or not)
     *    removeLazy?: boolean,
     *    getContent?: (filename: string) => string
     *    logStub?: boolean,                                                                 // replace standard log to ...
     *    getSourceMap?: (                                                                   // conditions like sourceMaps
     *      arg: {
     *          mapping: ([number, number, number, number, number]|[number, number, number, number])[][],
     *          files: string[], 
     *          sourcesContent: string[]
     *      }) => Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'> | void
     *    sourceMaps?: {     
     *      shift?: number,                                                                            // = false. Possible true if [release=false] & [treeShaking=false] & [!removeLazy]
     *      encode(
     *          arg: Array<Array<[number] | [number, number, number, number, number?]>>
     *      ): string,
     *      decode?: (arg: string) => [number, number, number, number, number][][],                         // required with `injectTo` field!
     *      external?: boolean,                                                                             //  | 'monkeyPatch'
     *      charByChar?: boolean,
     *      verbose?: boolean,
     *      injectTo?: {
     *          maps?: [number, number, number, number, number][][],
     *          mappings: string,
     *          sources: string[],                                                                          // file names
     *          sourcesContent: string[],                                                                   // source contents according file names
     *          names?: string[]
     *      }
     *    }
     *    advanced?: {
     *        require?: requireOptions[keyof requireOptions]
     *        incremental?: boolean,                                                                        // possible true if [release=false]
     *        treeShaking?: false                                                                           // Possible true if [release=true => default>true].
     *        ts?: Function;
     *        nodeModulesDirname?: string  
     *    },
     *    plugins?: Array<{
     *        name?: string,
     *        preprocess?: (code: string, options?: {
     *            target: string,
     *            maps?: Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'>,
     *            rawMap?: RawMapping
     *        }) => [string, BuildOptions['sourceMaps']['injectTo']],                                                   // preprocc (svelte, vue sfc)      
     *        extend?: never & {
     *           filter?: string | RegExp,
     *           callback: (code: string) => {code: string, maps?: BuildOptions['sourceMaps']['injectTo'], rawMap?: RawMapping},          // not Implemented 
     *        }                                                                                                         // additional middleware (json, css)
     *        bundle?: (code: string, options?: {
     *            target: string,
     *            maps?: Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'>, 
     *            rawMap?: RawMapping
     *        }) => string,                                                                                             // postprocessing (jsx, uglify)
     *    }>
     * }} BuildOptions
     */

    //*        onModuleNotFound?: OnErrorActions['ModuleNotFound'][keyof OnErrorActions['ModuleNotFound']]   // ?dep

    /**
     * @type {BuildOptions & {node_modules_Path?: string}}
     */
    let globalOptions = null;
    /**
     * absolut path to node_modules
     * @type {string}
     */
    let nodeModulesPath = null;
    const nodeModules = {

    };





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
                    
            rootOffset += 5 + (sourcemaps.length * 2) + 1;
            // rootOffset += endWrapLinesOffset + (sourcemaps.length * 2) + startWrapLinesOffset;
            // rootOffset += 5 + (sourcemaps.length * 2 - 2) + 3;

            if (sourcemaps[0]) {
                // sourcemaps[0].mappings = ';;;' + sourcemaps[0].mappings
                // sourcemaps[0].debugInfo.unshift(emptyLineInfo, emptyLineInfo, emptyLineInfo);
                sourcemaps[0].debugInfo.unshift(emptyLineInfo, emptyLineInfo, emptyLineInfo, emptyLineInfo);
            }
            
            sourcemaps.forEach(sm => {
                // sm.mappings = ';;' + sm.mappings
                // sm.debugInfo.unshift(emptyLineInfo, emptyLineInfo);
                sm.debugInfo.unshift(emptyLineInfo);
            });

            const linesMap = content.split('\n').slice(rootOffset).map((line, i) => {
                // /** @type {[number, number, number, number, number?]} */
                // let r = [0, sourcemaps.length, i, 0];
                
                /** @type {Array<[number, number, number, number, number?]>} */
                let r = charByChar
                    ? [[0, sourcemaps.length, i, 0]]
                    : [].map.call(line, (/** @type {any} */ ch, /** @type {any} */ j) => [j, sourcemaps.length, i, j]);
                return r;
            });

            // if (!sourcemaps.some(file => file.name === options.entryPoint))         
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
            /// TODO? here it would be possible to edit the sorsmap in the callback:

            // content = content.replace(/\/\*[\s\S]*?\*\//g,  () => '')                                         // remove multiline comments
            // content = content.replace(/\n[\n]+/g, () => '\n')                                                 // remove unnecessary \n
        }

        return content
    }


    const modules = {};
    /**
     * @type {Array<{
     *      name: string,
     *      mappings?: never,
     *      debugInfo?: import("sourcemap-codec").SourceMapMappings      
     * }>}
     * //   Array<Array<VArray>>   // Array<VArray | Array<VArray>>   // Array<VArray> | Array<Array<VArray>>
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
    import defaultExport, { tt } from "./module-name";          /// <= TODO this one
    ```
     */
    function namedImports(content, root, _needMap) {

        // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?".\/([\w\-\/]+)"/gm;
        // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\".\/([\w\-\/]+)\"/gm;
        const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\"(.\/)?([\w\-\/]+)\"/gm;
        const imports = new Set();


        const _content = content.replace(regex, (match, __, $, $$, /** @type string */ classNames, defauName, moduleName, isrelative, fileName, offset, source) => {

            const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

            /// check module on unique and inject it if does not exists:

            if (!modules[fileStoreName]) {
                if (isrelative) attachModule.call(this, fileName, fileStoreName);
                else {
                    // node modules support
                    if (this.pathMan.getContent == getContent) {                    
                        
                        nodeModulesPath = nodeModulesPath || findProjectRoot(this.pathMan.dirPath);  // or get from cwd
                        if (!fs.existsSync(nodeModulesPath)) {
                            debugger
                            console.warn('node_modules doesn`t exists. Use $onModuleNotFound method to autoinstall');
                        }
                        else {                        

                            const packageName = path.normalize(fileName);
                            const packagePath = path.join(nodeModulesPath, packageName);
                            const packageJson = path.join(packagePath, 'package.json');
                            
                            /**
                             * @type {{main?: string, module?: string}}
                             */
                            const packageInfo = JSON.parse(fs.readFileSync(packageJson).toString());
                            
                            nodeModules[fileName] = path.join(packagePath, packageInfo.module || packageInfo.main);                        

                            attachModule.call(this, fileName, fileStoreName);
                        }
                    }                
                }
            }

            /// replace imports to spreads into place:

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

        if (globalOptions?.advanced?.require === requireOptions.sameAsImport) {
            console.log('require import');
            /// works just for named spread
            const __content = _content.replace(
                /(?:const|var|let) \{?[ ]*(?<varnames>[\w, :]+)[ ]*\}? = require\(['"](?<filename>[\w\/\.\-]+)['"]\)/g,
                (_, varnames, filename) => {
                    
                    const fileStoreName = ((root || '') + (filename = filename.replace(/^\.\//m, ''))).replace(/\//g, '$');

                    if (!modules[fileStoreName]) {
                        const success = attachModule.call(this, filename, fileStoreName);
                        if (!success) {
                            // doNothing | raise Error | [default].getContent
                            return _
                        }
                    }
                    
                    const exprStart = _.split('=')[0];
                    return exprStart + `= $$${fileStoreName}Exports;`
                }
            );

            return __content;
        }

        return _content;


        /**
         * @param {string} fileName
         * @param {string} fileStoreName
         * @this {Importer}
         */
        function attachModule(fileName, fileStoreName) {
            let moduleInfo = this.moduleStamp(fileName, root || undefined, _needMap);
            if (moduleInfo) {
                // .slice(moduleInfo.wrapperLinesOffset) =>? .slice(moduleInfo.wrapperLinesOffset, -5?) -> inside moduleSealing
                const linesMap = moduleInfo.lines.map(([moduleInfoLineNumber, isEmpty], /** @type {number} */ i) => {
                    /**
                        номер столбца в сгенерированном файле (#2);
                        индекс исходника в «sources» (#3);
                        номер строки исходника (#4);
                        номер столбца исходника (#5);
                        индекс имени переменной/функции из списка «names»;
                    */
                    
                    /** 
                     * @type {string|unknown} 
                     * TODO check type (string or boolean)
                     * */
                    let lineValue = isEmpty;
                    
                    if (i >= (moduleInfo.lines.length - endWrapLinesOffset) || i < startWrapLinesOffset) {
                        return null;
                    }

                    /** @type {VArray | Array<VArray>} */
                    let r = _needMap === 1
                        ? [].map.call(lineValue, (/** @type {any} */ ch, /** @type {any} */ i) => [i, (sourcemaps.length - 1) + 1, moduleInfoLineNumber - startWrapLinesOffset, i]) // i + 1
                        : [[0, (sourcemaps.length - 1) + 1, moduleInfoLineNumber - startWrapLinesOffset, 1]];

                    return r;
                });
                sourcemaps.push({
                    name: fileStoreName.replace(/\$/g, '/') + '.js',
                    // mappings: linesMap.map(line => line ? encodeLine(line) : '').join(';'),

                    //@ts-ignore (TODO fix type)
                    debugInfo: linesMap
                });

                return true;
            }
            return false;
        }

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
        // if (globalOptions.advanced.onModuleNotFound == OnErrorActions.ModuleNotFound.doNothing) {}

        const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

        if (content == '') return null;
        else {
            let execDir = path ? path.dirname(fileName) : fileName.split('/').slice(0, -1).join('/');
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

        if (_exports.startsWith(' ,')) _exports = _exports.slice(2);
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
                lines: lines.map((/** @type {any} */ line, /** @type {any} */ i) => [i, line])   //  [i, !!(line.trim())]  // .filter(([i, f]) => f).map(([i, f]) => i)
            }
        }

    }




    /**
     * @param {PathOrFileDescriptor} fileName
     * @this {PathMan}
     */
    function getContent(fileName) {

        fileName = path.normalize(this.dirPath + path.sep + (nodeModules[fileName] || fileName));

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


    /**
     * @this {Importer}
     * @param {string} sourcePath
     * @returns {string}
     */
    function findProjectRoot(sourcePath) {

        if (fs.existsSync(path.join(sourcePath, 'package.json'))) {
            const nodeModulesName = globalOptions.advanced.nodeModulesDirname || 'node_modules';
            return path.join(sourcePath, nodeModulesName)
        }
        else {
            const parentDir = path.dirname(sourcePath);
            if (parentDir.length > 4) {
                return findProjectRoot(path.dirname(parentDir))
            }
            else {
                throw new Error('Project directory and according node_modules folder are not found');
            }
        }

    }



    main.default = main.build = main.buildContent = main.combineContent = combineContent;
    main.integrate = main.packFile = main.buildFile = buildFile;
    main.requireOptions = requireOptions;

    const pack = main.combine;

    var pack_1 = browser.pack = pack;

    exports["default"] = browser;
    exports.pack = pack_1;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, null, {basename: (str) => str.split(/[\/\\]/).pop()});
