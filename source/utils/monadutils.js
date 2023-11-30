/**
 * 
 * @param {Function} fn 
 * @param {number} cnt 
 * @param {string} arg
 * @returns 
 */
function chainingCall(fn, cnt, arg) {
    
    if (!cnt) return arg;
    var res = fn(...Array.prototype.slice.call(arguments, 2))
    if (cnt - 1) return chainingCall(fn, cnt - 1, res)
    else {
        return res;
    }
}

exports.chainingCall = chainingCall;

