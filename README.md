## neo-builder

The simplest plain script builder


### Example: 

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



### TODO

- advanced: tree shaking module (to implement as option)
- advanced: incremental


## Unit tests: 

```
npm run test
```


