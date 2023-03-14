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



const r = buildFile(testOptions.entryPoint, testOptions.targetPoint, {
    // entryPoint: path.basename(entryPoint)
    sourceMaps: true
})


console.log(r);
