//@ts-check

/**
 * 
 * @param {import("../main").BuildOptions} globalOptions
 * @param {string} mergedContent 
 * @param {Record<string, string>} modules 
 */
exports.violentShake = function (globalOptions, mergedContent, modules) {
    return modules
    for (const key in modules) {
        if (!modules[key]) {
            continue
        }
        // const exportsReg = /exports = \{ ([\w ,\:\$]+) \};/;
        const exportsReg = /exports = \{ ([\w ,\:\$]*) \};/;
        // const exportExprs = modules[key].match(exportsReg)[1].split(',').map(w => w.split(':').pop())

        if (modules[key].match(exportsReg) == null) {
            debugger
        }
        const exports = modules[key].match(exportsReg)[1].split(',').filter(Boolean).map(w => w.split(':')[0].trim());

        for (const _exp of exports) {

            // [content].concat(Object.values(modules)).some(v => v.match(new RegExp(`const { [\\w\\d_\\$: ]*\\b${_exp}\\b[: \\w\\d_\\$]* } = \\$` + modules[key] + 'Exports;')))

            // const matches = content.match(new RegExp(`const \{ [\\w\\d_\\$: ]*\\b${_exp}\\b[: \\w\\d_\\$]* \} = \\$` + modules[key] + 'Exports;'))
            const usagePattern = new RegExp(`const \\{ [\\w\\d_\\$:, \n]*\\b${_exp}\\b[: \\w\\d_\\$,\n]* \\} = \\$` + key.replace(/\$/g, '\\$') + 'Exports;?');
            const matches = mergedContent.match(usagePattern)
            if (!matches) {

                // removes unused expressions from the source file:
                // \n?\t?
                const reg = new RegExp(`(function) ${_exp}\\([\\w\\d, \\{\\}\\$]*\\)\\s*\\{[\\s\\S]*?\\n\\t\\}\\r?\\n`, 'm');
                const funcDef = modules[key].match(reg) || modules[key].match(
                    new RegExp(`(const|let|var) ${_exp} = \\([\\w\\d, \\{\\}\\$]*\\) ? =\\> \\{[\\s\\S]*?\\n\\t\\}\\r?\\n`)
                ) || modules[key].match(new RegExp(
                    `class ${_exp}( (?:extends|implements) [\\w\\d\\$_]+,)? ?\\{[\\s\\S]*?\\n\\t\\}\\r?\\n`
                ))

                // || modules[key].match(new RegExp(`(const|var|let) ${_exp} = (\\d+|['"][\s\S]*['"]);?\\r?\\n`))

                if (!funcDef) {
                    if (globalOptions.verbose && globalOptions.advanced.debug) {
                        console.warn(`-> tree-shaking: skiped shaking of '${_exp}' export during "${key}" importing (is alias or is not function or unfound)`);
                    }
                    continue;
                }

                let treeShakedModule = modules[key].replace(funcDef[0], '').replace(exportsReg, m => m.replace(new RegExp(`${_exp},? ?`), ''));  // `${_exp},? ?`
                let exprMatch = null;
                if (exprMatch = treeShakedModule.match(new RegExp(`\\b${_exp}\\b`))) {
                    // modules[key] = treeShakedModule;
                    // DO NOTHING
                    // debugger
                }
                else {
                    // IF the exported func DOES NOT USED ANYMORE

                    // TODO also replace all unused classes and imported stuffs
                    // treeShakedModule = treeShakedModule.replace(/\n?\t?function (?<fname>[\w\d\$_]+)\([\w\d_\$, \{\}]*?\) ?\{[\S\s]*?\n\t\}\r?\n/g, (m, name) => {
                    treeShakedModule = treeShakedModule.replace(/\n?\t?function (?<fname>[\w\d\$_]+)\([\w\d_\$, \{\}]*?\) ?\{[\S\s]*?\n\t\}/g, (m, name) => {
                        if (!~name.indexOf('$')) {
                            const used = treeShakedModule.replace(m, '').match(new RegExp(`\\b${name}\\b`));
                            if (used) return m;
                            else {
                                return `// function "${name}" violently tree shaked `
                            }
                        }
                        else {
                            return m;
                        }
                    })
                    modules[key] = treeShakedModule;

                    // check all modules function used inside the treeshaked function
                }
            }
        }
    }
}



exports.theShaker = {

    globalOptions: null,

    /**
     * @description store tree shaked modules to compare w dynamic import modules
     * @type {Record<string, {content: string, shaked: string[], extracted?: string[]}>}
     */
    shakedStore: {},

    /**
     * 
     * @param {*} exports 
     * @param {{
     *  exports$: string[],
     *  content: string,
     *  preShakeUp(s: string)
     *  onMiss(s?: string)       // miss tree shaking
     * }} _oprions 
     * @returns {string}
     */
    work({ extracting, exports$, content, preShakeUp, onMiss }) {

        const globalOptions = this.globalOptions;

        for (const _export of exports$) {

            const [outName, inName] = _export.split(':').map(s => s.trim());

            if (~extracting.indexOf(outName)){
                continue
            }
            
            const reg = new RegExp(`(function) ${_export}\\([\\w\\d, \\{\\}\\$]*\\)\\s*\\{[\\s\\S]*?\\n\\}\\r?\\n`, 'm');
            const funcDef = content.match(reg) || content.match(
                new RegExp(`(const|let|var) ${_export} = \\([\\w\\d, \\{\\}\\$]*\\) ? =\\> \\{[\\s\\S]*?\\n\\}\\r?\\n`)
            ) || content.match(new RegExp(
                `class ${_export}( (?:extends|implements) [\\w\\d\\$_]+,)? ?\\{[\\s\\S]*?\\n\\}\\r?\\n`
            ))

            // || content.match(new RegExp(`(const|var|let) ${_exp} = (\\d+|['"][\s\S]*['"]);?\\r?\\n`))

            if (!funcDef) {
                if (globalOptions.verbose && globalOptions.advanced.debug) {
                    onMiss(_export)
                    // console.warn(`-> tree-shaking: skiped shaking of '${_export}' export during "${importer.currentFile}" importing (is alias or is not function or unfound)`);
                }
                // return content;
                continue
            }

            let treeShakedModule = content.replace(funcDef[0], '')  // .replace(exportsReg, m => m.replace(new RegExp(`${_export},? ?`), ''));  // `${_exp},? ?`

            if (treeShakedModule.match(new RegExp(`\\b${_export}\\b`))) {
                continue
                // return content;
            }
            else {
                // IF the exported func DOES NOT USED ANYMORE
                const shakedEffect = [_export]

                // TODO also replace all unused classes and imported stuffs                
                content = treeShakedModule.replace(
                    /\n?\t?(?<isExported>export (?:default ))?function (?<fname>[\w\d\$_]+)\([\w\d_\$, \{\}]*?\) ?\{[\S\s]*?\n\}/g,
                    (m, isExported, name) => {
                        if (~extracting.indexOf(name)) {
                            return m;
                        }
                        else if (!~name.indexOf('$')) {
                            const used = treeShakedModule.replace(m, '').match(new RegExp(`\\b${name}\\b`));
                            if (used) return m;
                            else {
                                if (~exports$.indexOf(name)) {
                                    shakedEffect.push(name);
                                }
                                return `// function "${name}" violently tree shaked `
                            }
                        }
                        else {
                            return m;
                        }
                    }
                )                
                preShakeUp(shakedEffect)

                // check all modules function used inside the treeshaked function
            }
            // }
        }
        return content;
    }
}
