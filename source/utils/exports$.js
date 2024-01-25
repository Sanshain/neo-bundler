//@ts-check

const { statHolder } = require("./_versions");

/**
 * @augment O(1) - 18 times ==> ~1ms (-100ms)
 * @param {string} content
 * @param {string} _exports
 * @param {{
 *  fileStoreName: string
 *  extractinNames: Set<string>
 *  globalOptions?: import("../main").BuildOptions
 * }} options
 * @returns {{content: string, _exports: string}}
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


/**
 * @param {string} content
 * @param {string} _exports
 * @param {boolean} isbuilt
 * @deprecated
 */
function defaultExprsRemove(content, _exports, isbuilt) {
    if (isbuilt) {     // 3-3.5s
        /// remove export keyword from content

        // content = content.replace(/;export( default ([\w\d_\$]+(?:;|\n))?)?(\{[\s\S]+?\})?/gm, '').trimEnd();
        // content = content.replace(/;export( default ([\w\d_\$]+(?:|\n))?)?(\{[\s\S]+?\})?/gm, '').trimEnd();    // fix comma autoremoving by comma removing - i am confused
        content = content.replace(/(?<=;|\})export( default ([\w\d_\$]+(?:;|\n))?)?(\{[\s\S]+?\})?;?/gm, '').trimEnd();
        // remove export
    }
    else if(_exports) {
        // last group (\{[\s\S]+?[\n;]\}) => (\{[\s\S]+?[\n]\}) ??
        // content = content.replace(/^export (default ([\w\d_\$]+(?:;|\n))?)?((\{[^\n]+\}[\n;])|(\{[^\n]+\}$)|(\{[\s\S]+?[\n;]\}))?;?/gm, '').trimEnd()
        let m = content.match(/^export (default ([\w\d_\$]+(?:;|\n))?)?((\{[^\n]+\}[\n;])|(\{[^\n]+\}$)|(\{[\s\S]+?[\n;]\}))?;?/gm)
        if (m) {
            debugger
        }
    }
    else {
        /// impracticable code
        // debugger
    }
    return content;
}


function applyDefaultExports(content, { isbuilt, extract, _exports, globalOptions }) {


    /// export default (class|function )? A...
    // let defauMatch = content.match(/^export default \b([\w_\$]+)\b( [\w_\$]+)?/m);               // \b on $__a is failed cause of $ sign in start
    // let defauMatch = content.match(/^export default ([\w_\$\.]+)\b( [\w_\$]+)?/m);                                           // added export default Array.from support;    
    // let defauMatch = content.match(/^export default (\(?[\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)                              // added export default (() => {}) support
    // const defauMatch = content.match(/^export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)                   // added export default [..] support    
    // const defauMatch = content.match(/(?:^export)|((?<=;)export) default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m)


    const defauMatch = content.match(isbuilt // added ;exports support
        ? /(?<=;)export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m
        // : /^export default ((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?/m
        : /^export default (?:((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?((?:\*)? \w+)?)/m // async function* gen +
        // : /^export default (?:((?:\(|\[)?['"\(\)\w_\d\$,\{\}\.]+)\b( [\w_\$]+)?((?:\*)? \w+)?)|(?:(\{[ \w\d,\(\):;'"\n\[\]]*?\})|(\{[\s\S]*\n\}))/m                                     // async function* gen +
        /**
         *  - 1 - full match (`export default function crelt`)
         *  - 2 - expr (async|function|class|$name|[...]|(...))
         *  - 3 - expr name (just for $2 == function|class) or expr last name - `function` (for async)
         *  - 4 - iterator (*) if $3 == function
        */
    );

    if (defauMatch) {
        // export default (function|class name)|name|[...]|(() => ...)   // -|{...}
        if (globalOptions.advanced?.treeShake && !extract.default && !~extract.names.indexOf('default')) {
            // do nothing if default does not exists in extracting exports  
            // debugger
        }
        // else if (defauMatch[4] || defauMatch[5]) {
        //     const $1 = defauMatch[4] || defauMatch[5]
        //     content.replace($1, `var _default = ${$1};\nexport default _default;`);
        // }
        else if (defauMatch[1] == 'async' && defauMatch[3]) {
            _exports += (_exports && ', ') + 'default: ' + defauMatch[3].replace(/^\* /, '');
        }
        else if (~['function', 'class'].indexOf(defauMatch[1])) { // what if ' function'
            // export default (function|class name)
            if (!defauMatch[2]) {
                /// there is not name
                /// export default (class|function) () {}
                content = content.replace(/^export default \b([\w_]+)\b/m, 'export default $1 $default');
            }
            /// export default (class|function) entityName
            _exports += `${_exports && ', '}default: ` + (defauMatch[2] || '$default');
        }
        else {
            if (defauMatch[1][0] == '(' || defauMatch[1][0] == '[') {
                /// export default [...]|(() => ...)
                content = content.replace(/^export default /m, 'const _default = ');
                defauMatch[1] = '_default';
            }
            else {
                /// export default entityName
            }

            _exports += (_exports && ', ') + 'default: ' + defauMatch[1];
        }
    }
    else {
        // console.log(ls++)
        // TODO #1 join default replaces to performance purpose: UP: check it, may be one of them is unused;  (may be optimized ==> 90ms => 87ms for codemirror)
        /// export default {...}
        content = content.replace(
            // /^export default[ ]+(\{[\s\S]*?\}(?:\n|;))/m
            // /^export default[ ]+(\{[\s\S]*?\})[;\n]/m, 'var _default = $1;\n\nexport default _default;'           // an incident with strings containing }, nested objs {}, etc...        
            // /^export default[ ]+(\{[\s\S]*?\})/m, 'var _default = $1;export default _default;'                    // ; - met me inside strings
            // /^export default[ ]+(\{[ \w\d,\(\):;'"\n\[\]]*?\})/m, function (m, $1, $2) {                         
            /^export default[ ]+((\{[ \w\d,\(\):;'"\n\[\]]*?\})|(\{[\s\S]*\n\}))/m, function (m, $1, $2) {
                // /^export default[ ]+(\{[\s\S]*\n\})/m, function (m, $1) {          // fixed export default { ...: {}}
                return `var _default = ${$1};\nexport default _default;`;
                // 'var _default = $1;\nexport default _default;'
            }
        );
    }
    return { content, _exports };
}



exports.defaultExprsRemove = defaultExprsRemove
exports.applyDefaultExports = applyDefaultExports
exports.commonjsExportsApply = commonjsExportsApply




{
    // ~3ms

    // _exports += Array.from(content.matchAll(/^export \{([\s\S]*?)\}/mg))
    // var r1 = Array.from(content.matchAll(/((?:^export )|;export)\{([\s\S]*?)\}/mg));
    // if (!r1.length && Array.from(content.matchAll(/^export \{([\s\S]*?)\}/mg)).length) {
    //     debugger
    // }
    // adding |\} seems conseal possible bug (inside template strings etc, but not haven't met yet)    

    // _exports += Array.from(content.matchAll(/(?:(?:^export )|(?:;|\})export)\{([\s\S]*?)\}/mg))   // support ;export{}
    //     .map((_exp, _i, arr) => benchmarkFunc(_applyObjectExport, _exp, _i, arr))
    //     .filter(Boolean)
    //     .join(', ').replace(/[\n\s]+/g, ' ');


    /// replace `export {a as A}` => `{a}` ??? - THE OP IS UNDER QUESTION; TODO remove and check - (detected on @uppy) - actually using for REEXPORT post-turning
    // content = content.replace(/^export \{[\s\S]*?([\w]+) as ([\w]+)[\s\S]*?\}/mg, (r) => r.replace(/([\w]+) as ([\w]+)/, '$2')); // 'var $2 = $1'    

} // => applyObjectExport() (look main js file)



// /**
//  * @deprecated
//  * @param {string} _exp 
//  * @param {number} index 
//  * @param {string[]} arr 
//  * @returns 
//  */
// function _applyObjectExport(_exp, index, arr) {

//     // POSSIBLE ERROR: doesn't support nested objects w more then one fields ({a: {b,c}}) <- can be fixed by analysis
//     // POSSIBLE ERROR: functions with multiple args <- -//-
//     // POSSIBLE ERROR: (-//- comma operator inside it, etc) - ! that's hard to analysys
//     // POSSIBLE ERROR: lines with commas inside it  <- special engine is required
//     // POSSIBLE ERROR: comments with commas inside  <- ? (-//- or --//-)

//     const expEntities = _exp[1].trim().split(/,\s*(?:\/\/[^\n]+)?/);  // {a, b: c, d\n\t, f} => ['a', 'b:c', 'd', 'f']
//     let expNames = expEntities.join(', ');
//     if (~expNames.indexOf(' as ')) {
//         // expNames = expNames.replace(/([\w]+) as ([\w]+)/, '$2');  // default as A => $2; A as default => '$2: $1'
//         expNames = expNames.replace(/([\w\$]+) as ([\w]+)/g, (m, g1, g2) => {
//             /// `export {default as Uppy}` => `export {Uppy}` cause of import `import {default as Uppy}` 'll be converted to `const {default: Uppy}`
//             /// <= THE CASE IS SUITE TO RE-EXPORTS CASES
//             /// `export {Uppy as default}` => export {default: Uppy}, cause of cann't be variable `default`: imports `import {Uppy as default} will be 
//             // `const {Uppy}` or `const {default: _?_default}` - i forgot

//             if (g1 == 'default') { // default as A => A
//                 return g2;
//             }
//             else if (g2 == 'default') { // A as default => default: A
//                 return `${g2}: ${g1}`;
//             }
//             else {
//                 return `${g2}: ${g1}`;
//             }

//             return g1 == 'default' ? g2 : `${g2}: ${g1}`;
//             // return g2 == 'default' ? `${g2}: ${g1}` : g2
//             // return `${g2}: ${g1}`
//         }); // default as A => $2; A as default => '$2: $1'
//     }
//     if (_exp[0][0] === ';' || _exp[0][0] === '}') {
//         ///FIX?ME possible bugs (cause of we assume that using fileStoreName (it should be package!) exists in modules) - 
//         // done specially for minified preact/hooks import
//         content = content.replace(/import\{([\w ]+)\}from['"](\w+)['"]/, (_m, $1, $2) => `const{${$1.replace(' as ', ':')}}=$${$2}Exports`);
//         isbuilt = true;
//         return expNames;
//     }
//     if (!globalOptions.advanced?.treeShake || !extractinNames)
//         return expNames;
//     /// if tree shaking (usefull when reexport is calling direct from entrypoint 
//     /// - (usualyy the similar work is in progress inside applyNamedImports, but there is this exception: 
//     /// --- first time calling applyNamedImports(while `extract` still is null on))
//     /// - just return '' => it means the module will not be handled via applyNamedImports and will be throw away from the build process
//     const extractExists = expNames.split(', ').filter(ex => {
//         // TREEEEEEEE-s
//         const isrequired = extractinNames.has(ex.split(':')[0]);
//         if (!isrequired) {
//             (fastShaker[fileStoreName] || (fastShaker[fileStoreName] = [])).push(ex);
//         }
//         return isrequired;
//         // return extractinNames.has(ex.split(':').pop().trim())
//     }); // expEntities

//     /**@if_dev */
//     if (extractExists.length) {
//         // TODO charge it to shakeBranch (to add exports on next imports if cutted)
//         return (_exports && ', ') + extractExists.join(', '); // works fine if just one imported. But what if more then one? 

//         // return (_exports && ', ') + expNames;  
//     }
//     else {
//         globalOptions.advanced.debug && console.warn(`! Exports does not found for ${fileStoreName}`);
//         return '';
//     }
//     /**@else */
//     return extractExists.join(', ');

// }