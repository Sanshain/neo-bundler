export type SourceMapMappings = import("sourcemap-codec").SourceMapMappings;
export type MapInfo = {
    sources: string[];
    sourcesContent: string[];
    mappings?: string;
};
export type VArray = [number, number, number, number, number?];
export type PathOrFileDescriptor = import("fs").PathOrFileDescriptor;
export type RawMapping = [number, number, number, number, number][][];
export type BuildOptions = {
    entryPoint: string;
    release?: boolean;
    removeLazy?: boolean;
    getContent?: (filename: PathOrFileDescriptor) => string;
    logStub?: boolean;
    getSourceMap?: (arg: {
        mapping: ([number, number, number, number, number] | [number, number, number, number])[][];
        files: string[];
        sourcesContent?: string[];
    }) => Omit<BuildOptions['sourceMaps']['injectTo'], 'maps'> | undefined;
    sourceMaps?: {
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
        require?: {
            sameAsImport: "same as imports";
        }[keyof {
            sameAsImport: "same as imports";
        }];
        incremental?: boolean;
        treeShaking?: false;
        ts?: Function;
    };
    plugins?: {
        name?: string;
        prebundle?: never;
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
     * @description remove lazy and import inserts into content
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
     * @description remove lazy and import inserts into content
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
     * @description remove lazy and import inserts into content
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
     * @param {string} from - file name
     * @param {string} to - target name
     * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
     * @returns
     */
    export function integrate(from: string, to: string, options: Omit<BuildOptions, "entryPoint"> & {
        entryPoint?: string;
    }): string;
    /**
     *
     * @param {string} from - file name
     * @param {string} to - target name
     * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
     * @returns
     */
    export function packFile(from: string, to: string, options: Omit<BuildOptions, "entryPoint"> & {
        entryPoint?: string;
    }): string;
    export { buildFile };
    export { requireOptions };
}
/**
 *
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
export function integrate(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
export var packFile: any;
declare namespace requireOptions_1 {
    const sameAsImport: 'same as imports';
}
/**
 * Remove code fragments marked as lazy inclusions
 * @param {string} content - content
 */
declare function removeLazy(content: string): string;
/**
 * @param {PathOrFileDescriptor} fileName
 */
declare function getContent(fileName: PathOrFileDescriptor): any;
/**
 * @description remove lazy and import inserts into content
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
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
declare function buildFile(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
/**
 * @type {{
 *      sameAsImport: 'same as imports'
 * }}
 */
declare const requireOptions: {
    sameAsImport: 'same as imports';
};
export { buildFile_1 as buildFile, combineContent_1 as combineContent, main as default, requireOptions_1 as requireOptions };
