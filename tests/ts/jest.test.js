/**
 * @jest-environment jsdom
 */

/// does not isolate the environment from nodejs

const fs = require('fs');
const path = require('path');

var pack = require('../../source/main').combine


const entryPoint = path.join(__dirname, "./source/index.ts")
const content = fs.readFileSync(entryPoint).toString();
const customStore = {
    "nested_directory/common": fs.readFileSync(path.join(__dirname, "./source/nested_directory/common.ts")).toString(),
}

test('My first test', async () => {
    const r = pack(content, '', {
        entryPoint: 'app.ts',
        getContent: (filename) => {
            return customStore[filename]
        }
    })
    
    // let bf = fs.readFileSync('./test.js')
    // let script = document.createElement('script');

    expect(r).toBeTruthy();
});




// FAILED ATTEMPTS: 


    // let uploadScript = new Promise((resolve, reject) => {
    //     let script = document.createElement('script');

    //     script.src = '"http://127.0.0.1:3000/build/builder.js"'
    //     document.head.appendChild(script)
    //     script.onload = () => {
    //         console.log(builder);
    //         resolve(window)
    //         expect(Math.max(1, 5, 10)).toBe(11);            
    //     }
    //     script.onerror = (e) => {
    //         console.log(222222222222222);
    //         expect(Math.max(1, 5, 10)).toBe(12);
    //     }
    // })
    // await uploadScript.then(w => {
    //     console.log(111111111111);
    //     console.log(w);
    //     console.log(w);
    //     console.log(w);
    //     expect(Math.max(1, 5, 10)).toBe(13);
    // });

    // expect(Math.max(1, 5, 10)).toBe(10);
    // setTimeout(() => {
    //     expect(Math.max(1, 5, 10)).toBe(10);
    // })
