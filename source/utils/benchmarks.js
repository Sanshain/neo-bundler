//@ts-check
const { performance } = require('perf_hooks');


/**
 * @type {Record<string, number>}
 */
const benchStore = Object.setPrototypeOf({}, {
    toString() {
        return Object.entries(this).map(([k, v]) => typeof v === 'number' ? `${k}: ${v.toFixed(3)}` : '').join('\n')
    }
});


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