//@ts-check

import { default as A } from "./routes";
// import A from "./nested_folder/indexUtil";
// import {B} from "./nested_folder/util1";


console.log(A);


import('./nested_folder/indexUtil').then(exp => {
    console.log(exp.B);
    // console.log(exp.B);
})


// // fetch('./routes.js').then(r => r.text()).then(content => { const exp = new Function(content)();
// fetch('./routes.js').then(r => r.text()).then(content => ({ then: new Function(content)()})).then( exp => {
//     // convert content to iife
//     /*
//         const $__routesExports = (function (exports) {
//             a = 15

//             exports = { default: a };

//             return exports
//         })({})
//     */
//     // => 
//     /*
//         a = 15

//         exports = { default: a };

//         return exports
//     */
//     // => 
//     /*
//         save under name ./dist/routes_v111.js
//     */
//     // =>
//     /*
//         // can pick up global modules:

//         let exp = new Function(content)();
//         // or 
//         let exp = eval2(content)

//         // TODO can check eval2 inside eval2 pickup global scope?
//     */
    
//     // exp.default;
// })


// // https://habr.com/ru/post/509250/

// /*
// (#1) номер строки в сгенерированном файле;
// (#2) номер столбца в сгенерированном файле;
// (#3) индекс исходника в «sources»;
// (#4) номер строки исходника;
// (#5) номер столбца исходника;
// */

/**
номер столбца в сгенерированном файле (#2);
индекс исходника в «sources» (#3);
номер строки исходника (#4);
номер столбца исходника (#5);
индекс имени переменной/функции из списка «names»;
 */