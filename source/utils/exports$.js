//@ts-check

const { statHolder } = require("./_versions");

/**
 * @param {string} content
 * @param {string} _exports
 * @param {{
 *  fileStoreName: string
 *  extractinNames: Set<string>
 *  globalOptions?: import("../main").BuildOptions
 * }} options
 */
function commonjsExportsApply(content, _exports, { fileStoreName, extractinNames, globalOptions }) {
    let withCondition = false;

    // cjs format
    // does not take into account the end of the file
    // TODO support default exports for objects: module.exports = {} 
    content = content.replace(/^(?: *module\.)?exports(?<export_name>\.[\w\$][\w\d\$]*)?[ ]=\s*(?<exports>[\s\S]+?(?:\n\}|;))/mg, function (_match, exportName, exportsValue) {

        withCondition = _match.startsWith(' ');
        if (withCondition) {
            if (!globalOptions.experimental?.withConditions) {
                globalOptions.advanced?.debug && console.warn(`>> condition export detected for ${fileStoreName}. May be need specifying withConditions option`);
                withCondition = false;
                return _match;
            }
            // debugger
        }

        statHolder.exports.cjs++;

        // ((?<entityName>function|class|\([\w\d$,:<>]*) =>) [name])
        // matches.push(exportName.slice(1));
        if (exportName) {
            exportName = exportName.slice(1);
            if (!globalOptions.advanced?.treeShake) {
                _exports += (_exports && ', ') + exportName;
            }
            else if (extractinNames.has(exportName)) {
                _exports += (_exports && ', ') + exportName;
            }
            else if (typeof globalOptions.advanced?.treeShake == 'object' && globalOptions.advanced?.treeShake.cjs !== false) {
                // TODO tree shke it here (TODO check all functions in the file like by es imports)
                return '';
            }
        }
        else {
            _exports += (_exports && ', ') + 'default: $default';
            if (exportsValue.match(/^\w+;$/)) {
                _exports += ', ' + exportsValue.slice(0, -1);
            }
        }
        // _exports += (exportName || ' default: $default').slice(1) // + ', ';
        // return `var ${(exportName || ' $default').slice(1)} = ${exportsValue}`;
        return `var ${exportName || '$default'} = ${exportsValue}`;
    });

    if (withCondition) {
        content = content.replace('typeof module', '"object"');
    }

    return { content, _exports };
}

exports.commonjsExportsApply = commonjsExportsApply