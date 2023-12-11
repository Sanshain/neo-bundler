## neo-builder

[![npm](https://img.shields.io/npm/v/neo-builder)](https://www.npmjs.com/package/neo-builder)
[![npm](https://img.shields.io/npm/dm/neo-builder)](https://www.npmjs.com/package/neo-builder)

The simplest javascript builder based on regular expressions, started as research project

### Features:

- Lite weight (less then 6 kb zipped)
- Iife wrapping of each modules (without dublicating)
- Support of `node_modules` (reexports, direct imports from node-modules, etc)
- Dynamic imports iife support 
- fast build speed (commensurate with `esbuild` or `vite` in release mode). 
- particullary `pnpm` support 

### Issues: 

- Doesn't support some difficult imports (for example the module and default import in one line, like this: `import * as module, defaultImport from 'module'`) because of unuselessness.
  *At last what is the reason to import `default` when module at the same time consists of the default?)*
- Tree shaking in a progress *(not implemented yet)*
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





