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
