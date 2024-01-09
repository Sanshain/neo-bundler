//@ts-check

import Dashboard from '@uppy/dashboard'                                 // - 206 imports (432kb) - 47-59ms (w/o t/s == 46) vs 105ms (neo w tree-sh, w/o - ~98ms)
// import { javascript } from "@codemirror/lang-javascript";                // + (just surface | w/o t/sh) 22 imports (1038kb) - ~71ms (w/o t/s == 71) vs 89ms (neo w j f tree-sh, w/o - ~66-70ms)
// import { basicSetup, EditorView } from "codemirror"                      // + (just surface | w/o t/sh) 31 imports (1037kb) ~72ms vs 90ms (w/o t/sh - 77ms)
// import { http, HttpResponse } from 'msw'                                    // + 46 imports (68kb) - ~48ms vs 47ms (neo w tree-sh, w f t/s - 43 ms)
// import { tokensToFunction } from "path-to-regexp";

// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';                // + 35 imports (170kB) - 28ms vs 35ms (35 -f/t/s)

// import { default as A } from "./routes";
// import A from "./nested_folder/indexUtil";
// import { c as A } from "./nested_folder/util1";


// import { createApp } from "./uiApp";                                     // + 1 imports (14kb) - 8ms vs 13ms
// createApp()

// new EditorView({
//   doc: "console.log('hello')\n",
//     extensions: [basicSetup, javascript()],
//   parent: document.body
// })

console.log(Dashboard)

// console.log(http)
// console.log(HttpResponse)

// console.log(tokensToFunction)
// const swiper = new Swiper('.swiper', {
//     // configure Swiper to use modules
//     modules: [Navigation, Pagination],
// });
// console.log(swiper);
// console.log(A)
// console.log(javascript);


// import('path-to-regexp').then(exp => {
//     console.log(exp.default)
// })

// import('./routes').then(exp => {
//     console.log(exp.default)
// })

// import('./nested_folder/indexUtil').then(exp => {
// // import('@codemirror/lang-javascript').then(exp => {
//     console.log(exp.default)
// })


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