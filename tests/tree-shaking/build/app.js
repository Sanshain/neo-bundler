(function () {
    'use strict';

    //@ts-check

    function createArray(length) {
        return Array(length)
    }

    function A() {
        return createArray(0);
    }

    //@ts-check
    // export const a = 1;

    module.exports.aa = () => {
        
    };

    // const a = 1;
    // export {
    //     a
    // }

    const b = 1;

    //@ts-check

    console.log(A);
    console.log(b);

})();
