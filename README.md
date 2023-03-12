# tcp-bundler

The simplest vanilla ts/js bundler supporting base import/export operation based on socket connetction. Suitable for vanilla js/ts project.
This package similar [gulp-packager](https://www.npmjs.com/package/gulp-packager), but it does not depend on the `gulp` infrastructure . 
Against it uses independent modules and this differs the most punctual work intended to pack source file just in moment page refresh (by properly tuning). This makes the assembly process as fast as possible and dont overloads CPU and HDD of your pс.

## Installation
```
npm install Sanshain/tcp-bundler
```

## Global installation

Also you can easy start for using **tcp-bundler** globally:

```
npm i tcp-bundler -g
```
and then use everywhere: 
```
tcpb
```
or like this
```
tcpb 'localhost' 9098 -tsc -minify
```

## Using by API:

```js
tcpbundler.startListen('localhost', 9098, {});
```

# Examples

For using this package you need to connect to host and port specified as params into `startListen()` function. For example on python for sending filename:

```python
import socket
import os
import time

def main():

    filename = './samples/init.ts'

    sock = socket.socket()
    try:

        sock.connect(("localhost", 9098))
        sock.send(filename)
        r = sock.recv(10)
        print(r)

    except Exception as ex:

        print(ex)
        os.system('node index')
        main()

main()
```

if you use Django, you must custom loader for ideal using this plugin with `tcp-bundler` in debug-mode

## Examples

For descriptive reasons the examples below assumes the following simplesr calling:

```js
const tcpbundler = require("tcp-bundler")
let options = {tsc: false};										// optionally
tcpbundler.startListen('localhost', 9098, options)
```

### Example 1

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
{

    let r = 7
    function asd(){}

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var a = 6;
    function Ads(arg){}
    class Asde{}

    var com = {
     		months:months,
    		a:a,
    		Ads:Ads,
    		Asde:Asde 
    }
}

var a = com.a;

var c = 7540;
```

## Example 2

`init.ts` contains:

```js
import {months, Ads} from "./__common"

var a = months;

var c = 754;
```

output: 

```js
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Ads(arg){

	
}

var a = months;

var c = 754;
```

## Attention

Recommends to use `import {name} from "./filename"` statement just for independent of any global variables classes and clear functions in imported file.

despite the fact that the standard allows such actions, the use of global variables in object-oriented programming is considered a bad practice among developers.
This is why we did not include support for this feature. 

If you have many global constants or variables in the imported file, please use  `import * as name from './filename'` statement instead.

I should also note that this plugin does not currently support importing npm packages. If your needs are beyond the scope of this package, I suggest using [rollup](https://www.npmjs.com/package/rollup).

## options:

- `release : true` - disable all comments inside importing file
- `tsc: true ` - enable typescript complile for file contents
- `minify: true ` - minify aggregate final code

## Advanced features: 

Besides using `import * as name from './...'`, `import {name} from './...'` you can also use `import './...'`. 
But this option does not intended for types/class imports - what will you get a hint about in this case


## Other featres: 

If you need to skip some `import` statements, you should to wrap it into following comment with `lazy` keyword:

```js
/*-lazy*/
import * as lazy from "./__common"
/*lazy-*/
```

In this case the multiple comments with `lazy` word in output file will be removed including all `import` content between them


# PS:

special thank for [tss](https://www.npmjs.com/package/typescript-simple) project

