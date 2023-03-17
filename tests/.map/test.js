//@ts-check


const { decodeLine } = require("./test.map");
const { encode, decode } = require('sourcemap-codec');

const { integrate: buildFile } = require('../../source/main')
const path = require("path");
const { execSync } = require("child_process")


const fs = require("fs");




const sourcemapFile = fs.readFileSync('./source/target.js.map').toString()

/**
 * @type {{
 *  mappings: string
 * }}
 */
const map = JSON.parse(sourcemapFile);

// let r = decodeLine(map.mappings.split(';')[0].split(',')[0])
// let r = decode(map.mappings)






const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./source/index.js"),
    targetPoint: path.join(__dirname, "./build/app.js"),
})

/**
 * @type {{
 *  mapping: number[][]
 *  files: string[]
 * }}
 */
let sourceMapInfo = null;

const sourcemapGen = 'sourcemap_gen';

console.time(sourcemapGen)


const r = buildFile(testOptions.entryPoint, testOptions.targetPoint, {
    // entryPoint: path.basename(entryPoint)
    
    advanced: { incremental: true },

    sourceMaps: {
        encode,
        charByChar: true
    },
    logStub: true,

    // /**
    //  * lightweight sourcemap generation
    //  * @param {*} obj 
    //  */
    getSourceMap(obj) {
        sourceMapInfo = obj;
    }
})


console.timeEnd(sourcemapGen)


if (sourceMapInfo) try {
    require(testOptions.targetPoint)
}
catch (err) {
    const errorLines = err.stack.split('\n');
    const message = errorLines[0]
    let [line, ch] = errorLines[1].split(':').slice(-2)
    const lineDebugInfo = sourceMapInfo.mapping[line - 1];
    if (typeof lineDebugInfo[2] === 'number') {
        // is number
        console.log(`${message}\n\t at line ${lineDebugInfo[2] + 1} in "./${sourceMapInfo.files[lineDebugInfo[1]]}"`);
    }
    else {
        // is Array
        const debugInfo = lineDebugInfo[0];
        console.log(`${message}\n\t at line ${debugInfo[2] + 1} in "./${sourceMapInfo.files[debugInfo[1]]}"`);
    }
    // console.log(r);
}

// execSync(`start ${"./build/index.html"}`)