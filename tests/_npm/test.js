//@ts-check

// var njstrace = require('njstrace').inject();

const buildFile = require('../../source/main').integrate
const { encode } = require('sourcemap-codec');


const path = require('path');
const assert = require('assert');



const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./src/app.js"),
    targetPoint: path.join(__dirname, "./dist/app.js"),
})


const r = buildFile(testOptions.entryPoint, testOptions.targetPoint, {
    // entryPoint: path.basename(entryPoint)       
    verbose: true,    
    // release: true,
    // sourceMaps: { encode, external: false },    
    advanced: {
        // debug: true,
        treeShake: {
            method: 'surface',
            exclude: new Set([
                'classnames'
            ])
        },
        allFilesAre: 'reqular files',
        handleRequireExpression: 'as esm import',
        dynamicImports: {
            root: 'dist/'
        },
        optimizations: {
            ignoreDynamicImports: true
        }
    },
    experimental: {
        withConditions: true
    }
    // getSourceMap(info) {
    //     const { mapping, files } = info;
    //     // console.log(info.files.length);
    //     // debugger
    // }
})

assert(r);