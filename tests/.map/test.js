//@ts-check

const { encode, decode } = require('sourcemap-codec');
const { decodeLine } = require("./test.map");
const { integrate: buildFile } = require('../../source/main')
const fs = require("fs");
const path = require("path");

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

const r = buildFile(testOptions.entryPoint, testOptions.targetPoint, {
    // entryPoint: path.basename(entryPoint)
    
    //@ts-expect-error
    sourceMaps: true,

    getSourceMap(obj) {
        sourceMapInfo = obj;
    }
})

try {
    require(testOptions.targetPoint)
}
catch (err) {
    const errorLines = err.stack.split('\n');
    const message = errorLines[0]
    let [line, ch] = errorLines[1].split(':').slice(-2)
    const lineDebugInfo = sourceMapInfo.mapping[line - 1];
    console.log(`${message}\n\t at line ${lineDebugInfo[2]} in "./${sourceMapInfo.files[0]}"`);
    // console.log(r);
}
