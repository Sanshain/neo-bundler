export type VArray = [number, number, number, number, number?];
export type PathOrFileDescriptor = any;
export type BuildOptions = {
    entryPoint: string;
    release?: boolean;
    removeLazy?: boolean;
    getContent?: (filename: any) => string;
    logStub?: boolean;
    getSourceMap?: (arg: {
        mapping: Array<number[]>;
        files: string[];
        sourcesContent?: string[];
    }) => void;
    sourceMaps?: {
        encode(arg: Array<Array<[number] | [number, number, number, number, number?]>>): string;
        decode?: (arg: string) => number[][][];
        external?: boolean;
        charByChar?: boolean;
        injectTo?: {
            maps?: number[][][];
            mappings: string;
            source: string[];
            sourcesContent: string[];
            names?: string[];
        };
    };
    advanced?: {
        require?: 'same as imports';
        incremental?: boolean;
        treeShaking?: false;
        ts?: Function;
    };
};
export var build: any;
export var buildContent: any;
export var buildFile: any;
export var combine: any;
declare namespace main {
    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    function _default(content: string, dirpath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    export { _default as default };
    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    export function build(content: string, dirpath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions & {targetFname?: string}} options - options
     * @param {Function?} [onSourceMap=null] - onSourceMap
     * @return {string} code with imported involves
     */
    export function buildFile(content: string, dirpath: string, options: BuildOptions & {
        targetFname?: string;
    }, onSourceMap?: Function): string;
    export { combineContent as combine };
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
    export function pack(from: string, to: string, options: Omit<BuildOptions, "entryPoint"> & {
        entryPoint?: string;
    }): string;
    export { integrate as buildContent };
}
/**
 *
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
declare function integrate_1(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
export var pack: any;
/**
 * Remove code fragments marked as lazy inclusions
 * @param {string} content - content
 */
declare function removeLazy(content: string): string;
/**
 * @param {PathOrFileDescriptor} fileName
 */
declare function getContent(fileName: any): any;
/**
 * @description remove lazy and import inserts into content
 * @param {string} content - source code content;
 * @param {string} dirpath - path to source directory name
 * @param {BuildOptions & {targetFname?: string}} options - options
 * @param {Function?} [onSourceMap=null] - onSourceMap
 * @return {string} code with imported involves
 */
declare function combineContent(content: string, dirpath: string, options: BuildOptions & {
    targetFname?: string;
}, onSourceMap?: Function | null): string;
/**
 *
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
 * @returns
 */
declare function integrate_1(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
    entryPoint?: string;
}): string;
export { main as default, integrate_1 as integrate };
