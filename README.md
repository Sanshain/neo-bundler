## neo-builder

[![npm](https://img.shields.io/npm/v/neo-builder)](https://www.npmjs.com/package/neo-builder)
[![npm](https://img.shields.io/npm/dm/neo-builder)](https://www.npmjs.com/package/neo-builder)

The simplest javascript builder based on regular expressions, started as research project

- [Features](#Features)
- [Benchmarks](#Benchmarks)
- [Bundle sizes](#Bundle-sizes)
- [Known issues](#Issues)
- [Installation](#Installation)
- [How to use](#Usage-via-cli)
- [Example](#build-example)
- [Plugins](#Plugins-usage)

### Features:

- Lite weight (less then 6 kb zipped)
- Iife wrapping of each modules (without dublicating)
- Support of `node_modules` (reexports, direct imports from node-modules, etc)
- Dynamic imports iife support with common modules shareing 
- Supports variables in dynamic imports (via template strings) out of the box (look up limitaions)
- fast build speed (commensurate with `esbuild` or `vite` in release mode). 
- particullary `pnpm` support 
- tree shaking (now it is only for function expressions) with esm and cjs support (but still w/o deep diving)

### Benchmarks

Benchmarks of various popular bundlers for random packages:

package	| webpack | neo-builder | esbuild | parcel
-|-|- |-|-
**@uppy/dashboard** | 1272ms | 67ms | 47ms | -
**@codemirror/lang-javascript** | 1513ms | 70ms | 68ms  | 75ms
**codemirror** | 1520ms | 77ms | 72ms | 81ms | 
**msw** | 1179ms | 32ms | 48ms | 265ms
**swiper** | 911ms | 26ms | 27ms | 86ms

### Bundle sizes

*A comparative table of the sizes of the received bundles allows us to indirectly draw conclusions about the quality of the builder's three shaking feature*:

package	| webpack | neo-builder\* | esbuild | parcel
-|-|- |-|-
**@uppy** | *371 kb* | *382 kb* | *346 kb* | -
**@codemirror-javascript** | *1016 kb* | *1040 kb* | *649 kb* | *942 kb*
**codemirror** | *1007 kb* | *1034 kb* | *751 kb* | *942 kb* | 
**msw** | *85 kb* | *72 kb* | *66 kb* | *1184 kb*
**swiper** | *303 kb* | *170 kb* | *166 kb* | *342 kb*
*The same packages minified:*
**@uppy/dashboard** | *181kb* | *182kb* | *179kb* | -
**@codemirror/lang-javascript** | *326kb* | *360kb* | *322kb* | *433kb*
**codemirror** | *344kb* | *344kb* | *338kb* | *391kb* | 
**msw** | *27kb* | *22kb* | *27kb* | *error*
**swiper** | *77kb* | *75kb* | *75kb* | *164kb*

- */ was used fast mode of tree shaking

### Issues: 

- Doesn't support some difficult imports (for example the module and default import in one line, like this: `import * as module, defaultImport from 'module'`) because of unuselessness.
  *At last what is the reason to import `default` when module at the same time consists of the default?)*
- Tree shaking in a progress *(just shallow experimental tree-shaking)*
- Incremental mode in a progress *(may be, will not be done)*
- Does not create meaningful AST tree. So it can easily break down where linter is not used or complex strings and nested structures are used in the exports 


### Installation: 

local

```
npm i neo-builder -D --omit=dev
```

or global

```
npm i neo-builder -g
```

## Usage via cli: 

```
neo index.js -t target.js --time
```

#### Possible options: 

- `-s` 		- source file name (could be passed as first arg without the flag `-s`)
- `-t` 		- target file name (required)
- `-m` 		- generate sourcemap file 	(optional)
- `--time` 	- verbose build time  		(optional)

## Usage via api: 

```js
const packFile = require('neo-builder').packFile
let r = packFile(sourceFile, targetFile, {
    // options
});
```

#### Possible options:

- `release?` - remove one line comments and plain `console.log` expressions
- `purgeDebug?` - remove `/**@debug*/ ... /**@end_debug*/` code blocks
- `getContent?` - custom getContent implementation
- `logStub?` - logs with source filename and line in runtime
- `sourceMaps?: { encode: Function, external?: true }` - option for source map passing the encode method from the sourcemap-codec library or its independent implementation. Look `tests` for example
- `getSourceMap?: Function` - an alternative method for obtaining unencrypted line-by-line source maps for its further programmatic use (works 30% faster than the classical generation of char by char sourcemaps)

## build example: 

`__common.ts` file: 

```javascript
let r = 7
function asd(){}

export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export var a = 6;
export function Ads(arg){}
export class Asde{}
```

and `init.ts`:

```typescript
import * as com from "./__common"

var a = com.a;
var c = 7540;
```


turn out the content inside `init.js` in the same directory:


```js
//@modules:


const $$__commonExports = (function (exports) {
 let r = 7
	function asd() { }
	
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var a = 6;
	function Ads(arg) { }
	class Asde { }
	
	exports = { months, a, Ads, Asde };
	
	return exports 
})({})


//@init.ts: 
const com = $$__commonExports;

var a = com.a;
var c = 7540;
```


## Code Splitting


Neo-builder supports dynamic imports (with `iife`) under browser mode out of the box, what makes it unique. Let's consider the following code:
```js
const langs = ['python', 'javascript'];
for (const key in langs) {
    const lang = langs[key];
    import(`@codemirror/lang-${lang}`).then(exp => {
        console.log(exp[lang]());
    })
}
```

It'll be built into the following code:

```js
const langs = ['python', 'javascript'];
for (const key in langs) {
    const lang = langs[key];
    fetch(`./dist/$_lang-${lang}_1702744262895.js`).then(r => r.text()).then(content => new Function(content)()).then(exp => {
        console.log(exp[lang]());
    })
}
```

Simultaneously it'll build relevant files into the distination folder (`$_lang-javascript_1702744262895.js` and `$_lang-python_1702744262895.js`). But be careful: this files will be created at the same folder where main app file is built. If you want to manage path, specified into the fetch request, you should use `advanced.dynamicImportsRoot` option in your build config.



As you can see, in the example above it is used variable inside template string. Neo-builder supports variables by dynamic imports out of the box and allows import packages directly from `node_modules`. These features also unique feature at this time (mainstream builders haven't variables support out of the box, and direct imports from `node_modules` haven't support, at all). But you should be awared there are limitations of the usage: 

- Package name format, specified in the import, should have at least two chars on left or right side from variable insertion. That's way to be sure you know what you do. (now this rule refers just to direct imports, not to relative ones.)
- No more then ten packages recommended to be matched corresponding pattern (else you'll get apropriate warning)


## Tree shaking

Tree shaking cuts unused functions from code bundle. But by default is disabled (because of in alpha). To use it, set `advanced.treeShaking` option into `true`.

Consider following files: 

#### app.js: 

```js
import { default as A } from "./routes";
console.log(A)
```

#### routes.js

```js
function _func(params) {
    return params.length
}

export function func() {
    return _func(arguments);
}

function createArray(length) {
    return Array(length)
}

export default function() {
    return createArray(0);
}
```

With enabled `treeShaking` unused functions `_func` and `func` will be cutted in the resulting bundle: 

```js
const $__routesExports = (function (exports) {
	function createArray(length) {
	    return Array(length)
	}
	
	function $default() {
	    return createArray(0);
	}
	
	exports = { default: $default };
	
	return exports 
})({})
```


# Plugins usage:

**neo-builder** also supports custom plugins. Below there is example how itcan be used:

```js
const uglify = require("uglify-js");

const neoMinify = {
	name: 'neo-minify-plugin',
	bundle: (/** @type {string} */ code, { maps, rawMap }) => {            
		const result = uglify.minify({ target: code }, {
			sourceMap: sourcemap ? {
				content: JSON.stringify(maps),
				url: sourcemapInline ? "inline" : (target + ".map")
			} : undefined
		});

		if (sourcemap && !sourcemapInline) {
			fs.writeFileSync(target + '.map', result.map)
			// fs.writeFileSync(target + '.map', JSON.stringify(result.map))
		}

		return result.code
	}
}


let r = packFile(sourceFile, targetFile, {
    // options
	plugins: [neoMinify]
});	
```


