//@ts-check

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';



// import { uglify } from 'rollup-plugin-uglify';
// import es3 from 'rollup-plugin-es3';

// import fs from "fs";
// import path from "path";


// TODO autocreate directory like rollup do it


export default {
    input: 'src/app.js',
    output: {
        file: 'build/app.js',
        format: 'iife',
        globals: {
            // '@emotion/react': 'preact',			
        }
    },
    external: [],
    plugins: [
        // linaria({
        //     sourceMap: process.env.NODE_ENV !== 'production',
        // }),
        // css({ output: 'bundle.css' }),

        // alias({
        //     entries: [
        //         { find: 'react', replacement: 'preact/compat' },
        //         { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        //         { find: 'react-dom', replacement: 'preact/compat' }
        //     ]
        // }),

        // nodeResolve({
        //     module: true,
        //     jsnext: true,
        // }),
        
        resolve(),
        commonjs()
        // uglify({
        // 	output: { comments: false },
        // 	mangle: {
        // 		toplevel: true,
        // 		properties: { regex: /^_/ }
        // 	}
        // }),
        // es3()

    ]
};

