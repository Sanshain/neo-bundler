//@ts-check

import Dashboard from '@uppy/dashboard'                                 // + (just surface | f t/sh) 189 imports (381kb) - 47-59ms (w/o t/s == 46) vs 70/77/100ms (f/ts - ~64/67/74/69/95ms)
// import { javascript } from "@codemirror/lang-javascript";               // + (just surface | w/o t/sh) 22 imports (1038kb) - ~67/71ms (w/o t/s == 71) vs 69/70/73/74/79ms (neo w j f tree-sh, w/o - ~61/65/67ms)
// import { basicSetup, EditorView } from "codemirror"                     // + (just surface | w/o t/sh) 31 imports (1037kb) ~70/72ms vs 73/75/77/79/80/90ms (f/ts) (w/o t/sh - 65ms)
// import { http, HttpResponse } from 'msw'                                   // + 46 imports (68kb) - ~48ms vs 47ms (neo w tree-sh, w f t/s - 31/32/34/40 ms)
// import { tokensToFunction } from "path-to-regexp";

// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';              // + 35 imports (170kB) - 27/29ms vs 25/26/29ms (f/ts)

// import { default as A } from "./routes";
// import A from "./nested_folder/indexUtil";
// import { c as A } from "./nested_folder/util1";


// import { createApp } from "./uiApp";                                     // + 1 imports (14kb) - 8ms vs 11/12/13ms
// createApp()

// new EditorView({
//   doc: "console.log('hello')\n",
//   extensions: [
//     basicSetup,
//     javascript()
//   ],
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