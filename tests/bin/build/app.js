

//@modules:


const $$externExports = (function (exports) {
 let a = 1;
	
	// console.log('/', '\033[37mexternal.js:3\033[0m');
	console.log('/');
	console.log(ttt);
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJleHRlcm4uanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgbGV0IGEgPSAxO1xyXG5cdFxyXG5cdC8vIGNvbnNvbGUubG9nKCcvJywgJ1xcMDMzWzM3bWV4dGVybmFsLmpzOjNcXDAzM1swbScpO1xyXG5cdGNvbnNvbGUubG9nKCcvJyk7XHJcblx0Y29uc29sZS5sb2codHR0KTsiLCJpbXBvcnQgeyBhIH0gZnJvbSBcIi4vZXh0ZXJuXCI7XHJcblxyXG5jb25zb2xlLmxvZyhhKTtcclxuXHJcbi8vIC8vIGh0dHBzOi8vaGFici5jb20vcnUvcG9zdC81MDkyNTAvXHJcblxyXG4vKlxyXG4oIzEpINC90L7QvNC10YAg0YHRgtGA0L7QutC4INCyINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90L7QvCDRhNCw0LnQu9C1O1xyXG4oIzIpINC90L7QvNC10YAg0YHRgtC+0LvQsdGG0LAg0LIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3QvtC8INGE0LDQudC70LU7XHJcbigjMykg0LjQvdC00LXQutGBINC40YHRhdC+0LTQvdC40LrQsCDQsiDCq3NvdXJjZXPCuztcclxuKCM0KSDQvdC+0LzQtdGAINGB0YLRgNC+0LrQuCDQuNGB0YXQvtC00L3QuNC60LA7XHJcbigjNSkg0L3QvtC80LXRgCDRgdGC0L7Qu9Cx0YbQsCDQuNGB0YXQvtC00L3QuNC60LA7XHJcbiovXHJcblxyXG4vKipcclxu0L3QvtC80LXRgCDRgdGC0L7Qu9Cx0YbQsCDQsiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdC+0Lwg0YTQsNC50LvQtSAoIzIpO1xyXG7QuNC90LTQtdC60YEg0LjRgdGF0L7QtNC90LjQutCwINCyIMKrc291cmNlc8K7ICgjMyk7XHJcbtC90L7QvNC10YAg0YHRgtGA0L7QutC4INC40YHRhdC+0LTQvdC40LrQsCAoIzQpO1xyXG7QvdC+0LzQtdGAINGB0YLQvtC70LHRhtCwINC40YHRhdC+0LTQvdC40LrQsCAoIzUpO1xyXG7QuNC90LTQtdC60YEg0LjQvNC10L3QuCDQv9C10YDQtdC80LXQvdC90L7QuS/RhNGD0L3QutGG0LjQuCDQuNC3INGB0L/QuNGB0LrQsCDCq25hbWVzwrs7XHJcbiAqLyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBO0EsQSxBLEE7QSxBLEEsQTtBLEEsQSxBOyJ9