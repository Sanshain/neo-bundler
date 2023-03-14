
//@ts-check


var buildFile = require('../../source/main').integrate
var pack = require('../../source/main').combine
const createEnv = require('../mocha').createEnv;


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
            sourceMaps: true
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
    else if (typeof test !== 'string'){
        console.log(test);
    }

});

// exports.testOptions = testOptions;