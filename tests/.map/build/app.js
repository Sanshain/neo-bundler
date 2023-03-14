

//@modules:


const $$externExports = (function (exports) {
 let a = 1;
	
	exports = { a };
	
	return exports 
})({})


//@index.js: 
const { a } = $$externExports;;

console.log(a);

// // https://habr.com/ru/post/509250/

/*
(#1) номер строки в сгенерированном файле;
(#2) номер столбца в сгенерированном файле;
(#3) индекс исходника в «sources»;
(#4) номер строки исходника;
(#5) номер столбца исходника;
*/

/**
номер столбца в сгенерированном файле (#2);
индекс исходника в «sources» (#3);
номер строки исходника (#4);
номер столбца исходника (#5);
индекс имени переменной/функции из списка «names»;
 */
//# sourceMappingURL=app.js.map