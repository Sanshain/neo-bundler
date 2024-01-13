//@ts-check

const { benchmarkFunc, benchStore } = require("./benchmarks");

exports.AbstractImporter = class AbstractImporter{

    /**
     * @type {Array<string>} - for dynamic imports
     */
    dynamicModulesExported = null;

    /**
     * @description - file, where imprting is in progress
     * @type {string}
     */
    get currentFile() {
        return this.progressFilesStack.at(-1)
    }

    /**
     * current file stack of all handled files at the momend (includes dyn and stat imports)
     */
    progressFilesStack = []


    /**
     * @description current linked modules path stack
     * @type {string[]}
     */
    linkedModulePaths = [];
    
    
    // /**@debug */
    // /**
    //  * 
    //  */
    // benchmarkFunc = benchmarkFunc
    // /**@end_debug */
}


