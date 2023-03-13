//@ts-check

const { encode, decode } = require('sourcemap-codec');
const { decodeLine } = require("./test.map");
const fs = require("fs");

const sourcemapFile = fs.readFileSync('./source/target.js.map').toString()

/**
 * @type {{
 *  mappings: string
 * }}
 */
const map = JSON.parse(sourcemapFile);

let r = decodeLine(map.mappings.split(';')[0].split(',')[0])
// let r = decode(map.mappings)

console.log(r);
