//@ts-check


import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import path from "path";

// import dts from "rollup-plugin-dts";
// import typescript from '@rollup/plugin-typescript';

const configs = [
    {
        input: './source/browser.js',
        output: [
            {
                file: './build/builder.iife.js',
                format: 'iife',
                name: "builder",
                exports: 'named',
                globals: {
                    fs: 'null',
                    path: '{basename: (str) => str.split(/[\/\\]/).pop()}'
                },
            },       
        ],
        // plugins: [
        //     uglify()
        // ]
    },
    {
        input: './source/__bin.js',
        // exports: 'default',
        output: {
            file: './bin/neo.js',
            format: 'cjs',
            exports: 'auto',
        },
        // #!/usr/bin/env node
        plugins: [
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
            file: './build/builder.es.js',
            format: 'es',
            // exports: 'auto',
        },
        plugins: [
            // dts(),            
        ]
    }
]


module.exports = configs.map(config => {
    return {
        ...config,
        plugins: [
            resolve({
                browser: true
            }),
            commonjs(),
            ...config.plugins || []
        ]
    }
}) 