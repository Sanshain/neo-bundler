//@ts-check

// https://www.lucidchart.com/techblog/2019/08/22/decode-encoding-base64-vlqs-source-maps/


const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BIT_MASKS = {
    LEAST_FOUR_BITS: 0b1111,
    LEAST_FIVE_BITS: 0b11111,
    CONTINUATION_BIT: 0b100000,
    SIGN_BIT: 0b1,
};


const indexedBase64 = (() => {
    /**
     * @type {Array<[string, number]>}
     */
    const characterIndexPairs = BASE64_ALPHABET.split('').map((c, i) => [c, i]);
    return new Map(characterIndexPairs);
})();

/**
 * base64VlqDecode
 * @param {string} base64Vlqs 
 * @returns {number[]}
 */
exports.decodeLine = function base64VlqDecode(base64Vlqs) {
    const vlqs = base64Decode(base64Vlqs);
    return splitVlqs(vlqs).map(vlqDecode);
}

/**
 * @param {string} base64Vlqs
 * @returns {number[]}
 */
function base64Decode(base64Vlqs) {
    return base64Vlqs.split('').map(c => {
        const sextet = indexedBase64.get(c);
        if (sextet === undefined) {
            throw new Error(`${base64Vlqs} is not a valid base64 encoded VLQ`);
        }
        return sextet;
    });
}

/**
 * 
 * @param {number[]} vlqs 
 * @returns {number[][]}
 */
function splitVlqs(vlqs) {
    const splitVlqs = [];
    let vlq = [];
    vlqs.forEach((sextet) => {
        vlq.push(sextet);
        if ((sextet & BIT_MASKS.CONTINUATION_BIT) === 0) {
            splitVlqs.push(vlq);
            vlq = [];
        }
    });
    if (vlq.length > 0) {
        throw new Error('Malformed VLQ sequence: The last VLQ never ended.');
    }
    return splitVlqs;
}

/**
 * 
 * @param {number[]} vlq 
 * @returns {number}
 */
function vlqDecode(vlq) {
    let x = 0;
    let isNegative = false;
    vlq.reverse().forEach((sextet, index) => {
        if (index === vlq.length - 1) {
            isNegative = (sextet & BIT_MASKS.SIGN_BIT) === 1;
            sextet >>>= 1; // discard sign bit
            x <<= 4;
            x |= sextet & BIT_MASKS.LEAST_FOUR_BITS;
        }
        else {
            x <<= 5;
            x |= sextet & BIT_MASKS.LEAST_FIVE_BITS;
        }
    });
    return isNegative ? -x : x;
}








/**
 * base64VlqEncode
 * @param {[
 *      number,         // char in target.js = 0                                        // alwayes if encode whole line (w/o on parts devision)
 *      number,         // index of source file name in "sources" field of map
 *      number,         // index of line in source file
 *      number,         // char index in source file = 0                                // alwayes if line doesn't consist of multilines
 *      number?         // index of entity name in "names" field of map = undefined     // alwaies is undefined if names are not modified
 * ]} integers 
 * @returns {string}
 */
exports.encodeLine = function base64VlqEncode(integers) {
    return integers
        .map(vlqEncode)
        .map(base64Encode)
        .join('');
}

/**
 * 
 * @param {number} x 
 * @returns {number[]}
 */
function vlqEncode(x) {
    if (x === 0) {
        return [0];
    }
    let absX = Math.abs(x);
    const sextets = [];
    while (absX > 0) {
        let sextet = 0;
        if (sextets.length === 0) {
            sextet = x < 0 ? 1 : 0; // set the sign bit
            sextet |= (absX & BIT_MASKS.LEAST_FOUR_BITS) << 1; // shift one ot make space for sign bit
            absX >>>= 4;
        }
        else {
            sextet = absX & BIT_MASKS.LEAST_FIVE_BITS;
            absX >>>= 5;
        }
        if (absX > 0) {
            sextet |= BIT_MASKS.CONTINUATION_BIT;
        }
        sextets.push(sextet);
    }
    return sextets;
}


/**
 * @param {number[]} vlq
 * @returns {string}
 */
function base64Encode(vlq) {
    return vlq.map(s => BASE64_ALPHABET[s]).join('');
}