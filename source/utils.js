//@ts-check


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

exports.deepMergeMap = deepMergeMap;