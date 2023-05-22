
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
 function deepMergeMap(insideMapInfo, externalMap, encode) {

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
        outsideMapInfo.mappings = encode(mergedMap)
     }

    return { mergedMap, outsideMapInfo }

    /// Further: outsideMap.mappings = encode(mergedMap);
}





/**
 * @description merge advancedMap for preprocessed finished single file (code) with origin map based on multi files
 * @param {string} builtCode
 * @param {import('sourcemap-codec').SourceMapMappings} originMapSheet
 * @param {{
 *      mapStartToken?: string,                                 // [mapStartToken='//# sourceMappingURL=data:application/json;charset=utf-8;base64,']
 *      pluginMapping?: import('./utils').SourceMapMappings,
 *      decode: (arg: string) => [number, number, number, number, number][][]
 * }} options 
 * @returns {[string, import('sourcemap-codec').SourceMapMappings]}
 */
function mergeFlatMaps(builtCode, originMapSheet, options) {

    const { mapStartToken, pluginMapping, decode } = options || {};

    if (pluginMapping) var advancedMap = pluginMapping
    else {
        var [advancedMap, $, code] = extractEmbedMap(builtCode, { sourceMapToken: mapStartToken, decode });
    }

    // jsMap[tsMap.map(el => el ? el[0] : null)[2][2]]

    const mergedMap = advancedMap.map(line => line ? line[0] : []).map(line => originMapSheet[line[2]])
    // tsMap.map(line => jsMap[line[0][2]])

    // let mergedMap = tsMap.map(m => m.map(c => jsMap[c[2]]));         // its wrong fow some reason and ts swears!!!

    return [code || builtCode, mergedMap];
}



/**
 * @description extract origin sourcemap from inline code
 * @param {string} [code]
 * @param {{
 *      sourceMapToken?: string, 
 *      decode: (arg: string) => [number, number, number, number, number][][]
 * }} [options=null]
 * @returns {[import('sourcemap-codec').SourceMapMappings, {sourcesContent: string[], sources: string[], mappings: string, file: string, files: string[]}, string]}
 */
function extractEmbedMap(code, options) {

    let { sourceMapToken } = options || {};

    sourceMapToken = sourceMapToken || '//# sourceMappingURL=data:application/json;charset=utf-8;base64,'

    const sourceMapIndex = code.lastIndexOf(sourceMapToken);

    const baseOriginSourceMap = code.slice(sourceMapIndex + sourceMapToken.length);

    const originSourceMap = JSON.parse(Buffer.from(baseOriginSourceMap, 'base64').toString());    

    const jsMap = options.decode(originSourceMap.mappings);

    return [jsMap, originSourceMap, code.slice(0, sourceMapIndex)];
}




exports.deepMergeMap = deepMergeMap;
exports.mergeFlatMaps = mergeFlatMaps;
exports.extractEmbedMap = extractEmbedMap;