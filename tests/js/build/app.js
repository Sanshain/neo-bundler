

//@modules:


const $$nested_directory$moduleExports = (function (exports) {
 // variable;
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var a = 66;
	const b = 67;
	// function:
	function ads(arg) { return 1 }
	// class:
	class Asde { constructor() { } }
	
	console.log('>> named exports test attached');
	
	exports = { months, a, b, ads, Asde };
	
	return exports 
})({})

const $$nested_directory$named_defaultExports = (function (exports) {
 
	
	function Ads(arg) { }
	
	class Cls { constructor() { } }
	
	console.log('>> named default export test attached');
	
	let a = 13;
	
	exports = { Ads, a, default:  Cls };
	
	return exports 
})({})

const $$nested_directory$unnamed_defaultExports = (function (exports) {
 
	var l = 11;
	class $default {
	    constructor() { }
	    a = 1
	}
	
	console.log('>> unnamed default export test attached');
	
	
	
	exports = { l, default: $default };
	
	return exports 
})({})


//@index.js: 

//@ts-check
// import assert from 'assert';

// TODO
// import defaultExport, { export [, […]] } from "module-name";         // not implemented yet
// import "module-name";                                                // implemented


const mod = $$nested_directory$moduleExports;
const { months, ads, a: flatVar } = $$nested_directory$moduleExports;
const { default: Cls } = $$nested_directory$named_defaultExports;
const { default: Cls1 } = $$nested_directory$unnamed_defaultExports;


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
        up: () => flatVar === 66,
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
        up: () => mod.a === flatVar,
    },
]

tests.forEach(test => {
    if (test.up()) console.log('\t' + test.name + ' is success');
    else {
        throw new Error(test.name + ' is failed')
    }
})

var a = months;

console.log('<'.repeat(25));

// console.log(a);

// rollup -i index.js -o t.js -p @rollup/plugin-commonjs -p @rollup/plugin-node-resolve -p rollup-plugin-uglify
//# sourceMappingURL=app.js.map