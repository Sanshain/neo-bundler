/**
 * chainging function calling
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


/**
 * chai
 * @param {(arg: T) => T} func
 * @param {(arg?: T) => boolean} condfunc
 * @param {T} arg
 * @template T
 */
function conditionalChain(func, condfunc, arg, maxcallstack=5) {
    const r = func(arg);
    if (condfunc(r)) return r;
    else if (!maxcallstack) return null;
    else {
        return conditionalChain(func, condfunc, r, maxcallstack-1)
    }
}


exports.conditionalChain = conditionalChain;