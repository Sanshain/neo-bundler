
//@ts-check
// import assert from 'assert';

// TODO
// import defaultExport, { export [, […]] } from "module-name";         // not implemented yet
// import "module-name";                                                // implemented


import * as mod from "./nested_directory/module"
import { months, ads, a as flatVar } from "./nested_directory/module"
import Cls from "./nested_directory/named_default"
import Cls1 from "./nested_directory/unnamed_default"


console.log('>'.repeat(25));

const tests = [
    {
        name: 'named import',
        up: () => months.length === 9,
    },
    {
        name: 'named import',
        up: () => ads() === 1,
    },
    {
        name: 'alias import',
        up: () => flatVar === 66,
    },
    {
        name: 'default named import',
        up: () => new Cls,
    },
    {
        name: 'default unnamed import',
        up: () => new Cls1().a === 1,
    },
    {
        name: 'module import',
        up: () => mod.a === flatVar,
    },
    {
        name: 'require is same as import',
        up: () => {
            const { a } = require('./nested_directory/named_default')
            return a == 13;
        }
    }
]

tests.forEach(test => {
    if (test.up()) console.log('\t' + test.name + ' is success');
    else {
        throw new Error(test.name + ' is failed')
    }
})

var a = months;

console.log('<'.repeat(25));

// console.log(a);

// rollup -i index.js -o t.js -p @rollup/plugin-commonjs -p @rollup/plugin-node-resolve -p rollup-plugin-uglify