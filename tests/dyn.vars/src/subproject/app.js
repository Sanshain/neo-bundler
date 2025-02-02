//@ts-check

import { default as A } from "./routes";

console.log(A);


// test #1

// import(`./nested_folder/indexUtil`).then(exp => {

//     console.log(exp);
// })


// test #2

// const filename = 'indexUtil.js';

// import(`./nested_folder/${filename}`).then(exp => {
    
//     console.log(exp);
// })

// test #3

const paths = ['nested_folder', 'nested_folder2'];

paths.forEach(module => {
    import(`./${module}/indexUtil.js`).then(r => {
        
        console.log(r);
    })
})











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