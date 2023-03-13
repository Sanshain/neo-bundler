// variable;
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var a = 66;
// function:
function ads(arg) { return 1 }

console.log('>> named exports test attached');

class Cls { constructor() { } }

console.log('>> named default export test attached');

class Cls1 {
    constructor() { }
    a = 1
}

console.log('>> unnamed default export test attached');

// TODO
// import defaultExport, { export [, […]] } from "module-name";         // not implemented yet
// import "module-name";                                                // implemented


console.log('>'.repeat(25));

const tests = [
    {
        name: 'named import',
        up: () => months.length === 9,
    },
    {
        name: 'named import',
        up: () => ads() === 1,
    },
    {
        name: 'alias import',
        up: () => a === 66,
    },
    {
        name: 'default named import',
        up: () => new Cls,
    },
    {
        name: 'default unnamed import',
        up: () => new Cls1().a === 1,
    },
    {
        name: 'module import',
        up: () => a === a,
    },
];

tests.forEach(test => {
    if (test.up()) console.log('\t' + test.name + ' is success');
    else {
        throw new Error(test.name + ' is failed')
    }
});

console.log('<'.repeat(25));

// console.log(a);
//# sourceMappingURL=target.js.map
