//@ts-check
const { performance } = require('perf_hooks');


/**
 * @type {Record<string, {time: number, count: number}>}
 */
const benchStore = Object.setPrototypeOf({}, {
    toString() {
        let r = Object.entries(this).map(([k, v]) => typeof v === 'object' ? `- \x1B[90m${k}: \x1B[32m${v.count} times (${v.time.toFixed(3)} ms)\x1B[0m` : '').join('\n')
        return r //+ '\n'
    }
});

const stack = []

/**
 * @param {Function} func
 * @param {any[]} args
 */
function benchmarkFunc(func, ...args) {
    const start = performance.now()

    const result = func(...args)
    
    // const funcName = func.name || func.toString()

    // _commitMark$(start, funcName);

    return result;
}

/**
 * @param {number} [start]
 * @param {string} [funcName]
 */
function _commitMark$(start, funcName) {
    if (!benchStore[funcName]) {
        benchStore[funcName] = {
            time: performance.now() - start,
            count: 1
        };
    }
    else {
        benchStore[funcName].time += performance.now() - start;
        benchStore[funcName].count++;
    }
}


exports.benchmarkFunc = benchmarkFunc;
exports.benchStore = benchStore;
exports.commitMark$ = _commitMark$;