

//@modules:


const $$nested_directory$commonExports = (function (exports) {
 let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let r = 7
	var a = 66;
	
	function Ads(arg) { }
	
	function asd() { }
	
	function f() { }
	
	class Asde { constructor() { } }
	
	console.log(7);
	
	
	exports = { months, a, Ads, f, Asde };
	
	return exports 
})({})


//@index.ts: 

const { months, Ads } = $$nested_directory$commonExports;

var a = months;

//@ts-expect-error
console.log(fff);

// var c: number = 754;
var c = 754;

console.log(a);

//# sourceMappingURL=app.js.map