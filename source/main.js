//@ts-check

const fs = require("fs");
const path = require("path");
const { deepMergeMap, genfileStoreName, findPackagePath, findMainfile, findProjectRoot } = require("./utils");
const { benchmarkFunc, benchStore } = require("./utils/benchmarks");
const { AbstractImporter } = require("./utils/declarations$");
const { commonjsExportsApply } = require("./utils/exports$");
const { chainingCall, conditionalChain } = require("./utils/monadutils");
const { releaseProcess, cleaningDebugBlocks } = require("./utils/release$");
const { violentShake: forceTreeShake, theShaker } = require("./utils/tree-shaking");
const { version, statHolder } = require("./utils/_versions");



// const { encodeLine, decodeLine } = require("./__map");

/**
 * @typedef {{
    *  root?: string;
    *  _needMap?: boolean | 1;
    *  extract: {
    *      names?: string[],
    *      default?: string
    *  },       
    *  isEsm?: boolean
 * }} SealingOptions
 * 
 *  /// UNDER QUESTION:
 *  onTreeShake?: (skiped?: boolean) => void
 */

/**
 * @type {{
 *      sameAsImport: 'same as import',
 *      doNothing?: 'don`t affect'
 * }}
 * 
 *      inlineTo?: 'inline to script',
 *      applyAndInline?: 'apply and inline',
 */
const requireOptions = {
    sameAsImport: 'same as import',
    doNothing: 'don`t affect'
}

const fastShaker = {}

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

const extensions = ['.ts', '.js', '']
var rootOffset = 0;
/**
 * @description expoerted files for uniqie control inside getContent
 * @type {string[]}
 */
var exportedFiles = [];

let logLinesOption = false;
let incrementalOption = false;
/**
 * @type {Importer}
 */
let importer = null;


// exports = {
//     default: combine,
//     build: combine,
//     combine: combine,
//     integrate,
// }



/**
 * @description preapare (remove lazy, prepare options) and build content under rootPath and as per options (applyes importInserts into content)
 * @param {string} content - source code content;
 * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
 * @param {BuildOptions & {targetFname?: string}} options - options
 * @param {Function?} [onSourceMap=null] - onSourceMap
 * @return {string} code with imported involves
 */

function combineContent(content, rootPath, options, onSourceMap) {

    globalOptions = options;
    globalOptions.advanced?.treeShake && (theShaker.globalOptions = globalOptions);

    globalOptions.target = options.targetFname;

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

    exportedFiles = []

    if (options.purgeDebug) {
        if (options.sourceMaps || options.getSourceMap) {
            console.warn('\x1B[33m' + 'removeLazy option uncompatible with sourceMap generation now. Therefore it`s passed' + '\x1B[0m');
            options.sourceMaps = null;
            options.getSourceMap = null;
        }
        content = cleaningDebugBlocks(content)
    }

    content = benchmarkFunc(importInsert, content, rootPath, options);

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
        content = options.advanced.ts(content)
    }

    console.log(`\n\x1b[34mIn total handled ${statHolder.importsAmount} imports\x1b[0m`);

    globalOptions.advanced?.debug && console.log(`\x1b[34m- ${statHolder.exports.cjs} cjs exports is found\x1b[0m`);

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

    const timeSure = "File \x1B[32m\"" + to + "\"\x1B[33m built in"
    console.time(timeSure)

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

    try {
        var legacyFiles = fs.readdirSync ? fs.readdirSync(path.dirname(buildOptions['targetFname'])) : null;
    }
    catch (er) {
        console.warn(`Target dir "${buildOptions['targetFname']}" does not exists. It'll be autocreated.`);
        fs.mkdirSync(path.dirname(buildOptions['targetFname']))
    }
    

    // let mapping = null;

    let content = combineContent(originContent, path.dirname(srcFileName), buildOptions
        // function onSourceMap() {
        //     // sourcemaps adds to content with targetName
        //     mapping = sourcemaps.map(s => s.debugInfo).reduce((p, n) => p.concat(n));
        //     mapping.push(null); // \n//# sourceMappingURL=${path.basename(to)}.map`
        //     return mapping;
        // }
    )

    // content = mapGenerate({
    //     target: targetFname,
    //     options,
    //     originContent,
    //     content,
    //     cachedMap: mapping
    // });

    if (legacyFiles) legacyFiles.forEach(file => (path.extname(file) == '.js') && fs.rmSync(path.join(path.dirname(targetFname), file)));

    benchmarkFunc(fs.writeFileSync, targetFname, content)    

    console.log('\x1B[33m');
    console.timeEnd(timeSure)
    console.log('\x1B[0m');

    // console.log(benchStore.toString())
    console.table(benchStore)

    return content
}


/**
 * path manager
 */
class PathMan {

    /**
     * used for static imports inside dynamic imports (TODO check it (on purp perf optimization): why not startsWith condition applied for this in getContext?)
     * @legacy
     * @type {string}
     */
    basePath

    /**
     * @type {Importer?}
     */
    importer

    /*
     * @description keep links (on symlinks) to modules
     * @TODO use instead of importer.linkedModulePaths
     */
    linkedModules = []

    /**
     * @param {string} dirname
     * @param { (fileName: PathOrFileDescriptor) => string} pullContent
     */
    constructor(dirname, pullContent) {
        /**
         * root directory of source  code (not project path. it's different)
         */
        this.dirPath = dirname;
        /**
         * 
         */
        this.getContent = pullContent || getContent;
    }
}


class Importer extends AbstractImporter {

    /**
     * @type {PathMan}
     */
    pathMan

    /**
     * 
     * @param {PathMan} pathMan 
     */
    constructor(pathMan) {
        super()

        // this.namedImportsApply = applyNamedImports;
        this.namedImportsApply = namedImportsApply;
        /*
        * module sealing ()
        */
        this.moduleStamp = moduleSealing;
        this.pathMan = pathMan;
        this.isFastShaking = typeof globalOptions.advanced?.treeShake === 'object' && globalOptions.advanced?.treeShake.method == 'surface';

        pathMan.importer = this;
    }


    /**
     * @description call moduleSealing and generate sourcemaps for it 
     * @returns {boolean}
     * @param {string} fileName
     * @param {string} fileStoreName,
     * @param {SealingOptions} args
     */
    attachModule(fileName, fileStoreName, { root, _needMap, extract }) {

        this.progressFilesStack.push(fileName);

        let moduleInfo = this.moduleStamp(fileName, { root: root || undefined, _needMap, extract });

        this.progressFilesStack.pop();

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
                name: fileStoreName.replace('$$', '@').replace(/(\$|__)/g, '/') + '.js',
                // mappings: linesMap.map(line => line ? encodeLine(line) : '').join(';'),

                //@ts-ignore (TODO fix type)
                debugInfo: linesMap
            });

            return true;
        }
        return false;
    }


    /**
     * 
     * @param {SealingOptions} options 
     * @param {(name: string) => boolean} inspectUnique 
     * @returns 
     */
    generateConverter(options, inspectUnique) {

        const { root, _needMap, extract } = options;

        // TODO fix `import pTimeout, { TimeoutError } from 'p-timeout'`

        return (match, __, $, $$, _defauName, /** @type {string} */ classNames, defauName, moduleName, isrelative, fileName, offset, source) => {

            // if (!options.isEsm) options.isEsm = true;

            if (_defauName) {
                defauName = _defauName.match(/[\w_\d\$]+/)[0];
            }
            statHolder.imports += 1;

            let rawNamedImports = classNames?.split(',');
    

            if (classNames && globalOptions.advanced?.treeShake && extract?.names) {

                //TODO insert before this the first algorithm to remove unused export const name = {} ... (cause of export may not used)

                /// tree shakes expressions generated from `export * from '...'` (just for named) 
                // - ((removes if import is unused for export and at source code -> remove all import at all))
                // - does not tree shake (does not remove) nothing at all if at least one of the imports is used inside code (usefull just for reexport how it have said)

                const namesRequired = new Set(extract.names);

                var _imports = rawNamedImports?.map(w => w.trim().split(' as '));
                const _exports = _imports.map(names => names.slice().pop());
                var requiredExports = _exports.filter(name => {
                    if (namesRequired.has(name)) return true
                    else {
                        // check on using:                        
                        // const _matched = source.replace(match, '').match(new RegExp(`\\b${name}\\b`), '');  // confuse: Uppy is found in filename import before
                        const _matched = source.slice(offset + match.length).match(new RegExp(`\\b${name}\\b`), '');                                                
                        if (_matched) {
                            // debugger
                            return true;
                        }
                        else {
                            rawNamedImports = rawNamedImports.filter(named => !named.trimEnd().endsWith(name))  // to content: ;
                            _imports = rawNamedImports?.map(w => w.trim().split(' as '))                        // to nested extract

                            return false;
                        }
                    }
                });
                
                if (!requiredExports.length && globalOptions.advanced?.treeShake) {
                    return `// ==> "${fileName}" has shaken`
                }
            }

            const fileStoreName = this.attachFile(fileName, isrelative, {
                extract: {
                    names: _imports?.map(names => names.slice()[0]) || rawNamedImports?.map(w => w.trim().split(' ')[0]),
                    default: defauName
                }, root, _needMap
            });

            /// replace imports to spreads into place:
            if (defauName && inspectUnique(defauName)) {
                return `const { default: ${defauName} } = $${fileStoreName.replace('@', '_')}Exports;`;
            }
            else if (defauName) {
                const error = new Error(`Variable '${defauName}' is duplicated by import './${fileName}.js'`);
                error.name = 'DublicateError';
                // throw error;
                // console.log('\x1b[31m%s\x1b[0m', `${error.name}: ${error.message}`, '\x1b[0m');
                console.log('\x1b[31m%s\x1b[0m', `Detected ${error.name} during build process: ${error.message}`, '\x1b[0m');
                console.log('Fix the errors and restart the build.');
                process.exit(1);
            }
            else if (moduleName) {
                return `const ${moduleName.split(' ').pop()} = $${fileStoreName.replace('@', '_')}Exports;`;
            }
            else {
                // TODO optimize:
                let entities = rawNamedImports.map(w => {
                    if (~w.indexOf(' as ')) {
                        const importStruct = w.trim().split(' ')
                        // var _impexp = (`${importStruct.pop()}: ${importStruct[0]}`)
                        var _impexp = (`${importStruct[0]}: ${importStruct.pop()}`)
                        return _impexp.trim()
                    }
                    return w;
                });
                for (let entity of entities) {
                    if (~entity.indexOf(':')) {
                        entity = entity.split(': ').pop();
                    }
                    inspectUnique(entity);
                }
                return `const { ${entities.join(', ')} } = $${fileStoreName.replace('@', '_')}Exports`;
            }

        };
    }

    /**
     * @param {string} fileName
     * @param {string} isrelative
     * @param {SealingOptions} params
     */
    attachFile(fileName, isrelative, { root, _needMap, extract} ) {
        
        const _filename = path.extname(fileName)
            ? fileName.slice(0, -path.extname(fileName).length)
            // : fileName.replace(/\.\.\//g, '')
            : fileName; // .replace(/\.\.\//g, './')

        // const _root = root && chainingCall(
        //     path.dirname,
        //     (fileName.match(/\.\.\//g)?.length || 0) + +(isrelative.length == 3),
        //     // root.split('/').filter(w => w !== '.').join('/').replace(/\/\.\//g, '/')
        //     root.replace(/\/\.\/?/g, '/')
        //     // root.replace(/\/\.\//g, '/')
        // )
        
        const fileStoreName = benchmarkFunc(genfileStoreName,
            // root, fileName
            isrelative
                ? nodeModules[fileName]
                    ? undefined
                    : root
                : undefined,
            (isrelative || '') + _filename
        );

        const self = this;

        // if (~fileName.indexOf('debounce')) {
        //     debugger            
        //     /**
        //     */
        // }
        /// check module on unique and inject it if does not exists:
        if (!modules[fileStoreName]) {

            // const _fileName = (root || '.') + '/' + fileName;

            moduleSeal(extract);
        }
        else if (fileStoreName in theShaker.shakedStore) {
            const treeShakedModule = theShaker.shakedStore[fileStoreName];
            // shaked which are in the current (new) extracts
            const missedRequiring = treeShakedModule.shaked.filter(w => ~extract?.names.indexOf(w))
            if (missedRequiring.length) {
                // delete modules[fileStoreName];
                moduleSeal({
                    default: extract.default,
                    names: missedRequiring.concat(treeShakedModule.extracted)
                });                
            }
        }
        // TODO? may be check (possible bug) and optimize this:
        else if (globalOptions.advanced.treeShake) {        // (this.isFastShaking) ? 
            // in the surface case equate with extract with _extracts
            const missed = extract?.names?.filter(ex => new Set(fastShaker[fileStoreName]).has(ex))
            if (missed?.length) {
                modules[fileStoreName] = modules[fileStoreName].replace(/exports = \{([\w\d_\$, :]+?)\}/, `exports = { ${missed},$1}`)
                // globalOptions.verbose && console.log(`\x1B[90m>> \x1B[36m"${_filename}" exports reshaked (${missed})\x1B[0m`)
            }
        }
        else {            
            // debugger       
        }
        return fileStoreName;

        function moduleSeal(_extractedNames) {
            
            if (isrelative) {
                const smSuccessAttached = self.attachModule((isrelative || '') + fileName, fileStoreName, { root, _needMap, extract: _extractedNames });
            }
            else {
                // node modules support
                if (self.pathMan.getContent == getContent) {

                    nodeModulesPath = nodeModulesPath || findProjectRoot(self.pathMan.dirPath, globalOptions); // or get from cwd
                    if (!fs.existsSync(nodeModulesPath)) {
                        debugger;
                        console.warn('node_modules doesn`t exists. Use $onModuleNotFound method to autoinstall');
                    }
                    else {

                        const packageName = path.normalize(fileName);
                        let relInsidePathname = self.getMainFile(packageName);

                        // relInsidePathname = self.extractLinkTarget(fileName, relInsidePathname);
                        // nodeModules[fileName] = path.join(packagePath, relInsidePathname);
                        nodeModules[fileName] = relInsidePathname;

                        self.attachModule(fileName, fileStoreName, {
                            // root,
                            // root: '',
                            root: fileName + '/' + path.dirname(relInsidePathname),
                            _needMap,
                            extract: _extractedNames
                        });
                    }
                }
            }
        }
    }

    /**
     * @description read main/export section from package.json
     * @param {string} packageName 
     * @returns 
     */
    getMainFile(packageName) {
        let packagePath = path.join(nodeModulesPath, packageName);
        const packageJson = path.join(packagePath, 'package.json');

        // direct import from node_modules (invisaged with-in moduleSealing-&-getContext logic) | import specified in `exports` section
        /**
         * @description - always specified to a file!
         * @type {string|undefined}
         */
        let relInsidePathname = '';
        // - but what is the base of the file for the next rel. import from its file?
        // -- direct import from the module: => get dirname of the file
        // -- from export: read exports or => get as base of the main file
        if (fs.existsSync(packageJson)) {
            relInsidePathname = findMainfile(packageJson);
        }
        else if (!path.extname(packageName)) {
            const packdirsBranch = packageName.split(/[\/\\]/);
            const rootConfigPath = path.join(nodeModulesPath, packdirsBranch[0], 'package.json')
            if (fs.existsSync(rootConfigPath)) {
                const rootConfig = fs.readFileSync(rootConfigPath).toString()
                const config = JSON.parse(rootConfig)
                if (config.exports) 
                {
                    const exportsConfig = config.exports['./' + packageName.split(/[\/\\]/).slice(1).join('/')];
                    const indexFile = exportsConfig.import || exportsConfig.default || exportsConfig.require || exportsConfig
                    return indexFile.replace('./' + packdirsBranch.slice(1).join('/'), '.')
                }
                else {
                    return ''
                }
            }
        }
        return relInsidePathname;
    }

    genChunkName(filename) {
        return '$_' + path.basename(filename) + '_' + version + '.js';
    }

    /**
     * @legacy {looking for onSymLink callback inside getContent}
     * @param {string} fileName
     * @param {string} relInsidePathname
     */
    extractLinkTarget(fileName, relInsidePathname) {
        const isSymbolLink = fs.lstatSync(path.join(nodeModulesPath, fileName)).isSymbolicLink();
        if (isSymbolLink) {
            const symbolLink = path.relative(nodeModulesPath, fs.readlinkSync(path.join(nodeModulesPath, fileName)));
            console.log(symbolLink);
            debugger;
            relInsidePathname = path.join(symbolLink, relInsidePathname);
        }
        return relInsidePathname;
    }

    joinAllContents(content, options) {
        const moduleContents = Object.values(modules).filter(Boolean);

        content = '\n\n//@modules:\n\n\n' + moduleContents.join('\n\n') + `\n\n\n//@${options.entryPoint}: \n` + content;
        return content;
    }

    // /**
    //  * @_param {{
    //     fileName: string;
    //     fileStoreName: string;
    //     attach_Module: (fileName: string, fileStoreName: string) => boolean;
    // }} args
    //  * @param {string} fileName
    //  * @param {string} fileStoreName
    //  * @param {(fileName: string, fileStoreName: string) => boolean} attach_Module
    //  */
    // attachFile(fileName, fileStoreName, attach_Module) {
    //     // this.currentFile = fileName;
    //     return attach_Module(fileName, fileStoreName);
    // }
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
function mapGenerate({ options, content, originContent, target, cachedMap }) {

    let pluginsPerformed = false;

    if (options.getSourceMap || options.sourceMaps) {
        /**
         * @type {string[]}
         */
        const moduleContents = Object.values(modules).filter(Boolean);

        // let mapping = sourcemaps.reduce((acc, s) => acc + ';' + s.mappings, '').slice(1) + ';'
        // let accumDebugInfo = sourcemaps.reduce((p, n) => p.debugInfo.concat(n.debugInfo));
        /**
         * @_type {Array<Array<VArray | null>}
         */

        let accumDebugInfo = cachedMap || sourcemaps.map(s => s.debugInfo).reduce((p, n) => p.concat(n));

        !cachedMap && accumDebugInfo.push(null); // \n//# sourceMappingURL=${path.basename(to)}.map`

        if (options.getSourceMap) {
            const modifiedMap = options.getSourceMap({
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

            if (options.sourceMaps.shift) rawMapping = Array(options.sourceMaps.shift).fill([]).concat(rawMapping)

            let mapping = options.sourceMaps.encode(rawMapping);

            const targetFile = (path && target) ? path.basename(target) : ''
            const mapObject = {
                version: 3,
                file: targetFile,
                sources: sourcemaps.map(s => s.name),
                // TODO fix sourcemaps for dynamic tests
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
                })

                outsideMapInfo.mappings = options.sourceMaps.encode(rawMapping = mergedMap);
                mapObject.sources = outsideMapInfo.sources;
                mapObject.sourcesContent = outsideMapInfo.sourcesContent;

            }

            if (options.plugins) (pluginsPerformed = true) && options.plugins.forEach(plugin => {
                if (plugin.bundle) {
                    content = plugin.bundle(content, { target, maps: mapObject, rawMap: rawMapping });
                }
            })

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
            content = plugin.bundle(content, { target });
        }
    })
    return content;
}

/**
 * @typedef {[number, number, number, number, number][][]} RawMapping
 * @typedef {{
 *    entryPoint: string;                                                               // only for sourcemaps and logging
 *    release?: boolean;                                                                // = false (=> remove comments|logs?|minify?? or not)
 *    verbose?: boolean;
 *    purgeDebug?: boolean,
 *    getContent?: (filename: string) => string
 *    onError?: (error: Error) => boolean
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
 *        requireExpr?: typeof requireOptions[keyof typeof requireOptions]
 *        incremental?: boolean,                                                                        // possible true if [release=false]
 *        treeShake?: boolean | {exclude?: Set<string>, method?: 'surface'|'allover', cjs?: false}    // Possible true if [release=true => default>true].
 *        ts?: Function;
 *        nodeModulesDirname?: string  
 *        dynamicImportsRoot?: string,
 *        dynamicImports?:{
 *          root?: string,
 *          foreignBuilder?: (path: string) => string
 *        }
 *        debug?: boolean
 *    },
 *    experimental?: {
 *        withConditions?: boolean
 *    }
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
 * @type {BuildOptions & {node_modules_Path?: string, target?: string}}
 */
let globalOptions = null;
/**
 * absolut path to node_modules
 * @type {string}
 */
let nodeModulesPath = null;

const nodeModules = {}


/**
 * TODO check
 * research function (not checked yet) to inject inside map to external map
 * @param {BuildOptions['sourceMaps']['injectTo']} rootMaps
 * @param {{version?: number;file?: string;sources?: string[];sourcesContent: any;names?: any[];mappings?: string;source?: any;}} mapObject
 * @param {BuildOptions['sourceMaps']['decode']} [decode]
 */
function injectMap(rootMaps, mapObject, decode) {

    // const rootMaps = options.sourceMaps.injectTo;

    mapObject.source = mapObject.source.concat(rootMaps.sources);
    mapObject.sourcesContent = mapObject.sourcesContent.concat(rootMaps.sourcesContent);

    let rootMapings = rootMaps.maps || (decode || globalOptions.sourceMaps.decode)(rootMaps.mappings);

    rootMapings = rootMapings.map(line => {

        if (line && line.length) {
            line.forEach((ch, i) => {
                line[i][1] += sourcemaps.length;
            });
            return line;
        }

        return [];
    });

    debugger;
    return rootMapings;
}


/**
 * 
 * @param {string} content - content (source code)
 * @param {string} dirpath - source directory name
 * @param {BuildOptions} options - options
 */
function importInsert(content, dirpath, options) {

    let pathman = new PathMan(dirpath, options.getContent || getContent);
    const needMap = !!(options.sourceMaps || options.getSourceMap)

    if (logLinesOption) {
        content = content.replace(/console.log\(/g, function () {
            let line = arguments[2].slice(0, arguments[1]).split('\n').length.toString()
            return 'console.log("' + options.entryPoint + ':' + line + ':", '
        })
    }

    const charByChar = options.sourceMaps && options.sourceMaps.charByChar

    // let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
    // content = new Importer(pathman).namedImportsApply(content, undefined, (options.getSourceMap && !options.sourceMaps) ? 1 : needMap);
    content = (importer = new Importer(pathman)).namedImportsApply(
        content, {root: undefined, _needMap: (options.sourceMaps && options.sourceMaps.charByChar) ? 1 : needMap, extract: null}
    );

    // const modulesContent = moduleContents.join('\n\n');

    // if (globalOptions.advanced?.treeShaking) {

    //     /// FORCE TREE SHAKING
    //     const mergedContent = importer.joinAllContents(content, options);

    //     forceTreeShake(globalOptions, mergedContent, modules);
    // }

    content = importer.joinAllContents(content, options);

    const emptyLineInfo = null

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
        })

        const linesMap = content.split('\n').slice(rootOffset).map((line, i) => {
            // /** @type {[number, number, number, number, number?]} */
            // let r = [0, sourcemaps.length, i, 0];

            /** @type {Array<[number, number, number, number, number?]>} */
            let r = charByChar
                ? [[0, sourcemaps.length, i, 0]]
                : [].map.call(line, (/** @type {any} */ ch, /** @type {any} */ j) => [j, sourcemaps.length, i, j]);
            return r;
        })

        // if (!sourcemaps.some(file => file.name === options.entryPoint))         
        sourcemaps.push({
            name: options.entryPoint,
            // mappings: linesMap.map(line => encodeLine(line)).join(';'),
            // mappings: linesMap.map(line => line.map(charDebugInfo => encodeLine(charDebugInfo)).join(',')).join(';'),
            // mappings: ';;;' + linesMap.map(line => encodeLine(line)).join(';'),
            debugInfo: [emptyLineInfo, emptyLineInfo, emptyLineInfo].concat(linesMap)
        })
    }


    ///* not recommended, but easy for realization:
    // const regex = /^import \"\.\/(?<filename>\w+)\"/gm;    
    // content = content.replace(regex, allocPack.bind(pathman)); //*/

    // regex = /^import {([\w, ]+)} from \".\/(\w+)\"/gm
    // content = content.replace(moduleSealing.bind(pathman)); //*/

    if (options && options.release) {

        content = releaseProcess(options, content);                                            // remove multiline comments
        // content = content.replace(/\n[\n]+/g, () => '\n')                                                 // remove unnecessary \n
    }

    return content
}

/**
 * @type {Record<string, string>}
 */
const modules = {};

// const modules = new Proxy({}, {
//     // deleteProperty(target, prop) { // перехватываем удаление свойства
//     //     //@ts-ignore
//     //     if (~prop.indexOf('debounce')) {
//     //         debugger
//     //     } else {
//     //         delete target[prop];
//     //         return true;
//     //     }
//     // }
//     set(target, prop, value) {
//         // debugger
//         target[prop] = value;
//         return true;
//     }
// });


/**
 * @type {Array<{
 *      name: string,
 *      mappings?: never,
 *      debugInfo?: import("sourcemap-codec").SourceMapMappings      
 * }>}
 * //   Array<Array<VArray>>   // Array<VArray | Array<VArray>>   // Array<VArray> | Array<Array<VArray>>
 */
const sourcemaps = []




/**
 * replace imports to object spreads and separate modules
 * @param {string} content
 * @param {SealingOptions} importOptions
 * @this {Importer} *
 * @example :

Supports following forms:

```
import defaultExport from "module_name";
import * as name from "./module-name"
import { named } from "./module_name"
import { named as alias } from "./module_name"
import { named1, named2 } from "./module_name"
import { named1, named2 as a } from "./module_name"
import "./module_name"
```

Unsupported yet:
```
import defaultExport, * as name from "./module-name";
import defaultExport, { tt } from "./module-name";          /// <= TODO this one
```
 */
function namedImportsApply(content, importOptions) {

    const { root, _needMap } = importOptions;

    // importOptions.isEsm = false;

    // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?".\/([\w\-\/]+)"/gm;
    // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\".\/([\w\-\/]+)\"/gm;
    // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\"(.\/)?([@\w\-\/]+)\"/gm;        // @ + (./)
    // const regex = /^import (((\{([\w, \$]+)\})|([\w, ]+)|(\* as [\w\$]+)) from )?["'](.?.\/)?([@\w\-\/\.]+)["']/gm;       // '" 
    // const regex = /^import (((\{([\w,\s\$]+)\})|([\w, ]+)|(\* as [\w\$]+)) from )?["'](.?.\/)?([@\w\-\/\.]+)["'];?/gm;       // '"    
    const regex = /^import ((((?<_D>\w+, )?\{([\w,\s\$]+)\})|([\w, ]+)|(\* as [\w\$]+)) from )?["'](.?.\/)?([@\w\-\/\.]+)["'];?/gm;       // '"
    // in the regex possible bug is if the `default` will be placed after named imports (`import {a, b}, d from "a"`)(to fix)

    const imports = new Set();

    const importApplier = this.generateConverter(importOptions, inspectUnique);

    const _content = content.replace(regex, importApplier);

    /// dynamic imports apply     
    let _content$ = _content.replace(/(?<!\/\/[^\n]*)import\(['"`](\.?\.\/)?([\-\w\d\.\$\/@\}\{]+)['"`]\)/g, (/** @this {Importer} */ function (_match, isrelative, filename, src) {
        
        if (globalOptions.advanced.dynamicImports?.foreignBuilder) {
            
            const fullName = isrelative
                ? path.join(root, filename)
                : path.join(nodeModulesPath = nodeModulesPath || findProjectRoot(this.pathMan.dirPath, globalOptions) + '/', filename)
            
            return globalOptions.advanced.dynamicImports?.foreignBuilder(fullName);
        }

        // dyncmic variables is appying
        const match = filename.match(/^([\s\S]+\/)?([\w\d_\-\$]+)?\$\{([\w\d_\$]+)\}([\w\d_\-\$\.]+)?(\/[\s\S]+)?$/);
        if (match) {
            const restIndex = match.input.length - match.index - match[0].length;
            if (((match[2] || match[4])?.length > 1) || isrelative) {
                
                // TODO detect current dir if it's relative (root?)
                const files = fs.readdirSync(isrelative ? root : (nodeModulesPath = findProjectRoot(this.pathMan.dirPath, globalOptions) + '/') + match[1] || '')
                    .filter(file => file.startsWith(match[2] || '') && file.startsWith(match[4] || ''))

                if (files.length) {
                    if (files.length > 10) {
                        console.warn(`Too many files have found for dynamic import matching "${filename}" (inside "${this.currentFile}")`);
                    }
                    // files.map(file => match.input.slice(0, match.input.index) + file + match.input.slice(-restIndex))
                    // files.map(file => match.input.replace(/\$\{([\w\d_\$]+)\}/, match[3]))
                    files.map(file => (match[1] || '') + file + (match[4] || ''))
                        .forEach(file => {
                            applyDynamicImport.call(importer, isrelative, file)
                        })
                    
                    
                    const chunkPath = './' + (globalOptions.advanced?.dynamicImportsRoot ?? path.basename(path.dirname(globalOptions.target)) + '/')
                    return `fetch(\`${chunkPath + this.genChunkName(filename)}\`)` + '.then(r => r.text()).then(content => new Function(content)())';
                }
                else {
                    console.warn(`No files matching the pattern "${filename}" could be found for dynamic import during process of "${this.currentFile}"`);
                }
                
            }
            else if (isrelative) {
                // do the same w/o node_modules
            }
        }
        else {
            return applyDynamicImport.call(importer, isrelative, filename);
        }
    }).bind(this))

    if (globalOptions?.advanced?.requireExpr === requireOptions.sameAsImport) {
        // console.log('require import');
        // statHolder.exports.cjs++;
        
        /// works just for named spread
        const __content = (_content$ || _content).replace(
            // /(const|var|let) \{?[ ]*(?<varnames>[\w, :]+)[ ]*\}? = require\(['"](?<filename>[\w\/\.\-]+)['"]\)/g,            // TODO make `const|var|let` optional
            /(const|var|let) ((?<varnames>\{?[\w, ]+\}?) = require\(['"](?<filename>[\w\.\/]+)['"]\)[,\n\s]*)+(?=;|\n)/g,       // TODO make `const|var|let` optional
            (_, key, lastRequire, varnames, filename, $, $$) => {

                statHolder.requires += 1;

                _ = _.replace(/(?:(const|var|let) )?(?<varnames>\{?[\w, ]+\}?) = require\(['"](?<filename>[\w\.-\/]+)['"]\)/g, (__, key, varnames, filename) => {


                    // const fileStoreName = genfileStoreName(root, filename = filename.replace(/^\.\//m, ''));
                    const fileStoreName = benchmarkFunc(genfileStoreName, root, filename);

                    if (!modules[fileStoreName]) {
                        const smSuccessAttached = this.attachModule(filename, fileStoreName, importOptions);
                        // if (!smSuccessAttached) {
                        //     // doNothing | raise Error | [default].getContent
                        //     debugger
                        //     this.attachModule(filename, fileStoreName, { root, _needMap })
                        //     return _
                        // }
                        if (modules[fileStoreName]) {
                            // debugger
                            return `${key || ''} ${varnames} = $${fileStoreName}Exports`;
                        }

                    }

                    const exprStart = __.split('=')[0];
                    return exprStart + `= $${fileStoreName.replace('@', '_')}Exports`
                })

                return _;

            }
        );

        return __content;
    }    

    return _content$ || _content;


    /**
     * @this {Importer}
     * @param {string} isrelative 
     * @param {string} filename
     * @returns 
     */
    function applyDynamicImport(isrelative, filename) {
        const fileName = `${isrelative || ''}${filename}`;

        statHolder.dynamicImports += 1;

        /// (dynamic imports for web version skip this step)
        if (fs.writeFileSync) {
            // const exactFileName = path.join(this.pathMan.dirPath, fileName) + (!path.extname(fileName)
            const exactFileName = fileName + ((!path.extname(fileName) && isrelative)
                ? (globalOptions.advanced.ts ? '.ts' : '.js')
                : '');

            // const fileContent = fs.readFileSync(exactFileName).toString();
            // var chunkName = './$_' + filename + '_' + version + '.js';
            var chunkName = this.genChunkName(filename);
            const rootPath = path.dirname(globalOptions.target);
            // const _fileContent = fileContent.replace(regex, importApplier);
            
            /// @ALTWAY here may be settled shareing common modules among modules (
            //  - remove map, 
            //  - create in global`$shareing_modules = {}` 
            //  - change on each const $... = to $shareing_modules[$...] =  in dynamic modules            
            // but it can break on versions unmatching(like npm bug)): => may be allow it just for non-relative imports (because of existing pattern matching)
            // (or may be attach it versions to names - but it ll be required a bit more work to recoding) => TODO move it to ISSUES

            const baseModuleKeys = new Set(Object.keys(modules).filter(k => modules[k]));            
            // this.pathMan.basePath = '.'
            this.dynamicModulesExported = [];
            /**
             * @type {{fileStoreName: string}} */
            const sealInfo = this.moduleStamp(exactFileName, { root, _needMap: false || _needMap, extract: undefined});

            // this.pathMan.basePath = undefined;
            const _fileStoreName = sealInfo?.fileStoreName || benchmarkFunc(genfileStoreName, root, fileName);
            const _fileContent = modules[_fileStoreName];
            const dynamicModules = Object.keys(modules).filter(mk => !baseModuleKeys.has(mk));

            let chunkDependencies = '';
            for (const key of dynamicModules) {
                if (key != _fileStoreName) {
                    chunkDependencies += modules[key] + '\n';
                    modules[key] = undefined;
                }
            }

            if (!baseModuleKeys.has(_fileStoreName)) {
                modules[_fileStoreName] = undefined; // => change to importer.dynamicModulesExported
            }
            else {
                console.warn(`It seems you import "${fileName}" dynamiccally, which one has imported before`);
            }

            this.dynamicModulesExported = null;

            // _fileContent.slice(_fileContent.indexOf('('))
            // const chunkContent = _fileContent.split('\n').map(line => line.replace(/^\s/g, '')).slice(1, -1).join('\n');
            let chunkContent = chunkDependencies + '\n{\n' + _fileContent.split('\n').slice(1, -1).join('\n') + '\n}';

            // TODO sourcemaps for the chunk (I guess, it is should work)
            // TODO globalOptions.plugins applying and ts support     
            if (globalOptions.release) {
                chunkContent = releaseProcess(globalOptions, chunkContent);
            }
            fs.writeFileSync(path.join(rootPath, chunkName), chunkContent);
            chunkName = './' + (globalOptions.advanced?.dynamicImportsRoot || '') + chunkName;  // path.basename(path.dirname(globalOptions.targetFname)) + '/'

        }
        // path.join(path.dirname(nodeModulesPath), 'package.json') => version update        
        return `fetch("${chunkName || fileName}")` + `.then(r => r.text()).then(content => new Function(content)(${''}))`;
    }

    /**
     * @param {string} fileName
     * @param {string} fileStoreName
     * @this {Importer}
     */


    /**
     * @param {string} entity
     * @returns {boolean}
     */
    function inspectUnique(entity) {

        if (imports.has(entity)) {
            globalOptions.advanced?.debug && console.warn(`Duplicating the imported name: "${entity}"`)
            return false
        }
        else {
            imports.add(entity);
            return true;
        }
    }
}




/**
 * 
 * (importInsert) => applyNamedImports => import().replace => moduleSealing(moduleStamp) => applyNamedImports => ...
 *                               ||
 *                               \/
 *              (generateConverter()|require.replace) => attachModule => moduleSealing(moduleStamp)
 *                                                                                ||
 *                                                                                \/
 *                                                                         applyNamedImports => ...
 * 
 * 
 * seal module: read file, replace all exports and apply all imports inside and wrap it to iife with fileStoreName
 * @param {string} fileName
 * @param {SealingOptions} param
 * @this {Importer} 
 * @returns {{
 *      fileStoreName: string, 
 *      updatedRootOffset?: number,
 *      lines: Array<[number, boolean]>
 * }} only if __needMap !== falsy
 * 
 *      start_WrapLinesOffset: number,                                                // by default = 1
 *      end_WrapLinesOffset: number,
 * 
 */
function moduleSealing(fileName, { root, _needMap: __needMap, extract}) {

    /// extract path:

    // const _root = nodeModules[root] ? path.join(nodeModulesPath, root, path.dirname(nodeModules[root])) : root;

    let fileNameUpdated = null;
    let importer = this;


    let content = this.pathMan.getContent(
        // (!nodeModules[fileName] && root) ? path.join(root, fileName) : fileName,
        (fileName.startsWith('.') && root)
            ? ((root.startsWith('.') ? './' : '') + path.join(root, fileName))
            : fileName,
        // (!nodeModules[fileName] && nodeModules[root])
        (fileName.startsWith('.') && nodeModules[root])
            ? path.join(nodeModulesPath, root, path.dirname(nodeModules[root]), fileName)
            : undefined,
        (_f) => {
            fileNameUpdated = fileName = _f;
        },
        {
            linkPath: this.linkedModulePaths.slice(-1)[0],
            onSymLink(_path) {
                const linkedModulesPath = conditionalChain(path.dirname, p => path.basename(p) == 'node_modules', _path)
                // const linkedRelPath = path.relative(nodeModulesPath, conditionalChain(path.dirname, p => path.basename(p) == 'node_modules', _path));                
                importer.linkedModulePaths.push(linkedModulesPath);
            }
        }
    );    

    const storeRoot = nodeModules[fileName]
        ? undefined
        : root
        // chainingCall(
        //     path.dirname,
        //     // (fileName.match(/\.\.\//g)?.length - 1) || 0, root?.replace(/\/\.\//g, '/'),
        //     (fileName.match(/\.\.\//g)?.length) || 0, root?.replace(/\/\.\//g, '/')
        // );

    if (fileName.startsWith('.') && nodeModules[fileName]) { 
        debugger // TODO check !
    }
    
    const fileStoreName = benchmarkFunc(genfileStoreName,
        // nodeModules[fileName] ? undefined : root, fileName.replace('./', '')
        fileName.startsWith('.') ? storeRoot : undefined,
        fileNameUpdated
            ? path.dirname(fileName)
            // : fileName.replace(/\.\.\//g, '')
            : path.extname(fileName)
                ? fileName.slice(0, -path.extname(fileName).length)
                // ? fileName.replace(/\.\.\//g, '')
                : fileName  // .replace(/\.\.\//g, '')
    );

    if (content === undefined) {
        const error = new Error(`File "${(root ? (root + '/') : '') + fileName}.js" doesn't found`);
        error.name = 'FileNotFound';
        if (__needMap && (!globalOptions.onError || !globalOptions.onError(error))) {
            // TODO map attach to onError callback
            throw error
        }
        return null
    }
    else if (content == '') {
        if (theShaker.shakedStore[fileStoreName]) {

            if (this.dynamicModulesExported){
                // run by dynamic import from scratch
                if (extract) {                    
                    content = theShaker.shakedStore[fileStoreName].content                    
                }                
                else {
                    // most likely is root import (is not treeshakeble)
                    // return null  
                    content = theShaker.shakedStore[fileStoreName].content;                    
                }
            }            
            else {
                // most likely re-run by moduleSeal(...)
                content = theShaker.shakedStore[fileStoreName].content
            }

        }
        else {
            return null;
        }        
    }

    let reExports;
    ({ reExports, content } = benchmarkFunc(reExportsApply,content, extract, root, __needMap));


    // TODO tree-shake here
    /**
     * @type {string} - list of all exports through comma
     * @example `export default __default` => `"default: __default"`
     * @example `export default class Dashboard extends UIPlugin` => `default:  Dashboard`
     * @example `export { default as UIPlugin }` => `UIPlugin` (expressions like this is generated just on re-export progress)
     * @example "default: Uppy, UIPlugin, default: __default, default:  Dashboard"`
     */
    let _exports; ({ _exports, content } = benchmarkFunc(exportsApply, content, reExports, extract, { fileStoreName, getOriginContent: () => content}));

    const shakeOption = globalOptions.advanced?.treeShake;

    if (!_exports && shakeOption) {

        if (typeof shakeOption == 'object' && shakeOption.exclude?.has(fileStoreName)) {
            if (!_exports) {
                console.warn(`for '${fileStoreName.split('$').pop()}' module the exports were replaced to globalThis cause of is empty`)
                _exports = 'window';
            }
        }
        else {
            if (extract?.names?.length) {
                globalOptions.advanced?.debug && console.warn(`Something went wrong for ${fileStoreName}: extracting extports (${extract.names}) does not found`)
            }
            // if exports doesn't match with extract?.names
            modules[fileStoreName] = '';
            return null;
        }
    }
    else
    {
        
        // if (nodeModules[fileName]) execDir = fileName;
        // let execDir = nodeModules[fileName] ? fileName : path.dirname(fileName)                 // : fileName.split('/').slice(0, -1).join('/');        
        let execDir = fileName.startsWith('.')
            ? path.dirname(fileName)                     // relative
            : nodeModules[fileName]                      // node_module
                ? (root || fileName)
                : path.dirname(Object.keys(nodeModules).find(p => p.startsWith(fileName)) || fileName)        


        if (logLinesOption) {
            content = content.replace(/console.log\(/g, function () {
                let line = arguments[2].slice(0, arguments[1]).split('\n').length.toString()
                return 'console.log("' + fileName + '.js:' + line + ':", '
            })
        }

        execDir = (execDir === '.' ? '' : execDir);
        const _root = ((root && nodeModules[fileName] === undefined && !fileNameUpdated) ? ((root) + (execDir ? '/' : '')) : '') + execDir;  // execDir

        if (extract?.names && ~_exports.indexOf(':')) {
            const rrr = _exports.split(', ').map(w => w.split(':').map(w => w.trim()))
            extract.names = extract.names.map(w => (rrr.find(ex => ex[0] == w) || [])[1] || w)
        }

        content = this.namedImportsApply(content, {root: _root, _needMap: __needMap, extract});

        // if (importer.currentModulePath) {
        //     importer.currentModulePath = '';
        // }
        
        if (this.linkedModulePaths.length) {
            importer.linkedModulePaths.pop();
        }
    }        

    if (_exports.startsWith(' ,')) _exports = _exports.slice(2)
    _exports = `exports = { ${_exports} };` + '\n'.repeat(startWrapLinesOffset)

    // content = '\t' + content.replace(/^export (default (_default;;)?)?/gm, '').trimEnd() + '\n\n' + _exports + '\n' + 'return exports';

    content = '\t' + content + '\n\n' + _exports + '\n' + 'return exports';
    modules[fileStoreName] = `const $${fileStoreName.replace('@', '_')}Exports = (function (exports) {\n ${content.split('\n').join('\n\t')} \n})({})`
    // modules[fileStoreName] = `const $${fileStoreName.replace('@', '_')}Exports = (exports => {\n ${content.split('\n').join('\n\t')} \n})({})`

    /// TO DO for future feature `incremental build` :
    if (incrementalOption) {
        // the generated module name can be used as the same role: const $${fileStoreName}Exports?

        modules[fileStoreName] = `\n/*start of ${fileName}*/\n${modules[fileStoreName]}\n/*end*/\n\n`
    }


    if (!__needMap) {
        return null; // content
    }
    else {
        // TO DO only inline sourcemap:

        let lines = modules[fileStoreName].split('\n')
        rootOffset += lines.length

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
 * @param {string} content
 * @param {{ names?: string[]; default?: string; }} extract
 * @param {string} root
 * @param {1 | boolean} __needMap
 */
function reExportsApply(content, extract, root, __needMap) {

        // TODO move it to diff file
        // TODO export {default} from './{module}' => import {default as __default} from './module'; export default __default;

        // default exports like `export {defult} from "a"` preparing

    content = content.replace(/^export {[\n\r ]*([\w\d\.\-_\$, \n\/"\r]+)[\n\r ]*} from ['"]([\./\w\d@\$-]+)['"];?/gm, function _replace(match, _exps, _from, $index) {
        // 'import {default as __default} from "$2";\nexport default __default;'
        // extract.names
        /// TODO start thuth TREE SHAKING from here (replace all unused exports!)
        // TODO sourcemaps reapply
        if (_exps == 'default ') {
            return `import {default as __default} from "${_from}";\nexport default __default;`;
        }
        // if (_exps.match(/\bdefault\b/)) {
        //     if (_exps == 'default ') {
        //         return `import {default as __default} from "${_from}";\nexport default __default;`;
        //     }
        // }
        else {
            // const exports$ = _exports.replace(/(?<=(?: as )|(?:{|, ))([\w\$\d]+)/g, '_$1');
            // const exports$ = _exports.split(',').map(w => w.trim()).map(_w => _w.replace(/\b([\w\$\d]+)$/, '_$1'))
            /** @type {Array<string>} */
            const _imports = _exps.split(',')
                .map(m => m.split('\n').pop()) // remove inline comments
                .filter(Boolean) // remove empty lines among  lines
                .map(w => w.trim()) // trim to beautify
                .filter(m => !m.startsWith('//')) // remove inline comments containing comma (not commas! TODO fix it)                 

            const _exports = _imports
                .map((_w, i) => {
                    if (~_w.indexOf(' as ')) {

                        const _imex = _w.split(' ')
                        if (_imex[2] === 'default') {
                            _imex[2] = '$d_' + $index;
                            _imex[0] = 'default';
                            _imports[i] = _imports[i].replace('default', '$d_' + $index)
                            return _imex.reverse().join(' ')
                        }
                        else {
                            return _imex[2]
                        }
                    }
                    else if(_w == 'default') {
                        _imports[i] = 'default as __default'
                        return '__default as default'
                    }
                    return _w
                })    // TODO optimize                        
            
            /// $1
            // const exports$ = _exports.map(_w => _w.replace(/\b([\w\$\d]+)$/, '_$1'))
            // const adjective = _exports
            //     .map((el, i) => el.split(' as ').pop().trim())
            //     .map(el => el == '_default' ? `export default ${el};` : `export const ${el} = _${el}`)  /// => maybe replace to `export { ${_exports} }`
            //     .join('\n');
            // const reExport = `import { ${exports$} } from '${_from}';\n${adjective}`;
            /// $2 is more compact and also worked:
            // const reExport = `import { ${_exports} } from '${_from}';\nexport { ${_exports.join(', ').replace(/as _\$default/, 'as default')} }`;
            const reExport = `import { ${_imports.join(', ')} } from '${_from}';\nexport { ${_exports.join(', ')
                    // .map(_w => ~_w.indexOf(' as default') ? _w.replace('as default', 'as _$default') : _w)
                    // .join(', ').replace(/as _\$default/, 'as default')
                } }`;
            return reExport;
        }
    });

    var reExports = [];
    content = content.replace(/export \* from ["'](.?.\/)?([@\w\-\/\.]+)["'];?/g, (_match, isrelative, filename, __offset, _src) => {

        /// TODO continue thuth TREE SHAKING from here (replace all unused exports!)
        const fileStoreName = importer.attachFile(filename, isrelative, { root, _needMap: __needMap, extract });
        
        // if (typeof modules[fileStoreName] !== 'string') {
        //     debugger
        // }
        const exportsMatch = modules[fileStoreName].match(/exports = \{([\w, :\d_\$]+)\}/);
        if (exportsMatch) {
            let _reexports = exportsMatch[1].split(',').map(ex => ex.split(': ')[0].trim());
            reExports = reExports.concat(_reexports);
            return `const { ${_reexports.join(', ')} } = $${fileStoreName}Exports`;
        }
        else if (globalOptions.verbose){
            if (globalOptions.advanced?.treeShake) {
                console.log(`\x1B[32m>> Shaked re-export for "${isrelative || ''}${filename}"\x1B[0m`);
                return '';
            }
            else {
                console.warn(`\x1B[31mUnexpected re-export for "${isrelative || ''}${filename}"\x1B[0m`);
            }
        }

        return _match;
    });
    return { reExports, content };
}

/**
 * @description remove exports from content and generate `_exports` string based on it
 * @param {string} content
 * @param {string[]} reExports
 * @param {SealingOptions['extract']} extract
 * @returns {{_exports: string, content: string}} - list of all exports through comma and replaced content
 */
function exportsApply(content, reExports, extract, { fileStoreName, getOriginContent }) {

    // TODO optimize: 
    /**
     * - merge export default replace
     * - cjs search just after overall esm
     */

    // matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) = [^\n]+/gm))
    // matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))
    // matches3 = Array.from(content.matchAll(/^export (class) (\w+)([\s]*{[\w\W]*?\n})/gm))
    // var matches = matches1.concat(matches2, matches3);


    // let matches = Array.from(content.matchAll(/^export (class|function|let|const|var) ([\w_\n]+)?[\s]*=?[\s]*/gm));
    let matches = Array.from(content.matchAll(/^export (class|(?:(?:async )?function)|let|const|var) ([\w_\n]+)?[\s]*=?[\s]*/gm));
    let _exports = (reExports || []).concat(matches.map(u => u[2])).join(', ');

    // TODO #1 join default replaces to performance purpose: UP: check it, may be one of them is unused;  (90ms => 87ms for codemirror)
    /// export default {...}
    content = content.replace(
        // /^export default[ ]+(\{[\s\S]*?\}(?:\n|;))/m
        // /^export default[ ]+(\{[\s\S]*?\})[;\n]/m, 'var _default = $1;\n\nexport default _default;'           // an incident with strings containing }, nested objs {}, etc...        
        // /^export default[ ]+(\{[\s\S]*?\})/m, 'var _default = $1;export default _default;'                    // ; - met me inside strings
        // /^export default[ ]+(\{[ \w\d,\(\):;'"\n\[\]]*?\})/m, function (m, $1, $2) {                         
        /^export default[ ]+((\{[ \w\d,\(\):;'"\n\[\]]*?\})|(\{[\s\S]*\n\}))/m, function (m, $1, $2) {          // fixed export default { ...: {}}
            return `var _default = ${$1 || $2};\nexport default _default;`;
            // 'var _default = $1;\nexport default _default;'
        }
    );

    const extractinNames = extract?.names && new Set(extract?.names);
    let isbuilt = false;


    /// export { ... as forModal }
    // TODO and check sourcemaps for this

    // _exports += Array.from(content.matchAll(/^export \{([\s\S]*?)\}/mg))
    // var r1 = Array.from(content.matchAll(/((?:^export )|;export)\{([\s\S]*?)\}/mg));
    // if (!r1.length && Array.from(content.matchAll(/^export \{([\s\S]*?)\}/mg)).length) {
    //     debugger
    // }
    // adding |\} seems conseal possible bug (inside template strings etc, but not haven't met yet)
    _exports += Array.from(content.matchAll(/(?:(?:^export )|(?:;|\})export)\{([\s\S]*?)\}/mg))   // support ;export{}
        .map((_exp, _i, arr) => {
            const expEntities = _exp[1].trim().split(/,\s*(?:\/\/[^\n]+)?/)
            let expNames = expEntities.join(', ');
            if (~expNames.indexOf(' as ')) {
                // expNames = expNames.replace(/([\w]+) as ([\w]+)/, '$2');  // default as A => $2; A as default => '$2: $1'
                expNames = expNames.replace(/([\w\$]+) as ([\w]+)/g, (m, g1, g2) => {
                    
                    /// `export {default as Uppy}` => `export {Uppy}` cause of import `import {default as Uppy}` 'll be converted to `const {default: Uppy}`
                    /// <= THE CASE IS SUITE TO RE-EXPORTS CASES
                    /// `export {Uppy as default}` => export {default: Uppy}, cause of cann't be variable `default`: imports `import {Uppy as default} will be 
                    // `const {Uppy}` or `const {default: _?_default}` - i forgot

                    if (g1 == 'default') {                  // default as A => A
                        return g2
                    }
                    else if (g2 == 'default') {              // A as default => default: A
                        return `${g2}: ${g1}`
                    }
                    else {                          
                        return `${g2}: ${g1}`
                    }

                    return g1 == 'default' ? g2 : `${g2}: ${g1}`;
                    // return g2 == 'default' ? `${g2}: ${g1}` : g2

                    // return `${g2}: ${g1}`
                });  // default as A => $2; A as default => '$2: $1'
            }
            if (_exp[0][0] === ';' || _exp[0][0] === '}') {
                ///FIX?ME possible bugs (cause of we assume that using fileStoreName (it should be package!) exists in modules) - 
                // done specially for minified preact/hooks import
                content = content.replace(/import\{([\w ]+)\}from['"](\w+)['"]/, (_m, $1, $2) => `const{${$1.replace(' as ', ':')}}=$${$2}Exports`)
                isbuilt = true
                return expNames;
            }
            if (!globalOptions.advanced?.treeShake || !extractinNames) return expNames;
            /// if tree shaking (usefull when reexport is calling direct from entrypoint 
            /// - (usualyy the similar work is in progress inside applyNamedImports, but there is this exception: 
            /// --- first time calling applyNamedImports(while `extract` still is null on))
            /// - just return '' => it means the module will not be handled via applyNamedImports and will be throw away from the build process
            const extractExists = expNames.split(', ').filter(ex => {
                // TREEEEEEEE-s
                const isrequired = extractinNames.has(ex.split(':')[0])
                if (!isrequired) {
                    (fastShaker[fileStoreName] || (fastShaker[fileStoreName] = [])).push(ex);
                }
                return isrequired;
                // return extractinNames.has(ex.split(':').pop().trim())
            }) // expEntities
            /**@if_dev */
            if (extractExists.length) {
                // TODO charge it to shakeBranch (to add exports on next imports if cutted)
                return (_exports && ', ') + extractExists.join(', '); // works fine if just one imported. But what if more then one? 
                // return (_exports && ', ') + expNames;  
            }
            else {
                globalOptions.advanced.debug && console.warn(`! Exports does not found for ${fileStoreName}`);
                return '';
            }
            /**@else */
            return extractExists.join(', ');
            /**@end_if */

        })
        .filter(Boolean)
        .join(', ').replace(/[\n\s]+/g, ' ');

    
        /// replace `export {a as A}` => `{a}` ??? - THE OP IS UNDER QUESTION; TODO remove and check - (detected on @uppy) - actually using for REEXPORT post-turning
    // content = content.replace(/^export \{[\s\S]*?([\w]+) as ([\w]+)[\s\S]*?\}/mg, (r) => r.replace(/([\w]+) as ([\w]+)/, '$2')); // 'var $2 = $1'


    /// export default (class|function )? A...
    // let defauMatch = content.match(/^export default \b([\w_\$]+)\b( [\w_\$]+)?/m);               // \b on $__a is failed cause of $ sign in start
    // let defauMatch = content.match(/^export default ([\w_\$\.]+)\b( [\w_\$]+)?/m);                                           // added export default Array.from support;    
    // let defauMatch = content.match(/^export default (\(?[\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)                              // added export default (() => {}) support
    // const defauMatch = content.match(/^export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)                   // added export default [..] support    
    // const defauMatch = content.match(/(?:^export)|((?<=;)export) default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)

    // TODO #2 check for default in extract
    const defauMatch = content.match(isbuilt                                                                                     // added ;exports support
        ? /(?<=;)export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m 
        // : /^export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m
        : /^export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?((?:\*)? \w+)?/m                                     // async function* gen +
    )
    
    if (defauMatch) {
        // export default (function|class name)|name|[...]|(() => ...)   // -|{...}

        if (globalOptions.advanced?.treeShake && !extract.default && !~extract.names.indexOf('default')) {
            // do nothing if default does not exists in extracting exports  
            // debugger
        }
        else if (defauMatch[1] == 'async' && defauMatch[3]) {
            _exports += (_exports && ', ') + 'default: ' + defauMatch[3].replace(/^\* /, '');
        }
        else if (~['function', 'class'].indexOf(defauMatch[1])) {       // what if ' function'
            // export default (function|class name)
            if (!defauMatch[2]) {
                /// there is not name
                /// export default (class|function) () {}
                content = content.replace(/^export default \b([\w_]+)\b/m, 'export default $1 $default');
            }
            /// export default (class|function) entityName
            _exports += `${_exports && ', '}default: ` + (defauMatch[2] || '$default');
        }
        else {            
            if (defauMatch[1][0] == '(' || defauMatch[1][0] == '[') {
                /// export default [...]|(() => ...)
                content = content.replace(/^export default /m, 'const _default = ');
                defauMatch[1] = '_default';
            }
            else {
                /// export default entityName
            }
            
            _exports += (_exports && ', ') + 'default: ' + defauMatch[1];
            
        }
    }


    // TODO pass if `export default` does exists in the file
    if (!_exports) {

        ({ content, _exports } = commonjsExportsApply(content, _exports, { fileStoreName, extractinNames, globalOptions }));
    }
    else if (isbuilt) {
        /// remove export keyword from content

        // content = content.replace(/;export( default ([\w\d_\$]+(?:;|\n))?)?(\{[\s\S]+?\})?/gm, '').trimEnd();
        // content = content.replace(/;export( default ([\w\d_\$]+(?:|\n))?)?(\{[\s\S]+?\})?/gm, '').trimEnd();    // fix comma autoremoving by comma removing - i am confused
        content = content.replace(/(?<=;|\})export( default ([\w\d_\$]+(?:;|\n))?)?(\{[\s\S]+?\})?;?/gm, '').trimEnd();
        // remove export
    }
    else if(_exports) {
        // last group (\{[\s\S]+?[\n;]\}) => (\{[\s\S]+?[\n]\}) ??
        content = content.replace(/^export (default ([\w\d_\$]+(?:;|\n))?)?((\{[^\n]+\}[\n;])|(\{[^\n]+\}$)|(\{[\s\S]+?[\n;]\}))?;?/gm, '').trimEnd()
    }
    else {
        /// impracticable code
        // debugger
    }


    if (globalOptions.advanced?.treeShake && !importer.isFastShaking && extractinNames && _exports && !isbuilt) {
        
        // if (theShaker.shakedStore[fileStoreName]) {
        //     debugger
        //     // double it
        //     if (extract?.names.some(_ex => ~theShaker.shakedStore[fileStoreName].shaked.indexOf(_ex))) {
        //         return { _exports, content: theShaker.shakedStore[fileStoreName].content };
        //     }
        // }

        let _shakedExports;
        ({ _exports: _shakedExports, content } = shakeBranch({ _exports, extractinNames, content, fileStoreName, getOriginContent }));
        return { _exports: _shakedExports, content };
    }


    return { _exports, content };
}




/**
 * @description 
 *  - cut from current content unused exports and another unused functions
 *  - correct _exports (remove from _exports names which does not exist in extractinNames)
 * @param {{
 *  _exports: string, 
 *  extractinNames: Set<string>, 
 *  content: string, 
 *  fileStoreName: string, 
 *  getOriginContent: () => string
 * }} param
 * @returns {{ _exports: string, content: string }}
 */
function shakeBranch({_exports, extractinNames, content, fileStoreName, getOriginContent}) {
    
    let extractingNames = Array.from(extractinNames);  // extract?.names

    // as is should never been here now:
    const expArray = _exports.split(',')
        .map(m => m.split(' as ').pop().trim())
        // .map(m => m.split(':').shift().trim());
    const unusedExports = [];
    _exports = expArray
        // .map(m => m.split(':').shift().trim())  // `default: A` - support
        .filter(ex => {
            const isExists = extractinNames.has(!~ex.indexOf(':') ? ex : ex.split(':').shift());
            /// TODO TREE SHAKE here (from importInsert)
            if (!isExists) {
                unusedExports.push(ex);
                return false;
            }
            return isExists;
            }
        ).join(', ');


    content = theShaker.work({
        extracting: extractingNames,
        exports$: expArray,
        content,
        preShakeUp(shakedList) {
            if (!theShaker.shakedStore[fileStoreName])
                theShaker.shakedStore[fileStoreName] = {
                    content: getOriginContent(),
                    shaked: shakedList,
                    extracted: extractingNames
                };
            else {
                // theShaker.shakeStore[fileStoreName].content = content;                    
                theShaker.shakedStore[fileStoreName].shaked.push(...shakedList);
            }
        },
        onMiss() { }
    });
    return { _exports, content };
}

/**
 * @param {string} fileName
 * @param {string} [absolutePath]
 * @param {(a: string) => void} [onFilenameChange]
 * @param {{linkPath?: string, onSymLink?: (link: string) => void}} [adjective]
 * @this {PathMan}
 */
function getContent(fileName, absolutePath, onFilenameChange, adjective) {
    
    let packageName = null;
    const dynamicExported = this.importer.dynamicModulesExported;

    var _fileName = absolutePath || (
        fileName.startsWith('.')    //  !nodeModules[fileName]
            ? path.normalize(this.dirPath + path.sep + fileName)
            : path.join(packageName = path.join(
                adjective?.linkPath || nodeModulesPath || (nodeModulesPath = findProjectRoot(this.dirPath, globalOptions)), fileName), nodeModules[fileName] || ''
            )
    )

    if (!fileName.startsWith('.') && !(fileName in nodeModules)) {
        nodeModules[fileName] = this.importer.getMainFile(fileName);
        _fileName = path.join(_fileName, nodeModules[fileName]);
    }

    let fileExists = false;
    for (var ext of extensions) {
        if (fileExists = fs.existsSync(_fileName + ext)) {
            _fileName = _fileName + ext;
            break;
        }
    }

    // is folder or does not exists!
    if (!path.extname(_fileName) && ext === '') {  // !fileExists &&

        if (!fileName.startsWith('.') && !nodeModules[fileName] && adjective?.linkPath) {
            var mainfile = findMainfile(path.join(_fileName, 'package.json'))
            _fileName = path.join(_fileName, mainfile)
        }

        // most likely is directory:
        if (!mainfile && _fileName.split(path.sep).pop().split('.').length === 1) {
            // debugger
            _fileName += path.sep + 'index.js'
            if (onFilenameChange) onFilenameChange(fileName + '/index.js');
        }
    }

    if (exportedFiles.includes(_fileName)) {
        // let lineNumber = source.substr(0, offset).split('\n').length
        console.log(`${(this.basePath == '.' || '') && 'dynamically '}reimport of '${_fileName}'`);
        return ''
    }
    else if (dynamicExported) {
        dynamicExported.push(_fileName)
    }
    else {
        exportedFiles.push(_fileName)
    }

    
    if (packageName && fs.existsSync(packageName) && fs.lstatSync(packageName).isSymbolicLink()) {
        const realpath = fs.readlinkSync(packageName);
        adjective?.onSymLink?.call(null, realpath);
    }


    try {
        var content = fs.readFileSync(_fileName).toString()
    }
    catch {
        // findPackagePath(nodeModulesPath, fileName, fs) = > readExports(packageInfo)        
        const warnDesc = `File "${_fileName}" ("import ... from '${fileName}'") doesn't found`;
        console.warn(warnDesc)        
        // return 'let __ = undefined'
        return 'console.log("__")';
        // throw new Error(warnDesc)
    }

    return content;
}



exports.default = exports.build = exports.buildContent = exports.combineContent = combineContent;
exports.integrate = exports.packFile = exports.buildFile = buildFile;
exports.requireOptions = requireOptions;

