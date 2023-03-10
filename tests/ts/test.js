//@ts-check

// TODO remove:
// const { expect, jest, test } = require('@jest/globals');
// const { expect, jest, test } = require('jest-without-globals');
// test('buildInBrowser', () => {
//     expect(Math.max(1, 5, 10)).toBe(10);
// });
// test.only()

const mocha = require('mocha')       // chai error and some errors inside mocha
const assert = require("assert");
// const jsdom = require("jsdom").JSDOM;


// const test = require('ava');
// const testling = require('testling');
// test('addition', t => {
//     t.is(add(2, 3), 5);
// });

// testling(test);



var buildFile = require('../../source/main').integrate
var pack = require('../../source/main').combine

const path = require('path');
const fs = require('fs');


const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./source/index.ts"),
    targetPoint: path.join(__dirname, "./build/app.js"),
})



const Tests = { ...testOptions,
    
    buildToFile() {

        const r = buildFile(this.entryPoint, this.targetPoint, {
            // entryPoint: path.basename(entryPoint)
        })

        return r;
    },

    buildContent() {

        const content = fs.readFileSync(this.entryPoint).toString();

        const r = pack(content, '', {
            entryPoint: 'app.ts'
        })

        let expected = fs.readFileSync(this.targetPoint).toString()
        let success = r == expected.replace('index.ts', 'app.ts');
        if (!success) {
            throw new Error('buildContent: result is not match expected value')
        }
        return success
    },

    buildInBrowser() {        
        
    },
}


Object.entries(Tests).map(([name, test]) => [name, typeof test == 'function' ? test.bind(testOptions) : test]).forEach(([name, test]) => {

    if (typeof test == 'function') {
        
        console.time(name)
        {
            test();
            console.log(`\x1B[34m${name} test is success\x1B[36m`)
        }
        console.timeEnd(name)

        console.log('\x1B[0m');
    }

});