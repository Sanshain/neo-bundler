import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// import typescript from '@rollup/plugin-typescript';

module.exports = {
    input: './source/browser.js',
    output: {
        file: './build/builder.js',
        format: 'iife',
        name: "builder",
        exports: 'named',
        globals: {
            fs: 'null',
            path: 'null'
        }
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs()
    ]
};