//@ts-check

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
    // sourceMaps: { encode, external: false },    
    advanced: {
        handleRequireExpression: 'as esm import',
        dynamicImports: {
            root: 'dist/'
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
