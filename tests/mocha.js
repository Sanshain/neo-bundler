//@ts-check

/// shoal-testing-library
/// headless-dom-mocha-testing-library

const browser = require("jsdom").JSDOM;

const html = (w) => w.join('');

function createEnv(src) {
    return {
        env: new browser((html`<!DOCTYPE html>
            <html>

                <head>
                    <script src="@src"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
                    <script>
                        mocha.setup('qunit'); // bdd
                        let assert = chai.assert; // chai предоставляет большое количество функций. Объявим assert глобально
                    </script>
                </head>

                <body>
                    <div id="mocha"></div><!-- элемент с id="mocha" будет содержать результаты тестов -->
                </body>

            </html>`).replace('@src', src)
        ),
        test: function (/** @type {string} */ testCode) {

            // let script = document.createElement('script')
            // script.innerText = src;
            // this.env.window.document.appendChild(script);

            // dom.window.addEventListener('load', callback);
            this.env.window.eval(`(function(){${testCode}})(); mocha.run();`);

            const testFails = Array.from(this.env.window.document.querySelectorAll('.test.fail'));
            const testsSucc = [].slice.call(this.env.window.document.querySelectorAll('.test.pass.fast'));
            return {
                testsSucc: testsSucc.map(q => q.querySelector('h2').textContent),
                testFails: testFails.map(q => [
                    q.querySelector('h2').textContent, q.querySelector('.error').textContent
                ])
            }
        }
    }
}


exports.createEnv = createEnv;
