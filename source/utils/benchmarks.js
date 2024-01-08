//@ts-check
const {performance} = require('perf_hooks');

const benchStore = {};


/**
 * @param {Function} func
 * @param {any[]} args
 */
function benchmarkFunc (func, ...args) {
    const start = performance.now()
    
    const result = func(...args)
    
    const funcName = func.name || func.toString()
    benchStore[funcName] = (benchStore[funcName] || 0) + (performance.now() - start)

    return result;
}

exports.benchmarkFunc = benchmarkFunc;
exports.benchStore = benchStore;