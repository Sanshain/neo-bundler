//@ts-check

const { execSync } = require('child_process');
const path = require('path');
const { performance } = require('perf_hooks');


const scriptname = `node ./${process.cwd().endsWith('_npm') ? 'test.js' : 'tests/_npm/test.js'}`

runTest(scriptname);

// const esbuildShell = `node node_modules/esbuild/bin/esbuild --outfile=./release/app.js ./${process.cwd().endsWith('_npm')
//     ? ''
//     : 'tests/_npm/'}src/app.js --bundle --tree-shaking=true`

// runTest(esbuildShell);


/**
 * @param {string} scriptname
 * @param {number} [timeout]
 * @param {number} [limit]
 */
function runTest(scriptname, timeout = 1000, limit = 10) {
    
    let step = 0;
    let counter = 0;
    let $counter = 0;

    setTimeout(function run() {
        const start = performance.now();

        const r = execSync(scriptname, { stdio: 'pipe' });

        const time = +r.toString().match(/built in\: (?<time>[\d]+)/)?.groups?.time;
        
        // // const time = +r.toString().match(/(?:built in\: )|(?:Done in )(?<time>[\d]+)/).groups.time;
        // // const time = +r.toString().match(/Done in (?<time>[\d]+)/).groups.time;

        if (time) {
            console.log(`Step ${step}: \x1b[34m${time} ms\x1b[0m`); //
            counter += time;
        }

        step++
        const timeMeasure = performance.now() - start        
        // console.log(`${step} => \x1b[34m${timeMeasure.toFixed(1)} ms\x1b[0m`); //
        $counter += timeMeasure;

        if (step < limit)
            setTimeout(run, timeout);
        else {
            time && console.log(`\x1b[33m${counter / step}\x1b[0m`);
            console.log(`\x1b[33m${($counter / step).toFixed(1)}\x1b[0m`);
        }

    }, timeout);
}
// debugger