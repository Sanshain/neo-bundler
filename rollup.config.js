//@ts-check


const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const json = require("@rollup/plugin-json").default;
const path = require("path");
const { uglify } = require("rollup-plugin-uglify");

// import dts from "rollup-plugin-dts";
// import typescript from '@rollup/plugin-typescript';

const outputConfig = {
    strict: false,
}

const configs = [
    {
        input: './source/browser.js',
        output: [
            {
                ...outputConfig,
                file: './build/builder.iife.js',
                format: 'iife',
                name: "builder",
                exports: 'named',
                globals: {
                    fs: 'null',
                    // path: '{basename: ' + ((str) => str.split(/[\/\\]/).pop()).toString() + '}'
                    path: {
                        basename: ((str) => str.split(/[\/\\]/).pop()).toString(),
                        dirname: (str) => {
                            const dirTree = str.split(/[\/\\]/).slice(-2);
                            if (dirTree.length == 1) return '.';
                            else {
                                return dirTree.shift();
                            }
                        },
                        join: function () {
                            const paths = Array.prototype.slice.call(arguments).map(f => f.replace('./', ''));
                            // TODO for (item in paths) if (../) remove();
                            for (let i = paths.length; i >= 0; i--) {
                                if (paths[i].startsWith('../')) {
                                    paths[i-1] = ''
                                }
                            }
                            return paths.join('/');
                        },
                        toString: function() { var r = ''; for (var k in this) r += k + ': ' + this[k].toString() + ','; return '{ ' + r + ' }' }
                    }.toString()
                },
            },       
        ],
        // plugins: [
        //     uglify()
        // ]
    },
    {
        input: './source/$bin.js',
        // exports: 'default',
        output: {
            ...outputConfig,
            file: './bin/neo.js',
            format: 'cjs',
            exports: 'auto',
        },
        // #!/usr/bin/env node
        plugins: [
            json(),
            {
                name: 'rollup-plugin-shebang-insert',
                /**
                 * @param {{file: string}} opts - options
                 * @param {{[fileName: string]: {code: string}}} bundle 
                 */
                generateBundle(opts, bundle) {                        

                    const file = path.parse(opts.file).base
                    let code = bundle[file].code;
                    bundle[file].code = '#!/usr/bin/env node\n\n' + bundle[file].code
                }
            },
            // uglify()
        ]
    },
    {
        input: './source/main.js',
        output: {
            ...outputConfig,
            file: './build/builder.es.js',
            format: 'es',            
            // exports: 'auto',
        },
        plugins: [
            // dts(),
        ]
    },
    // {
    //     input: './source/main.js',
    //     output: {
    //         file: './build/builder.cjs.js',
    //         format: 'cjs',
    //         // exports: 'auto',
    //     },
    //     plugins: [
    //         // dts(),            
    //     ]
    // }
]


module.exports = configs.map(config => {
    return {
        ...config,
        plugins: [
            resolve({
                browser: true                
            }),
            commonjs({
                // transformMixedEsModules: true,
                // strictRequires: true,

                // ignore: [],
                // requireReturnsDefault: false
                
                ignoreDynamicRequires: true,
            }),
            ...config.plugins || []
        ]
    }
})

