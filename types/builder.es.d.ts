export type SourceMapMappings = import("sourcemap-codec").SourceMapMappings;
export type MapInfo = {
    sources: string[];
    sourcesContent: string[];
    mappings?: string;
};
/**
 *
 * /// UNDER QUESTION:
 * onTreeShake?: (skiped?: boolean) => void
 */
export type SealingOptions = {
    root?: string;
    _needMap?: boolean | 1;
    extract: {
        names?: string[];
        default?: string;
    };
    isEsm?: boolean;
};
export type VArray = [number, number, number, number, number?];
export type PathOrFileDescriptor = import("fs").PathOrFileDescriptor;
export type RawMapping = [number, number, number, number, number][][];
export type BuildOptions = {
    entryPoint: string;
    release?: boolean;
    verbose?: boolean;
    purgeDebug?: boolean;
    getContent?: (filename: string) => string;
    onError?: (error: Error) => boolean;
    logStub?: boolean;
    getSourceMap?: (arg: {
        mapping: ([number, number, number, number, number] | [number, number, number, number])[][];
        files: string[];
        sourcesContent: string[];
    }) => Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'> | void;
    sourceMaps?: {
        shift?: number;
        encode(arg: Array<Array<[number] | [number, number, number, number, number?]>>): string;
        decode?: (arg: string) => [number, number, number, number, number][][];
        external?: boolean;
        charByChar?: boolean;
        verbose?: boolean;
        injectTo?: {
            maps?: [number, number, number, number, number][][];
            mappings: string;
            sources: string[];
            sourcesContent: string[];
            names?: string[];
        };
    };
    advanced?: {
        allFilesAre?: 'reqular files';
        handleRequireExpression?: (typeof requireOptions)[keyof typeof requireOptions];
        incremental?: boolean;
        treeShake?: boolean | {
            exclude?: Set<string>;
            method?: 'surface' | 'allover';
            cjs?: false;
        };
        ts?: Function;
        nodeModulesDirname?: string;
        dynamicImportsRoot?: string;
        dynamicImports?: {
            ignore?: string[];
            root?: string;
            foreignBuilder?: (path: string) => string;
        };
        debug?: boolean;
        optimizations?: {
            ignoreDynamicImports?: true;
        };
    };
    experimental?: {
        withConditions?: boolean;
    };
    plugins?: {
        name?: string;
        preprocess?: (code: string, options?: {
            target: string;
            maps?: Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'>;
            rawMap?: RawMapping;
        }) => [string, BuildOptions['sourceMaps']['injectTo']];
        extend?: never;
        bundle?: (code: string, options?: {
            target: string;
            maps?: Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'>;
            rawMap?: RawMapping;
        }) => string;
    }[];
};
export var build: any;
export var buildContent: any;
declare var buildFile_1: any;
declare var combineContent_1: any;
declare namespace main {
    /**
     * @description preapare (remove lazy, prepare options) and build content under rootPath and as per options (applyes importInserts into content)
     * @param {string} content - source code content;
     * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    function _default(content: string, rootPath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    export { _default as default };
    /**
     * @description preapare (remove lazy, prepare options) and build content under rootPath and as per options (applyes importInserts into content)
     * @param {string} content - source code content;
     * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    export function build(content: string, rootPath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    /**
     * @description preapare (remove lazy, prepare options) and build content under rootPath and as per options (applyes importInserts into content)
     * @param {string} content - source code content;
     * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    export function buildContent(content: string, rootPath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    export { combineContent };
    /**
     *
     * @param {string} entrypoint - file name
     * @param {string} target - target name
     * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
     * @returns
     */
    export function integrate(entrypoint: string, target: string, options: Omit<BuildOptions, "entryPoint"> & {
        entryPoint?: string;
    }): string;
    /**
     *
     * @param {string} entrypoint - file name
     * @param {string} target - target name
     * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
     * @returns
     */
    export function packFile(entrypoint: string, target: string, options: Omit<BuildOptions, "entryPoint"> & {
        entryPoint?: string;
    }): string;
    export { buildFile };
    export { requireOptions };
}
/**
 *
 * @param {string} entrypoint - file name
 * @param {string} target - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
export function integrate(entrypoint: string, target: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
export var packFile: any;
declare namespace requireOptions_1 {
    const sameAsImport: 'as esm import';
    const doNothing: 'do nothing';
}
/**
 * @param {string} fileName
 * @param {string} [absolutePath]
 * @param {(a: string) => void} [onFilenameChange]
 * @param {{linkPath?: string, onSymLink?: (link: string) => void}} [adjective]
 * @this {PathMan}
 */
declare function getContent(this: PathMan, fileName: string, absolutePath?: string, onFilenameChange?: (a: string) => void, adjective?: {
    linkPath?: string;
    onSymLink?: (link: string) => void;
}): any;
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
 *      sameAsImport: 'as esm import',
 *      doNothing?: 'do nothing'
 * }}
 *
 *      inlineTo?: 'inline to script',
 *      applyAndInline?: 'apply and inline',
 */
declare const requireOptions: {
    sameAsImport: 'as esm import';
    doNothing?: 'do nothing';
};
/**
 * @description preapare (remove lazy, prepare options) and build content under rootPath and as per options (applyes importInserts into content)
 * @param {string} content - source code content;
 * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
 * @param {BuildOptions & {targetFname?: string}} options - options
 * @param {Function?} [onSourceMap=null] - onSourceMap
 * @return {string} code with imported involves
 */
declare function combineContent(content: string, rootPath: string, options: BuildOptions & {
    targetFname?: string;
}, onSourceMap?: Function | null): string;
/**
 *
 * @param {string} entrypoint - file name
 * @param {string} target - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
declare function buildFile(entrypoint: string, target: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
/**
 * path manager
 */
declare class PathMan {
    /**
     * @param {string} dirname
     * @param { (fileName: PathOrFileDescriptor) => string} pullContent
     */
    constructor(dirname: string, pullContent: (fileName: PathOrFileDescriptor) => string);
    /**
     * used for static imports inside dynamic imports (TODO check it (on purp perf optimization): why not startsWith condition applied for this in getContext?)
     * @legacy
     * @type {string}
     */
    basePath: string;
    /**
     * @type {Importer?}
     */
    importer: Importer | null;
    linkedModules: any[];
    /**
     * root directory of source  code (not project path. it's different)
     */
    dirPath: string;
    /**
     *
     */
    getContent: typeof getContent;
}
declare const Importer_base: {
    new (): {
        /**
         * @type {Array<string>} - for dynamic imports
         */
        dynamicModulesExported: string[];
        /**
         * @description - file, where imprting is in progress
         * @type {string}
         */
        readonly currentFile: string;
        /**
         * current file stack of all handled files at the momend (includes dyn and stat imports)
         */
        progressFilesStack: any[];
        /**
         * @description current linked modules path stack
         * @type {string[]}
         */
        linkedModulePaths: string[];
    };
};
declare class Importer extends Importer_base {
    /**
     *
     * @param {PathMan} pathMan
     */
    constructor(pathMan: PathMan);
    /**
     * @type {PathMan}
     */
    pathMan: PathMan;
    namedImportsApply: typeof namedImportsApply;
    moduleStamp: typeof moduleSealing;
    isFastShaking: boolean;
    /**
     * @description call moduleSealing and generate sourcemaps for it
     * @returns {boolean}
     * @param {string} fileName
     * @param {string} fileStoreName,
     * @param {SealingOptions} args
     */
    attachModule(fileName: string, fileStoreName: string, { root, _needMap, extract }: SealingOptions): boolean;
    /**
     *
     * @param {SealingOptions} options
     * @param {(name: string) => boolean} inspectUnique
     * @returns
     */
    generateConverter(options: SealingOptions, inspectUnique: (name: string) => boolean): (match: any, __: any, $: any, $$: any, _defauName: any, classNames: string, defauName: any, moduleName: any, isrelative: any, fileName: any, offset: any, source: any) => string;
    /**
     * @param {string} fileName
     * @param {string} isrelative
     * @param {SealingOptions} params
     */
    attachFile(fileName: string, isrelative: string, { root, _needMap, extract }: SealingOptions): any;
    /**
     * @description read main/export section from package.json
     * @param {string} packageName
     * @returns
     */
    getMainFile(packageName: string): any;
    genChunkName(filename: any): string;
    /**
     * @legacy {looking for onSymLink callback inside getContent}
     * @param {string} fileName
     * @param {string} relInsidePathname
     */
    extractLinkTarget(fileName: string, relInsidePathname: string): string;
    joinAllContents(content: any, options: any): any;
}
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
declare function namedImportsApply(this: Importer, content: string, importOptions: SealingOptions): string;
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
declare function moduleSealing(this: Importer, fileName: string, { root, _needMap: __needMap, extract }: SealingOptions): {
    fileStoreName: string;
    updatedRootOffset?: number;
    lines: Array<[number, boolean]>;
};
export { buildFile_1 as buildFile, combineContent_1 as combineContent, main as default, requireOptions_1 as requireOptions };
