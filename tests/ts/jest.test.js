// does not isolate the environment from nodejs

/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

var pack = require('../../source/main').combine


const entryPoint = path.join(__dirname, "./source/index.ts")
const content = fs.readFileSync(entryPoint).toString();
const customStore = {
    "nested_directory/common": fs.readFileSync(path.join(__dirname, "./source/nested_directory/common.ts")).toString(),
}

test('My first test', () => {
    const r = pack(content, '', {
        entryPoint: 'app.ts',
        getContent: (filename) => {
            return customStore[filename]
        }
    })
    expect(Math.max(1, 5, 10)).toBe(10);
});