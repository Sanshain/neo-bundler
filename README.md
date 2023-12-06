## neo-builder

The simplest plain script builder

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

- `release?` - remove comments
- `removeLazy?` - remove @lazy code blocks
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





