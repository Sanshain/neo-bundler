//@ts-check

/// shoal-testing-library
/// headless-dom-mocha-testing-library

/*
- debug w/o bugs
- logging possibility
- relative import
- truthy error descriptions
*/

const {JSDOM: browser} = require("jsdom");
const path = require("path")
// const chai = require("chai")


const html = (w) => w.join('');

function createEnv(src) {
    return {
        env: new browser((html`<!DOCTYPE html>
            <html>
                <head>

                    <script src="@src"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js"></script>
                    <script>
                        mocha.setup('qunit'); // bdd
                        var assert = chai.assert; // chai предоставляет большое количество функций. Объявим assert глобально
                    </script>
                </head>

                <body>
                    <div id="mocha"></div><!-- элемент с id="mocha" будет содержать результаты тестов -->
                </body>

            </html>`).replace('@src', "../build/builder.js" || "http://127.0.0.1:3000/build/builder.js" || src),
            {                
                resources: "usable",
                // runScripts: "outside-only",
                runScripts: "dangerously",
                url: `file://${path.resolve(__dirname, ".")}/index.html`
            },
        ),
        test: function (/** @type {Function} */ callback) {

            this.env.virtualConsole.addListener('log', c => console.log(c))

            return new Promise((resolve, reject) => {

                this.env.window.onload = () => {

                    // let script = this.env.window.document.createElement('script')
                    // script.innerText = `(${testCode})();`;
                    // this.env.window.document.body.appendChild(script);

                    // this.env.window.eval(`(${testCode})();`)
                    callback({
                        // fetch: this.env.window.fetch,
                        test: this.env.window.test,
                        after: this.env.window.after || this.env.window.mocha.after,
                        mocha: this.env.window.mocha,
                        window: this.env.window,
                        browserAssert: this.env.window.assert,
                        builder: this.env.window.builder
                    })

                }

            })

        }
    }
}


exports.createEnv = createEnv;
