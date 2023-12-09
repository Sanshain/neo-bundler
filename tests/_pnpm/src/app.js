//@ts-check

// import Dashboard from '@uppy/dashboard'
import { javascript } from "@codemirror/lang-javascript";

import { default as A } from "./routes";
// import A from "./nested_folder/indexUtil";
// import A from "./nested_folder/util1";

// console.log(Dashboard);


console.log(A);
console.log(javascript);


// import('./routes').then(exp => {
import('./nested_folder/indexUtil').then(exp => {
    console.log(exp.default)
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