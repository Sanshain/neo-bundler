//@ts-check

const buildFile = require('../../source/main').integrate
const { encode } = require('sourcemap-codec');


const path = require('path');
const assert = require('assert');

// const esbuild = require("esbuild");

// esbuild.buildSync({
//     entryPoints: ['app.js'],
//     outfile: '',
//     bundle: true,
//     treeShaking: true
// })

const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./src/app.js"),
    targetPoint: path.join(__dirname, "./dist/app.js"),
})

const r = buildFile(testOptions.entryPoint, testOptions.targetPoint, {
    // entryPoint: path.basename(entryPoint)            
    // sourceMaps: { encode, external: false },    
    release: true,
    verbose: true,
    advanced: {
        requireExpression: 'same as import',
        dynamicImportsRoot: 'dist/',
        treeShake: true,
        debug: true,
        dynamicImports: {
            // foreignBuilder: null    // 
        }
        // incremental: true
    },    
    // getSourceMap(info) {
    //     const { mapping, files } = info;
    //     // console.log(info.files.length);
    //     // debugger
    // }
})

assert(r);

console.log('success')
