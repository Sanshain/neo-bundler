
//@ts-check


var buildFile = require('../../source/main').integrate
// var pack = require('../../source/main').combine
// const createEnv = require('../mocha').createEnv;
const { encode } = require('sourcemap-codec');


const path = require('path');
const assert = require('assert');
const fs = require('fs');
// const { execSync } = require("child_process");


const testOptions = Object.seal({
    entryPoint: path.join(__dirname, "./source/index.js"),
    targetPoint: path.join(__dirname, "./build/app.js"),
})



const Tests = { ...testOptions,
    
    test_buildToFile() {

        const r = buildFile(this.entryPoint, this.targetPoint, {
            // entryPoint: path.basename(entryPoint)            
            sourceMaps: { encode, external: false },
            // getSourceMap(r) { console.log(r.files.length); }
            advanced:{
                require: 'same as imports'
            },
            getSourceMap(info) {
                const { mapping, files } = info;
                debugger
            }
        })

        assert(r);
    },
}



Object.entries(Tests).map(([name, test]) => [name, typeof test == 'function' ? test.bind(testOptions) : test]).forEach(async ([name, test]) => {

    if (typeof test == 'function') {
        
        console.time(name)
        {
            if (Object.getPrototypeOf(test).constructor.name.startsWith('Async')) {
                await test()
            }
            else {
                test();
            }
            console.log(`\x1B[34m${name} test is success\x1B[36m`)
        }
        console.timeEnd(name)

        console.log('\x1B[0m');
    }
    else if (typeof test !== 'string') {
        
        // log initial env if exists
        console.log(test);
    }

});

// 

// exports.testOptions = testOptions;

// rollup -i ./source/index.js -o ./build/app.rollup.js -p @rollup/plugin-commonjs -p @rollup/plugin-node-resolve -p rollup-plugin-uglify
// rollup -i ./source/index.js -o ./build/app.rollup.js -p @rollup/plugin-commonjs -p @rollup/plugin-node-resolve