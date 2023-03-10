

//@modules:


const $$nested_directory$commonExports = (function (exports) {
 let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let r = 7
	var a = 66;
	
	function Ads(arg) { }
	
	function asd() { }
	
	function f() { }
	
	class Asde { constructor() { } }
	
	exports = { months, a, Ads, f, Asde };
	
	return exports 
})({})


//@index.ts: 

const {  months, Ads  } = $$nested_directory$commonExports;

var a = months;

var c: number = 754;

console.log(a);
