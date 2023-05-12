import main, { BuildOptions } from "./builder.es";


export declare var build: typeof main.build;
export declare var buildFile: typeof main.build;
export declare var combine: typeof main.build;
export { build as default }

export declare var integrate: typeof main.integrate;
export declare var buildContent: typeof main.integrate;
export declare var pack: typeof main.integrate;




// // export as namespace main;

// /**
//  * @description remove lazy and import inserts into content
//  * @param {string} content - source code content;
//  * @param {string} rootPath - path to source directory name
//  * @param {BuildOptions & {targetFname?: string}} options - options
//  * @param {Function?} [onSourceMap=null] - onSourceMap
//  * @return {string} code with imported involves
//  */
// declare function _default(content: string, rootPath: string, options: BuildOptions & {
//     targetFname?: string;
// }, onSourceMap?: Function | null): string;
// export default _default;
// /**
//  * @description remove lazy and import inserts into content
//  * @param {string} content - source code content;
//  * @param {string} rootPath - path to source directory name
//  * @param {BuildOptions & {targetFname?: string}} options - options
//  * @param {Function?} [onSourceMap=null] - onSourceMap
//  * @return {string} code with imported involves
//  */
// // export function build(content: string, rootPath: string, options: BuildOptions & {
// //     targetFname?: string;
// // }, onSourceMap?: Function | null): string;
// /**
//  * @description remove lazy and import inserts into content
//  * @param {string} content - source code content;
//  * @param {string} rootPath - path to source directory name
//  * @param {BuildOptions & {targetFname?: string}} options - options
//  * @param {Function?} [onSourceMap=null] - onSourceMap
//  * @return {string} code with imported involves
//  */
// export function buildFile(content: string, rootPath: string, options: BuildOptions & {
//     targetFname?: string;
// }, onSourceMap?: Function | null): string;
// /**
//  *
//  * @param {string} from - file name
//  * @param {string} to - target name
//  * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
//  * @returns
//  */
// // export function integrate(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
// //     entryPoint?: string;
// // }): string;
// /**
//  *
//  * @param {string} from - file name
//  * @param {string} to - target name
//  * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
//  * @returns
//  */
// export function pack(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
//     entryPoint?: string;
// }): string;
// export type VArray = [number, number, number, number, number?];
// export type PathOrFileDescriptor = any;

// /**
//  * @description remove lazy and import inserts into content
//  * @param {string} content - source code content;
//  * @param {string} rootPath - path to root of source directory name (required for sourcemaps etc)
//  * @param {BuildOptions & {targetFname?: string}} options - options
//  * @param {Function?} [onSourceMap=null] - onSourceMap
//  * @return {string} code with imported involves
//  */
// declare function combineContent(content: string, rootPath: string, options: BuildOptions & {
//     targetFname?: string;
// }, onSourceMap?: Function | null): string;
// /**
//  *
//  * @param {string} from - file name
//  * @param {string} to - target name
//  * @param {Omit<BuildOptions, 'entryPoint'> & {entryPoint?: string}} options - options
//  * @returns
//  */
// export declare function integrate(from: string, to: string, options: Omit<BuildOptions, 'entryPoint'> & {
//     entryPoint?: string;
// }): string;
// /**
//  * Remove code fragments marked as lazy inclusions
//  * @param {string} content - content
//  */
// declare function removeLazy(content: string): string;
// /**
//  * @param {PathOrFileDescriptor} fileName
//  */
// declare function getContent(fileName: any): any;

// export { combineContent as combine, integrate as buildContent };
