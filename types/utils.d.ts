export type SourceMapMappings = import("sourcemap-codec").SourceMapMappings;
export type MapInfo = {
    sources: string[];
    sourcesContent: string[];
    mappings?: string;
};
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
export function deepMergeMap(insideMapInfo: {
    mapping: import("sourcemap-codec").SourceMapMappings;
    sourcesContent: string[];
    files: string[];
}, externalMap: {
    outsideMapInfo: MapInfo;
    outsideMapping: import("sourcemap-codec").SourceMapMappings;
}, encode?: (arg: import("sourcemap-codec").SourceMapSegment[][]) => string): {
    outsideMapInfo: MapInfo;
    mergedMap: import("sourcemap-codec").SourceMapSegment[][];
};
/**
 * @description merge advancedMap for preprocessed finished single file (code) with origin map based on multi files
 * @param {string} builtCode
 * @param {import('sourcemap-codec').SourceMapMappings} originMapSheet
 * @param {{
 *      mapStartToken?: string,                                 // [mapStartToken='//# sourceMappingURL=data:application/json;charset=utf-8;base64,']
 *      pluginMapping?: import('./utils').SourceMapMappings,
 *      decode: (arg: string) => SourceMapMappings
 * }} options
 * @returns {[string, import('sourcemap-codec').SourceMapMappings]}
 */
export function mergeFlatMaps(builtCode: string, originMapSheet: import('sourcemap-codec').SourceMapMappings, options: {
    mapStartToken?: string;
    pluginMapping?: import('./utils').SourceMapMappings;
    decode: (arg: string) => import("sourcemap-codec").SourceMapMappings;
}): [string, import('sourcemap-codec').SourceMapMappings];
/**
 * @description extract origin sourcemap from inline code
 * @param {string} [code]
 * @param {{
 *      sourceMapToken?: string,
 *      decode: (arg: string) => SourceMapMappings
 * }} [options=null]
 * @returns {[import('sourcemap-codec').SourceMapMappings, {sourcesContent: string[], sources: string[], mappings: string, file: string, files: string[]}, string]}
 */
export function extractEmbedMap(code?: string, options?: {
    sourceMapToken?: string;
    decode: (arg: string) => import("sourcemap-codec").SourceMapMappings;
}): [import('sourcemap-codec').SourceMapMappings, {
    sourcesContent: string[];
    sources: string[];
    mappings: string;
    file: string;
    files: string[];
}, string];
