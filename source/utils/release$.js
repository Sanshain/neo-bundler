function releaseProcess(options, content) {
    if (options.sourceMaps) {
        console.warn('Generate truth sourcemaps with options `release = true` is not guaranteed');
    }

    // remove comments:
    
    // keeps line by line sourcemaps:
    content = content.replace(/console\.log\([^\n]+?\);/g, '');                                                 //*/ remove logs

    // content = content.replace(/(?<!\*)[\s]*\/\/[\s\S]*?\n/g, options.sourceMaps ? '\n' : '');                //*/ remove comments?

    // content = content.replace(/^[\s]*\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : '');                     /*/ remove one-line comments    

    // content = content.replace(/(?<=\n[^'"]*)\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : '');               //*/ remove one-line comments - just in end of
    // content = content.replace(/(?<=\n[^'"]*)(?<!\\)[\t ]*\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : '');  //*/ remove one-line comments - works fine, but too slowly!

    // content = content.replace(/(?<!['"][^\n]*?)[\t ]+\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : '');     //*/ remove one-line comments  - 
    content = content.replace(/(?<!['"/][^\n]*?)[\t ]*\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : '');     //*/ remove one-line comments

    /// it breaks sourcemaps:

    if (!options.sourceMaps) {
        content = content.replace(/^([\s]*?\n){3}([\s]*?\n)*/gm, '\n'); //*/        // remove empty lines 

        // drop sourcemaps:
        /// TODO? here it would be possible to edit the sorsmap in the callback:
        content = content.replace(/(?<!['"/][^\n]*?)\/\*[\s\S]*?\*\//g, () => '');                   // remove multiline comments
        // it breaks sourcemaps
        content = content.replace(/^[\t ]+\{[\n\r,\w\t ]+\}\r?\n/gm, '')            // remove useles scopes // (?: \/\/[\s\S]*?)        
    }

    return content;
}



/**
 * Remove code fragments marked as lazy inclusions
 * @param {string} content - content
 */
function cleaningDebugBlocks(content) {

    // return content.replace(/\/\*@lazy\*\/[\s\S]*?\/\*_lazy\*\//, '');

    return content.replace(/\/\*\@if_dev ?\*\/[\s\S]*?\/\*\@end_if ?\*\//, '');
    /**@if_dev */
    /// this code will be removed:
    /// for example here may be placed time measurement or another statistic and advanced object to store it
    /// TODO /**@else */
    /**@end_if */
}

module.exports = {
    cleaningDebugBlocks,
    releaseProcess
}