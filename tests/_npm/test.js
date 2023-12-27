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
        treeShaking: {
            exclude: new Set([
                'classnames'
            ])
        },
        requireExpr: 'same as import',
        dynamicImportsRoot: 'dist/'
    },    
    // getSourceMap(info) {
    //     const { mapping, files } = info;
    //     // console.log(info.files.length);
    //     // debugger
    // }
})

assert(r);