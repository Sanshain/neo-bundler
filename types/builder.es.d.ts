export type BuildOptions = {
    entryPoint: string;
    release?: boolean;
    getContent?: (filename: fs.PathOrFileDescriptor) => string;
};
export var build: any;
declare var combine_1: any;
declare namespace main {
    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions} options - options
     * @return {string} code with imported involves
     */
    function _default(content: string, dirpath: string, options: BuildOptions): string;
    export { _default as default };
    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions} options - options
     * @return {string} code with imported involves
     */
    export function build(content: string, dirpath: string, options: BuildOptions): string;
    export { combine };
    /**
     *
     * @param {string} from - file name
     * @param {string} to - target name
     * @param {{ entryPoint?: string; release?: boolean; }} options - options
     * @returns
     */
    export function integrate(from: string, to: string, options: {
        entryPoint?: string;
        release?: boolean;
    }): any;
    export { integrate as pack };
}
/**
 *
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {{ entryPoint?: string; release?: boolean; }} options - options
 * @returns
 */
declare function integrate_1(from: string, to: string, options: {
    entryPoint?: string;
    release?: boolean;
}): any;
export var pack: any;
/**
 * @param {fs.PathOrFileDescriptor} fileName
 */
declare function getContent(fileName: fs.PathOrFileDescriptor): any;
/**
 * @description remove lazy and import inserts into content
 * @param {string} content - source code content;
 * @param {string} dirpath - path to source directory name
 * @param {BuildOptions} options - options
 * @return {string} code with imported involves
 */
declare function combine(content: string, dirpath: string, options: BuildOptions): string;
/**
 *
 * @param {string} from - file name
 * @param {string} to - target name
 * @param {{ entryPoint?: string; release?: boolean; }} options - options
 * @returns
 */
declare function integrate_1(from: string, to: string, options: {
    entryPoint?: string;
    release?: boolean;
}): any;
export { combine_1 as combine, main as default, integrate_1 as integrate };
