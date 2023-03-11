var builder = (function (exports, require$$0, require$$1) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

    var browser = {};

    var main = {};

    //@ts-check

    // import "fs";

    const fs = require$$0__default["default"];
    const path = require$$1__default["default"];

    const extensions = ['.ts', '.js'];
    var exportedFiles = [];

    // integrate("base.ts", 'result.js')



    main.default = main.build = main.combine = combine;
    main.integrate = integrate;


    // exports = {
    //     default: combine,
    //     build: combine,
    //     combine: combine,
    //     integrate,
    // }



    /**
     * @description remove lazy and import inserts into content
     * @param {string} content - source code content;
     * @param {string} dirpath - path to source directory name
     * @param {BuildOptions} options - options
     * @return {string} code with imported involves
     */
    function combine(content, dirpath, options) {

        exportedFiles = [];

        content = removeLazy(content);

        content = importInsert(content, dirpath, options);

        return content;
    }

    /**
     * 
     * @param {string} from - file name
     * @param {string} to - target name
     * @param {{ entryPoint?: string; release?: boolean; }} options - options
     * @returns 
     */
    function integrate(from, to, options) {

        let content = fs.readFileSync(from).toString();
        let filename = path.resolve(from);

        content = combine(content, path.dirname(filename), Object.assign({ entryPoint: path.basename(filename), release: false }, options));

        to = to || path.parse(filename).dir + path.sep + path.parse(filename).name + '.js';

        fs.writeFileSync(to, content);

        return content
    }


    /**
     * path manager
     */
    class PathMan {
        /**
         * @param {string} dirname
         * @param { (fileName: fs.PathOrFileDescriptor) => string} pullContent
         */
        constructor(dirname, pullContent) {
            this.dirPath = dirname;
            this.getContent = pullContent || getContent;
        }
    }


    class Importer {
        constructor(pathMan) {
            this.namedImportsApply = namedImports;
            this.moduleStamp = moduleSealing;
            this.pathMan = pathMan;
        }
    }



    /**
     * @typedef {{
     *    entryPoint: string; 
     *    release?: boolean;
     *    getContent?: (filename: fs.PathOrFileDescriptor) => string
     * }} BuildOptions
     */


    /**
     * 
     * @param {string} content - content (source code)
     * @param {string} dirpath - source directory name
     * @param {BuildOptions} options - options
     */
    function importInsert(content, dirpath, options) {

        let pathman = new PathMan(dirpath, options.getContent || getContent);

        // let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
        content = new Importer(pathman).namedImportsApply(content);

        content = '\n\n//@modules:\n\n\n' + Object.values(modules).join('\n\n') + `\n\n\n//@${options.entryPoint}: \n` + content;

        ///* not recommended, but easy for realization:
        // const regex = /^import \"\.\/(?<filename>\w+)\"/gm;    
        // content = content.replace(regex, allocPack.bind(pathman)); //*/

        // regex = /^import {([\w, ]+)} from \".\/(\w+)\"/gm
        // content = content.replace(moduleSealing.bind(pathman)); //*/

        if (options && options.release) {
            // remove comments:
            content = content.replace(/\/\*[\s\S]*?\*\//g, '');
            content = content.replace(/\/\/[\s\S]*?\n/g, ''); //*/
        }

        return content
    }


    const modules = {};



    /**
     * replace imports to object spreads and separate modules
     * @param {string} content
     * @param {string?} [root]
     * @this {Importer}
     * 
     * @example:
     * 
     * Supports following forms:
     * 
     * ```
     * import defaultExport from "module_name";
     * import * as name from "./module-name"
     * import { export } from "./module_name"
     * import { export as alias } from "./module_name"
     * import { export1, export2 } from "./module_name"
     * import { export1, export2 as a } from "./module_name"
     * import "./module_name"
     * ```
     * 
     * Unsupported yet:
     * ```
     * import defaultExport, * as name from "./module-name";
     * import defaultExport, { tt } from "./module-name";
     * ```
     */
    function namedImports(content, root) {

        // const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?".\/([\w\-\/]+)"/gm;
        const regex = /^import (((\{([\w, ]+)\})|([\w, ]+)|(\* as \w+)) from )?\".\/([\w\-\/]+)\"/gm;
        const imports = new Set();

        const _content = content.replace(regex, (match, __, $, $$, /** @type string */ classNames, defauName, moduleName, fileName, offset, source) => {

            const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

            if (!modules[fileStoreName]) this.moduleStamp(fileName, root || undefined);
            if (defauName && inspectUnique(defauName)) return `const { default: ${defauName} } = $$${fileStoreName}Exports;`;
            else if (moduleName) return `const ${moduleName} = $$${fileStoreName}Exports;`;
            else {
                let entities = classNames.split(',').map(w => (~w.indexOf(' as ') ? (`${w.split(' ').shift()}: ${w.split(' ').pop()}`) : w).trim());
                for (let entity of entities) {
                    if (!~entity.indexOf(':')) entity = entity.split(': ').pop();
                    inspectUnique(entity);
                }
                return `const { ${classNames} } = $$${fileStoreName}Exports;`;
            }
        });


        return _content;


        /**
         * @param {string} entity
         */
        function inspectUnique(entity) {

            if (imports.has(entity)) {
                console.warn('Duplicating the imported name');
                return false
            }
            else {
                imports.add(entity);
                return true;
            }
        }
    }



    /**
     * seal module
     * @param {string} fileName
     * @param {string?} root
     * @this {Importer} 
     */
    function moduleSealing(fileName, root) {

        // extract path:

        let content = this.pathMan.getContent(fileName);

        const fileStoreName = ((root || '') + fileName).replace(/\//g, '$');

        if (content == '') return '';
        else {
            let execDir = path ? path.dirname(fileName) : fileName.split('/').slice(0, -1).join('/');
            // let execDir = path.dirname(fileName)
            
            execDir = (execDir === '.' ? '' : execDir);
            const _root = (root ? (root + (execDir ? '/' : '')) : '') + execDir;
            content = namedImports(content, _root);
        }

        // matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) = [^\n]+/gm))
        // matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))
        // matches3 = Array.from(content.matchAll(/^export (class) (\w+)([\s]*{[\w\W]*?\n})/gm))
        // var matches = matches1.concat(matches2, matches3);

        let matches = Array.from(content.matchAll(/^export (class|function|let|const|var) ([\w_\n]+)?[\s]*=?[\s]*/gm));
        let _exports = matches.map(u => u[2]).join(', ');

        let defauMatch = content.match(/^export default ([\w_\n]+)/m);
        if (defauMatch) {
            _exports += ', default: ' + defauMatch[1];
        }

        _exports = `exports = { ${_exports} };\n`;

        content = content.replace(/^export (default )?/gm, '') + '\n\n' + _exports + '\n' + 'return exports';
        content = `const $$${fileStoreName}Exports = (function (exports) {\n ${content.split('\n').join('\n\t')} \n})({})`;

        modules[fileStoreName] = content;

        // content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n` 

        return content;
    }




    /**
     * @param {fs.PathOrFileDescriptor} fileName
     */
    function getContent(fileName) {

        fileName = path.normalize(this.dirPath + path.sep + fileName);

        for (let ext of extensions) {
            if (fs.existsSync(fileName + ext)) {
                fileName = fileName + ext;
                break;
            }
        }

        if (exportedFiles.includes(fileName)) {

            // let lineNumber = source.substr(0, offset).split('\n').length
            console.warn(`attempting to re-import '${fileName}' into 'base.ts' has been rejected`);
            return ''
        }
        else exportedFiles.push(fileName);


        var content = fs.readFileSync(fileName).toString();

        // content = Convert(content)

        return content;
    }


    /**
     * Remove code fragments marked as lazy inclusions
     * @param {string} content - content
     */
    function removeLazy(content) {

        return content.replace(/\/\*@lazy\*\/[\s\S]*?\/\*_lazy\*\//, '');
    }

    const pack = main.combine;

    var pack_1 = browser.pack = pack;

    exports["default"] = browser;
    exports.pack = pack_1;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, null, null);
