exports.releaseProcess = function releaseProcess(options, content) {
    if (options.sourceMaps) {
        console.warn('Generate truth sourcemaps with options `release = true` is not guaranteed');
    }

    // remove comments:
    // keeps line by line sourcemaps:
    content = content.replace(/console\.log\([^\n]+?\);/g, ''); //*/ remove logs

    // content = content.replace(/(?<!\*)[\s]*\/\/[\s\S]*?\n/g, options.sourceMaps ? '\n' : '');               //*/ remove comments
    content = content.replace(/^[\s]*\/\/[\s\S]*?\n/gm, options.sourceMaps ? '\n' : ''); //*/ remove comments    


    /// it breaks sourcemaps:

    if (!options.sourceMaps) {
        // content = content.replace(/^[\s]*/gm, ''); //*/                                                  // remove unnecessary whitespaces in line start
        // drop sourcemaps:
        /// TODO? here it would be possible to edit the sorsmap in the callback:
        content = content.replace(/\/\*[\s\S]*?\*\//g, () => ''); // remove multiline comments
        // it breaks sourcemaps
        content = content.replace(/^[\t ]+\{[\n\r,\w\t ]+\}\r?\n/gm, '')
    }

    return content;
}