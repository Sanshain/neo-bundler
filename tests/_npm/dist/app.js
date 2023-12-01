

//@modules:


const $$uppy$utils$lib__hasPropertyExports = (function (exports) {
 	function has(object, key) {
	  return Object.prototype.hasOwnProperty.call(object, key);
	}
	
	exports = { default:  has };
	
	return exports 
})({})

const $$uppy$utils$lib__TranslatorExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { default: has } = $$uppy$utils$lib__hasPropertyExports;;
	
	// We're using a generic because languages have different plural rules.
	
	function insertReplacement(source, rx, replacement) {
	  const newParts = [];
	  source.forEach(chunk => {
	    // When the source contains multiple placeholders for interpolation,
	    // we should ignore chunks that are not strings, because those
	    // can be JSX objects and will be otherwise incorrectly turned into strings.
	    // Without this condition we’d get this: [object Object] hello [object Object] my <button>
	    if (typeof chunk !== 'string') {
	      return newParts.push(chunk);
	    }
	    return rx[Symbol.split](chunk).forEach((raw, i, list) => {
	      if (raw !== '') {
	        newParts.push(raw);
	      }
	
	      // Interlace with the `replacement` value
	      if (i < list.length - 1) {
	        newParts.push(replacement);
	      }
	    });
	  });
	  return newParts;
	}
	
	/**
	 * Takes a string with placeholder variables like `%{smart_count} file selected`
	 * and replaces it with values from options `{smart_count: 5}`
	 *
	 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
	 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
	 *
	 * @param phrase that needs interpolation, with placeholders
	 * @param options with values that will be used to replace placeholders
	 */
	function interpolate(phrase, options) {
	  const dollarRegex = /\$/g;
	  const dollarBillsYall = '$$$$';
	  let interpolated = [phrase];
	  if (options == null) return interpolated;
	  for (const arg of Object.keys(options)) {
	    if (arg !== '_') {
	      // Ensure replacement value is escaped to prevent special $-prefixed
	      // regex replace tokens. the "$$$$" is needed because each "$" needs to
	      // be escaped with "$" itself, and we need two in the resulting output.
	      let replacement = options[arg];
	      if (typeof replacement === 'string') {
	        replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
	      }
	      // We create a new `RegExp` each time instead of using a more-efficient
	      // string replace so that the same argument can be replaced multiple times
	      // in the same phrase.
	      interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, 'g'), replacement);
	    }
	  }
	  return interpolated;
	}
	
	/**
	 * Translates strings with interpolation & pluralization support.
	 * Extensible with custom dictionaries and pluralization functions.
	 *
	 * Borrows heavily from and inspired by Polyglot https://github.com/airbnb/polyglot.js,
	 * basically a stripped-down version of it. Differences: pluralization functions are not hardcoded
	 * and can be easily added among with dictionaries, nested objects are used for pluralization
	 * as opposed to `||||` delimeter
	 *
	 * Usage example: `translator.translate('files_chosen', {smart_count: 3})`
	 */
	var _apply = /*#__PURE__*/_classPrivateFieldLooseKey("apply");
	class Translator {
	  constructor(locales) {
	    Object.defineProperty(this, _apply, {
	      value: _apply2
	    });
	    this.locale = {
	      strings: {},
	      pluralize(n) {
	        if (n === 1) {
	          return 0;
	        }
	        return 1;
	      }
	    };
	    if (Array.isArray(locales)) {
	      locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
	    } else {
	      _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
	    }
	  }
	  /**
	   * Public translate method
	   *
	   * @param key
	   * @param options with values that will be used later to replace placeholders in string
	   * @returns string translated (and interpolated)
	   */
	  translate(key, options) {
	    return this.translateArray(key, options).join('');
	  }
	
	  /**
	   * Get a translation and return the translated and interpolated parts as an array.
	   *
	   * @returns The translated and interpolated parts, in order.
	   */
	  translateArray(key, options) {
	    if (!has(this.locale.strings, key)) {
	      throw new Error(`missing string: ${key}`);
	    }
	    const string = this.locale.strings[key];
	    const hasPluralForms = typeof string === 'object';
	    if (hasPluralForms) {
	      if (options && typeof options.smart_count !== 'undefined') {
	        const plural = this.locale.pluralize(options.smart_count);
	        return interpolate(string[plural], options);
	      }
	      throw new Error('Attempted to use a string with plural forms, but no value was given for %{smart_count}');
	    }
	    return interpolate(string, options);
	  }
	}
	function _apply2(locale) {
	  if (!(locale != null && locale.strings)) {
	    return;
	  }
	  const prevLocale = this.locale;
	  this.locale = {
	    ...prevLocale,
	    strings: {
	      ...prevLocale.strings,
	      ...locale.strings
	    }
	  };
	  this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
	}
	
	exports = { default:  Translator };
	
	return exports 
})({})

const $__namespace$emitterExports = (function (exports) {
 	/**
	* Create an event emitter with namespaces
	* @name createNamespaceEmitter
	* @example
	* var emitter = require('./index')()
	*
	* emitter.on('*', function () {
	*   console.log('all events emitted', this.event)
	* })
	*
	* emitter.on('example', function () {
	*   console.log('example event emitted')
	* })
	*/
	var $default = function createNamespaceEmitter () {
	  var emitter = {}
	  var _fns = emitter._fns = {}
	
	  /**
	  * Emit an event. Optionally namespace the event. Handlers are fired in the order in which they were added with exact matches taking precedence. Separate the namespace and event with a `:`
	  * @name emit
	  * @param {String} event – the name of the event, with optional namespace
	  * @param {...*} data – up to 6 arguments that are passed to the event listener
	  * @example
	  * emitter.emit('example')
	  * emitter.emit('demo:test')
	  * emitter.emit('data', { example: true}, 'a string', 1)
	  */
	  emitter.emit = function emit (event, arg1, arg2, arg3, arg4, arg5, arg6) {
	    var toEmit = getListeners(event)
	
	    if (toEmit.length) {
	      emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6])
	    }
	  }
	
	  /**
	  * Create en event listener.
	  * @name on
	  * @param {String} event
	  * @param {Function} fn
	  * @example
	  * emitter.on('example', function () {})
	  * emitter.on('demo', function () {})
	  */
	  emitter.on = function on (event, fn) {
	    if (!_fns[event]) {
	      _fns[event] = []
	    }
	
	    _fns[event].push(fn)
	  }
	
	  /**
	  * Create en event listener that fires once.
	  * @name once
	  * @param {String} event
	  * @param {Function} fn
	  * @example
	  * emitter.once('example', function () {})
	  * emitter.once('demo', function () {})
	  */
	  emitter.once = function once (event, fn) {
	    function one () {
	      fn.apply(this, arguments)
	      emitter.off(event, one)
	    }
	    this.on(event, one)
	  }
	
	  /**
	  * Stop listening to an event. Stop all listeners on an event by only passing the event name. Stop a single listener by passing that event handler as a callback.
	  * You must be explicit about what will be unsubscribed: `emitter.off('demo')` will unsubscribe an `emitter.on('demo')` listener,
	  * `emitter.off('demo:example')` will unsubscribe an `emitter.on('demo:example')` listener
	  * @name off
	  * @param {String} event
	  * @param {Function} [fn] – the specific handler
	  * @example
	  * emitter.off('example')
	  * emitter.off('demo', function () {})
	  */
	  emitter.off = function off (event, fn) {
	    var keep = []
	
	    if (event && fn) {
	      var fns = this._fns[event]
	      var i = 0
	      var l = fns ? fns.length : 0
	
	      for (i; i < l; i++) {
	        if (fns[i] !== fn) {
	          keep.push(fns[i])
	        }
	      }
	    }
	
	    keep.length ? this._fns[event] = keep : delete this._fns[event]
	  }
	
	  function getListeners (e) {
	    var out = _fns[e] ? _fns[e] : []
	    var idx = e.indexOf(':')
	    var args = (idx === -1) ? [e] : [e.substring(0, idx), e.substring(idx + 1)]
	
	    var keys = Object.keys(_fns)
	    var i = 0
	    var l = keys.length
	
	    for (i; i < l; i++) {
	      var key = keys[i]
	      if (key === '*') {
	        out = out.concat(_fns[key])
	      }
	
	      if (args.length === 2 && args[0] === key) {
	        out = out.concat(_fns[key])
	        break
	      }
	    }
	
	    return out
	  }
	
	  function emitAll (e, fns, args) {
	    var i = 0
	    var l = fns.length
	
	    for (i; i < l; i++) {
	      if (!fns[i]) break
	      fns[i].event = e
	      fns[i].apply(fns[i], args)
	    }
	  }
	
	  return emitter
	}
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $nanoid__non$secureExports = (function (exports) {
 	let urlAlphabet =
	  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
	let customAlphabet = (alphabet, defaultSize = 21) => {
	  return (size = defaultSize) => {
	    let id = ''
	    let i = size
	    while (i--) {
	      id += alphabet[(Math.random() * alphabet.length) | 0]
	    }
	    return id
	  }
	}
	let nanoid = (size = 21) => {
	  let id = ''
	  let i = size
	  while (i--) {
	    id += urlAlphabet[(Math.random() * 64) | 0]
	  }
	  return id
	}
	
	exports = { customAlphabet, nanoid };
	
	return exports 
})({})

const $lodash__isObjectExports = (function (exports) {
 	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	var $default = isObject;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___freeGlobalExports = (function (exports) {
 	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	var $default = freeGlobal;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___rootExports = (function (exports) {
 	var freeGlobal = $lodash___freeGlobalExports;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	var $default = root;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__nowExports = (function (exports) {
 	var root = $lodash___rootExports;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	var $default = now;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___trimmedEndIndexExports = (function (exports) {
 	/** Used to match a single whitespace character. */
	var reWhitespace = /\s/;
	
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */
	function trimmedEndIndex(string) {
	  var index = string.length;
	
	  while (index-- && reWhitespace.test(string.charAt(index))) {}
	  return index;
	}
	
	var $default = trimmedEndIndex;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___baseTrimExports = (function (exports) {
 	var trimmedEndIndex = $lodash___trimmedEndIndexExports;
	
	/** Used to match leading whitespace. */
	var reTrimStart = /^\s+/;
	
	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */
	function baseTrim(string) {
	  return string
	    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
	    : string;
	}
	
	var $default = baseTrim;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___SymbolExports = (function (exports) {
 	var root = $lodash___rootExports;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	var $default = Symbol;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___getRawTagExports = (function (exports) {
 	var Symbol = $lodash___SymbolExports;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	var $default = getRawTag;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___objectToStringExports = (function (exports) {
 	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	var $default = objectToString;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash___baseGetTagExports = (function (exports) {
 	var Symbol = $lodash___SymbolExports,
	     getRawTag = $lodash___getRawTagExports,
	     objectToString = $lodash___objectToStringExports;
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	var $default = baseGetTag;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__isObjectLikeExports = (function (exports) {
 	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	var $default = isObjectLike;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__isSymbolExports = (function (exports) {
 	var baseGetTag = $lodash___baseGetTagExports,
	     isObjectLike = $lodash__isObjectLikeExports;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	var $default = isSymbol;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__toNumberExports = (function (exports) {
 	var baseTrim = $lodash___baseTrimExports,
	    isObject = $lodash__isObjectExports,
	     isSymbol = $lodash__isSymbolExports;
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	var $default = toNumber;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__debounceExports = (function (exports) {
 	var isObject = $lodash__isObjectExports,
	     now = $lodash__nowExports,
	     toNumber = $lodash__toNumberExports;
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	
	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	var $default = debounce;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $lodash__throttleExports = (function (exports) {
 	var debounce = $lodash__debounceExports,
	    isObject = $lodash__isObjectExports;
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	
	var $default = throttle;
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $$uppy__store$defaultExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const packageJson = {
	  "version": "3.0.5"
	};
	/**
	 * Default store that keeps state in a simple object.
	 */
	var _callbacks = /*#__PURE__*/_classPrivateFieldLooseKey("callbacks");
	var _publish = /*#__PURE__*/_classPrivateFieldLooseKey("publish");
	class DefaultStore {
	  constructor() {
	    Object.defineProperty(this, _publish, {
	      value: _publish2
	    });
	    Object.defineProperty(this, _callbacks, {
	      writable: true,
	      value: new Set()
	    });
	    this.state = {};
	  }
	  getState() {
	    return this.state;
	  }
	  setState(patch) {
	    const prevState = {
	      ...this.state
	    };
	    const nextState = {
	      ...this.state,
	      ...patch
	    };
	    this.state = nextState;
	    _classPrivateFieldLooseBase(this, _publish)[_publish](prevState, nextState, patch);
	  }
	  subscribe(listener) {
	    _classPrivateFieldLooseBase(this, _callbacks)[_callbacks].add(listener);
	    return () => {
	      _classPrivateFieldLooseBase(this, _callbacks)[_callbacks].delete(listener);
	    };
	  }
	}
	function _publish2() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  _classPrivateFieldLooseBase(this, _callbacks)[_callbacks].forEach(listener => {
	    listener(...args);
	  });
	}
	DefaultStore.VERSION = packageJson.version;
	
	exports = { default: DefaultStore };
	
	return exports 
})({})

const $$uppy$utils$lib__getFileNameAndExtensionExports = (function (exports) {
 	/**
	 * Takes a full filename string and returns an object {name, extension}
	 */
	function getFileNameAndExtension(fullFileName) {
	  const lastDot = fullFileName.lastIndexOf('.');
	  // these count as no extension: "no-dot", "trailing-dot."
	  if (lastDot === -1 || lastDot === fullFileName.length - 1) {
	    return {
	      name: fullFileName,
	      extension: undefined
	    };
	  }
	  return {
	    name: fullFileName.slice(0, lastDot),
	    extension: fullFileName.slice(lastDot + 1)
	  };
	}
	
	exports = { default:  getFileNameAndExtension };
	
	return exports 
})({})

const $$uppy$utils$lib__mimeTypesExports = (function (exports) {
 	// ___Why not add the mime-types package?
	//    It's 19.7kB gzipped, and we only need mime types for well-known extensions (for file previews).
	// ___Where to take new extensions from?
	//    https://github.com/jshttp/mime-db/blob/master/db.json
	
	var _default = {
	  __proto__: null,
	  md: 'text/markdown',
	  markdown: 'text/markdown',
	  mp4: 'video/mp4',
	  mp3: 'audio/mp3',
	  svg: 'image/svg+xml',
	  jpg: 'image/jpeg',
	  png: 'image/png',
	  webp: 'image/webp',
	  gif: 'image/gif',
	  heic: 'image/heic',
	  heif: 'image/heif',
	  yaml: 'text/yaml',
	  yml: 'text/yaml',
	  csv: 'text/csv',
	  tsv: 'text/tab-separated-values',
	  tab: 'text/tab-separated-values',
	  avi: 'video/x-msvideo',
	  mks: 'video/x-matroska',
	  mkv: 'video/x-matroska',
	  mov: 'video/quicktime',
	  dicom: 'application/dicom',
	  doc: 'application/msword',
	  docm: 'application/vnd.ms-word.document.macroenabled.12',
	  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	  dot: 'application/msword',
	  dotm: 'application/vnd.ms-word.template.macroenabled.12',
	  dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
	  xla: 'application/vnd.ms-excel',
	  xlam: 'application/vnd.ms-excel.addin.macroenabled.12',
	  xlc: 'application/vnd.ms-excel',
	  xlf: 'application/x-xliff+xml',
	  xlm: 'application/vnd.ms-excel',
	  xls: 'application/vnd.ms-excel',
	  xlsb: 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
	  xlsm: 'application/vnd.ms-excel.sheet.macroenabled.12',
	  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	  xlt: 'application/vnd.ms-excel',
	  xltm: 'application/vnd.ms-excel.template.macroenabled.12',
	  xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
	  xlw: 'application/vnd.ms-excel',
	  txt: 'text/plain',
	  text: 'text/plain',
	  conf: 'text/plain',
	  log: 'text/plain',
	  pdf: 'application/pdf',
	  zip: 'application/zip',
	  '7z': 'application/x-7z-compressed',
	  rar: 'application/x-rar-compressed',
	  tar: 'application/x-tar',
	  gz: 'application/gzip',
	  dmg: 'application/x-apple-diskimage'
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $$uppy$utils$lib__getFileTypeExports = (function (exports) {
 	const { default: getFileNameAndExtension } = $$uppy$utils$lib__getFileNameAndExtensionExports;;
	const { default: mimeTypes } = $$uppy$utils$lib__mimeTypesExports;;
	function getFileType(file) {
	  var _getFileNameAndExtens;
	  if (file.type) return file.type;
	  const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
	  if (fileExtension && fileExtension in mimeTypes) {
	    // else, see if we can map extension to a mime type
	    return mimeTypes[fileExtension];
	  }
	  // if all fails, fall back to a generic byte stream type
	  return 'application/octet-stream';
	}
	
	exports = { default:  getFileType };
	
	return exports 
})({})

const $$uppy$utils$lib__generateFileIDExports = (function (exports) {
 	const { default: getFileType } = $$uppy$utils$lib__getFileTypeExports;;
	function encodeCharacter(character) {
	  return character.charCodeAt(0).toString(32);
	}
	function encodeFilename(name) {
	  let suffix = '';
	  return name.replace(/[^A-Z0-9]/gi, character => {
	    suffix += `-${encodeCharacter(character)}`;
	    return '/';
	  }) + suffix;
	}
	
	/**
	 * Takes a file object and turns it into fileID, by converting file.name to lowercase,
	 * removing extra characters and adding type, size and lastModified
	 */
	function generateFileID(file) {
	  // It's tempting to do `[items].filter(Boolean).join('-')` here, but that
	  // is slower! simple string concatenation is fast
	
	  let id = 'uppy';
	  if (typeof file.name === 'string') {
	    id += `-${encodeFilename(file.name.toLowerCase())}`;
	  }
	  if (file.type !== undefined) {
	    id += `-${file.type}`;
	  }
	  if (file.meta && typeof file.meta.relativePath === 'string') {
	    id += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
	  }
	  if (file.data.size !== undefined) {
	    id += `-${file.data.size}`;
	  }
	  if (file.data.lastModified !== undefined) {
	    id += `-${file.data.lastModified}`;
	  }
	  return id;
	}
	
	// If the provider has a stable, unique ID, then we can use that to identify the file.
	// Then we don't have to generate our own ID, and we can add the same file many times if needed (different path)
	function hasFileStableId(file) {
	  if (!file.isRemote || !file.remote) return false;
	  // These are the providers that it seems like have stable IDs for their files. The other's I haven't checked yet.
	  const stableIdProviders = new Set(['box', 'dropbox', 'drive', 'facebook', 'unsplash']);
	  return stableIdProviders.has(file.remote.provider);
	}
	function getSafeFileId(file) {
	  if (hasFileStableId(file)) return file.id;
	  const fileType = getFileType(file);
	  return generateFileID({
	    ...file,
	    type: fileType
	  });
	}
	
	exports = { getSafeFileId, default:  generateFileID };
	
	return exports 
})({})

const $$uppy$core$lib__supportsUploadProgressExports = (function (exports) {
 	// Edge 15.x does not fire 'progress' events on uploads.
	// See https://github.com/transloadit/uppy/issues/945
	// And https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12224510/
	function supportsUploadProgress(userAgent) {
	  // Allow passing in userAgent for tests
	  if (userAgent == null && typeof navigator !== 'undefined') {
	    // eslint-disable-next-line no-param-reassign
	    userAgent = navigator.userAgent;
	  }
	  // Assume it works because basically everything supports progress events.
	  if (!userAgent) return true;
	  const m = /Edge\/(\d+\.\d+)/.exec(userAgent);
	  if (!m) return true;
	  const edgeVersion = m[1];
	  let [major, minor] = edgeVersion.split('.');
	  major = parseInt(major, 10);
	  minor = parseInt(minor, 10);
	
	  // Worked before:
	  // Edge 40.15063.0.0
	  // Microsoft EdgeHTML 15.15063
	  if (major < 15 || major === 15 && minor < 15063) {
	    return true;
	  }
	
	  // Fixed in:
	  // Microsoft EdgeHTML 18.18218
	  if (major > 18 || major === 18 && minor >= 18218) {
	    return true;
	  }
	
	  // other versions don't work.
	  return false;
	}
	
	exports = { default:  supportsUploadProgress };
	
	return exports 
})({})

const $$uppy$core$lib__getFileNameExports = (function (exports) {
 	function getFileName(fileType, fileDescriptor) {
	  if (fileDescriptor.name) {
	    return fileDescriptor.name;
	  }
	  if (fileType.split('/')[0] === 'image') {
	    return `${fileType.split('/')[0]}.${fileType.split('/')[1]}`;
	  }
	  return 'noname';
	}
	
	exports = { default:  getFileName };
	
	return exports 
})({})

const $$uppy$utils$lib__getTimeStampExports = (function (exports) {
 	/**
	 * Adds zero to strings shorter than two characters.
	 */
	function pad(number) {
	  return number < 10 ? `0${number}` : number.toString();
	}
	
	/**
	 * Returns a timestamp in the format of `hours:minutes:seconds`
	 */
	function getTimeStamp() {
	  const date = new Date();
	  const hours = pad(date.getHours());
	  const minutes = pad(date.getMinutes());
	  const seconds = pad(date.getSeconds());
	  return `${hours}:${minutes}:${seconds}`;
	}
	
	exports = { default:  getTimeStamp };
	
	return exports 
})({})

const $$uppy$core$lib__loggersExports = (function (exports) {
 	/* eslint-disable no-console */
	const { default: getTimeStamp } = $$uppy$utils$lib__getTimeStampExports;;
	
	// Swallow all logs, except errors.
	// default if logger is not set or debug: false
	const justErrorsLogger = {
	  debug: () => {},
	  warn: () => {},
	  error: function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
	  }
	};
	
	// Print logs to console with namespace + timestamp,
	// set by logger: Uppy.debugLogger or debug: true
	const debugLogger = {
	  debug: function () {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	    return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
	  },
	  warn: function () {
	    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }
	    return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
	  },
	  error: function () {
	    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	    return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
	  }
	};
	{ justErrorsLogger, debugLogger };
	
	exports = { justErrorsLogger, debugLogger };
	
	return exports 
})({})

const $$transloadit__prettier$bytesExports = (function (exports) {
 	// Adapted from https://github.com/Flet/prettier-bytes/
	// Changing 1000 bytes to 1024, so we can keep uppercase KB vs kB
	// ISC License (c) Dan Flettre https://github.com/Flet/prettier-bytes/blob/master/LICENSE
	var $default = function prettierBytes (num) {
	  if (typeof num !== 'number' || isNaN(num)) {
	    throw new TypeError(`Expected a number, got ${typeof num}`)
	  }
	
	  const neg = num < 0
	  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	
	  if (neg) {
	    num = -num
	  }
	
	  if (num < 1) {
	    return `${(neg ? '-' : '') + num} B`
	  }
	
	  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1)
	  num = Number(num / Math.pow(1024, exponent))
	  const unit = units[exponent]
	
	  if (num >= 10 || num % 1 === 0) {
	    // Do not show decimals when the number is two-digit, or if the number has no
	    // decimal component.
	    return `${(neg ? '-' : '') + num.toFixed(0)} ${unit}`
	  }
	  return `${(neg ? '-' : '') + num.toFixed(1)} ${unit}`
	}
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $__wildcardExports = (function (exports) {
 	/* jshint node: true */
	'use strict';
	
	/**
	  # wildcard
	
	  Very simple wildcard matching, which is designed to provide the same
	  functionality that is found in the
	  [eve](https://github.com/adobe-webplatform/eve) eventing library.
	
	  ## Usage
	
	  It works with strings:
	
	  <<< examples/strings.js
	
	  Arrays:
	
	  <<< examples/arrays.js
	
	  Objects (matching against keys):
	
	  <<< examples/objects.js
	
	  While the library works in Node, if you are are looking for file-based
	  wildcard matching then you should have a look at:
	
	  <https://github.com/isaacs/node-glob>
	**/
	
	function WildcardMatcher(text, separator) {
	  this.text = text = text || '';
	  this.hasWild = ~text.indexOf('*');
	  this.separator = separator;
	  this.parts = text.split(separator);
	}
	
	WildcardMatcher.prototype.match = function(input) {
	  var matches = true;
	  var parts = this.parts;
	  var ii;
	  var partsCount = parts.length;
	  var testParts;
	
	  if (typeof input == 'string' || input instanceof String) {
	    if (!this.hasWild && this.text != input) {
	      matches = false;
	    } else {
	      testParts = (input || '').split(this.separator);
	      for (ii = 0; matches && ii < partsCount; ii++) {
	        if (parts[ii] === '*')  {
	          continue;
	        } else if (ii < testParts.length) {
	          matches = parts[ii] === testParts[ii];
	        } else {
	          matches = false;
	        }
	      }
	
	      // If matches, then return the component parts
	      matches = matches && testParts;
	    }
	  }
	  else if (typeof input.splice == 'function') {
	    matches = [];
	
	    for (ii = input.length; ii--; ) {
	      if (this.match(input[ii])) {
	        matches[matches.length] = input[ii];
	      }
	    }
	  }
	  else if (typeof input == 'object') {
	    matches = {};
	
	    for (var key in input) {
	      if (this.match(key)) {
	        matches[key] = input[key];
	      }
	    }
	  }
	
	  return matches;
	};
	
	var $default = function(text, test, separator) {
	  var matcher = new WildcardMatcher(text, separator || /[\/\.]/);
	  if (typeof test != 'undefined') {
	    return matcher.match(test);
	  }
	
	  return matcher;
	};
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $__mime$matchExports = (function (exports) {
 	var wildcard = $Exports;
	var reMimePartSplit = /[\/\+\.]/;
	
	/**
	  # mime-match
	
	  A simple function to checker whether a target mime type matches a mime-type
	  pattern (e.g. image/jpeg matches image/jpeg OR image/*).
	
	  ## Example Usage
	
	  <<< example.js
	
	**/
	var $default = function(target, pattern) {
	  function test(pattern) {
	    var result = wildcard(pattern, target, reMimePartSplit);
	
	    // ensure that we have a valid mime type (should have two parts)
	    return result && result.length >= 2;
	  }
	
	  return pattern ? test(pattern.split(';')[0]) : test;
	};
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $$uppy$core$lib__RestricterExports = (function (exports) {
 	/* eslint-disable max-classes-per-file, class-methods-use-this */
	const { default: prettierBytes } = $$transloadit__prettier$bytesExports;;
	const { default: match } = $__mime$matchExports;;
	const defaultOptions = {
	  maxFileSize: null,
	  minFileSize: null,
	  maxTotalFileSize: null,
	  maxNumberOfFiles: null,
	  minNumberOfFiles: null,
	  allowedFileTypes: null,
	  requiredMetaFields: []
	};
	class RestrictionError extends Error {
	  constructor(message, _temp) {
	    let {
	      isUserFacing = true,
	      file
	    } = _temp === void 0 ? {} : _temp;
	    super(message);
	    this.isRestriction = true;
	    this.isUserFacing = isUserFacing;
	    if (file != null) this.file = file; // only some restriction errors are related to a particular file
	  }
	}
	
	class Restricter {
	  constructor(getOpts, i18n) {
	    this.i18n = i18n;
	    this.getOpts = () => {
	      const opts = getOpts();
	      if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
	        throw new TypeError('`restrictions.allowedFileTypes` must be an array');
	      }
	      return opts;
	    };
	  }
	
	  // Because these operations are slow, we cannot run them for every file (if we are adding multiple files)
	  validateAggregateRestrictions(existingFiles, addingFiles) {
	    const {
	      maxTotalFileSize,
	      maxNumberOfFiles
	    } = this.getOpts().restrictions;
	    if (maxNumberOfFiles) {
	      const nonGhostFiles = existingFiles.filter(f => !f.isGhost);
	      if (nonGhostFiles.length + addingFiles.length > maxNumberOfFiles) {
	        throw new RestrictionError(`${this.i18n('youCanOnlyUploadX', {
	          smart_count: maxNumberOfFiles
	        })}`);
	      }
	    }
	    if (maxTotalFileSize) {
	      let totalFilesSize = existingFiles.reduce((total, f) => total + f.size, 0);
	      for (const addingFile of addingFiles) {
	        if (addingFile.size != null) {
	          // We can't check maxTotalFileSize if the size is unknown.
	          totalFilesSize += addingFile.size;
	          if (totalFilesSize > maxTotalFileSize) {
	            throw new RestrictionError(this.i18n('exceedsSize', {
	              size: prettierBytes(maxTotalFileSize),
	              file: addingFile.name
	            }));
	          }
	        }
	      }
	    }
	  }
	  validateSingleFile(file) {
	    const {
	      maxFileSize,
	      minFileSize,
	      allowedFileTypes
	    } = this.getOpts().restrictions;
	    if (allowedFileTypes) {
	      const isCorrectFileType = allowedFileTypes.some(type => {
	        // check if this is a mime-type
	        if (type.includes('/')) {
	          if (!file.type) return false;
	          return match(file.type.replace(/;.*?$/, ''), type);
	        }
	
	        // otherwise this is likely an extension
	        if (type[0] === '.' && file.extension) {
	          return file.extension.toLowerCase() === type.slice(1).toLowerCase();
	        }
	        return false;
	      });
	      if (!isCorrectFileType) {
	        const allowedFileTypesString = allowedFileTypes.join(', ');
	        throw new RestrictionError(this.i18n('youCanOnlyUploadFileTypes', {
	          types: allowedFileTypesString
	        }), {
	          file
	        });
	      }
	    }
	
	    // We can't check maxFileSize if the size is unknown.
	    if (maxFileSize && file.size != null && file.size > maxFileSize) {
	      throw new RestrictionError(this.i18n('exceedsSize', {
	        size: prettierBytes(maxFileSize),
	        file: file.name
	      }), {
	        file
	      });
	    }
	
	    // We can't check minFileSize if the size is unknown.
	    if (minFileSize && file.size != null && file.size < minFileSize) {
	      throw new RestrictionError(this.i18n('inferiorSize', {
	        size: prettierBytes(minFileSize)
	      }), {
	        file
	      });
	    }
	  }
	  validate(existingFiles, addingFiles) {
	    addingFiles.forEach(addingFile => {
	      this.validateSingleFile(addingFile);
	    });
	    this.validateAggregateRestrictions(existingFiles, addingFiles);
	  }
	  validateMinNumberOfFiles(files) {
	    const {
	      minNumberOfFiles
	    } = this.getOpts().restrictions;
	    if (Object.keys(files).length < minNumberOfFiles) {
	      throw new RestrictionError(this.i18n('youHaveToAtLeastSelectX', {
	        smart_count: minNumberOfFiles
	      }));
	    }
	  }
	  getMissingRequiredMetaFields(file) {
	    const error = new RestrictionError(this.i18n('missingRequiredMetaFieldOnFile', {
	      fileName: file.name
	    }));
	    const {
	      requiredMetaFields
	    } = this.getOpts().restrictions;
	    const missingFields = [];
	    for (const field of requiredMetaFields) {
	      if (!Object.hasOwn(file.meta, field) || file.meta[field] === '') {
	        missingFields.push(field);
	      }
	    }
	    return {
	      missingFields,
	      error
	    };
	  }
	}
	{ Restricter, defaultOptions, RestrictionError };
	
	exports = { Restricter, defaultOptions, RestrictionError };
	
	return exports 
})({})

const $$uppy$core$lib__localeExports = (function (exports) {
 	var _default = {
	  strings: {
	    addBulkFilesFailed: {
	      0: 'Failed to add %{smart_count} file due to an internal error',
	      1: 'Failed to add %{smart_count} files due to internal errors'
	    },
	    youCanOnlyUploadX: {
	      0: 'You can only upload %{smart_count} file',
	      1: 'You can only upload %{smart_count} files'
	    },
	    youHaveToAtLeastSelectX: {
	      0: 'You have to select at least %{smart_count} file',
	      1: 'You have to select at least %{smart_count} files'
	    },
	    exceedsSize: '%{file} exceeds maximum allowed size of %{size}',
	    missingRequiredMetaField: 'Missing required meta fields',
	    missingRequiredMetaFieldOnFile: 'Missing required meta fields in %{fileName}',
	    inferiorSize: 'This file is smaller than the allowed size of %{size}',
	    youCanOnlyUploadFileTypes: 'You can only upload: %{types}',
	    noMoreFilesAllowed: 'Cannot add more files',
	    noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
	    companionError: 'Connection with Companion failed',
	    authAborted: 'Authentication aborted',
	    companionUnauthorizeHint: 'To unauthorize to your %{provider} account, please go to %{url}',
	    failedToUpload: 'Failed to upload %{file}',
	    noInternetConnection: 'No Internet connection',
	    connectedToInternet: 'Connected to the Internet',
	    // Strings for remote providers
	    noFilesFound: 'You have no files or folders here',
	    noSearchResults: 'Unfortunately, there are no results for this search',
	    selectX: {
	      0: 'Select %{smart_count}',
	      1: 'Select %{smart_count}'
	    },
	    allFilesFromFolderNamed: 'All files from folder %{name}',
	    openFolderNamed: 'Open folder %{name}',
	    cancel: 'Cancel',
	    logOut: 'Log out',
	    filter: 'Filter',
	    resetFilter: 'Reset filter',
	    loading: 'Loading...',
	    loadedXFiles: 'Loaded %{numFiles} files',
	    authenticateWithTitle: 'Please authenticate with %{pluginName} to select files',
	    authenticateWith: 'Connect to %{pluginName}',
	    signInWithGoogle: 'Sign in with Google',
	    searchImages: 'Search for images',
	    enterTextToSearch: 'Enter text to search for images',
	    search: 'Search',
	    resetSearch: 'Reset search',
	    emptyFolderAdded: 'No files were added from empty folder',
	    addedNumFiles: 'Added %{numFiles} file(s)',
	    folderAlreadyAdded: 'The folder "%{folder}" was already added',
	    folderAdded: {
	      0: 'Added %{smart_count} file from %{folder}',
	      1: 'Added %{smart_count} files from %{folder}'
	    },
	    additionalRestrictionsFailed: '%{count} additional restrictions were not fulfilled'
	  }
	
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $$uppy$core$lib__UppyExports = (function (exports) {
 	let _Symbol$for, _Symbol$for2;
	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	/* eslint-disable max-classes-per-file */
	/* global AggregateError */
	
	const { default: Translator } = $$uppy$utils$lib__TranslatorExports;;
	const { default: ee } = $__namespace$emitterExports;;
	const { nanoid } = $nanoid__non$secureExports;
	const { default: throttle } = $lodash__throttleExports;;
	const { default: DefaultStore } = $$uppy__store$defaultExports;;
	const { default: getFileType } = $$uppy$utils$lib__getFileTypeExports;;
	const { default: getFileNameAndExtension } = $$uppy$utils$lib__getFileNameAndExtensionExports;;
	const { getSafeFileId } = $$uppy$utils$lib__generateFileIDExports;
	const { default: supportsUploadProgress } = $$uppy$core$lib__supportsUploadProgressExports;;
	const { default: getFileName } = $$uppy$core$lib__getFileNameExports;;
	const { justErrorsLogger, debugLogger } = $$uppy$core$lib__loggersExports;
	const { Restricter, defaultOptions: defaultRestrictionOptions, RestrictionError } = $$uppy$core$lib__RestricterExports;
	const packageJson = {
	  "version": "3.7.1"
	};
	const { default: locale } = $$uppy$core$lib__localeExports;;
	const getDefaultUploadState = () => ({
	  totalProgress: 0,
	  allowNewUpload: true,
	  error: null,
	  recoveredState: null
	});
	
	/**
	 * Uppy Core module.
	 * Manages plugins, state updates, acts as an event bus,
	 * adds/removes files and metadata.
	 */
	var _plugins = /*#__PURE__*/_classPrivateFieldLooseKey("plugins");
	var _restricter = /*#__PURE__*/_classPrivateFieldLooseKey("restricter");
	var _storeUnsubscribe = /*#__PURE__*/_classPrivateFieldLooseKey("storeUnsubscribe");
	var _emitter = /*#__PURE__*/_classPrivateFieldLooseKey("emitter");
	var _preProcessors = /*#__PURE__*/_classPrivateFieldLooseKey("preProcessors");
	var _uploaders = /*#__PURE__*/_classPrivateFieldLooseKey("uploaders");
	var _postProcessors = /*#__PURE__*/_classPrivateFieldLooseKey("postProcessors");
	var _informAndEmit = /*#__PURE__*/_classPrivateFieldLooseKey("informAndEmit");
	var _checkRequiredMetaFieldsOnFile = /*#__PURE__*/_classPrivateFieldLooseKey("checkRequiredMetaFieldsOnFile");
	var _checkRequiredMetaFields = /*#__PURE__*/_classPrivateFieldLooseKey("checkRequiredMetaFields");
	var _assertNewUploadAllowed = /*#__PURE__*/_classPrivateFieldLooseKey("assertNewUploadAllowed");
	var _transformFile = /*#__PURE__*/_classPrivateFieldLooseKey("transformFile");
	var _startIfAutoProceed = /*#__PURE__*/_classPrivateFieldLooseKey("startIfAutoProceed");
	var _checkAndUpdateFileState = /*#__PURE__*/_classPrivateFieldLooseKey("checkAndUpdateFileState");
	var _addListeners = /*#__PURE__*/_classPrivateFieldLooseKey("addListeners");
	var _updateOnlineStatus = /*#__PURE__*/_classPrivateFieldLooseKey("updateOnlineStatus");
	var _createUpload = /*#__PURE__*/_classPrivateFieldLooseKey("createUpload");
	var _getUpload = /*#__PURE__*/_classPrivateFieldLooseKey("getUpload");
	var _removeUpload = /*#__PURE__*/_classPrivateFieldLooseKey("removeUpload");
	var _runUpload = /*#__PURE__*/_classPrivateFieldLooseKey("runUpload");
	_Symbol$for = Symbol.for('uppy test: getPlugins');
	_Symbol$for2 = Symbol.for('uppy test: createUpload');
	class Uppy {
	  /**
	   * Instantiate Uppy
	   *
	   * @param {object} opts — Uppy options
	   */
	  constructor(_opts) {
	    /**
	     * Run an upload. This picks up where it left off in case the upload is being restored.
	     *
	     * @private
	     */
	    Object.defineProperty(this, _runUpload, {
	      value: _runUpload2
	    });
	    /**
	     * Remove an upload, eg. if it has been canceled or completed.
	     *
	     * @param {string} uploadID The ID of the upload.
	     */
	    Object.defineProperty(this, _removeUpload, {
	      value: _removeUpload2
	    });
	    Object.defineProperty(this, _getUpload, {
	      value: _getUpload2
	    });
	    /**
	     * Create an upload for a bunch of files.
	     *
	     * @param {Array<string>} fileIDs File IDs to include in this upload.
	     * @returns {string} ID of this upload.
	     */
	    Object.defineProperty(this, _createUpload, {
	      value: _createUpload2
	    });
	    /**
	     * Registers listeners for all global actions, like:
	     * `error`, `file-removed`, `upload-progress`
	     */
	    Object.defineProperty(this, _addListeners, {
	      value: _addListeners2
	    });
	    Object.defineProperty(this, _checkAndUpdateFileState, {
	      value: _checkAndUpdateFileState2
	    });
	    // Schedule an upload if `autoProceed` is enabled.
	    Object.defineProperty(this, _startIfAutoProceed, {
	      value: _startIfAutoProceed2
	    });
	    /**
	     * Create a file state object based on user-provided `addFile()` options.
	     */
	    Object.defineProperty(this, _transformFile, {
	      value: _transformFile2
	    });
	    Object.defineProperty(this, _assertNewUploadAllowed, {
	      value: _assertNewUploadAllowed2
	    });
	    Object.defineProperty(this, _checkRequiredMetaFields, {
	      value: _checkRequiredMetaFields2
	    });
	    Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
	      value: _checkRequiredMetaFieldsOnFile2
	    });
	    /*
	    * @constructs
	    * @param { Error[] } errors
	    * @param { undefined } file
	    */
	    /*
	    * @constructs
	    * @param { RestrictionError } error
	    */
	    Object.defineProperty(this, _informAndEmit, {
	      value: _informAndEmit2
	    });
	    /** @type {Record<string, BasePlugin[]>} */
	    Object.defineProperty(this, _plugins, {
	      writable: true,
	      value: Object.create(null)
	    });
	    Object.defineProperty(this, _restricter, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _storeUnsubscribe, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _emitter, {
	      writable: true,
	      value: ee()
	    });
	    Object.defineProperty(this, _preProcessors, {
	      writable: true,
	      value: new Set()
	    });
	    Object.defineProperty(this, _uploaders, {
	      writable: true,
	      value: new Set()
	    });
	    Object.defineProperty(this, _postProcessors, {
	      writable: true,
	      value: new Set()
	    });
	    // ___Why throttle at 500ms?
	    //    - We must throttle at >250ms for superfocus in Dashboard to work well
	    //    (because animation takes 0.25s, and we want to wait for all animations to be over before refocusing).
	    //    [Practical Check]: if thottle is at 100ms, then if you are uploading a file,
	    //    and click 'ADD MORE FILES', - focus won't activate in Firefox.
	    //    - We must throttle at around >500ms to avoid performance lags.
	    //    [Practical Check] Firefox, try to upload a big file for a prolonged period of time. Laptop will start to heat up.
	    this.calculateProgress = throttle((file, data) => {
	      const fileInState = this.getFile(file == null ? void 0 : file.id);
	      if (file == null || !fileInState) {
	        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	        return;
	      }
	      if (fileInState.progress.percentage === 100) {
	        this.log(`Not setting progress for a file that has been already uploaded: ${file.id}`);
	        return;
	      }
	
	      // bytesTotal may be null or zero; in that case we can't divide by it
	      const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
	      this.setFileState(file.id, {
	        progress: {
	          ...fileInState.progress,
	          bytesUploaded: data.bytesUploaded,
	          bytesTotal: data.bytesTotal,
	          percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
	        }
	      });
	      this.calculateTotalProgress();
	    }, 500, {
	      leading: true,
	      trailing: true
	    });
	    Object.defineProperty(this, _updateOnlineStatus, {
	      writable: true,
	      value: this.updateOnlineStatus.bind(this)
	    });
	    this.defaultLocale = locale;
	    const defaultOptions = {
	      id: 'uppy',
	      autoProceed: false,
	      allowMultipleUploadBatches: true,
	      debug: false,
	      restrictions: defaultRestrictionOptions,
	      meta: {},
	      onBeforeFileAdded: (file, files) => !Object.hasOwn(files, file.id),
	      onBeforeUpload: files => files,
	      store: new DefaultStore(),
	      logger: justErrorsLogger,
	      infoTimeout: 5000
	    };
	
	    // Merge default options with the ones set by user,
	    // making sure to merge restrictions too
	    this.opts = {
	      ...defaultOptions,
	      ..._opts,
	      restrictions: {
	        ...defaultOptions.restrictions,
	        ...(_opts && _opts.restrictions)
	      }
	    };
	
	    // Support debug: true for backwards-compatability, unless logger is set in opts
	    // opts instead of this.opts to avoid comparing objects — we set logger: justErrorsLogger in defaultOptions
	    if (_opts && _opts.logger && _opts.debug) {
	      this.log('You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.', 'warning');
	    } else if (_opts && _opts.debug) {
	      this.opts.logger = debugLogger;
	    }
	    this.log(`Using Core v${this.constructor.VERSION}`);
	    this.i18nInit();
	    this.store = this.opts.store;
	    this.setState({
	      ...getDefaultUploadState(),
	      plugins: {},
	      files: {},
	      currentUploads: {},
	      capabilities: {
	        uploadProgress: supportsUploadProgress(),
	        individualCancellation: true,
	        resumableUploads: false
	      },
	      meta: {
	        ...this.opts.meta
	      },
	      info: []
	    });
	    _classPrivateFieldLooseBase(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
	    _classPrivateFieldLooseBase(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
	      this.emit('state-update', prevState, nextState, patch);
	      this.updateAll(nextState);
	    });
	
	    // Exposing uppy object on window for debugging and testing
	    if (this.opts.debug && typeof window !== 'undefined') {
	      window[this.opts.id] = this;
	    }
	    _classPrivateFieldLooseBase(this, _addListeners)[_addListeners]();
	  }
	  emit(event) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	    _classPrivateFieldLooseBase(this, _emitter)[_emitter].emit(event, ...args);
	  }
	  on(event, callback) {
	    _classPrivateFieldLooseBase(this, _emitter)[_emitter].on(event, callback);
	    return this;
	  }
	  once(event, callback) {
	    _classPrivateFieldLooseBase(this, _emitter)[_emitter].once(event, callback);
	    return this;
	  }
	  off(event, callback) {
	    _classPrivateFieldLooseBase(this, _emitter)[_emitter].off(event, callback);
	    return this;
	  }
	
	  /**
	   * Iterate on all plugins and run `update` on them.
	   * Called each time state changes.
	   *
	   */
	  updateAll(state) {
	    this.iteratePlugins(plugin => {
	      plugin.update(state);
	    });
	  }
	
	  /**
	   * Updates state with a patch
	   *
	   * @param {object} patch {foo: 'bar'}
	   */
	  setState(patch) {
	    this.store.setState(patch);
	  }
	
	  /**
	   * Returns current state.
	   *
	   * @returns {object}
	   */
	  getState() {
	    return this.store.getState();
	  }
	  patchFilesState(filesWithNewState) {
	    const existingFilesState = this.getState().files;
	    this.setState({
	      files: {
	        ...existingFilesState,
	        ...Object.fromEntries(Object.entries(filesWithNewState).map(_ref => {
	          let [fileID, newFileState] = _ref;
	          return [fileID, {
	            ...existingFilesState[fileID],
	            ...newFileState
	          }];
	        }))
	      }
	    });
	  }
	
	  /**
	   * Shorthand to set state for a specific file.
	   */
	  setFileState(fileID, state) {
	    if (!this.getState().files[fileID]) {
	      throw new Error(`Can’t set state for ${fileID} (the file could have been removed)`);
	    }
	    this.patchFilesState({
	      [fileID]: state
	    });
	  }
	  i18nInit() {
	    const translator = new Translator([this.defaultLocale, this.opts.locale]);
	    this.i18n = translator.translate.bind(translator);
	    this.i18nArray = translator.translateArray.bind(translator);
	    this.locale = translator.locale;
	  }
	  setOptions(newOpts) {
	    this.opts = {
	      ...this.opts,
	      ...newOpts,
	      restrictions: {
	        ...this.opts.restrictions,
	        ...(newOpts && newOpts.restrictions)
	      }
	    };
	    if (newOpts.meta) {
	      this.setMeta(newOpts.meta);
	    }
	    this.i18nInit();
	    if (newOpts.locale) {
	      this.iteratePlugins(plugin => {
	        plugin.setOptions(newOpts);
	      });
	    }
	
	    // Note: this is not the preact `setState`, it's an internal function that has the same name.
	    this.setState(); // so that UI re-renders with new options
	  }
	
	  // todo next major: rename to something better? (it doesn't just reset progress)
	  resetProgress() {
	    const defaultProgress = {
	      percentage: 0,
	      bytesUploaded: 0,
	      uploadComplete: false,
	      uploadStarted: null
	    };
	    const files = {
	      ...this.getState().files
	    };
	    const updatedFiles = {};
	    Object.keys(files).forEach(fileID => {
	      updatedFiles[fileID] = {
	        ...files[fileID],
	        progress: {
	          ...files[fileID].progress,
	          ...defaultProgress
	        }
	      };
	    });
	    this.setState({
	      files: updatedFiles,
	      ...getDefaultUploadState()
	    });
	    this.emit('reset-progress');
	  }
	
	  /** @protected */
	  clearUploadedFiles() {
	    this.setState({
	      ...getDefaultUploadState(),
	      files: {}
	    });
	  }
	  addPreProcessor(fn) {
	    _classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors].add(fn);
	  }
	  removePreProcessor(fn) {
	    return _classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors].delete(fn);
	  }
	  addPostProcessor(fn) {
	    _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].add(fn);
	  }
	  removePostProcessor(fn) {
	    return _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].delete(fn);
	  }
	  addUploader(fn) {
	    _classPrivateFieldLooseBase(this, _uploaders)[_uploaders].add(fn);
	  }
	  removeUploader(fn) {
	    return _classPrivateFieldLooseBase(this, _uploaders)[_uploaders].delete(fn);
	  }
	  setMeta(data) {
	    const updatedMeta = {
	      ...this.getState().meta,
	      ...data
	    };
	    const updatedFiles = {
	      ...this.getState().files
	    };
	    Object.keys(updatedFiles).forEach(fileID => {
	      updatedFiles[fileID] = {
	        ...updatedFiles[fileID],
	        meta: {
	          ...updatedFiles[fileID].meta,
	          ...data
	        }
	      };
	    });
	    this.log('Adding metadata:');
	    this.log(data);
	    this.setState({
	      meta: updatedMeta,
	      files: updatedFiles
	    });
	  }
	  setFileMeta(fileID, data) {
	    const updatedFiles = {
	      ...this.getState().files
	    };
	    if (!updatedFiles[fileID]) {
	      this.log('Was trying to set metadata for a file that has been removed: ', fileID);
	      return;
	    }
	    const newMeta = {
	      ...updatedFiles[fileID].meta,
	      ...data
	    };
	    updatedFiles[fileID] = {
	      ...updatedFiles[fileID],
	      meta: newMeta
	    };
	    this.setState({
	      files: updatedFiles
	    });
	  }
	
	  /**
	   * Get a file object.
	   *
	   * @param {string} fileID The ID of the file object to return.
	   */
	  getFile(fileID) {
	    return this.getState().files[fileID];
	  }
	
	  /**
	   * Get all files in an array.
	   */
	  getFiles() {
	    const {
	      files
	    } = this.getState();
	    return Object.values(files);
	  }
	  getFilesByIds(ids) {
	    return ids.map(id => this.getFile(id));
	  }
	  getObjectOfFilesPerState() {
	    const {
	      files: filesObject,
	      totalProgress,
	      error
	    } = this.getState();
	    const files = Object.values(filesObject);
	    const inProgressFiles = files.filter(_ref2 => {
	      let {
	        progress
	      } = _ref2;
	      return !progress.uploadComplete && progress.uploadStarted;
	    });
	    const newFiles = files.filter(file => !file.progress.uploadStarted);
	    const startedFiles = files.filter(file => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
	    const uploadStartedFiles = files.filter(file => file.progress.uploadStarted);
	    const pausedFiles = files.filter(file => file.isPaused);
	    const completeFiles = files.filter(file => file.progress.uploadComplete);
	    const erroredFiles = files.filter(file => file.error);
	    const inProgressNotPausedFiles = inProgressFiles.filter(file => !file.isPaused);
	    const processingFiles = files.filter(file => file.progress.preprocess || file.progress.postprocess);
	    return {
	      newFiles,
	      startedFiles,
	      uploadStartedFiles,
	      pausedFiles,
	      completeFiles,
	      erroredFiles,
	      inProgressFiles,
	      inProgressNotPausedFiles,
	      processingFiles,
	      isUploadStarted: uploadStartedFiles.length > 0,
	      isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
	      isAllErrored: !!error && erroredFiles.length === files.length,
	      isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
	      isUploadInProgress: inProgressFiles.length > 0,
	      isSomeGhost: files.some(file => file.isGhost)
	    };
	  }
	  validateRestrictions(file, files) {
	    if (files === void 0) {
	      files = this.getFiles();
	    }
	    try {
	      _classPrivateFieldLooseBase(this, _restricter)[_restricter].validate(files, [file]);
	    } catch (err) {
	      return err;
	    }
	    return null;
	  }
	  checkIfFileAlreadyExists(fileID) {
	    const {
	      files
	    } = this.getState();
	    if (files[fileID] && !files[fileID].isGhost) {
	      return true;
	    }
	    return false;
	  }
	  /**
	   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
	   * try to guess file type in a clever way, check file against restrictions,
	   * and start an upload if `autoProceed === true`.
	   *
	   * @param {object} file object to add
	   * @returns {string} id for the added file
	   */
	  addFile(file) {
	    _classPrivateFieldLooseBase(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
	    const {
	      nextFilesState,
	      validFilesToAdd,
	      errors
	    } = _classPrivateFieldLooseBase(this, _checkAndUpdateFileState)[_checkAndUpdateFileState]([file]);
	    const restrictionErrors = errors.filter(error => error.isRestriction);
	    _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](restrictionErrors);
	    if (errors.length > 0) throw errors[0];
	    this.setState({
	      files: nextFilesState
	    });
	    const [firstValidFileToAdd] = validFilesToAdd;
	    this.emit('file-added', firstValidFileToAdd);
	    this.emit('files-added', validFilesToAdd);
	    this.log(`Added file: ${firstValidFileToAdd.name}, ${firstValidFileToAdd.id}, mime type: ${firstValidFileToAdd.type}`);
	    _classPrivateFieldLooseBase(this, _startIfAutoProceed)[_startIfAutoProceed]();
	    return firstValidFileToAdd.id;
	  }
	
	  /**
	   * Add multiple files to `state.files`. See the `addFile()` documentation.
	   *
	   * If an error occurs while adding a file, it is logged and the user is notified.
	   * This is good for UI plugins, but not for programmatic use.
	   * Programmatic users should usually still use `addFile()` on individual files.
	   */
	  addFiles(fileDescriptors) {
	    _classPrivateFieldLooseBase(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
	    const {
	      nextFilesState,
	      validFilesToAdd,
	      errors
	    } = _classPrivateFieldLooseBase(this, _checkAndUpdateFileState)[_checkAndUpdateFileState](fileDescriptors);
	    const restrictionErrors = errors.filter(error => error.isRestriction);
	    _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](restrictionErrors);
	    const nonRestrictionErrors = errors.filter(error => !error.isRestriction);
	    if (nonRestrictionErrors.length > 0) {
	      let message = 'Multiple errors occurred while adding files:\n';
	      nonRestrictionErrors.forEach(subError => {
	        message += `\n * ${subError.message}`;
	      });
	      this.info({
	        message: this.i18n('addBulkFilesFailed', {
	          smart_count: nonRestrictionErrors.length
	        }),
	        details: message
	      }, 'error', this.opts.infoTimeout);
	      if (typeof AggregateError === 'function') {
	        throw new AggregateError(nonRestrictionErrors, message);
	      } else {
	        const err = new Error(message);
	        err.errors = nonRestrictionErrors;
	        throw err;
	      }
	    }
	
	    // OK, we haven't thrown an error, we can start updating state and emitting events now:
	
	    this.setState({
	      files: nextFilesState
	    });
	    validFilesToAdd.forEach(file => {
	      this.emit('file-added', file);
	    });
	    this.emit('files-added', validFilesToAdd);
	    if (validFilesToAdd.length > 5) {
	      this.log(`Added batch of ${validFilesToAdd.length} files`);
	    } else {
	      Object.values(validFilesToAdd).forEach(file => {
	        this.log(`Added file: ${file.name}\n id: ${file.id}\n type: ${file.type}`);
	      });
	    }
	    if (validFilesToAdd.length > 0) {
	      _classPrivateFieldLooseBase(this, _startIfAutoProceed)[_startIfAutoProceed]();
	    }
	  }
	  removeFiles(fileIDs, reason) {
	    const {
	      files,
	      currentUploads
	    } = this.getState();
	    const updatedFiles = {
	      ...files
	    };
	    const updatedUploads = {
	      ...currentUploads
	    };
	    const removedFiles = Object.create(null);
	    fileIDs.forEach(fileID => {
	      if (files[fileID]) {
	        removedFiles[fileID] = files[fileID];
	        delete updatedFiles[fileID];
	      }
	    });
	
	    // Remove files from the `fileIDs` list in each upload.
	    function fileIsNotRemoved(uploadFileID) {
	      return removedFiles[uploadFileID] === undefined;
	    }
	    Object.keys(updatedUploads).forEach(uploadID => {
	      const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
	
	      // Remove the upload if no files are associated with it anymore.
	      if (newFileIDs.length === 0) {
	        delete updatedUploads[uploadID];
	        return;
	      }
	      const {
	        capabilities
	      } = this.getState();
	      if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
	        throw new Error('individualCancellation is disabled');
	      }
	      updatedUploads[uploadID] = {
	        ...currentUploads[uploadID],
	        fileIDs: newFileIDs
	      };
	    });
	    const stateUpdate = {
	      currentUploads: updatedUploads,
	      files: updatedFiles
	    };
	
	    // If all files were removed - allow new uploads,
	    // and clear recoveredState
	    if (Object.keys(updatedFiles).length === 0) {
	      stateUpdate.allowNewUpload = true;
	      stateUpdate.error = null;
	      stateUpdate.recoveredState = null;
	    }
	    this.setState(stateUpdate);
	    this.calculateTotalProgress();
	    const removedFileIDs = Object.keys(removedFiles);
	    removedFileIDs.forEach(fileID => {
	      this.emit('file-removed', removedFiles[fileID], reason);
	    });
	    if (removedFileIDs.length > 5) {
	      this.log(`Removed ${removedFileIDs.length} files`);
	    } else {
	      this.log(`Removed files: ${removedFileIDs.join(', ')}`);
	    }
	  }
	  removeFile(fileID, reason) {
	    if (reason === void 0) {
	      reason = null;
	    }
	    this.removeFiles([fileID], reason);
	  }
	  pauseResume(fileID) {
	    if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
	      return undefined;
	    }
	    const wasPaused = this.getFile(fileID).isPaused || false;
	    const isPaused = !wasPaused;
	    this.setFileState(fileID, {
	      isPaused
	    });
	    this.emit('upload-pause', fileID, isPaused);
	    return isPaused;
	  }
	  pauseAll() {
	    const updatedFiles = {
	      ...this.getState().files
	    };
	    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter(file => {
	      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
	    });
	    inProgressUpdatedFiles.forEach(file => {
	      const updatedFile = {
	        ...updatedFiles[file],
	        isPaused: true
	      };
	      updatedFiles[file] = updatedFile;
	    });
	    this.setState({
	      files: updatedFiles
	    });
	    this.emit('pause-all');
	  }
	  resumeAll() {
	    const updatedFiles = {
	      ...this.getState().files
	    };
	    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter(file => {
	      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
	    });
	    inProgressUpdatedFiles.forEach(file => {
	      const updatedFile = {
	        ...updatedFiles[file],
	        isPaused: false,
	        error: null
	      };
	      updatedFiles[file] = updatedFile;
	    });
	    this.setState({
	      files: updatedFiles
	    });
	    this.emit('resume-all');
	  }
	  retryAll() {
	    const updatedFiles = {
	      ...this.getState().files
	    };
	    const filesToRetry = Object.keys(updatedFiles).filter(file => {
	      return updatedFiles[file].error;
	    });
	    filesToRetry.forEach(file => {
	      const updatedFile = {
	        ...updatedFiles[file],
	        isPaused: false,
	        error: null
	      };
	      updatedFiles[file] = updatedFile;
	    });
	    this.setState({
	      files: updatedFiles,
	      error: null
	    });
	    this.emit('retry-all', filesToRetry);
	    if (filesToRetry.length === 0) {
	      return Promise.resolve({
	        successful: [],
	        failed: []
	      });
	    }
	    const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](filesToRetry, {
	      forceAllowNewUpload: true // create new upload even if allowNewUpload: false
	    });
	
	    return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
	  }
	  cancelAll(_temp) {
	    let {
	      reason = 'user'
	    } = _temp === void 0 ? {} : _temp;
	    this.emit('cancel-all', {
	      reason
	    });
	
	    // Only remove existing uploads if user is canceling
	    if (reason === 'user') {
	      const {
	        files
	      } = this.getState();
	      const fileIDs = Object.keys(files);
	      if (fileIDs.length) {
	        this.removeFiles(fileIDs, 'cancel-all');
	      }
	      this.setState(getDefaultUploadState());
	      // todo should we call this.emit('reset-progress') like we do for resetProgress?
	    }
	  }
	
	  retryUpload(fileID) {
	    this.setFileState(fileID, {
	      error: null,
	      isPaused: false
	    });
	    this.emit('upload-retry', fileID);
	    const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload]([fileID], {
	      forceAllowNewUpload: true // create new upload even if allowNewUpload: false
	    });
	
	    return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
	  }
	  logout() {
	    this.iteratePlugins(plugin => {
	      if (plugin.provider && plugin.provider.logout) {
	        plugin.provider.logout();
	      }
	    });
	  }
	  calculateTotalProgress() {
	    // calculate total progress, using the number of files currently uploading,
	    // multiplied by 100 and the summ of individual progress of each file
	    const files = this.getFiles();
	    const inProgress = files.filter(file => {
	      return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
	    });
	    if (inProgress.length === 0) {
	      this.emit('progress', 0);
	      this.setState({
	        totalProgress: 0
	      });
	      return;
	    }
	    const sizedFiles = inProgress.filter(file => file.progress.bytesTotal != null);
	    const unsizedFiles = inProgress.filter(file => file.progress.bytesTotal == null);
	    if (sizedFiles.length === 0) {
	      const progressMax = inProgress.length * 100;
	      const currentProgress = unsizedFiles.reduce((acc, file) => {
	        return acc + file.progress.percentage;
	      }, 0);
	      const totalProgress = Math.round(currentProgress / progressMax * 100);
	      this.setState({
	        totalProgress
	      });
	      return;
	    }
	    let totalSize = sizedFiles.reduce((acc, file) => {
	      return acc + file.progress.bytesTotal;
	    }, 0);
	    const averageSize = totalSize / sizedFiles.length;
	    totalSize += averageSize * unsizedFiles.length;
	    let uploadedSize = 0;
	    sizedFiles.forEach(file => {
	      uploadedSize += file.progress.bytesUploaded;
	    });
	    unsizedFiles.forEach(file => {
	      uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
	    });
	    let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
	
	    // hot fix, because:
	    // uploadedSize ended up larger than totalSize, resulting in 1325% total
	    if (totalProgress > 100) {
	      totalProgress = 100;
	    }
	    this.setState({
	      totalProgress
	    });
	    this.emit('progress', totalProgress);
	  }
	  updateOnlineStatus() {
	    const online = typeof window.navigator.onLine !== 'undefined' ? window.navigator.onLine : true;
	    if (!online) {
	      this.emit('is-offline');
	      this.info(this.i18n('noInternetConnection'), 'error', 0);
	      this.wasOffline = true;
	    } else {
	      this.emit('is-online');
	      if (this.wasOffline) {
	        this.emit('back-online');
	        this.info(this.i18n('connectedToInternet'), 'success', 3000);
	        this.wasOffline = false;
	      }
	    }
	  }
	  getID() {
	    return this.opts.id;
	  }
	
	  /**
	   * Registers a plugin with Core.
	   *
	   * @param {object} Plugin object
	   * @param {object} [opts] object with options to be passed to Plugin
	   * @returns {object} self for chaining
	   */
	  // eslint-disable-next-line no-shadow
	  use(Plugin, opts) {
	    if (typeof Plugin !== 'function') {
	      const msg = `Expected a plugin class, but got ${Plugin === null ? 'null' : typeof Plugin}.` + ' Please verify that the plugin was imported and spelled correctly.';
	      throw new TypeError(msg);
	    }
	
	    // Instantiate
	    const plugin = new Plugin(this, opts);
	    const pluginId = plugin.id;
	    if (!pluginId) {
	      throw new Error('Your plugin must have an id');
	    }
	    if (!plugin.type) {
	      throw new Error('Your plugin must have a type');
	    }
	    const existsPluginAlready = this.getPlugin(pluginId);
	    if (existsPluginAlready) {
	      const msg = `Already found a plugin named '${existsPluginAlready.id}'. ` + `Tried to use: '${pluginId}'.\n` + 'Uppy plugins must have unique `id` options. See https://uppy.io/docs/plugins/#id.';
	      throw new Error(msg);
	    }
	    if (Plugin.VERSION) {
	      this.log(`Using ${pluginId} v${Plugin.VERSION}`);
	    }
	    if (plugin.type in _classPrivateFieldLooseBase(this, _plugins)[_plugins]) {
	      _classPrivateFieldLooseBase(this, _plugins)[_plugins][plugin.type].push(plugin);
	    } else {
	      _classPrivateFieldLooseBase(this, _plugins)[_plugins][plugin.type] = [plugin];
	    }
	    plugin.install();
	    this.emit('plugin-added', plugin);
	    return this;
	  }
	
	  /**
	   * Find one Plugin by name.
	   *
	   * @param {string} id plugin id
	   * @returns {BasePlugin|undefined}
	   */
	  getPlugin(id) {
	    for (const plugins of Object.values(_classPrivateFieldLooseBase(this, _plugins)[_plugins])) {
	      const foundPlugin = plugins.find(plugin => plugin.id === id);
	      if (foundPlugin != null) return foundPlugin;
	    }
	    return undefined;
	  }
	  [_Symbol$for](type) {
	    return _classPrivateFieldLooseBase(this, _plugins)[_plugins][type];
	  }
	
	  /**
	   * Iterate through all `use`d plugins.
	   *
	   * @param {Function} method that will be run on each plugin
	   */
	  iteratePlugins(method) {
	    Object.values(_classPrivateFieldLooseBase(this, _plugins)[_plugins]).flat(1).forEach(method);
	  }
	
	  /**
	   * Uninstall and remove a plugin.
	   *
	   * @param {object} instance The plugin instance to remove.
	   */
	  removePlugin(instance) {
	    this.log(`Removing plugin ${instance.id}`);
	    this.emit('plugin-remove', instance);
	    if (instance.uninstall) {
	      instance.uninstall();
	    }
	    const list = _classPrivateFieldLooseBase(this, _plugins)[_plugins][instance.type];
	    // list.indexOf failed here, because Vue3 converted the plugin instance
	    // to a Proxy object, which failed the strict comparison test:
	    // obj !== objProxy
	    const index = list.findIndex(item => item.id === instance.id);
	    if (index !== -1) {
	      list.splice(index, 1);
	    }
	    const state = this.getState();
	    const updatedState = {
	      plugins: {
	        ...state.plugins,
	        [instance.id]: undefined
	      }
	    };
	    this.setState(updatedState);
	  }
	
	  /**
	   * Uninstall all plugins and close down this Uppy instance.
	   */
	  close(_temp2) {
	    let {
	      reason
	    } = _temp2 === void 0 ? {} : _temp2;
	    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
	    this.cancelAll({
	      reason
	    });
	    _classPrivateFieldLooseBase(this, _storeUnsubscribe)[_storeUnsubscribe]();
	    this.iteratePlugins(plugin => {
	      this.removePlugin(plugin);
	    });
	    if (typeof window !== 'undefined' && window.removeEventListener) {
	      window.removeEventListener('online', _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
	      window.removeEventListener('offline', _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
	    }
	  }
	  hideInfo() {
	    const {
	      info
	    } = this.getState();
	    this.setState({
	      info: info.slice(1)
	    });
	    this.emit('info-hidden');
	  }
	
	  /**
	   * Set info message in `state.info`, so that UI plugins like `Informer`
	   * can display the message.
	   *
	   * @param {string | object} message Message to be displayed by the informer
	   * @param {string} [type]
	   * @param {number} [duration]
	   */
	  info(message, type, duration) {
	    if (type === void 0) {
	      type = 'info';
	    }
	    if (duration === void 0) {
	      duration = 3000;
	    }
	    const isComplexMessage = typeof message === 'object';
	    this.setState({
	      info: [...this.getState().info, {
	        type,
	        message: isComplexMessage ? message.message : message,
	        details: isComplexMessage ? message.details : null
	      }]
	    });
	    setTimeout(() => this.hideInfo(), duration);
	    this.emit('info-visible');
	  }
	
	  /**
	   * Passes messages to a function, provided in `opts.logger`.
	   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
	   *
	   * @param {string|object} message to log
	   * @param {string} [type] optional `error` or `warning`
	   */
	  log(message, type) {
	    const {
	      logger
	    } = this.opts;
	    switch (type) {
	      case 'error':
	        logger.error(message);
	        break;
	      case 'warning':
	        logger.warn(message);
	        break;
	      default:
	        logger.debug(message);
	        break;
	    }
	  }
	
	  /**
	   * Restore an upload by its ID.
	   */
	  restore(uploadID) {
	    this.log(`Core: attempting to restore upload "${uploadID}"`);
	    if (!this.getState().currentUploads[uploadID]) {
	      _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
	      return Promise.reject(new Error('Nonexistent upload'));
	    }
	    return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
	  }
	  [_Symbol$for2]() {
	    return _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](...arguments);
	  }
	  /**
	   * Add data to an upload's result object.
	   *
	   * @param {string} uploadID The ID of the upload.
	   * @param {object} data Data properties to add to the result object.
	   */
	  addResultData(uploadID, data) {
	    if (!_classPrivateFieldLooseBase(this, _getUpload)[_getUpload](uploadID)) {
	      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
	      return;
	    }
	    const {
	      currentUploads
	    } = this.getState();
	    const currentUpload = {
	      ...currentUploads[uploadID],
	      result: {
	        ...currentUploads[uploadID].result,
	        ...data
	      }
	    };
	    this.setState({
	      currentUploads: {
	        ...currentUploads,
	        [uploadID]: currentUpload
	      }
	    });
	  }
	  /**
	   * Start an upload for all the files that are not currently being uploaded.
	   *
	   * @returns {Promise}
	   */
	  upload() {
	    var _classPrivateFieldLoo;
	    if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
	      this.log('No uploader type plugins are used', 'warning');
	    }
	    let {
	      files
	    } = this.getState();
	    const onBeforeUploadResult = this.opts.onBeforeUpload(files);
	    if (onBeforeUploadResult === false) {
	      return Promise.reject(new Error('Not starting the upload because onBeforeUpload returned false'));
	    }
	    if (onBeforeUploadResult && typeof onBeforeUploadResult === 'object') {
	      files = onBeforeUploadResult;
	      // Updating files in state, because uploader plugins receive file IDs,
	      // and then fetch the actual file object from state
	      this.setState({
	        files
	      });
	    }
	    return Promise.resolve().then(() => _classPrivateFieldLooseBase(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch(err => {
	      _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit]([err]);
	      throw err;
	    }).then(() => {
	      if (!_classPrivateFieldLooseBase(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
	        throw new RestrictionError(this.i18n('missingRequiredMetaField'));
	      }
	    }).catch(err => {
	      // Doing this in a separate catch because we already emited and logged
	      // all the errors in `checkRequiredMetaFields` so we only throw a generic
	      // missing fields error here.
	      throw err;
	    }).then(() => {
	      const {
	        currentUploads
	      } = this.getState();
	      // get a list of files that are currently assigned to uploads
	      const currentlyUploadingFiles = Object.values(currentUploads).flatMap(curr => curr.fileIDs);
	      const waitingFileIDs = [];
	      Object.keys(files).forEach(fileID => {
	        const file = this.getFile(fileID);
	        // if the file hasn't started uploading and hasn't already been assigned to an upload..
	        if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
	          waitingFileIDs.push(file.id);
	        }
	      });
	      const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](waitingFileIDs);
	      return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
	    }).catch(err => {
	      this.emit('error', err);
	      this.log(err, 'error');
	      throw err;
	    });
	  }
	}
	function _informAndEmit2(errors) {
	  for (const error of errors) {
	    const {
	      file,
	      isRestriction
	    } = error;
	    if (isRestriction) {
	      this.emit('restriction-failed', file, error);
	    } else {
	      this.emit('error', error);
	    }
	    this.log(error, 'warning');
	  }
	  const userFacingErrors = errors.filter(error => error.isUserFacing);
	
	  // don't flood the user: only show the first 4 toasts
	  const maxNumToShow = 4;
	  const firstErrors = userFacingErrors.slice(0, maxNumToShow);
	  const additionalErrors = userFacingErrors.slice(maxNumToShow);
	  firstErrors.forEach(_ref3 => {
	    let {
	      message,
	      details = ''
	    } = _ref3;
	    this.info({
	      message,
	      details
	    }, 'error', this.opts.infoTimeout);
	  });
	  if (additionalErrors.length > 0) {
	    this.info({
	      message: this.i18n('additionalRestrictionsFailed', {
	        count: additionalErrors.length
	      })
	    });
	  }
	}
	function _checkRequiredMetaFieldsOnFile2(file) {
	  const {
	    missingFields,
	    error
	  } = _classPrivateFieldLooseBase(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
	  if (missingFields.length > 0) {
	    this.setFileState(file.id, {
	      missingRequiredMetaFields: missingFields
	    });
	    this.log(error.message);
	    this.emit('restriction-failed', file, error);
	    return false;
	  }
	  return true;
	}
	function _checkRequiredMetaFields2(files) {
	  let success = true;
	  for (const file of Object.values(files)) {
	    if (!_classPrivateFieldLooseBase(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
	      success = false;
	    }
	  }
	  return success;
	}
	function _assertNewUploadAllowed2(file) {
	  const {
	    allowNewUpload
	  } = this.getState();
	  if (allowNewUpload === false) {
	    const error = new RestrictionError(this.i18n('noMoreFilesAllowed'), {
	      file
	    });
	    _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit]([error]);
	    throw error;
	  }
	}
	function _transformFile2(fileDescriptorOrFile) {
	  // Uppy expects files in { name, type, size, data } format.
	  // If the actual File object is passed from input[type=file] or drag-drop,
	  // we normalize it to match Uppy file object
	  const fileDescriptor = fileDescriptorOrFile instanceof File ? {
	    name: fileDescriptorOrFile.name,
	    type: fileDescriptorOrFile.type,
	    size: fileDescriptorOrFile.size,
	    data: fileDescriptorOrFile
	  } : fileDescriptorOrFile;
	  const fileType = getFileType(fileDescriptor);
	  const fileName = getFileName(fileType, fileDescriptor);
	  const fileExtension = getFileNameAndExtension(fileName).extension;
	  const isRemote = Boolean(fileDescriptor.isRemote);
	  const id = getSafeFileId(fileDescriptor);
	  const meta = fileDescriptor.meta || {};
	  meta.name = fileName;
	  meta.type = fileType;
	
	  // `null` means the size is unknown.
	  const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
	  return {
	    source: fileDescriptor.source || '',
	    id,
	    name: fileName,
	    extension: fileExtension || '',
	    meta: {
	      ...this.getState().meta,
	      ...meta
	    },
	    type: fileType,
	    data: fileDescriptor.data,
	    progress: {
	      percentage: 0,
	      bytesUploaded: 0,
	      bytesTotal: size,
	      uploadComplete: false,
	      uploadStarted: null
	    },
	    size,
	    isRemote,
	    remote: fileDescriptor.remote || '',
	    preview: fileDescriptor.preview
	  };
	}
	function _startIfAutoProceed2() {
	  if (this.opts.autoProceed && !this.scheduledAutoProceed) {
	    this.scheduledAutoProceed = setTimeout(() => {
	      this.scheduledAutoProceed = null;
	      this.upload().catch(err => {
	        if (!err.isRestriction) {
	          this.log(err.stack || err.message || err);
	        }
	      });
	    }, 4);
	  }
	}
	function _checkAndUpdateFileState2(filesToAdd) {
	  const {
	    files: existingFiles
	  } = this.getState();
	
	  // create a copy of the files object only once
	  const nextFilesState = {
	    ...existingFiles
	  };
	  const validFilesToAdd = [];
	  const errors = [];
	  for (const fileToAdd of filesToAdd) {
	    try {
	      var _existingFiles$newFil;
	      let newFile = _classPrivateFieldLooseBase(this, _transformFile)[_transformFile](fileToAdd);
	
	      // If a file has been recovered (Golden Retriever), but we were unable to recover its data (probably too large),
	      // users are asked to re-select these half-recovered files and then this method will be called again.
	      // In order to keep the progress, meta and everthing else, we keep the existing file,
	      // but we replace `data`, and we remove `isGhost`, because the file is no longer a ghost now
	      if ((_existingFiles$newFil = existingFiles[newFile.id]) != null && _existingFiles$newFil.isGhost) {
	        const {
	          isGhost,
	          ...existingFileState
	        } = existingFiles[newFile.id];
	        newFile = {
	          ...existingFileState,
	          data: fileToAdd.data
	        };
	        this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
	      }
	      const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, nextFilesState);
	      if (!onBeforeFileAddedResult && this.checkIfFileAlreadyExists(newFile.id)) {
	        throw new RestrictionError(this.i18n('noDuplicates', {
	          fileName: newFile.name
	        }), {
	          file: fileToAdd
	        });
	      }
	      if (onBeforeFileAddedResult === false) {
	        // Don’t show UI info for this error, as it should be done by the developer
	        throw new RestrictionError('Cannot add the file because onBeforeFileAdded returned false.', {
	          isUserFacing: false,
	          file: fileToAdd
	        });
	      } else if (typeof onBeforeFileAddedResult === 'object' && onBeforeFileAddedResult !== null) {
	        newFile = onBeforeFileAddedResult;
	      }
	      _classPrivateFieldLooseBase(this, _restricter)[_restricter].validateSingleFile(newFile);
	
	      // need to add it to the new local state immediately, so we can use the state to validate the next files too
	      nextFilesState[newFile.id] = newFile;
	      validFilesToAdd.push(newFile);
	    } catch (err) {
	      errors.push(err);
	    }
	  }
	  try {
	    // need to run this separately because it's much more slow, so if we run it inside the for-loop it will be very slow
	    // when many files are added
	    _classPrivateFieldLooseBase(this, _restricter)[_restricter].validateAggregateRestrictions(Object.values(existingFiles), validFilesToAdd);
	  } catch (err) {
	    errors.push(err);
	
	    // If we have any aggregate error, don't allow adding this batch
	    return {
	      nextFilesState: existingFiles,
	      validFilesToAdd: [],
	      errors
	    };
	  }
	  return {
	    nextFilesState,
	    validFilesToAdd,
	    errors
	  };
	}
	function _addListeners2() {
	  /**
	   * @param {Error} error
	   * @param {object} [file]
	   * @param {object} [response]
	   */
	  const errorHandler = (error, file, response) => {
	    let errorMsg = error.message || 'Unknown error';
	    if (error.details) {
	      errorMsg += ` ${error.details}`;
	    }
	    this.setState({
	      error: errorMsg
	    });
	    if (file != null && file.id in this.getState().files) {
	      this.setFileState(file.id, {
	        error: errorMsg,
	        response
	      });
	    }
	  };
	  this.on('error', errorHandler);
	  this.on('upload-error', (file, error, response) => {
	    errorHandler(error, file, response);
	    if (typeof error === 'object' && error.message) {
	      this.log(error.message, 'error');
	      const newError = new Error(this.i18n('failedToUpload', {
	        file: file == null ? void 0 : file.name
	      }));
	      newError.isUserFacing = true; // todo maybe don't do this with all errors?
	      newError.details = error.message;
	      if (error.details) {
	        newError.details += ` ${error.details}`;
	      }
	      _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit]([newError]);
	    } else {
	      _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit]([error]);
	    }
	  });
	  let uploadStalledWarningRecentlyEmitted;
	  this.on('upload-stalled', (error, files) => {
	    const {
	      message
	    } = error;
	    const details = files.map(file => file.meta.name).join(', ');
	    if (!uploadStalledWarningRecentlyEmitted) {
	      this.info({
	        message,
	        details
	      }, 'warning', this.opts.infoTimeout);
	      uploadStalledWarningRecentlyEmitted = setTimeout(() => {
	        uploadStalledWarningRecentlyEmitted = null;
	      }, this.opts.infoTimeout);
	    }
	    this.log(`${message} ${details}`.trim(), 'warning');
	  });
	  this.on('upload', () => {
	    this.setState({
	      error: null
	    });
	  });
	  const onUploadStarted = files => {
	    const filesFiltered = files.filter(file => {
	      const exists = file != null && this.getFile(file.id);
	      if (!exists) this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return exists;
	    });
	    const filesState = Object.fromEntries(filesFiltered.map(file => [file.id, {
	      progress: {
	        uploadStarted: Date.now(),
	        uploadComplete: false,
	        percentage: 0,
	        bytesUploaded: 0,
	        bytesTotal: file.size
	      }
	    }]));
	    this.patchFilesState(filesState);
	  };
	  this.on('upload-start', files => {
	    files.forEach(file => {
	      // todo backward compat, remove this event in a next major
	      this.emit('upload-started', file);
	    });
	    onUploadStarted(files);
	  });
	  this.on('upload-progress', this.calculateProgress);
	  this.on('upload-success', (file, uploadResp) => {
	    if (file == null || !this.getFile(file.id)) {
	      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return;
	    }
	    const currentProgress = this.getFile(file.id).progress;
	    this.setFileState(file.id, {
	      progress: {
	        ...currentProgress,
	        postprocess: _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].size > 0 ? {
	          mode: 'indeterminate'
	        } : null,
	        uploadComplete: true,
	        percentage: 100,
	        bytesUploaded: currentProgress.bytesTotal
	      },
	      response: uploadResp,
	      uploadURL: uploadResp.uploadURL,
	      isPaused: false
	    });
	
	    // Remote providers sometimes don't tell us the file size,
	    // but we can know how many bytes we uploaded once the upload is complete.
	    if (file.size == null) {
	      this.setFileState(file.id, {
	        size: uploadResp.bytesUploaded || currentProgress.bytesTotal
	      });
	    }
	    this.calculateTotalProgress();
	  });
	  this.on('preprocess-progress', (file, progress) => {
	    if (file == null || !this.getFile(file.id)) {
	      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return;
	    }
	    this.setFileState(file.id, {
	      progress: {
	        ...this.getFile(file.id).progress,
	        preprocess: progress
	      }
	    });
	  });
	  this.on('preprocess-complete', file => {
	    if (file == null || !this.getFile(file.id)) {
	      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return;
	    }
	    const files = {
	      ...this.getState().files
	    };
	    files[file.id] = {
	      ...files[file.id],
	      progress: {
	        ...files[file.id].progress
	      }
	    };
	    delete files[file.id].progress.preprocess;
	    this.setState({
	      files
	    });
	  });
	  this.on('postprocess-progress', (file, progress) => {
	    if (file == null || !this.getFile(file.id)) {
	      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return;
	    }
	    this.setFileState(file.id, {
	      progress: {
	        ...this.getState().files[file.id].progress,
	        postprocess: progress
	      }
	    });
	  });
	  this.on('postprocess-complete', file => {
	    if (file == null || !this.getFile(file.id)) {
	      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
	      return;
	    }
	    const files = {
	      ...this.getState().files
	    };
	    files[file.id] = {
	      ...files[file.id],
	      progress: {
	        ...files[file.id].progress
	      }
	    };
	    delete files[file.id].progress.postprocess;
	    this.setState({
	      files
	    });
	  });
	  this.on('restored', () => {
	    // Files may have changed--ensure progress is still accurate.
	    this.calculateTotalProgress();
	  });
	  this.on('dashboard:file-edit-complete', file => {
	    if (file) {
	      _classPrivateFieldLooseBase(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
	    }
	  });
	
	  // show informer if offline
	  if (typeof window !== 'undefined' && window.addEventListener) {
	    window.addEventListener('online', _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
	    window.addEventListener('offline', _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
	    setTimeout(_classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus], 3000);
	  }
	}
	function _createUpload2(fileIDs, opts) {
	  if (opts === void 0) {
	    opts = {};
	  }
	  // uppy.retryAll sets this to true — when retrying we want to ignore `allowNewUpload: false`
	  const {
	    forceAllowNewUpload = false
	  } = opts;
	  const {
	    allowNewUpload,
	    currentUploads
	  } = this.getState();
	  if (!allowNewUpload && !forceAllowNewUpload) {
	    throw new Error('Cannot create a new upload: already uploading.');
	  }
	  const uploadID = nanoid();
	  this.emit('upload', {
	    id: uploadID,
	    fileIDs
	  });
	  this.setState({
	    allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
	    currentUploads: {
	      ...currentUploads,
	      [uploadID]: {
	        fileIDs,
	        step: 0,
	        result: {}
	      }
	    }
	  });
	  return uploadID;
	}
	function _getUpload2(uploadID) {
	  const {
	    currentUploads
	  } = this.getState();
	  return currentUploads[uploadID];
	}
	function _removeUpload2(uploadID) {
	  const currentUploads = {
	    ...this.getState().currentUploads
	  };
	  delete currentUploads[uploadID];
	  this.setState({
	    currentUploads
	  });
	}
	async function _runUpload2(uploadID) {
	  const getCurrentUpload = () => {
	    const {
	      currentUploads
	    } = this.getState();
	    return currentUploads[uploadID];
	  };
	  let currentUpload = getCurrentUpload();
	  const steps = [..._classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors]];
	  try {
	    for (let step = currentUpload.step || 0; step < steps.length; step++) {
	      if (!currentUpload) {
	        break;
	      }
	      const fn = steps[step];
	      this.setState({
	        currentUploads: {
	          ...this.getState().currentUploads,
	          [uploadID]: {
	            ...currentUpload,
	            step
	          }
	        }
	      });
	      const {
	        fileIDs
	      } = currentUpload;
	
	      // TODO give this the `updatedUpload` object as its only parameter maybe?
	      // Otherwise when more metadata may be added to the upload this would keep getting more parameters
	      await fn(fileIDs, uploadID);
	
	      // Update currentUpload value in case it was modified asynchronously.
	      currentUpload = getCurrentUpload();
	    }
	  } catch (err) {
	    _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
	    throw err;
	  }
	
	  // Set result data.
	  if (currentUpload) {
	    // Mark postprocessing step as complete if necessary; this addresses a case where we might get
	    // stuck in the postprocessing UI while the upload is fully complete.
	    // If the postprocessing steps do not do any work, they may not emit postprocessing events at
	    // all, and never mark the postprocessing as complete. This is fine on its own but we
	    // introduced code in the @uppy/core upload-success handler to prepare postprocessing progress
	    // state if any postprocessors are registered. That is to avoid a "flash of completed state"
	    // before the postprocessing plugins can emit events.
	    //
	    // So, just in case an upload with postprocessing plugins *has* completed *without* emitting
	    // postprocessing completion, we do it instead.
	    currentUpload.fileIDs.forEach(fileID => {
	      const file = this.getFile(fileID);
	      if (file && file.progress.postprocess) {
	        this.emit('postprocess-complete', file);
	      }
	    });
	    const files = currentUpload.fileIDs.map(fileID => this.getFile(fileID));
	    const successful = files.filter(file => !file.error);
	    const failed = files.filter(file => file.error);
	    await this.addResultData(uploadID, {
	      successful,
	      failed,
	      uploadID
	    });
	
	    // Update currentUpload value in case it was modified asynchronously.
	    currentUpload = getCurrentUpload();
	  }
	  // Emit completion events.
	  // This is in a separate function so that the `currentUploads` variable
	  // always refers to the latest state. In the handler right above it refers
	  // to an outdated object without the `.result` property.
	  let result;
	  if (currentUpload) {
	    result = currentUpload.result;
	    this.emit('complete', result);
	    _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
	  }
	  if (result == null) {
	    this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
	  }
	  return result;
	}
	Uppy.VERSION = packageJson.version;
	
	exports = { default: Uppy };
	
	return exports 
})({})

const $__preactExports = (function (exports) {
 	var n,l,u,t,i,o,r,f,e,c={},s=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h=Array.isArray;function v(n,l){for(var u in l)n[u]=l[u];return n}function p(n){var l=n.parentNode;l&&l.removeChild(n)}function y(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return d(l,f,i,o,null)}function d(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u:r,__i:-1,__u:0};return null==r&&null!=l.vnode&&l.vnode(f),f}function _(){return{current:null}}function g(n){return n.children}function b(n,l){this.props=n,this.context=l}function m(n,l){if(null==l)return n.__?m(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?m(n):null}function k(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k(n)}}function w(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!x.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||r)(x)}function x(){var n,u,t,o,r,e,c,s,a;for(i.sort(f);n=i.shift();)n.__d&&(u=i.length,o=void 0,e=(r=(t=n).__v).__e,s=[],a=[],(c=t.__P)&&((o=v({},r)).__v=r.__v+1,l.vnode&&l.vnode(o),L(c,o,r,t.__n,void 0!==c.ownerSVGElement,32&r.__u?[e]:null,s,null==e?m(r):e,!!(32&r.__u),a),o.__.__k[o.__i]=o,M(s,o,a),o.__e!=e&&k(o)),i.length>u&&i.sort(f));x.__r=0}function C(n,l,u,t,i,o,r,f,e,a,h){var v,p,y,d,_,g=t&&t.__k||s,b=l.length;for(u.__d=e,P(u,l,g),e=u.__d,v=0;v<b;v++)null!=(y=u.__k[v])&&"boolean"!=typeof y&&"function"!=typeof y&&(p=-1===y.__i?c:g[y.__i]||c,y.__i=v,L(n,y,p,i,o,r,f,e,a,h),d=y.__e,y.ref&&p.ref!=y.ref&&(p.ref&&z(p.ref,null,y),h.push(y.ref,y.__c||d,y)),null==_&&null!=d&&(_=d),65536&y.__u||p.__k===y.__k?e=S(y,e,n):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=_}function P(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?d(null,i,null,null,i):h(i)?d(g,{children:i},null,null,null):i.__b>0?d(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=H(i,u,r=t+a,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:a=f<r&&f==r-1?f-r:0,f!==t+a&&(i.__u|=65536))):(o=u[t])&&null==o.key&&o.__e&&(o.__e==n.__d&&(n.__d=m(o)),N(o,o,!1),u[t]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=m(o)),N(o,o))}function S(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=S(t[i],l,u));return l}return n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e),l&&l.nextSibling}function $(n,l){return l=l||[],null==n||"boolean"==typeof n||(h(n)?n.some(function(n){$(n,l)}):l.push(n)),l}function H(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++}}return-1}function I(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a.test(l)?u:u+"px"}function T(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||I(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||I(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/,"$1")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=Date.now(),n.addEventListener(l,o?D:A,o)):n.removeEventListener(l,o?D:A,o);else{if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&"rowSpan"!==l&&"colSpan"!==l&&"role"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u))}}function A(n){var u=this.l[n.type+!1];if(n.t){if(n.t<=u.u)return}else n.t=Date.now();return u(l.event?l.event(n):n)}function D(n){return this.l[n.type+!0](l.event?l.event(n):n)}function L(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,m,k,w,x,P,S,$,H,I,T,A=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof A)try{if(w=u.props,x=(a=A.contextType)&&i[a.__c],P=a?x?x.props.value:a.__:i,t.__c?k=(p=u.__c=t.__c).__=p.__E:("prototype"in A&&A.prototype.render?u.__c=p=new A(w,P):(u.__c=p=new b(w,P),p.constructor=A,p.render=O),x&&x.sub(p),p.props=w,p.state||(p.state={}),p.context=P,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=A.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v({},p.__s)),v(p.__s,A.getDerivedStateFromProps(w,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==A.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==A.getDerivedStateFromProps&&w!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,P),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,P)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=w,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u)}),S=0;S<p._sb.length;S++)p.__h.push(p._sb[S]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,P),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,m)})}if(p.context=P,p.props=w,p.__P=n,p.__e=!1,$=l.__r,H=0,"prototype"in A&&A.prototype.render){for(p.state=p.__s,p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),I=0;I<p._sb.length;I++)p.__h.push(p._sb[I]);p._sb=[]}else do{p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),p.state=p.__s}while(p.__d&&++H<25);p.state=p.__s,null!=p.getChildContext&&(i=v(v({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(m=p.getSnapshotBeforeUpdate(d,_)),C(n,h(T=null!=a&&a.type===g&&null==a.key?a.props.children:a)?T:[T],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__u&=-161,p.__h.length&&f.push(p),k&&(p.__E=p.__=null)}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l.__e(n,u,t)}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=j(t.__e,u,t,i,o,r,f,c,s);(a=l.diffed)&&a(u)}function M(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)z(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function j(l,u,t,i,o,r,f,e,s){var a,v,y,d,_,g,b,k=t.props,w=u.props,x=u.type;if("svg"===x&&(o=!0),null!=r)for(a=0;a<r.length;a++)if((_=r[a])&&"setAttribute"in _==!!x&&(x?_.localName===x:3===_.nodeType)){l=_,r[a]=null;break}if(null==l){if(null===x)return document.createTextNode(w);l=o?document.createElementNS("http://www.w3.org/2000/svg",x):document.createElement(x,w.is&&w),r=null,e=!1}if(null===x)k===w||e&&l.data===w||(l.data=w);else{if(r=r&&n.call(l.childNodes),k=t.props||c,!e&&null!=r)for(k={},a=0;a<l.attributes.length;a++)k[(_=l.attributes[a]).name]=_.value;for(a in k)_=k[a],"children"==a||("dangerouslySetInnerHTML"==a?y=_:"key"===a||a in w||T(l,a,null,_,o));for(a in w)_=w[a],"children"==a?d=_:"dangerouslySetInnerHTML"==a?v=_:"value"==a?g=_:"checked"==a?b=_:"key"===a||e&&"function"!=typeof _||k[a]===_||T(l,a,_,k[a],o);if(v)e||y&&(v.__html===y.__html||v.__html===l.innerHTML)||(l.innerHTML=v.__html),u.__k=[];else if(y&&(l.innerHTML=""),C(l,h(d)?d:[d],u,t,i,o&&"foreignObject"!==x,r,f,r?r[0]:t.__k&&m(t,0),e,s),null!=r)for(a=r.length;a--;)null!=r[a]&&p(r[a]);e||(a="value",void 0!==g&&(g!==l[a]||"progress"===x&&!g||"option"===x&&g!==k[a])&&T(l,a,g,k[a],!1),a="checked",void 0!==b&&b!==l[a]&&T(l,a,b,k[a],!1))}return l}function z(n,u,t){try{"function"==typeof n?n(u):n.current=u}catch(n){l.__e(n,t)}}function N(n,u,t){var i,o;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||z(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null,n.__c=void 0}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&N(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||p(n.__e),n.__=n.__e=n.__d=void 0}function O(n,l,u){return this.constructor(n,u)}function q(u,t,i){var o,r,f,e;l.__&&l.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],L(t,u=(!o&&i||t).__k=y(g,null,[u]),r||c,c,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),M(f,u,e)}function B(n,l){q(n,l,B)}function E(l,u,t){var i,o,r,f,e=v({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),d(l.type,e,i||l.key,o||l.ref,null)}function F(n,l){var u={__c:l="__cC"+e++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=!0,w(n)})},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=s.slice,l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&null==n.constructor},b.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v({},this.state),"function"==typeof n&&(n=n(v({},u),this.props)),n&&v(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),w(this))},b.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w(this))},b.prototype.render=g,i=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(n,l){return n.__v.__b-l.__v.__b},x.__r=0,e=0;export{b as Component,g as Fragment,E as cloneElement,F as createContext,y as createElement,_ as createRef,y as h,B as hydrate,t as isValidElement,l as options,q as render,$ as toChildArray};
	//# sourceMappingURL=preact.module.js.map
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$utils$lib__isDOMElementExports = (function (exports) {
 	/**
	 * Check if an object is a DOM element. Duck-typing based on `nodeType`.
	 */
	function isDOMElement(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  if (!('nodeType' in obj)) return false;
	  return obj.nodeType === Node.ELEMENT_NODE;
	}
	
	exports = { default:  isDOMElement };
	
	return exports 
})({})

const $$uppy$utils$lib__findDOMElementExports = (function (exports) {
 	const { default: isDOMElement } = $$uppy$utils$lib__isDOMElementExports;;
	
	/**
	 * Find a DOM element.
	 */
	function findDOMElement(element, context) {
	  if (context === void 0) {
	    context = document;
	  }
	  if (typeof element === 'string') {
	    return context.querySelector(element);
	  }
	  if (isDOMElement(element)) {
	    return element;
	  }
	  return null;
	}
	
	exports = { default:  findDOMElement };
	
	return exports 
})({})

const $$uppy$utils$lib__getTextDirectionExports = (function (exports) {
 	/**
	 * Get the declared text direction for an element.
	 */
	
	function getTextDirection(element) {
	  var _element;
	  // There is another way to determine text direction using getComputedStyle(), as done here:
	  // https://github.com/pencil-js/text-direction/blob/2a235ce95089b3185acec3b51313cbba921b3811/text-direction.js
	  //
	  // We do not use that approach because we are interested specifically in the _declared_ text direction.
	  // If no text direction is declared, we have to provide our own explicit text direction so our
	  // bidirectional CSS style sheets work.
	  while (element && !element.dir) {
	    // eslint-disable-next-line no-param-reassign
	    element = element.parentNode;
	  }
	  return (_element = element) == null ? void 0 : _element.dir;
	}
	
	exports = { default: getTextDirection };
	
	return exports 
})({})

const $$uppy$core$lib__BasePluginExports = (function (exports) {
 	/**
	 * Core plugin logic that all plugins share.
	 *
	 * BasePlugin does not contain DOM rendering so it can be used for plugins
	 * without a user interface.
	 *
	 * See `Plugin` for the extended version with Preact rendering for interfaces.
	 */
	
	const { default: Translator } = $$uppy$utils$lib__TranslatorExports;;
	class BasePlugin {
	  constructor(uppy, opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    this.uppy = uppy;
	    this.opts = opts;
	  }
	  getPluginState() {
	    const {
	      plugins
	    } = this.uppy.getState();
	    return plugins[this.id] || {};
	  }
	  setPluginState(update) {
	    const {
	      plugins
	    } = this.uppy.getState();
	    this.uppy.setState({
	      plugins: {
	        ...plugins,
	        [this.id]: {
	          ...plugins[this.id],
	          ...update
	        }
	      }
	    });
	  }
	  setOptions(newOpts) {
	    this.opts = {
	      ...this.opts,
	      ...newOpts
	    };
	    this.setPluginState(); // so that UI re-renders with new options
	    this.i18nInit();
	  }
	  i18nInit() {
	    const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
	    this.i18n = translator.translate.bind(translator);
	    this.i18nArray = translator.translateArray.bind(translator);
	    this.setPluginState(); // so that UI re-renders and we see the updated locale
	  }
	
	  /**
	   * Extendable methods
	   * ==================
	   * These methods are here to serve as an overview of the extendable methods as well as
	   * making them not conditional in use, such as `if (this.afterUpdate)`.
	   */
	
	  // eslint-disable-next-line class-methods-use-this
	  addTarget() {
	    throw new Error('Extend the addTarget method to add your plugin to another plugin\'s target');
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  install() {}
	
	  // eslint-disable-next-line class-methods-use-this
	  uninstall() {}
	
	  /**
	   * Called when plugin is mounted, whether in DOM or into another plugin.
	   * Needed because sometimes plugins are mounted separately/after `install`,
	   * so this.el and this.parent might not be available in `install`.
	   * This is the case with @uppy/react plugins, for example.
	   */
	  render() {
	    throw new Error('Extend the render method to add your plugin to a DOM element');
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  update() {}
	
	  // Called after every state update, after everything's mounted. Debounced.
	  // eslint-disable-next-line class-methods-use-this
	  afterUpdate() {}
	}
	
	exports = { default:  BasePlugin };
	
	return exports 
})({})

const $$uppy$core$lib__UIPluginExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { render } = $__preactExports;
	const { default: findDOMElement } = $$uppy$utils$lib__findDOMElementExports;;
	const { default: getTextDirection } = $$uppy$utils$lib__getTextDirectionExports;;
	const { default: BasePlugin } = $$uppy$core$lib__BasePluginExports;;
	
	/**
	 * Defer a frequent call to the microtask queue.
	 *
	 * @param {() => T} fn
	 * @returns {Promise<T>}
	 */
	function debounce(fn) {
	  let calling = null;
	  let latestArgs = null;
	  return function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    latestArgs = args;
	    if (!calling) {
	      calling = Promise.resolve().then(() => {
	        calling = null;
	        // At this point `args` may be different from the most
	        // recent state, if multiple calls happened since this task
	        // was queued. So we use the `latestArgs`, which definitely
	        // is the most recent call.
	        return fn(...latestArgs);
	      });
	    }
	    return calling;
	  };
	}
	
	/**
	 * UIPlugin is the extended version of BasePlugin to incorporate rendering with Preact.
	 * Use this for plugins that need a user interface.
	 *
	 * For plugins without an user interface, see BasePlugin.
	 */
	var _updateUI = /*#__PURE__*/_classPrivateFieldLooseKey("updateUI");
	class UIPlugin extends BasePlugin {
	  constructor() {
	    super(...arguments);
	    Object.defineProperty(this, _updateUI, {
	      writable: true,
	      value: void 0
	    });
	  }
	  getTargetPlugin(target) {
	    let targetPlugin;
	    if (typeof target === 'object' && target instanceof UIPlugin) {
	      // Targeting a plugin *instance*
	      targetPlugin = target;
	    } else if (typeof target === 'function') {
	      // Targeting a plugin type
	      const Target = target;
	      // Find the target plugin instance.
	      this.uppy.iteratePlugins(p => {
	        if (p instanceof Target) {
	          targetPlugin = p;
	        }
	      });
	    }
	    return targetPlugin;
	  }
	
	  /**
	   * Check if supplied `target` is a DOM element or an `object`.
	   * If it’s an object — target is a plugin, and we search `plugins`
	   * for a plugin with same name and return its target.
	   */
	  mount(target, plugin) {
	    const callerPluginName = plugin.id;
	    const targetElement = findDOMElement(target);
	    if (targetElement) {
	      this.isTargetDOMEl = true;
	      // When target is <body> with a single <div> element,
	      // Preact thinks it’s the Uppy root element in there when doing a diff,
	      // and destroys it. So we are creating a fragment (could be empty div)
	      const uppyRootElement = document.createElement('div');
	      uppyRootElement.classList.add('uppy-Root');
	
	      // API for plugins that require a synchronous rerender.
	      _classPrivateFieldLooseBase(this, _updateUI)[_updateUI] = debounce(state => {
	        // plugin could be removed, but this.rerender is debounced below,
	        // so it could still be called even after uppy.removePlugin or uppy.close
	        // hence the check
	        if (!this.uppy.getPlugin(this.id)) return;
	        render(this.render(state), uppyRootElement);
	        this.afterUpdate();
	      });
	      this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
	      if (this.opts.replaceTargetContent) {
	        // Doing render(h(null), targetElement), which should have been
	        // a better way, since because the component might need to do additional cleanup when it is removed,
	        // stopped working — Preact just adds null into target, not replacing
	        targetElement.innerHTML = '';
	      }
	      render(this.render(this.uppy.getState()), uppyRootElement);
	      this.el = uppyRootElement;
	      targetElement.appendChild(uppyRootElement);
	
	      // Set the text direction if the page has not defined one.
	      uppyRootElement.dir = this.opts.direction || getTextDirection(uppyRootElement) || 'ltr';
	      this.onMount();
	      return this.el;
	    }
	    const targetPlugin = this.getTargetPlugin(target);
	    if (targetPlugin) {
	      this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
	      this.parent = targetPlugin;
	      this.el = targetPlugin.addTarget(plugin);
	      this.onMount();
	      return this.el;
	    }
	    this.uppy.log(`Not installing ${callerPluginName}`);
	    let message = `Invalid target option given to ${callerPluginName}.`;
	    if (typeof target === 'function') {
	      message += ' The given target is not a Plugin class. ' + 'Please check that you\'re not specifying a React Component instead of a plugin. ' + 'If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: ' + 'run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.';
	    } else {
	      message += 'If you meant to target an HTML element, please make sure that the element exists. ' + 'Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. ' + '(see https://github.com/transloadit/uppy/issues/1042)\n\n' + 'If you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.';
	    }
	    throw new Error(message);
	  }
	  update(state) {
	    if (this.el != null) {
	      var _classPrivateFieldLoo, _classPrivateFieldLoo2;
	      (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
	    }
	  }
	  unmount() {
	    if (this.isTargetDOMEl) {
	      var _this$el;
	      (_this$el = this.el) == null ? void 0 : _this$el.remove();
	    }
	    this.onUnmount();
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  onMount() {}
	
	  // eslint-disable-next-line class-methods-use-this
	  onUnmount() {}
	}
	
	exports = { default: UIPlugin };
	
	return exports 
})({})

const $$uppy__coreExports = (function (exports) {
 	const { default: __default } = $$uppy$core$lib__UppyExports;
	;
	const { default: _Uppy } = $$uppy$core$lib__UppyExports;
	const Uppy = _Uppy;
	const { default: _UIPlugin } = $$uppy$core$lib__UIPluginExports;
	const UIPlugin = _UIPlugin;
	const { default: _BasePlugin } = $$uppy$core$lib__BasePluginExports;
	const BasePlugin = _BasePlugin;
	const { _debugLogger } = $$uppy$core$lib__loggersExports;
	const debugLogger = _debugLogger;
	
	exports = { Uppy, UIPlugin, BasePlugin, debugLogger, default: __default };
	
	return exports 
})({})

const $$uppy$utils$lib__emaFilterExports = (function (exports) {
 	/**
	 * Low-pass filter using Exponential Moving Averages (aka exponential smoothing)
	 * Filters a sequence of values by updating the mixing the previous output value
	 * with the new input using the exponential window function
	 *
	 * @param newValue the n-th value of the sequence
	 * @param previousSmoothedValue the exponential average of the first n-1 values
	 * @param halfLife value of `dt` to move the smoothed value halfway between `previousFilteredValue` and `newValue`
	 * @param dt time elapsed between adding the (n-1)th and the n-th values
	 * @returns the exponential average of the first n values
	 */
	function emaFilter(newValue, previousSmoothedValue, halfLife, dt) {
	  if (halfLife === 0 || newValue === previousSmoothedValue) return newValue;
	  if (dt === 0) return previousSmoothedValue;
	  return newValue + (previousSmoothedValue - newValue) * 2 ** (-dt / halfLife);
	}
	
	exports = { default:  emaFilter };
	
	return exports 
})({})

const $$uppy$status$bar$lib__StatusBarStatesExports = (function (exports) {
 	var _default = {
	  STATE_ERROR: 'error',
	  STATE_WAITING: 'waiting',
	  STATE_PREPROCESSING: 'preprocessing',
	  STATE_UPLOADING: 'uploading',
	  STATE_POSTPROCESSING: 'postprocessing',
	  STATE_COMPLETE: 'complete'
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $__classnamesExports = (function (exports) {
 	/*!
		Copyright (c) 2018 Jed Watson.
		Licensed under the MIT License (MIT), see
		http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
		var nativeCodeString = '[native code]';
	
		function classNames() {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					if (arg.length) {
						var inner = classNames.apply(null, arg);
						if (inner) {
							classes.push(inner);
						}
					}
				} else if (argType === 'object') {
					if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
						classes.push(arg.toString());
						continue;
					}
	
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
			// register as 'classnames', consistent with npm package name
			define('classnames', [], function () {
				return classNames;
			});
		} else {
			window.classNames = classNames;
		}
	}());
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$status$bar$lib__calculateProcessingProgressExports = (function (exports) {
 	function calculateProcessingProgress(files) {
	  const values = [];
	  let mode;
	  let message;
	  for (const {
	    progress
	  } of Object.values(files)) {
	    const {
	      preprocess,
	      postprocess
	    } = progress;
	    // In the future we should probably do this differently. For now we'll take the
	    // mode and message from the first file…
	    if (message == null && (preprocess || postprocess)) {
	      ({
	        mode,
	        message
	      } = preprocess || postprocess);
	    }
	    if ((preprocess == null ? void 0 : preprocess.mode) === 'determinate') values.push(preprocess.value);
	    if ((postprocess == null ? void 0 : postprocess.mode) === 'determinate') values.push(postprocess.value);
	  }
	  const value = values.reduce((total, progressValue) => {
	    return total + progressValue / values.length;
	  }, 0);
	  return {
	    mode,
	    message,
	    value
	  };
	}
	
	exports = { default:  calculateProcessingProgress };
	
	return exports 
})({})

const $$uppy$utils$lib__secondsToTimeExports = (function (exports) {
 	function secondsToTime(rawSeconds) {
	  const hours = Math.floor(rawSeconds / 3600) % 24;
	  const minutes = Math.floor(rawSeconds / 60) % 60;
	  const seconds = Math.floor(rawSeconds % 60);
	  return {
	    hours,
	    minutes,
	    seconds
	  };
	}
	
	exports = { default:  secondsToTime };
	
	return exports 
})({})

const $$uppy$utils$lib__prettyETAExports = (function (exports) {
 	const { default: secondsToTime } = $$uppy$utils$lib__secondsToTimeExports;;
	function prettyETA(seconds) {
	  const time = secondsToTime(seconds);
	
	  // Only display hours and minutes if they are greater than 0 but always
	  // display minutes if hours is being displayed
	  // Display a leading zero if the there is a preceding unit: 1m 05s, but 5s
	  const hoursStr = time.hours === 0 ? '' : `${time.hours}h`;
	  const minutesStr = time.minutes === 0 ? '' : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, '0')}`}m`;
	  const secondsStr = time.hours !== 0 ? '' : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, '0')}`}s`;
	  return `${hoursStr}${minutesStr}${secondsStr}`;
	}
	
	exports = { default:  prettyETA };
	
	return exports 
})({})

const $$uppy$status$bar$lib__ComponentsExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: prettierBytes } = $$transloadit__prettier$bytesExports;;
	const { default: prettyETA } = $$uppy$utils$lib__prettyETAExports;;
	const { default: statusBarStates } = $$uppy$status$bar$lib__StatusBarStatesExports;;
	const DOT = `\u00B7`;
	const renderDot = () => ` ${DOT} `;
	function UploadBtn(props) {
	  const {
	    newFiles,
	    isUploadStarted,
	    recoveredState,
	    i18n,
	    uploadState,
	    isSomeGhost,
	    startUpload
	  } = props;
	  const uploadBtnClassNames = classNames('uppy-u-reset', 'uppy-c-btn', 'uppy-StatusBar-actionBtn', 'uppy-StatusBar-actionBtn--upload', {
	    'uppy-c-btn-primary': uploadState === statusBarStates.STATE_WAITING
	  }, {
	    'uppy-StatusBar-actionBtn--disabled': isSomeGhost
	  });
	  const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n('uploadXNewFiles', {
	    smart_count: newFiles
	  }) : i18n('uploadXFiles', {
	    smart_count: newFiles
	  });
	  return h("button", {
	    type: "button",
	    className: uploadBtnClassNames,
	    "aria-label": i18n('uploadXFiles', {
	      smart_count: newFiles
	    }),
	    onClick: startUpload,
	    disabled: isSomeGhost,
	    "data-uppy-super-focusable": true
	  }, uploadBtnText);
	}
	function RetryBtn(props) {
	  const {
	    i18n,
	    uppy
	  } = props;
	  return h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
	    "aria-label": i18n('retryUpload'),
	    onClick: () => uppy.retryAll().catch(() => {/* Error reported and handled via an event */}),
	    "data-uppy-super-focusable": true,
	    "data-cy": "retry"
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "8",
	    height: "10",
	    viewBox: "0 0 8 10"
	  }, h("path", {
	    d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
	  })), i18n('retry'));
	}
	function CancelBtn(props) {
	  const {
	    i18n,
	    uppy
	  } = props;
	  return h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
	    title: i18n('cancel'),
	    "aria-label": i18n('cancel'),
	    onClick: () => uppy.cancelAll(),
	    "data-cy": "cancel",
	    "data-uppy-super-focusable": true
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "16",
	    height: "16",
	    viewBox: "0 0 16 16"
	  }, h("g", {
	    fill: "none",
	    fillRule: "evenodd"
	  }, h("circle", {
	    fill: "#888",
	    cx: "8",
	    cy: "8",
	    r: "8"
	  }), h("path", {
	    fill: "#FFF",
	    d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
	  }))));
	}
	function PauseResumeButton(props) {
	  const {
	    isAllPaused,
	    i18n,
	    isAllComplete,
	    resumableUploads,
	    uppy
	  } = props;
	  const title = isAllPaused ? i18n('resume') : i18n('pause');
	  function togglePauseResume() {
	    if (isAllComplete) return null;
	    if (!resumableUploads) {
	      return uppy.cancelAll();
	    }
	    if (isAllPaused) {
	      return uppy.resumeAll();
	    }
	    return uppy.pauseAll();
	  }
	  return h("button", {
	    title: title,
	    "aria-label": title,
	    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
	    type: "button",
	    onClick: togglePauseResume,
	    "data-cy": "togglePauseResume",
	    "data-uppy-super-focusable": true
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "16",
	    height: "16",
	    viewBox: "0 0 16 16"
	  }, h("g", {
	    fill: "none",
	    fillRule: "evenodd"
	  }, h("circle", {
	    fill: "#888",
	    cx: "8",
	    cy: "8",
	    r: "8"
	  }), h("path", {
	    fill: "#FFF",
	    d: isAllPaused ? 'M6 4.25L11.5 8 6 11.75z' : 'M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z'
	  }))));
	}
	function DoneBtn(props) {
	  const {
	    i18n,
	    doneButtonHandler
	  } = props;
	  return h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
	    onClick: doneButtonHandler,
	    "data-uppy-super-focusable": true
	  }, i18n('done'));
	}
	function LoadingSpinner() {
	  return h("svg", {
	    className: "uppy-StatusBar-spinner",
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "14",
	    height: "14"
	  }, h("path", {
	    d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
	    fillRule: "evenodd"
	  }));
	}
	function ProgressBarProcessing(props) {
	  const {
	    progress
	  } = props;
	  const {
	    value,
	    mode,
	    message
	  } = progress;
	  const roundedValue = Math.round(value * 100);
	  const dot = `\u00B7`;
	  return h("div", {
	    className: "uppy-StatusBar-content"
	  }, h(LoadingSpinner, null), mode === 'determinate' ? `${roundedValue}% ${dot} ` : '', message);
	}
	function ProgressDetails(props) {
	  const {
	    numUploads,
	    complete,
	    totalUploadedSize,
	    totalSize,
	    totalETA,
	    i18n
	  } = props;
	  const ifShowFilesUploadedOfTotal = numUploads > 1;
	  return h("div", {
	    className: "uppy-StatusBar-statusSecondary"
	  }, ifShowFilesUploadedOfTotal && i18n('filesUploadedOfTotal', {
	    complete,
	    smart_count: numUploads
	  }), h("span", {
	    className: "uppy-StatusBar-additionalInfo"
	  }, ifShowFilesUploadedOfTotal && renderDot(), i18n('dataUploadedOfTotal', {
	    complete: prettierBytes(totalUploadedSize),
	    total: prettierBytes(totalSize)
	  }), renderDot(), i18n('xTimeLeft', {
	    time: prettyETA(totalETA)
	  })));
	}
	function FileUploadCount(props) {
	  const {
	    i18n,
	    complete,
	    numUploads
	  } = props;
	  return h("div", {
	    className: "uppy-StatusBar-statusSecondary"
	  }, i18n('filesUploadedOfTotal', {
	    complete,
	    smart_count: numUploads
	  }));
	}
	function UploadNewlyAddedFiles(props) {
	  const {
	    i18n,
	    newFiles,
	    startUpload
	  } = props;
	  const uploadBtnClassNames = classNames('uppy-u-reset', 'uppy-c-btn', 'uppy-StatusBar-actionBtn', 'uppy-StatusBar-actionBtn--uploadNewlyAdded');
	  return h("div", {
	    className: "uppy-StatusBar-statusSecondary"
	  }, h("div", {
	    className: "uppy-StatusBar-statusSecondaryHint"
	  }, i18n('xMoreFilesAdded', {
	    smart_count: newFiles
	  })), h("button", {
	    type: "button",
	    className: uploadBtnClassNames,
	    "aria-label": i18n('uploadXFiles', {
	      smart_count: newFiles
	    }),
	    onClick: startUpload
	  }, i18n('upload')));
	}
	function ProgressBarUploading(props) {
	  const {
	    i18n,
	    supportsUploadProgress,
	    totalProgress,
	    showProgressDetails,
	    isUploadStarted,
	    isAllComplete,
	    isAllPaused,
	    newFiles,
	    numUploads,
	    complete,
	    totalUploadedSize,
	    totalSize,
	    totalETA,
	    startUpload
	  } = props;
	  const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
	  if (!isUploadStarted || isAllComplete) {
	    return null;
	  }
	  const title = isAllPaused ? i18n('paused') : i18n('uploading');
	  function renderProgressDetails() {
	    if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
	      if (supportsUploadProgress) {
	        return h(ProgressDetails, {
	          numUploads: numUploads,
	          complete: complete,
	          totalUploadedSize: totalUploadedSize,
	          totalSize: totalSize,
	          totalETA: totalETA,
	          i18n: i18n
	        });
	      }
	      return h(FileUploadCount, {
	        i18n: i18n,
	        complete: complete,
	        numUploads: numUploads
	      });
	    }
	    return null;
	  }
	  return h("div", {
	    className: "uppy-StatusBar-content",
	    "aria-label": title,
	    title: title
	  }, !isAllPaused ? h(LoadingSpinner, null) : null, h("div", {
	    className: "uppy-StatusBar-status"
	  }, h("div", {
	    className: "uppy-StatusBar-statusPrimary"
	  }, supportsUploadProgress ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? h(UploadNewlyAddedFiles, {
	    i18n: i18n,
	    newFiles: newFiles,
	    startUpload: startUpload
	  }) : null));
	}
	function ProgressBarComplete(props) {
	  const {
	    i18n
	  } = props;
	  return h("div", {
	    className: "uppy-StatusBar-content",
	    role: "status",
	    title: i18n('complete')
	  }, h("div", {
	    className: "uppy-StatusBar-status"
	  }, h("div", {
	    className: "uppy-StatusBar-statusPrimary"
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
	    width: "15",
	    height: "11",
	    viewBox: "0 0 15 11"
	  }, h("path", {
	    d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
	  })), i18n('complete'))));
	}
	function ProgressBarError(props) {
	  const {
	    error,
	    i18n,
	    complete,
	    numUploads
	  } = props;
	  function displayErrorAlert() {
	    const errorMessage = `${i18n('uploadFailed')} \n\n ${error}`;
	    // eslint-disable-next-line no-alert
	    alert(errorMessage); // TODO: move to custom alert implementation
	  }
	
	  return h("div", {
	    className: "uppy-StatusBar-content",
	    title: i18n('uploadFailed')
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
	    width: "11",
	    height: "11",
	    viewBox: "0 0 11 11"
	  }, h("path", {
	    d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
	  })), h("div", {
	    className: "uppy-StatusBar-status"
	  }, h("div", {
	    className: "uppy-StatusBar-statusPrimary"
	  }, i18n('uploadFailed'), h("button", {
	    className: "uppy-u-reset uppy-StatusBar-details",
	    "aria-label": i18n('showErrorDetails'),
	    "data-microtip-position": "top-right",
	    "data-microtip-size": "medium",
	    onClick: displayErrorAlert,
	    type: "button"
	  }, "?")), h(FileUploadCount, {
	    i18n: i18n,
	    complete: complete,
	    numUploads: numUploads
	  })));
	}
	{ UploadBtn, RetryBtn, CancelBtn, PauseResumeButton, DoneBtn, LoadingSpinner, ProgressDetails, ProgressBarProcessing, ProgressBarError, ProgressBarUploading, ProgressBarComplete };
	
	exports = { UploadBtn, RetryBtn, CancelBtn, PauseResumeButton, DoneBtn, LoadingSpinner, ProgressDetails, ProgressBarProcessing, ProgressBarError, ProgressBarUploading, ProgressBarComplete };
	
	return exports 
})({})

const $$uppy$status$bar$lib__StatusBarUIExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: statusBarStates } = $$uppy$status$bar$lib__StatusBarStatesExports;;
	const { default: calculateProcessingProgress } = $$uppy$status$bar$lib__calculateProcessingProgressExports;;
	const { UploadBtn, RetryBtn, CancelBtn, PauseResumeButton, DoneBtn, ProgressBarProcessing, ProgressBarError, ProgressBarUploading, ProgressBarComplete } = $$uppy$status$bar$lib__ComponentsExports;
	const {
	  STATE_ERROR,
	  STATE_WAITING,
	  STATE_PREPROCESSING,
	  STATE_UPLOADING,
	  STATE_POSTPROCESSING,
	  STATE_COMPLETE
	} = statusBarStates;
	
	// TODO: rename the function to StatusBarUI on the next major.
	function StatusBar(props) {
	  const {
	    newFiles,
	    allowNewUpload,
	    isUploadInProgress,
	    isAllPaused,
	    resumableUploads,
	    error,
	    hideUploadButton,
	    hidePauseResumeButton,
	    hideCancelButton,
	    hideRetryButton,
	    recoveredState,
	    uploadState,
	    totalProgress,
	    files,
	    supportsUploadProgress,
	    hideAfterFinish,
	    isSomeGhost,
	    doneButtonHandler,
	    isUploadStarted,
	    i18n,
	    startUpload,
	    uppy,
	    isAllComplete,
	    showProgressDetails,
	    numUploads,
	    complete,
	    totalSize,
	    totalETA,
	    totalUploadedSize
	  } = props;
	  function getProgressValue() {
	    switch (uploadState) {
	      case STATE_POSTPROCESSING:
	      case STATE_PREPROCESSING:
	        {
	          const progress = calculateProcessingProgress(files);
	          if (progress.mode === 'determinate') {
	            return progress.value * 100;
	          }
	          return totalProgress;
	        }
	      case STATE_ERROR:
	        {
	          return null;
	        }
	      case STATE_UPLOADING:
	        {
	          if (!supportsUploadProgress) {
	            return null;
	          }
	          return totalProgress;
	        }
	      default:
	        return totalProgress;
	    }
	  }
	  function getIsIndeterminate() {
	    switch (uploadState) {
	      case STATE_POSTPROCESSING:
	      case STATE_PREPROCESSING:
	        {
	          const {
	            mode
	          } = calculateProcessingProgress(files);
	          return mode === 'indeterminate';
	        }
	      case STATE_UPLOADING:
	        {
	          if (!supportsUploadProgress) {
	            return true;
	          }
	          return false;
	        }
	      default:
	        return false;
	    }
	  }
	  function getIsHidden() {
	    if (recoveredState) {
	      return false;
	    }
	    switch (uploadState) {
	      case STATE_WAITING:
	        return hideUploadButton || newFiles === 0;
	      case STATE_COMPLETE:
	        return hideAfterFinish;
	      default:
	        return false;
	    }
	  }
	  const progressValue = getProgressValue();
	  const isHidden = getIsHidden();
	  const width = progressValue != null ? progressValue : 100;
	  const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
	  const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
	  const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
	  const showRetryBtn = error && !isAllComplete && !hideRetryButton;
	  const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
	  const progressClassNames = classNames('uppy-StatusBar-progress', {
	    'is-indeterminate': getIsIndeterminate()
	  });
	  const statusBarClassNames = classNames('uppy-StatusBar', `is-${uploadState}`, {
	    'has-ghosts': isSomeGhost
	  });
	  return h("div", {
	    className: statusBarClassNames,
	    "aria-hidden": isHidden
	  }, h("div", {
	    className: progressClassNames,
	    style: {
	      width: `${width}%`
	    },
	    role: "progressbar",
	    "aria-label": `${width}%`,
	    "aria-valuetext": `${width}%`,
	    "aria-valuemin": "0",
	    "aria-valuemax": "100",
	    "aria-valuenow": progressValue
	  }), (() => {
	    switch (uploadState) {
	      case STATE_PREPROCESSING:
	      case STATE_POSTPROCESSING:
	        return h(ProgressBarProcessing, {
	          progress: calculateProcessingProgress(files)
	        });
	      case STATE_COMPLETE:
	        return h(ProgressBarComplete, {
	          i18n: i18n
	        });
	      case STATE_ERROR:
	        return h(ProgressBarError, {
	          error: error,
	          i18n: i18n,
	          numUploads: numUploads,
	          complete: complete
	        });
	      case STATE_UPLOADING:
	        return h(ProgressBarUploading, {
	          i18n: i18n,
	          supportsUploadProgress: supportsUploadProgress,
	          totalProgress: totalProgress,
	          showProgressDetails: showProgressDetails,
	          isUploadStarted: isUploadStarted,
	          isAllComplete: isAllComplete,
	          isAllPaused: isAllPaused,
	          newFiles: newFiles,
	          numUploads: numUploads,
	          complete: complete,
	          totalUploadedSize: totalUploadedSize,
	          totalSize: totalSize,
	          totalETA: totalETA,
	          startUpload: startUpload
	        });
	      default:
	        return null;
	    }
	  })(), h("div", {
	    className: "uppy-StatusBar-actions"
	  }, recoveredState || showUploadBtn ? h(UploadBtn, {
	    newFiles: newFiles,
	    isUploadStarted: isUploadStarted,
	    recoveredState: recoveredState,
	    i18n: i18n,
	    isSomeGhost: isSomeGhost,
	    startUpload: startUpload,
	    uploadState: uploadState
	  }) : null, showRetryBtn ? h(RetryBtn, {
	    i18n: i18n,
	    uppy: uppy
	  }) : null, showPauseResumeBtn ? h(PauseResumeButton, {
	    isAllPaused: isAllPaused,
	    i18n: i18n,
	    isAllComplete: isAllComplete,
	    resumableUploads: resumableUploads,
	    uppy: uppy
	  }) : null, showCancelBtn ? h(CancelBtn, {
	    i18n: i18n,
	    uppy: uppy
	  }) : null, showDoneBtn ? h(DoneBtn, {
	    i18n: i18n,
	    doneButtonHandler: doneButtonHandler
	  }) : null));
	}
	
	exports = { default:  StatusBar };
	
	return exports 
})({})

const $$uppy$status$bar$lib__localeExports = (function (exports) {
 	var _default = {
	  strings: {
	    // Shown in the status bar while files are being uploaded.
	    uploading: 'Uploading',
	    // Shown in the status bar once all files have been uploaded.
	    complete: 'Complete',
	    // Shown in the status bar if an upload failed.
	    uploadFailed: 'Upload failed',
	    // Shown in the status bar while the upload is paused.
	    paused: 'Paused',
	    // Used as the label for the button that retries an upload.
	    retry: 'Retry',
	    // Used as the label for the button that cancels an upload.
	    cancel: 'Cancel',
	    // Used as the label for the button that pauses an upload.
	    pause: 'Pause',
	    // Used as the label for the button that resumes an upload.
	    resume: 'Resume',
	    // Used as the label for the button that resets the upload state after an upload
	    done: 'Done',
	    // When `showProgressDetails` is set, shows the number of files that have been fully uploaded so far.
	    filesUploadedOfTotal: {
	      0: '%{complete} of %{smart_count} file uploaded',
	      1: '%{complete} of %{smart_count} files uploaded'
	    },
	    // When `showProgressDetails` is set, shows the amount of bytes that have been uploaded so far.
	    dataUploadedOfTotal: '%{complete} of %{total}',
	    // When `showProgressDetails` is set, shows an estimation of how long the upload will take to complete.
	    xTimeLeft: '%{time} left',
	    // Used as the label for the button that starts an upload.
	    uploadXFiles: {
	      0: 'Upload %{smart_count} file',
	      1: 'Upload %{smart_count} files'
	    },
	    // Used as the label for the button that starts an upload, if another upload has been started in the past
	    // and new files were added later.
	    uploadXNewFiles: {
	      0: 'Upload +%{smart_count} file',
	      1: 'Upload +%{smart_count} files'
	    },
	    upload: 'Upload',
	    retryUpload: 'Retry upload',
	    xMoreFilesAdded: {
	      0: '%{smart_count} more file added',
	      1: '%{smart_count} more files added'
	    },
	    showErrorDetails: 'Show error details'
	  }
	
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $$uppy$status$bar$lib__StatusBarExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { UIPlugin } = $$uppy__coreExports;
	const { default: emaFilter } = $$uppy$utils$lib__emaFilterExports;;
	const { default: getTextDirection } = $$uppy$utils$lib__getTextDirectionExports;;
	const { default: statusBarStates } = $$uppy$status$bar$lib__StatusBarStatesExports;;
	const { default: StatusBarUI } = $$uppy$status$bar$lib__StatusBarUIExports;;
	const packageJson = {
	  "version": "3.2.5"
	};
	const { default: locale } = $$uppy$status$bar$lib__localeExports;;
	const speedFilterHalfLife = 2000;
	const ETAFilterHalfLife = 2000;
	function getUploadingState(error, isAllComplete, recoveredState, files) {
	  if (error) {
	    return statusBarStates.STATE_ERROR;
	  }
	  if (isAllComplete) {
	    return statusBarStates.STATE_COMPLETE;
	  }
	  if (recoveredState) {
	    return statusBarStates.STATE_WAITING;
	  }
	  let state = statusBarStates.STATE_WAITING;
	  const fileIDs = Object.keys(files);
	  for (let i = 0; i < fileIDs.length; i++) {
	    const {
	      progress
	    } = files[fileIDs[i]];
	    // If ANY files are being uploaded right now, show the uploading state.
	    if (progress.uploadStarted && !progress.uploadComplete) {
	      return statusBarStates.STATE_UPLOADING;
	    }
	    // If files are being preprocessed AND postprocessed at this time, we show the
	    // preprocess state. If any files are being uploaded we show uploading.
	    if (progress.preprocess && state !== statusBarStates.STATE_UPLOADING) {
	      state = statusBarStates.STATE_PREPROCESSING;
	    }
	    // If NO files are being preprocessed or uploaded right now, but some files are
	    // being postprocessed, show the postprocess state.
	    if (progress.postprocess && state !== statusBarStates.STATE_UPLOADING && state !== statusBarStates.STATE_PREPROCESSING) {
	      state = statusBarStates.STATE_POSTPROCESSING;
	    }
	  }
	  return state;
	}
	
	/**
	 * StatusBar: renders a status bar with upload/pause/resume/cancel/retry buttons,
	 * progress percentage and time remaining.
	 */
	var _lastUpdateTime = /*#__PURE__*/_classPrivateFieldLooseKey("lastUpdateTime");
	var _previousUploadedBytes = /*#__PURE__*/_classPrivateFieldLooseKey("previousUploadedBytes");
	var _previousSpeed = /*#__PURE__*/_classPrivateFieldLooseKey("previousSpeed");
	var _previousETA = /*#__PURE__*/_classPrivateFieldLooseKey("previousETA");
	var _computeSmoothETA = /*#__PURE__*/_classPrivateFieldLooseKey("computeSmoothETA");
	var _onUploadStart = /*#__PURE__*/_classPrivateFieldLooseKey("onUploadStart");
	class StatusBar extends UIPlugin {
	  constructor(uppy, opts) {
	    super(uppy, opts);
	    Object.defineProperty(this, _computeSmoothETA, {
	      value: _computeSmoothETA2
	    });
	    Object.defineProperty(this, _lastUpdateTime, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _previousUploadedBytes, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _previousSpeed, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _previousETA, {
	      writable: true,
	      value: void 0
	    });
	    this.startUpload = () => {
	      return this.uppy.upload().catch(() => {
	        // Error logged in Core
	      });
	    };
	    Object.defineProperty(this, _onUploadStart, {
	      writable: true,
	      value: () => {
	        const {
	          recoveredState
	        } = this.uppy.getState();
	        _classPrivateFieldLooseBase(this, _previousSpeed)[_previousSpeed] = null;
	        _classPrivateFieldLooseBase(this, _previousETA)[_previousETA] = null;
	        if (recoveredState) {
	          _classPrivateFieldLooseBase(this, _previousUploadedBytes)[_previousUploadedBytes] = Object.values(recoveredState.files).reduce((pv, _ref) => {
	            let {
	              progress
	            } = _ref;
	            return pv + progress.bytesUploaded;
	          }, 0);
	
	          // We don't set `#lastUpdateTime` at this point because the upload won't
	          // actually resume until the user asks for it.
	
	          this.uppy.emit('restore-confirmed');
	          return;
	        }
	        _classPrivateFieldLooseBase(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
	        _classPrivateFieldLooseBase(this, _previousUploadedBytes)[_previousUploadedBytes] = 0;
	      }
	    });
	    this.id = this.opts.id || 'StatusBar';
	    this.title = 'StatusBar';
	    this.type = 'progressindicator';
	    this.defaultLocale = locale;
	
	    // set default options, must be kept in sync with @uppy/react/src/StatusBar.js
	    const defaultOptions = {
	      target: 'body',
	      hideUploadButton: false,
	      hideRetryButton: false,
	      hidePauseResumeButton: false,
	      hideCancelButton: false,
	      showProgressDetails: false,
	      hideAfterFinish: true,
	      doneButtonHandler: null
	    };
	    this.opts = {
	      ...defaultOptions,
	      ...opts
	    };
	    this.i18nInit();
	    this.render = this.render.bind(this);
	    this.install = this.install.bind(this);
	  }
	  render(state) {
	    const {
	      capabilities,
	      files,
	      allowNewUpload,
	      totalProgress,
	      error,
	      recoveredState
	    } = state;
	    const {
	      newFiles,
	      startedFiles,
	      completeFiles,
	      isUploadStarted,
	      isAllComplete,
	      isAllErrored,
	      isAllPaused,
	      isUploadInProgress,
	      isSomeGhost
	    } = this.uppy.getObjectOfFilesPerState();
	
	    // If some state was recovered, we want to show Upload button/counter
	    // for all the files, because in this case it’s not an Upload button,
	    // but “Confirm Restore Button”
	    const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
	    const resumableUploads = !!capabilities.resumableUploads;
	    const supportsUploadProgress = capabilities.uploadProgress !== false;
	    let totalSize = 0;
	    let totalUploadedSize = 0;
	    startedFiles.forEach(file => {
	      totalSize += file.progress.bytesTotal || 0;
	      totalUploadedSize += file.progress.bytesUploaded || 0;
	    });
	    const totalETA = _classPrivateFieldLooseBase(this, _computeSmoothETA)[_computeSmoothETA]({
	      uploaded: totalUploadedSize,
	      total: totalSize,
	      remaining: totalSize - totalUploadedSize
	    });
	    return StatusBarUI({
	      error,
	      uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
	      allowNewUpload,
	      totalProgress,
	      totalSize,
	      totalUploadedSize,
	      isAllComplete: false,
	      isAllPaused,
	      isAllErrored,
	      isUploadStarted,
	      isUploadInProgress,
	      isSomeGhost,
	      recoveredState,
	      complete: completeFiles.length,
	      newFiles: newFilesOrRecovered.length,
	      numUploads: startedFiles.length,
	      totalETA,
	      files,
	      i18n: this.i18n,
	      uppy: this.uppy,
	      startUpload: this.startUpload,
	      doneButtonHandler: this.opts.doneButtonHandler,
	      resumableUploads,
	      supportsUploadProgress,
	      showProgressDetails: this.opts.showProgressDetails,
	      hideUploadButton: this.opts.hideUploadButton,
	      hideRetryButton: this.opts.hideRetryButton,
	      hidePauseResumeButton: this.opts.hidePauseResumeButton,
	      hideCancelButton: this.opts.hideCancelButton,
	      hideAfterFinish: this.opts.hideAfterFinish,
	      isTargetDOMEl: this.isTargetDOMEl
	    });
	  }
	  onMount() {
	    // Set the text direction if the page has not defined one.
	    const element = this.el;
	    const direction = getTextDirection(element);
	    if (!direction) {
	      element.dir = 'ltr';
	    }
	  }
	  install() {
	    const {
	      target
	    } = this.opts;
	    if (target) {
	      this.mount(target, this);
	    }
	    this.uppy.on('upload', _classPrivateFieldLooseBase(this, _onUploadStart)[_onUploadStart]);
	
	    // To cover the use case where the status bar is installed while the upload
	    // has started, we set `lastUpdateTime` right away.
	    _classPrivateFieldLooseBase(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
	    _classPrivateFieldLooseBase(this, _previousUploadedBytes)[_previousUploadedBytes] = this.uppy.getFiles().reduce((pv, file) => pv + file.progress.bytesUploaded, 0);
	  }
	  uninstall() {
	    this.unmount();
	    this.uppy.off('upload', _classPrivateFieldLooseBase(this, _onUploadStart)[_onUploadStart]);
	  }
	}
	function _computeSmoothETA2(totalBytes) {
	  var _classPrivateFieldLoo, _classPrivateFieldLoo2;
	  if (totalBytes.total === 0 || totalBytes.remaining === 0) {
	    return 0;
	  }
	
	  // When state is restored, lastUpdateTime is still nullish at this point.
	  (_classPrivateFieldLoo2 = (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _lastUpdateTime))[_lastUpdateTime]) != null ? _classPrivateFieldLoo2 : _classPrivateFieldLoo[_lastUpdateTime] = performance.now();
	  const dt = performance.now() - _classPrivateFieldLooseBase(this, _lastUpdateTime)[_lastUpdateTime];
	  if (dt === 0) {
	    var _classPrivateFieldLoo3;
	    return Math.round(((_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo3 : 0) / 100) / 10;
	  }
	  const uploadedBytesSinceLastTick = totalBytes.uploaded - _classPrivateFieldLooseBase(this, _previousUploadedBytes)[_previousUploadedBytes];
	  _classPrivateFieldLooseBase(this, _previousUploadedBytes)[_previousUploadedBytes] = totalBytes.uploaded;
	
	  // uploadedBytesSinceLastTick can be negative in some cases (packet loss?)
	  // in which case, we wait for next tick to update ETA.
	  if (uploadedBytesSinceLastTick <= 0) {
	    var _classPrivateFieldLoo4;
	    return Math.round(((_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo4 : 0) / 100) / 10;
	  }
	  const currentSpeed = uploadedBytesSinceLastTick / dt;
	  const filteredSpeed = _classPrivateFieldLooseBase(this, _previousSpeed)[_previousSpeed] == null ? currentSpeed : emaFilter(currentSpeed, _classPrivateFieldLooseBase(this, _previousSpeed)[_previousSpeed], speedFilterHalfLife, dt);
	  _classPrivateFieldLooseBase(this, _previousSpeed)[_previousSpeed] = filteredSpeed;
	  const instantETA = totalBytes.remaining / filteredSpeed;
	  const updatedPreviousETA = Math.max(_classPrivateFieldLooseBase(this, _previousETA)[_previousETA] - dt, 0);
	  const filteredETA = _classPrivateFieldLooseBase(this, _previousETA)[_previousETA] == null ? instantETA : emaFilter(instantETA, updatedPreviousETA, ETAFilterHalfLife, dt);
	  _classPrivateFieldLooseBase(this, _previousETA)[_previousETA] = filteredETA;
	  _classPrivateFieldLooseBase(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
	  return Math.round(filteredETA / 100) / 10;
	}
	StatusBar.VERSION = packageJson.version;
	
	exports = { default:  StatusBar };
	
	return exports 
})({})

const $$uppy__status$barExports = (function (exports) {
 	const { default: __default } = $$uppy$status$bar$lib__StatusBarExports;
	;
	
	exports = { default: __default };
	
	return exports 
})({})

const $$uppy$informer$lib__FadeInExports = (function (exports) {
 	const { h, Component, createRef } = $__preactExports;
	const TRANSITION_MS = 300;
	class FadeIn extends Component {
	  constructor() {
	    super(...arguments);
	    this.ref = createRef();
	  }
	  componentWillEnter(callback) {
	    this.ref.current.style.opacity = '1';
	    this.ref.current.style.transform = 'none';
	    setTimeout(callback, TRANSITION_MS);
	  }
	  componentWillLeave(callback) {
	    this.ref.current.style.opacity = '0';
	    this.ref.current.style.transform = 'translateY(350%)';
	    setTimeout(callback, TRANSITION_MS);
	  }
	  render() {
	    const {
	      children
	    } = this.props;
	    return h("div", {
	      className: "uppy-Informer-animated",
	      ref: this.ref
	    }, children);
	  }
	}
	
	exports = { default:  FadeIn };
	
	return exports 
})({})

const $$uppy$informer$lib__TransitionGroupExports = (function (exports) {
 	/* eslint-disable */
	/**
	 * @source https://github.com/developit/preact-transition-group
	 */
	
	const { Component, cloneElement, h, toChildArray } = $__preactExports;
	function assign(obj, props) {
	  return Object.assign(obj, props);
	}
	function getKey(vnode, fallback) {
	  var _vnode$key;
	  return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
	}
	function linkRef(component, name) {
	  const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
	  return cache[name] || (cache[name] = c => {
	    component.refs[name] = c;
	  });
	}
	function getChildMapping(children) {
	  const out = {};
	  for (let i = 0; i < children.length; i++) {
	    if (children[i] != null) {
	      const key = getKey(children[i], i.toString(36));
	      out[key] = children[i];
	    }
	  }
	  return out;
	}
	function mergeChildMappings(prev, next) {
	  prev = prev || {};
	  next = next || {};
	  const getValueForKey = key => next.hasOwnProperty(key) ? next[key] : prev[key];
	
	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  const nextKeysPending = {};
	  let pendingKeys = [];
	  for (const prevKey in prev) {
	    if (next.hasOwnProperty(prevKey)) {
	      if (pendingKeys.length) {
	        nextKeysPending[prevKey] = pendingKeys;
	        pendingKeys = [];
	      }
	    } else {
	      pendingKeys.push(prevKey);
	    }
	  }
	  const childMapping = {};
	  for (const nextKey in next) {
	    if (nextKeysPending.hasOwnProperty(nextKey)) {
	      for (let i = 0; i < nextKeysPending[nextKey].length; i++) {
	        const pendingNextKey = nextKeysPending[nextKey][i];
	        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	      }
	    }
	    childMapping[nextKey] = getValueForKey(nextKey);
	  }
	
	  // Finally, add the keys which didn't appear before any key in `next`
	  for (let i = 0; i < pendingKeys.length; i++) {
	    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	  }
	  return childMapping;
	}
	const identity = i => i;
	class TransitionGroup extends Component {
	  constructor(props, context) {
	    super(props, context);
	    this.refs = {};
	    this.state = {
	      children: getChildMapping(toChildArray(toChildArray(this.props.children)) || [])
	    };
	    this.performAppear = this.performAppear.bind(this);
	    this.performEnter = this.performEnter.bind(this);
	    this.performLeave = this.performLeave.bind(this);
	  }
	  componentWillMount() {
	    this.currentlyTransitioningKeys = {};
	    this.keysToAbortLeave = [];
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  }
	  componentDidMount() {
	    const initialChildMapping = this.state.children;
	    for (const key in initialChildMapping) {
	      if (initialChildMapping[key]) {
	        // this.performAppear(getKey(initialChildMapping[key], key));
	        this.performAppear(key);
	      }
	    }
	  }
	  componentWillReceiveProps(nextProps) {
	    const nextChildMapping = getChildMapping(toChildArray(nextProps.children) || []);
	    const prevChildMapping = this.state.children;
	    this.setState(prevState => ({
	      children: mergeChildMappings(prevState.children, nextChildMapping)
	    }));
	    let key;
	    for (key in nextChildMapping) {
	      if (nextChildMapping.hasOwnProperty(key)) {
	        const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	        // We should re-enter the component and abort its leave function
	        if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
	          this.keysToEnter.push(key);
	          this.keysToAbortLeave.push(key);
	        } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
	          this.keysToEnter.push(key);
	        }
	      }
	    }
	    for (key in prevChildMapping) {
	      if (prevChildMapping.hasOwnProperty(key)) {
	        const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
	          this.keysToLeave.push(key);
	        }
	      }
	    }
	  }
	  componentDidUpdate() {
	    const {
	      keysToEnter
	    } = this;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);
	    const {
	      keysToLeave
	    } = this;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  }
	  _finishAbort(key) {
	    const idx = this.keysToAbortLeave.indexOf(key);
	    if (idx !== -1) {
	      this.keysToAbortLeave.splice(idx, 1);
	    }
	  }
	  performAppear(key) {
	    this.currentlyTransitioningKeys[key] = true;
	    const component = this.refs[key];
	    if (component != null && component.componentWillAppear) {
	      component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
	    } else {
	      this._handleDoneAppearing(key);
	    }
	  }
	  _handleDoneAppearing(key) {
	    const component = this.refs[key];
	    if (component != null && component.componentDidAppear) {
	      component.componentDidAppear();
	    }
	    delete this.currentlyTransitioningKeys[key];
	    this._finishAbort(key);
	    const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully appeared. Remove it.
	      this.performLeave(key);
	    }
	  }
	  performEnter(key) {
	    this.currentlyTransitioningKeys[key] = true;
	    const component = this.refs[key];
	    if (component != null && component.componentWillEnter) {
	      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
	    } else {
	      this._handleDoneEntering(key);
	    }
	  }
	  _handleDoneEntering(key) {
	    const component = this.refs[key];
	    if (component != null && component.componentDidEnter) {
	      component.componentDidEnter();
	    }
	    delete this.currentlyTransitioningKeys[key];
	    this._finishAbort(key);
	    const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  }
	  performLeave(key) {
	    // If we should immediately abort this leave function,
	    // don't run the leave transition at all.
	    const idx = this.keysToAbortLeave.indexOf(key);
	    if (idx !== -1) {
	      return;
	    }
	    this.currentlyTransitioningKeys[key] = true;
	    const component = this.refs[key];
	    if (component != null && component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  }
	  _handleDoneLeaving(key) {
	    // If we should immediately abort the leave,
	    // then skip this altogether
	    const idx = this.keysToAbortLeave.indexOf(key);
	    if (idx !== -1) {
	      return;
	    }
	    const component = this.refs[key];
	    if (component != null && component.componentDidLeave) {
	      component.componentDidLeave();
	    }
	    delete this.currentlyTransitioningKeys[key];
	    const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      const children = assign({}, this.state.children);
	      delete children[key];
	      this.setState({
	        children
	      });
	    }
	  }
	  render(_ref, _ref2) {
	    let {
	      childFactory,
	      transitionLeave,
	      transitionName,
	      transitionAppear,
	      transitionEnter,
	      transitionLeaveTimeout,
	      transitionEnterTimeout,
	      transitionAppearTimeout,
	      component,
	      ...props
	    } = _ref;
	    let {
	      children
	    } = _ref2;
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    const childrenToRender = Object.entries(children).map(_ref3 => {
	      let [key, child] = _ref3;
	      if (!child) return undefined;
	      const ref = linkRef(this, key);
	      return cloneElement(childFactory(child), {
	        ref,
	        key
	      });
	    }).filter(Boolean);
	    return h(component, props, childrenToRender);
	  }
	}
	TransitionGroup.defaultProps = {
	  component: 'span',
	  childFactory: identity
	};
	
	exports = { default: TransitionGroup };
	
	return exports 
})({})

const $$uppy$informer$lib__InformerExports = (function (exports) {
 	/* eslint-disable jsx-a11y/no-noninteractive-element-interactions  */
	/* eslint-disable jsx-a11y/click-events-have-key-events */
	const { h } = $__preactExports;
	const { UIPlugin } = $$uppy__coreExports;
	const { default: FadeIn } = $$uppy$informer$lib__FadeInExports;;
	const { default: TransitionGroup } = $$uppy$informer$lib__TransitionGroupExports;;
	const packageJson = {
	  "version": "3.0.4"
	};
	/**
	 * Informer
	 * Shows rad message bubbles
	 * used like this: `uppy.info('hello world', 'info', 5000)`
	 * or for errors: `uppy.info('Error uploading img.jpg', 'error', 5000)`
	 *
	 */
	class Informer extends UIPlugin {
	  constructor(uppy, opts) {
	    super(uppy, opts);
	    this.render = state => {
	      return h("div", {
	        className: "uppy uppy-Informer"
	      }, h(TransitionGroup, null, state.info.map(info => h(FadeIn, {
	        key: info.message
	      }, h("p", {
	        role: "alert"
	      }, info.message, ' ', info.details && h("span", {
	        "aria-label": info.details,
	        "data-microtip-position": "top-left",
	        "data-microtip-size": "medium",
	        role: "tooltip"
	        // eslint-disable-next-line no-alert
	        ,
	        onClick: () => alert(`${info.message} \n\n ${info.details}`)
	      }, "?"))))));
	    };
	    this.type = 'progressindicator';
	    this.id = this.opts.id || 'Informer';
	    this.title = 'Informer';
	
	    // set default options
	    const defaultOptions = {};
	    // merge default options with the ones set by user
	    this.opts = {
	      ...defaultOptions,
	      ...opts
	    };
	  }
	  install() {
	    const {
	      target
	    } = this.opts;
	    if (target) {
	      this.mount(target, this);
	    }
	  }
	}
	Informer.VERSION = packageJson.version;
	
	exports = { default:  Informer };
	
	return exports 
})({})

const $$uppy__informerExports = (function (exports) {
 	const { default: __default } = $$uppy$informer$lib__InformerExports;
	;
	
	exports = { default: __default };
	
	return exports 
})({})

const $$uppy$utils$lib__dataURItoBlobExports = (function (exports) {
 	const DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
	function dataURItoBlob(dataURI, opts, toFile) {
	  var _ref, _opts$mimeType;
	  // get the base64 data
	  const dataURIData = DATA_URL_PATTERN.exec(dataURI);
	
	  // user may provide mime type, if not get it from data URI
	  const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : 'plain/text';
	  let data; // We add `!` to tell TS we're OK with `data` being not defined when the dataURI is invalid.
	  if ((dataURIData == null ? void 0 : dataURIData[2]) != null) {
	    const binary = atob(decodeURIComponent(dataURIData[3]));
	    const bytes = new Uint8Array(binary.length);
	    for (let i = 0; i < binary.length; i++) {
	      bytes[i] = binary.charCodeAt(i);
	    }
	    data = [bytes];
	  } else if ((dataURIData == null ? void 0 : dataURIData[3]) != null) {
	    data = [decodeURIComponent(dataURIData[3])];
	  }
	
	  // Convert to a File?
	  if (toFile) {
	    return new File(data, opts.name || '', {
	      type: mimeType
	    });
	  }
	  return new Blob(data, {
	    type: mimeType
	  });
	}
	
	exports = { default:  dataURItoBlob };
	
	return exports 
})({})

const $$uppy$utils$lib__isObjectURLExports = (function (exports) {
 	/**
	 * Check if a URL string is an object URL from `URL.createObjectURL`.
	 */
	function isObjectURL(url) {
	  return url.startsWith('blob:');
	}
	
	exports = { default:  isObjectURL };
	
	return exports 
})({})

const $$uppy$utils$lib__isPreviewSupportedExports = (function (exports) {
 	function isPreviewSupported(fileType) {
	  if (!fileType) return false;
	  // list of images that browsers can preview
	  return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
	}
	
	exports = { default:  isPreviewSupported };
	
	return exports 
})({})

const $exifr$dist__miniesmExports = (function (exports) {
 	function e(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var t="undefined"!=typeof self?self:global;const s="undefined"!=typeof navigator,i=s&&"undefined"==typeof HTMLImageElement,n=!("undefined"==typeof global||"undefined"==typeof process||!process.versions||!process.versions.node),r=t.Buffer,a=!!r,h=e=>void 0!==e;function f(e){return void 0===e||(e instanceof Map?0===e.size:0===Object.values(e).filter(h).length)}function l(e){let t=new Error(e);throw delete t.stack,t}function o(e){let t=function(e){let t=0;return e.ifd0.enabled&&(t+=1024),e.exif.enabled&&(t+=2048),e.makerNote&&(t+=2048),e.userComment&&(t+=1024),e.gps.enabled&&(t+=512),e.interop.enabled&&(t+=100),e.ifd1.enabled&&(t+=1024),t+2048}(e);return e.jfif.enabled&&(t+=50),e.xmp.enabled&&(t+=2e4),e.iptc.enabled&&(t+=14e3),e.icc.enabled&&(t+=6e3),t}const u=e=>String.fromCharCode.apply(null,e),d="undefined"!=typeof TextDecoder?new TextDecoder("utf-8"):void 0;class c{static from(e,t){return e instanceof this&&e.le===t?e:new c(e,void 0,void 0,t)}constructor(e,t=0,s,i){if("boolean"==typeof i&&(this.le=i),Array.isArray(e)&&(e=new Uint8Array(e)),0===e)this.byteOffset=0,this.byteLength=0;else if(e instanceof ArrayBuffer){void 0===s&&(s=e.byteLength-t);let i=new DataView(e,t,s);this._swapDataView(i)}else if(e instanceof Uint8Array||e instanceof DataView||e instanceof c){void 0===s&&(s=e.byteLength-t),(t+=e.byteOffset)+s>e.byteOffset+e.byteLength&&l("Creating view outside of available memory in ArrayBuffer");let i=new DataView(e.buffer,t,s);this._swapDataView(i)}else if("number"==typeof e){let t=new DataView(new ArrayBuffer(e));this._swapDataView(t)}else l("Invalid input argument for BufferView: "+e)}_swapArrayBuffer(e){this._swapDataView(new DataView(e))}_swapBuffer(e){this._swapDataView(new DataView(e.buffer,e.byteOffset,e.byteLength))}_swapDataView(e){this.dataView=e,this.buffer=e.buffer,this.byteOffset=e.byteOffset,this.byteLength=e.byteLength}_lengthToEnd(e){return this.byteLength-e}set(e,t,s=c){return e instanceof DataView||e instanceof c?e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer&&(e=new Uint8Array(e)),e instanceof Uint8Array||l("BufferView.set(): Invalid data argument."),this.toUint8().set(e,t),new s(this,t,e.byteLength)}subarray(e,t){return t=t||this._lengthToEnd(e),new c(this,e,t)}toUint8(){return new Uint8Array(this.buffer,this.byteOffset,this.byteLength)}getUint8Array(e,t){return new Uint8Array(this.buffer,this.byteOffset+e,t)}getString(e=0,t=this.byteLength){let s=this.getUint8Array(e,t);return i=s,d?d.decode(i):a?Buffer.from(i).toString("utf8"):decodeURIComponent(escape(u(i)));var i}getLatin1String(e=0,t=this.byteLength){let s=this.getUint8Array(e,t);return u(s)}getUnicodeString(e=0,t=this.byteLength){const s=[];for(let i=0;i<t&&e+i<this.byteLength;i+=2)s.push(this.getUint16(e+i));return u(s)}getInt8(e){return this.dataView.getInt8(e)}getUint8(e){return this.dataView.getUint8(e)}getInt16(e,t=this.le){return this.dataView.getInt16(e,t)}getInt32(e,t=this.le){return this.dataView.getInt32(e,t)}getUint16(e,t=this.le){return this.dataView.getUint16(e,t)}getUint32(e,t=this.le){return this.dataView.getUint32(e,t)}getFloat32(e,t=this.le){return this.dataView.getFloat32(e,t)}getFloat64(e,t=this.le){return this.dataView.getFloat64(e,t)}getFloat(e,t=this.le){return this.dataView.getFloat32(e,t)}getDouble(e,t=this.le){return this.dataView.getFloat64(e,t)}getUintBytes(e,t,s){switch(t){case 1:return this.getUint8(e,s);case 2:return this.getUint16(e,s);case 4:return this.getUint32(e,s);case 8:return this.getUint64&&this.getUint64(e,s)}}getUint(e,t,s){switch(t){case 8:return this.getUint8(e,s);case 16:return this.getUint16(e,s);case 32:return this.getUint32(e,s);case 64:return this.getUint64&&this.getUint64(e,s)}}toString(e){return this.dataView.toString(e,this.constructor.name)}ensureChunk(){}}function p(e,t){l(`${e} '${t}' was not loaded, try using full build of exifr.`)}class g extends Map{constructor(e){super(),this.kind=e}get(e,t){return this.has(e)||p(this.kind,e),t&&(e in t||function(e,t){l(`Unknown ${e} '${t}'.`)}(this.kind,e),t[e].enabled||p(this.kind,e)),super.get(e)}keyList(){return Array.from(this.keys())}}var m=new g("file parser"),y=new g("segment parser"),b=new g("file reader");let w=t.fetch;function k(e,t){return(i=e).startsWith("data:")||i.length>1e4?v(e,t,"base64"):n&&e.includes("://")?O(e,t,"url",S):n?v(e,t,"fs"):s?O(e,t,"url",S):void l("Invalid input argument");var i}async function O(e,t,s,i){return b.has(s)?v(e,t,s):i?async function(e,t){let s=await t(e);return new c(s)}(e,i):void l(`Parser ${s} is not loaded`)}async function v(e,t,s){let i=new(b.get(s))(e,t);return await i.read(),i}const S=e=>w(e).then((e=>e.arrayBuffer())),A=e=>new Promise(((t,s)=>{let i=new FileReader;i.onloadend=()=>t(i.result||new ArrayBuffer),i.onerror=s,i.readAsArrayBuffer(e)}));class U extends Map{get tagKeys(){return this.allKeys||(this.allKeys=Array.from(this.keys())),this.allKeys}get tagValues(){return this.allValues||(this.allValues=Array.from(this.values())),this.allValues}}function x(e,t,s){let i=new U;for(let[e,t]of s)i.set(e,t);if(Array.isArray(t))for(let s of t)e.set(s,i);else e.set(t,i);return i}function C(e,t,s){let i,n=e.get(t);for(i of s)n.set(i[0],i[1])}const B=new Map,V=new Map,I=new Map,L=["chunked","firstChunkSize","firstChunkSizeNode","firstChunkSizeBrowser","chunkSize","chunkLimit"],T=["jfif","xmp","icc","iptc","ihdr"],z=["tiff",...T],P=["ifd0","ifd1","exif","gps","interop"],F=[...z,...P],j=["makerNote","userComment"],E=["translateKeys","translateValues","reviveValues","multiSegment"],M=[...E,"sanitize","mergeOutput","silentErrors"];class _{get translate(){return this.translateKeys||this.translateValues||this.reviveValues}}class D extends _{get needed(){return this.enabled||this.deps.size>0}constructor(t,s,i,n){if(super(),e(this,"enabled",!1),e(this,"skip",new Set),e(this,"pick",new Set),e(this,"deps",new Set),e(this,"translateKeys",!1),e(this,"translateValues",!1),e(this,"reviveValues",!1),this.key=t,this.enabled=s,this.parse=this.enabled,this.applyInheritables(n),this.canBeFiltered=P.includes(t),this.canBeFiltered&&(this.dict=B.get(t)),void 0!==i)if(Array.isArray(i))this.parse=this.enabled=!0,this.canBeFiltered&&i.length>0&&this.translateTagSet(i,this.pick);else if("object"==typeof i){if(this.enabled=!0,this.parse=!1!==i.parse,this.canBeFiltered){let{pick:e,skip:t}=i;e&&e.length>0&&this.translateTagSet(e,this.pick),t&&t.length>0&&this.translateTagSet(t,this.skip)}this.applyInheritables(i)}else!0===i||!1===i?this.parse=this.enabled=i:l(`Invalid options argument: ${i}`)}applyInheritables(e){let t,s;for(t of E)s=e[t],void 0!==s&&(this[t]=s)}translateTagSet(e,t){if(this.dict){let s,i,{tagKeys:n,tagValues:r}=this.dict;for(s of e)"string"==typeof s?(i=r.indexOf(s),-1===i&&(i=n.indexOf(Number(s))),-1!==i&&t.add(Number(n[i]))):t.add(s)}else for(let s of e)t.add(s)}finalizeFilters(){!this.enabled&&this.deps.size>0?(this.enabled=!0,X(this.pick,this.deps)):this.enabled&&this.pick.size>0&&X(this.pick,this.deps)}}var N={jfif:!1,tiff:!0,xmp:!1,icc:!1,iptc:!1,ifd0:!0,ifd1:!1,exif:!0,gps:!0,interop:!1,ihdr:void 0,makerNote:!1,userComment:!1,multiSegment:!1,skip:[],pick:[],translateKeys:!0,translateValues:!0,reviveValues:!0,sanitize:!0,mergeOutput:!0,silentErrors:!0,chunked:!0,firstChunkSize:void 0,firstChunkSizeNode:512,firstChunkSizeBrowser:65536,chunkSize:65536,chunkLimit:5},$=new Map;class R extends _{static useCached(e){let t=$.get(e);return void 0!==t||(t=new this(e),$.set(e,t)),t}constructor(e){super(),!0===e?this.setupFromTrue():void 0===e?this.setupFromUndefined():Array.isArray(e)?this.setupFromArray(e):"object"==typeof e?this.setupFromObject(e):l(`Invalid options argument ${e}`),void 0===this.firstChunkSize&&(this.firstChunkSize=s?this.firstChunkSizeBrowser:this.firstChunkSizeNode),this.mergeOutput&&(this.ifd1.enabled=!1),this.filterNestedSegmentTags(),this.traverseTiffDependencyTree(),this.checkLoadedPlugins()}setupFromUndefined(){let e;for(e of L)this[e]=N[e];for(e of M)this[e]=N[e];for(e of j)this[e]=N[e];for(e of F)this[e]=new D(e,N[e],void 0,this)}setupFromTrue(){let e;for(e of L)this[e]=N[e];for(e of M)this[e]=N[e];for(e of j)this[e]=!0;for(e of F)this[e]=new D(e,!0,void 0,this)}setupFromArray(e){let t;for(t of L)this[t]=N[t];for(t of M)this[t]=N[t];for(t of j)this[t]=N[t];for(t of F)this[t]=new D(t,!1,void 0,this);this.setupGlobalFilters(e,void 0,P)}setupFromObject(e){let t;for(t of(P.ifd0=P.ifd0||P.image,P.ifd1=P.ifd1||P.thumbnail,Object.assign(this,e),L))this[t]=W(e[t],N[t]);for(t of M)this[t]=W(e[t],N[t]);for(t of j)this[t]=W(e[t],N[t]);for(t of z)this[t]=new D(t,N[t],e[t],this);for(t of P)this[t]=new D(t,N[t],e[t],this.tiff);this.setupGlobalFilters(e.pick,e.skip,P,F),!0===e.tiff?this.batchEnableWithBool(P,!0):!1===e.tiff?this.batchEnableWithUserValue(P,e):Array.isArray(e.tiff)?this.setupGlobalFilters(e.tiff,void 0,P):"object"==typeof e.tiff&&this.setupGlobalFilters(e.tiff.pick,e.tiff.skip,P)}batchEnableWithBool(e,t){for(let s of e)this[s].enabled=t}batchEnableWithUserValue(e,t){for(let s of e){let e=t[s];this[s].enabled=!1!==e&&void 0!==e}}setupGlobalFilters(e,t,s,i=s){if(e&&e.length){for(let e of i)this[e].enabled=!1;let t=K(e,s);for(let[e,s]of t)X(this[e].pick,s),this[e].enabled=!0}else if(t&&t.length){let e=K(t,s);for(let[t,s]of e)X(this[t].skip,s)}}filterNestedSegmentTags(){let{ifd0:e,exif:t,xmp:s,iptc:i,icc:n}=this;this.makerNote?t.deps.add(37500):t.skip.add(37500),this.userComment?t.deps.add(37510):t.skip.add(37510),s.enabled||e.skip.add(700),i.enabled||e.skip.add(33723),n.enabled||e.skip.add(34675)}traverseTiffDependencyTree(){let{ifd0:e,exif:t,gps:s,interop:i}=this;i.needed&&(t.deps.add(40965),e.deps.add(40965)),t.needed&&e.deps.add(34665),s.needed&&e.deps.add(34853),this.tiff.enabled=P.some((e=>!0===this[e].enabled))||this.makerNote||this.userComment;for(let e of P)this[e].finalizeFilters()}get onlyTiff(){return!T.map((e=>this[e].enabled)).some((e=>!0===e))&&this.tiff.enabled}checkLoadedPlugins(){for(let e of z)this[e].enabled&&!y.has(e)&&p("segment parser",e)}}function K(e,t){let s,i,n,r,a=[];for(n of t){for(r of(s=B.get(n),i=[],s))(e.includes(r[0])||e.includes(r[1]))&&i.push(r[0]);i.length&&a.push([n,i])}return a}function W(e,t){return void 0!==e?e:void 0!==t?t:void 0}function X(e,t){for(let s of t)e.add(s)}e(R,"default",N);class H{constructor(t){e(this,"parsers",{}),e(this,"output",{}),e(this,"errors",[]),e(this,"pushToErrors",(e=>this.errors.push(e))),this.options=R.useCached(t)}async read(e){this.file=await function(e,t){return"string"==typeof e?k(e,t):s&&!i&&e instanceof HTMLImageElement?k(e.src,t):e instanceof Uint8Array||e instanceof ArrayBuffer||e instanceof DataView?new c(e):s&&e instanceof Blob?O(e,t,"blob",A):void l("Invalid input argument")}(e,this.options)}setup(){if(this.fileParser)return;let{file:e}=this,t=e.getUint16(0);for(let[s,i]of m)if(i.canHandle(e,t))return this.fileParser=new i(this.options,this.file,this.parsers),e[s]=!0;this.file.close&&this.file.close(),l("Unknown file format")}async parse(){let{output:e,errors:t}=this;return this.setup(),this.options.silentErrors?(await this.executeParsers().catch(this.pushToErrors),t.push(...this.fileParser.errors)):await this.executeParsers(),this.file.close&&this.file.close(),this.options.silentErrors&&t.length>0&&(e.errors=t),f(s=e)?void 0:s;var s}async executeParsers(){let{output:e}=this;await this.fileParser.parse();let t=Object.values(this.parsers).map((async t=>{let s=await t.parse();t.assignToOutput(e,s)}));this.options.silentErrors&&(t=t.map((e=>e.catch(this.pushToErrors)))),await Promise.all(t)}async extractThumbnail(){this.setup();let{options:e,file:t}=this,s=y.get("tiff",e);var i;if(t.tiff?i={start:0,type:"tiff"}:t.jpeg&&(i=await this.fileParser.getOrFindSegment("tiff")),void 0===i)return;let n=await this.fileParser.ensureSegmentChunk(i),r=this.parsers.tiff=new s(n,e,t),a=await r.extractThumbnail();return t.close&&t.close(),a}}async function Y(e,t){let s=new H(t);return await s.read(e),s.parse()}var G=Object.freeze({__proto__:null,parse:Y,Exifr:H,fileParsers:m,segmentParsers:y,fileReaders:b,tagKeys:B,tagValues:V,tagRevivers:I,createDictionary:x,extendDictionary:C,fetchUrlAsArrayBuffer:S,readBlobAsArrayBuffer:A,chunkedProps:L,otherSegments:T,segments:z,tiffBlocks:P,segmentsAndBlocks:F,tiffExtractables:j,inheritables:E,allFormatters:M,Options:R});class J{static findPosition(e,t){let s=e.getUint16(t+2)+2,i="function"==typeof this.headerLength?this.headerLength(e,t,s):this.headerLength,n=t+i,r=s-i;return{offset:t,length:s,headerLength:i,start:n,size:r,end:n+r}}static parse(e,t={}){return new this(e,new R({[this.type]:t}),e).parse()}normalizeInput(e){return e instanceof c?e:new c(e)}constructor(t,s={},i){e(this,"errors",[]),e(this,"raw",new Map),e(this,"handleError",(e=>{if(!this.options.silentErrors)throw e;this.errors.push(e.message)})),this.chunk=this.normalizeInput(t),this.file=i,this.type=this.constructor.type,this.globalOptions=this.options=s,this.localOptions=s[this.type],this.canTranslate=this.localOptions&&this.localOptions.translate}translate(){this.canTranslate&&(this.translated=this.translateBlock(this.raw,this.type))}get output(){return this.translated?this.translated:this.raw?Object.fromEntries(this.raw):void 0}translateBlock(e,t){let s=I.get(t),i=V.get(t),n=B.get(t),r=this.options[t],a=r.reviveValues&&!!s,h=r.translateValues&&!!i,f=r.translateKeys&&!!n,l={};for(let[t,r]of e)a&&s.has(t)?r=s.get(t)(r):h&&i.has(t)&&(r=this.translateValue(r,i.get(t))),f&&n.has(t)&&(t=n.get(t)||t),l[t]=r;return l}translateValue(e,t){return t[e]||t.DEFAULT||e}assignToOutput(e,t){this.assignObjectToOutput(e,this.constructor.type,t)}assignObjectToOutput(e,t,s){if(this.globalOptions.mergeOutput)return Object.assign(e,s);e[t]?Object.assign(e[t],s):e[t]=s}}e(J,"headerLength",4),e(J,"type",void 0),e(J,"multiSegment",!1),e(J,"canHandle",(()=>!1));function q(e){return 192===e||194===e||196===e||219===e||221===e||218===e||254===e}function Q(e){return e>=224&&e<=239}function Z(e,t,s){for(let[i,n]of y)if(n.canHandle(e,t,s))return i}class ee extends class{constructor(t,s,i){e(this,"errors",[]),e(this,"ensureSegmentChunk",(async e=>{let t=e.start,s=e.size||65536;if(this.file.chunked)if(this.file.available(t,s))e.chunk=this.file.subarray(t,s);else try{e.chunk=await this.file.readChunk(t,s)}catch(t){l(`Couldn't read segment: ${JSON.stringify(e)}. ${t.message}`)}else this.file.byteLength>t+s?e.chunk=this.file.subarray(t,s):void 0===e.size?e.chunk=this.file.subarray(t):l("Segment unreachable: "+JSON.stringify(e));return e.chunk})),this.extendOptions&&this.extendOptions(t),this.options=t,this.file=s,this.parsers=i}injectSegment(e,t){this.options[e].enabled&&this.createParser(e,t)}createParser(e,t){let s=new(y.get(e))(t,this.options,this.file);return this.parsers[e]=s}createParsers(e){for(let t of e){let{type:e,chunk:s}=t,i=this.options[e];if(i&&i.enabled){let t=this.parsers[e];t&&t.append||t||this.createParser(e,s)}}}async readSegments(e){let t=e.map(this.ensureSegmentChunk);await Promise.all(t)}}{constructor(...t){super(...t),e(this,"appSegments",[]),e(this,"jpegSegments",[]),e(this,"unknownSegments",[])}static canHandle(e,t){return 65496===t}async parse(){await this.findAppSegments(),await this.readSegments(this.appSegments),this.mergeMultiSegments(),this.createParsers(this.mergedAppSegments||this.appSegments)}setupSegmentFinderArgs(e){!0===e?(this.findAll=!0,this.wanted=new Set(y.keyList())):(e=void 0===e?y.keyList().filter((e=>this.options[e].enabled)):e.filter((e=>this.options[e].enabled&&y.has(e))),this.findAll=!1,this.remaining=new Set(e),this.wanted=new Set(e)),this.unfinishedMultiSegment=!1}async findAppSegments(e=0,t){this.setupSegmentFinderArgs(t);let{file:s,findAll:i,wanted:n,remaining:r}=this;if(!i&&this.file.chunked&&(i=Array.from(n).some((e=>{let t=y.get(e),s=this.options[e];return t.multiSegment&&s.multiSegment})),i&&await this.file.readWhole()),e=this.findAppSegmentsInRange(e,s.byteLength),!this.options.onlyTiff&&s.chunked){let t=!1;for(;r.size>0&&!t&&(s.canReadNextChunk||this.unfinishedMultiSegment);){let{nextChunkOffset:i}=s,n=this.appSegments.some((e=>!this.file.available(e.offset||e.start,e.length||e.size)));if(t=e>i&&!n?!await s.readNextChunk(e):!await s.readNextChunk(i),void 0===(e=this.findAppSegmentsInRange(e,s.byteLength)))return}}}findAppSegmentsInRange(e,t){t-=2;let s,i,n,r,a,h,{file:f,findAll:l,wanted:o,remaining:u,options:d}=this;for(;e<t;e++)if(255===f.getUint8(e))if(s=f.getUint8(e+1),Q(s)){if(i=f.getUint16(e+2),n=Z(f,e,i),n&&o.has(n)&&(r=y.get(n),a=r.findPosition(f,e),h=d[n],a.type=n,this.appSegments.push(a),!l&&(r.multiSegment&&h.multiSegment?(this.unfinishedMultiSegment=a.chunkNumber<a.chunkCount,this.unfinishedMultiSegment||u.delete(n)):u.delete(n),0===u.size)))break;d.recordUnknownSegments&&(a=J.findPosition(f,e),a.marker=s,this.unknownSegments.push(a)),e+=i+1}else if(q(s)){if(i=f.getUint16(e+2),218===s&&!1!==d.stopAfterSos)return;d.recordJpegSegments&&this.jpegSegments.push({offset:e,length:i,marker:s}),e+=i+1}return e}mergeMultiSegments(){if(!this.appSegments.some((e=>e.multiSegment)))return;let e=function(e,t){let s,i,n,r=new Map;for(let a=0;a<e.length;a++)s=e[a],i=s[t],r.has(i)?n=r.get(i):r.set(i,n=[]),n.push(s);return Array.from(r)}(this.appSegments,"type");this.mergedAppSegments=e.map((([e,t])=>{let s=y.get(e,this.options);if(s.handleMultiSegments){return{type:e,chunk:s.handleMultiSegments(t)}}return t[0]}))}getSegment(e){return this.appSegments.find((t=>t.type===e))}async getOrFindSegment(e){let t=this.getSegment(e);return void 0===t&&(await this.findAppSegments(0,[e]),t=this.getSegment(e)),t}}e(ee,"type","jpeg"),m.set("jpeg",ee);const te=[void 0,1,1,2,4,8,1,1,2,4,8,4,8,4];class se extends J{parseHeader(){var e=this.chunk.getUint16();18761===e?this.le=!0:19789===e&&(this.le=!1),this.chunk.le=this.le,this.headerParsed=!0}parseTags(e,t,s=new Map){let{pick:i,skip:n}=this.options[t];i=new Set(i);let r=i.size>0,a=0===n.size,h=this.chunk.getUint16(e);e+=2;for(let f=0;f<h;f++){let h=this.chunk.getUint16(e);if(r){if(i.has(h)&&(s.set(h,this.parseTag(e,h,t)),i.delete(h),0===i.size))break}else!a&&n.has(h)||s.set(h,this.parseTag(e,h,t));e+=12}return s}parseTag(e,t,s){let{chunk:i}=this,n=i.getUint16(e+2),r=i.getUint32(e+4),a=te[n];if(a*r<=4?e+=8:e=i.getUint32(e+8),(n<1||n>13)&&l(`Invalid TIFF value type. block: ${s.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e}`),e>i.byteLength&&l(`Invalid TIFF value offset. block: ${s.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e} is outside of chunk size ${i.byteLength}`),1===n)return i.getUint8Array(e,r);if(2===n)return""===(h=function(e){for(;e.endsWith("\0");)e=e.slice(0,-1);return e}(h=i.getString(e,r)).trim())?void 0:h;var h;if(7===n)return i.getUint8Array(e,r);if(1===r)return this.parseTagValue(n,e);{let t=new(function(e){switch(e){case 1:return Uint8Array;case 3:return Uint16Array;case 4:return Uint32Array;case 5:return Array;case 6:return Int8Array;case 8:return Int16Array;case 9:return Int32Array;case 10:return Array;case 11:return Float32Array;case 12:return Float64Array;default:return Array}}(n))(r),s=a;for(let i=0;i<r;i++)t[i]=this.parseTagValue(n,e),e+=s;return t}}parseTagValue(e,t){let{chunk:s}=this;switch(e){case 1:return s.getUint8(t);case 3:return s.getUint16(t);case 4:return s.getUint32(t);case 5:return s.getUint32(t)/s.getUint32(t+4);case 6:return s.getInt8(t);case 8:return s.getInt16(t);case 9:return s.getInt32(t);case 10:return s.getInt32(t)/s.getInt32(t+4);case 11:return s.getFloat(t);case 12:return s.getDouble(t);case 13:return s.getUint32(t);default:l(`Invalid tiff type ${e}`)}}}class ie extends se{static canHandle(e,t){return 225===e.getUint8(t+1)&&1165519206===e.getUint32(t+4)&&0===e.getUint16(t+8)}async parse(){this.parseHeader();let{options:e}=this;return e.ifd0.enabled&&await this.parseIfd0Block(),e.exif.enabled&&await this.safeParse("parseExifBlock"),e.gps.enabled&&await this.safeParse("parseGpsBlock"),e.interop.enabled&&await this.safeParse("parseInteropBlock"),e.ifd1.enabled&&await this.safeParse("parseThumbnailBlock"),this.createOutput()}safeParse(e){let t=this[e]();return void 0!==t.catch&&(t=t.catch(this.handleError)),t}findIfd0Offset(){void 0===this.ifd0Offset&&(this.ifd0Offset=this.chunk.getUint32(4))}findIfd1Offset(){if(void 0===this.ifd1Offset){this.findIfd0Offset();let e=this.chunk.getUint16(this.ifd0Offset),t=this.ifd0Offset+2+12*e;this.ifd1Offset=this.chunk.getUint32(t)}}parseBlock(e,t){let s=new Map;return this[t]=s,this.parseTags(e,t,s),s}async parseIfd0Block(){if(this.ifd0)return;let{file:e}=this;this.findIfd0Offset(),this.ifd0Offset<8&&l("Malformed EXIF data"),!e.chunked&&this.ifd0Offset>e.byteLength&&l(`IFD0 offset points to outside of file.\nthis.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`),e.tiff&&await e.ensureChunk(this.ifd0Offset,o(this.options));let t=this.parseBlock(this.ifd0Offset,"ifd0");return 0!==t.size?(this.exifOffset=t.get(34665),this.interopOffset=t.get(40965),this.gpsOffset=t.get(34853),this.xmp=t.get(700),this.iptc=t.get(33723),this.icc=t.get(34675),this.options.sanitize&&(t.delete(34665),t.delete(40965),t.delete(34853),t.delete(700),t.delete(33723),t.delete(34675)),t):void 0}async parseExifBlock(){if(this.exif)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.exifOffset)return;this.file.tiff&&await this.file.ensureChunk(this.exifOffset,o(this.options));let e=this.parseBlock(this.exifOffset,"exif");return this.interopOffset||(this.interopOffset=e.get(40965)),this.makerNote=e.get(37500),this.userComment=e.get(37510),this.options.sanitize&&(e.delete(40965),e.delete(37500),e.delete(37510)),this.unpack(e,41728),this.unpack(e,41729),e}unpack(e,t){let s=e.get(t);s&&1===s.length&&e.set(t,s[0])}async parseGpsBlock(){if(this.gps)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.gpsOffset)return;let e=this.parseBlock(this.gpsOffset,"gps");return e&&e.has(2)&&e.has(4)&&(e.set("latitude",ne(...e.get(2),e.get(1))),e.set("longitude",ne(...e.get(4),e.get(3)))),e}async parseInteropBlock(){if(!this.interop&&(this.ifd0||await this.parseIfd0Block(),void 0!==this.interopOffset||this.exif||await this.parseExifBlock(),void 0!==this.interopOffset))return this.parseBlock(this.interopOffset,"interop")}async parseThumbnailBlock(e=!1){if(!this.ifd1&&!this.ifd1Parsed&&(!this.options.mergeOutput||e))return this.findIfd1Offset(),this.ifd1Offset>0&&(this.parseBlock(this.ifd1Offset,"ifd1"),this.ifd1Parsed=!0),this.ifd1}async extractThumbnail(){if(this.headerParsed||this.parseHeader(),this.ifd1Parsed||await this.parseThumbnailBlock(!0),void 0===this.ifd1)return;let e=this.ifd1.get(513),t=this.ifd1.get(514);return this.chunk.getUint8Array(e,t)}get image(){return this.ifd0}get thumbnail(){return this.ifd1}createOutput(){let e,t,s,i={};for(t of P)if(e=this[t],!f(e))if(s=this.canTranslate?this.translateBlock(e,t):Object.fromEntries(e),this.options.mergeOutput){if("ifd1"===t)continue;Object.assign(i,s)}else i[t]=s;return this.makerNote&&(i.makerNote=this.makerNote),this.userComment&&(i.userComment=this.userComment),i}assignToOutput(e,t){if(this.globalOptions.mergeOutput)Object.assign(e,t);else for(let[s,i]of Object.entries(t))this.assignObjectToOutput(e,s,i)}}function ne(e,t,s,i){var n=e+t/60+s/3600;return"S"!==i&&"W"!==i||(n*=-1),n}e(ie,"type","tiff"),e(ie,"headerLength",10),y.set("tiff",ie);var re=Object.freeze({__proto__:null,default:G,Exifr:H,fileParsers:m,segmentParsers:y,fileReaders:b,tagKeys:B,tagValues:V,tagRevivers:I,createDictionary:x,extendDictionary:C,fetchUrlAsArrayBuffer:S,readBlobAsArrayBuffer:A,chunkedProps:L,otherSegments:T,segments:z,tiffBlocks:P,segmentsAndBlocks:F,tiffExtractables:j,inheritables:E,allFormatters:M,Options:R,parse:Y});const ae={ifd0:!1,ifd1:!1,exif:!1,gps:!1,interop:!1,sanitize:!1,reviveValues:!0,translateKeys:!1,translateValues:!1,mergeOutput:!1},he=Object.assign({},ae,{firstChunkSize:4e4,gps:[1,2,3,4]});async function fe(e){let t=new H(he);await t.read(e);let s=await t.parse();if(s&&s.gps){let{latitude:e,longitude:t}=s.gps;return{latitude:e,longitude:t}}}const le=Object.assign({},ae,{tiff:!1,ifd1:!0,mergeOutput:!1});async function oe(e){let t=new H(le);await t.read(e);let s=await t.extractThumbnail();return s&&a?r.from(s):s}async function ue(e){let t=await this.thumbnail(e);if(void 0!==t){let e=new Blob([t]);return URL.createObjectURL(e)}}const de=Object.assign({},ae,{firstChunkSize:4e4,ifd0:[274]});async function ce(e){let t=new H(de);await t.read(e);let s=await t.parse();if(s&&s.ifd0)return s.ifd0[274]}const pe=Object.freeze({1:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:0,rad:0},2:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:0,rad:0},3:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:180,rad:180*Math.PI/180},4:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:180,rad:180*Math.PI/180},5:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:90,rad:90*Math.PI/180},6:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:90,rad:90*Math.PI/180},7:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:270,rad:270*Math.PI/180},8:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:270,rad:270*Math.PI/180}});let ge=!0,me=!0;if("object"==typeof navigator){let e=navigator.userAgent;if(e.includes("iPad")||e.includes("iPhone")){let t=e.match(/OS (\d+)_(\d+)/);if(t){let[,e,s]=t,i=Number(e)+.1*Number(s);ge=i<13.4,me=!1}}else if(e.includes("OS X 10")){let[,t]=e.match(/OS X 10[_.](\d+)/);ge=me=Number(t)<15}if(e.includes("Chrome/")){let[,t]=e.match(/Chrome\/(\d+)/);ge=me=Number(t)<81}else if(e.includes("Firefox/")){let[,t]=e.match(/Firefox\/(\d+)/);ge=me=Number(t)<77}}async function ye(e){let t=await ce(e);return Object.assign({canvas:ge,css:me},pe[t])}class be extends c{constructor(...t){super(...t),e(this,"ranges",new we),0!==this.byteLength&&this.ranges.add(0,this.byteLength)}_tryExtend(e,t,s){if(0===e&&0===this.byteLength&&s){let e=new DataView(s.buffer||s,s.byteOffset,s.byteLength);this._swapDataView(e)}else{let s=e+t;if(s>this.byteLength){let{dataView:e}=this._extend(s);this._swapDataView(e)}}}_extend(e){let t;t=a?r.allocUnsafe(e):new Uint8Array(e);let s=new DataView(t.buffer,t.byteOffset,t.byteLength);return t.set(new Uint8Array(this.buffer,this.byteOffset,this.byteLength),0),{uintView:t,dataView:s}}subarray(e,t,s=!1){return t=t||this._lengthToEnd(e),s&&this._tryExtend(e,t),this.ranges.add(e,t),super.subarray(e,t)}set(e,t,s=!1){s&&this._tryExtend(t,e.byteLength,e);let i=super.set(e,t);return this.ranges.add(t,i.byteLength),i}async ensureChunk(e,t){this.chunked&&(this.ranges.available(e,t)||await this.readChunk(e,t))}available(e,t){return this.ranges.available(e,t)}}class we{constructor(){e(this,"list",[])}get length(){return this.list.length}add(e,t,s=0){let i=e+t,n=this.list.filter((t=>ke(e,t.offset,i)||ke(e,t.end,i)));if(n.length>0){e=Math.min(e,...n.map((e=>e.offset))),i=Math.max(i,...n.map((e=>e.end))),t=i-e;let s=n.shift();s.offset=e,s.length=t,s.end=i,this.list=this.list.filter((e=>!n.includes(e)))}else this.list.push({offset:e,length:t,end:i})}available(e,t){let s=e+t;return this.list.some((t=>t.offset<=e&&s<=t.end))}}function ke(e,t,s){return e<=t&&t<=s}class Oe extends be{constructor(t,s){super(0),e(this,"chunksRead",0),this.input=t,this.options=s}async readWhole(){this.chunked=!1,await this.readChunk(this.nextChunkOffset)}async readChunked(){this.chunked=!0,await this.readChunk(0,this.options.firstChunkSize)}async readNextChunk(e=this.nextChunkOffset){if(this.fullyRead)return this.chunksRead++,!1;let t=this.options.chunkSize,s=await this.readChunk(e,t);return!!s&&s.byteLength===t}async readChunk(e,t){if(this.chunksRead++,0!==(t=this.safeWrapAddress(e,t)))return this._readChunk(e,t)}safeWrapAddress(e,t){return void 0!==this.size&&e+t>this.size?Math.max(0,this.size-e):t}get nextChunkOffset(){if(0!==this.ranges.list.length)return this.ranges.list[0].length}get canReadNextChunk(){return this.chunksRead<this.options.chunkLimit}get fullyRead(){return void 0!==this.size&&this.nextChunkOffset===this.size}read(){return this.options.chunked?this.readChunked():this.readWhole()}close(){}}b.set("blob",class extends Oe{async readWhole(){this.chunked=!1;let e=await A(this.input);this._swapArrayBuffer(e)}readChunked(){return this.chunked=!0,this.size=this.input.size,super.readChunked()}async _readChunk(e,t){let s=t?e+t:void 0,i=this.input.slice(e,s),n=await A(i);return this.set(n,e,!0)}});export default re;export{H as Exifr,R as Options,M as allFormatters,L as chunkedProps,x as createDictionary,C as extendDictionary,S as fetchUrlAsArrayBuffer,m as fileParsers,b as fileReaders,fe as gps,he as gpsOnlyOptions,E as inheritables,ce as orientation,de as orientationOnlyOptions,T as otherSegments,Y as parse,A as readBlobAsArrayBuffer,ge as rotateCanvas,me as rotateCss,ye as rotation,pe as rotations,y as segmentParsers,z as segments,F as segmentsAndBlocks,B as tagKeys,I as tagRevivers,V as tagValues,oe as thumbnail,le as thumbnailOnlyOptions,ue as thumbnailUrl,P as tiffBlocks,j as tiffExtractables};
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$thumbnail$generator$lib__localeExports = (function (exports) {
 	var _default = {
	  strings: {
	    generatingThumbnails: 'Generating thumbnails...'
	  }
	
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $$uppy__thumbnail$generatorExports = (function (exports) {
 	const { UIPlugin } = $$uppy__coreExports;
	const { default: dataURItoBlob } = $$uppy$utils$lib__dataURItoBlobExports;;
	const { default: isObjectURL } = $$uppy$utils$lib__isObjectURLExports;;
	const { default: isPreviewSupported } = $$uppy$utils$lib__isPreviewSupportedExports;;
	const { rotation } = $exifr$dist__miniesmExports;
	const { default: locale } = $$uppy$thumbnail$generator$lib__localeExports;;
	const packageJson = {
	  "version": "3.0.6"
	};
	/**
	 * Save a <canvas> element's content to a Blob object.
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @returns {Promise}
	 */
	function canvasToBlob(canvas, type, quality) {
	  try {
	    canvas.getContext('2d').getImageData(0, 0, 1, 1);
	  } catch (err) {
	    if (err.code === 18) {
	      return Promise.reject(new Error('cannot read image, probably an svg with external resources'));
	    }
	  }
	  if (canvas.toBlob) {
	    return new Promise(resolve => {
	      canvas.toBlob(resolve, type, quality);
	    }).then(blob => {
	      if (blob === null) {
	        throw new Error('cannot read image, probably an svg with external resources');
	      }
	      return blob;
	    });
	  }
	  return Promise.resolve().then(() => {
	    return dataURItoBlob(canvas.toDataURL(type, quality), {});
	  }).then(blob => {
	    if (blob === null) {
	      throw new Error('could not extract blob, probably an old browser');
	    }
	    return blob;
	  });
	}
	function rotateImage(image, translate) {
	  let w = image.width;
	  let h = image.height;
	  if (translate.deg === 90 || translate.deg === 270) {
	    w = image.height;
	    h = image.width;
	  }
	  const canvas = document.createElement('canvas');
	  canvas.width = w;
	  canvas.height = h;
	  const context = canvas.getContext('2d');
	  context.translate(w / 2, h / 2);
	  if (translate.canvas) {
	    context.rotate(translate.rad);
	    context.scale(translate.scaleX, translate.scaleY);
	  }
	  context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
	  return canvas;
	}
	
	/**
	 * Make sure the image doesn’t exceed browser/device canvas limits.
	 * For ios with 256 RAM and ie
	 */
	function protect(image) {
	  // https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
	
	  const ratio = image.width / image.height;
	  const maxSquare = 5000000; // ios max canvas square
	  const maxSize = 4096; // ie max canvas dimensions
	
	  let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
	  let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
	  if (maxW > maxSize) {
	    maxW = maxSize;
	    maxH = Math.round(maxW / ratio);
	  }
	  if (maxH > maxSize) {
	    maxH = maxSize;
	    maxW = Math.round(ratio * maxH);
	  }
	  if (image.width > maxW) {
	    const canvas = document.createElement('canvas');
	    canvas.width = maxW;
	    canvas.height = maxH;
	    canvas.getContext('2d').drawImage(image, 0, 0, maxW, maxH);
	    return canvas;
	  }
	  return image;
	}
	
	/**
	 * The Thumbnail Generator plugin
	 */
	
	class ThumbnailGenerator extends UIPlugin {
	  constructor(uppy, opts) {
	    super(uppy, opts);
	    this.onFileAdded = file => {
	      if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
	        this.addToQueue(file.id);
	      }
	    };
	    /**
	     * Cancel a lazy request for a thumbnail if the thumbnail has not yet been generated.
	     */
	    this.onCancelRequest = file => {
	      const index = this.queue.indexOf(file.id);
	      if (index !== -1) {
	        this.queue.splice(index, 1);
	      }
	    };
	    /**
	     * Clean up the thumbnail for a file. Cancel lazy requests and free the thumbnail URL.
	     */
	    this.onFileRemoved = file => {
	      const index = this.queue.indexOf(file.id);
	      if (index !== -1) {
	        this.queue.splice(index, 1);
	      }
	
	      // Clean up object URLs.
	      if (file.preview && isObjectURL(file.preview)) {
	        URL.revokeObjectURL(file.preview);
	      }
	    };
	    this.onRestored = () => {
	      const restoredFiles = this.uppy.getFiles().filter(file => file.isRestored);
	      restoredFiles.forEach(file => {
	        // Only add blob URLs; they are likely invalid after being restored.
	        if (!file.preview || isObjectURL(file.preview)) {
	          this.addToQueue(file.id);
	        }
	      });
	    };
	    this.onAllFilesRemoved = () => {
	      this.queue = [];
	    };
	    this.waitUntilAllProcessed = fileIDs => {
	      fileIDs.forEach(fileID => {
	        const file = this.uppy.getFile(fileID);
	        this.uppy.emit('preprocess-progress', file, {
	          mode: 'indeterminate',
	          message: this.i18n('generatingThumbnails')
	        });
	      });
	      const emitPreprocessCompleteForAll = () => {
	        fileIDs.forEach(fileID => {
	          const file = this.uppy.getFile(fileID);
	          this.uppy.emit('preprocess-complete', file);
	        });
	      };
	      return new Promise(resolve => {
	        if (this.queueProcessing) {
	          this.uppy.once('thumbnail:all-generated', () => {
	            emitPreprocessCompleteForAll();
	            resolve();
	          });
	        } else {
	          emitPreprocessCompleteForAll();
	          resolve();
	        }
	      });
	    };
	    this.type = 'modifier';
	    this.id = this.opts.id || 'ThumbnailGenerator';
	    this.title = 'Thumbnail Generator';
	    this.queue = [];
	    this.queueProcessing = false;
	    this.defaultThumbnailDimension = 200;
	    this.thumbnailType = this.opts.thumbnailType || 'image/jpeg';
	    this.defaultLocale = locale;
	    const defaultOptions = {
	      thumbnailWidth: null,
	      thumbnailHeight: null,
	      waitForThumbnailsBeforeUpload: false,
	      lazy: false
	    };
	    this.opts = {
	      ...defaultOptions,
	      ...opts
	    };
	    this.i18nInit();
	    if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
	      throw new Error('ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.');
	    }
	  }
	
	  /**
	   * Create a thumbnail for the given Uppy file object.
	   *
	   * @param {{data: Blob}} file
	   * @param {number} targetWidth
	   * @param {number} targetHeight
	   * @returns {Promise}
	   */
	  createThumbnail(file, targetWidth, targetHeight) {
	    const originalUrl = URL.createObjectURL(file.data);
	    const onload = new Promise((resolve, reject) => {
	      const image = new Image();
	      image.src = originalUrl;
	      image.addEventListener('load', () => {
	        URL.revokeObjectURL(originalUrl);
	        resolve(image);
	      });
	      image.addEventListener('error', event => {
	        URL.revokeObjectURL(originalUrl);
	        reject(event.error || new Error('Could not create thumbnail'));
	      });
	    });
	    const orientationPromise = rotation(file.data).catch(() => 1);
	    return Promise.all([onload, orientationPromise]).then(_ref => {
	      let [image, orientation] = _ref;
	      const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
	      const rotatedImage = rotateImage(image, orientation);
	      const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
	      return canvasToBlob(resizedImage, this.thumbnailType, 80);
	    }).then(blob => {
	      return URL.createObjectURL(blob);
	    });
	  }
	
	  /**
	   * Get the new calculated dimensions for the given image and a target width
	   * or height. If both width and height are given, only width is taken into
	   * account. If neither width nor height are given, the default dimension
	   * is used.
	   */
	  getProportionalDimensions(img, width, height, rotation) {
	    // eslint-disable-line no-shadow
	    let aspect = img.width / img.height;
	    if (rotation === 90 || rotation === 270) {
	      aspect = img.height / img.width;
	    }
	    if (width != null) {
	      return {
	        width,
	        height: Math.round(width / aspect)
	      };
	    }
	    if (height != null) {
	      return {
	        width: Math.round(height * aspect),
	        height
	      };
	    }
	    return {
	      width: this.defaultThumbnailDimension,
	      height: Math.round(this.defaultThumbnailDimension / aspect)
	    };
	  }
	
	  /**
	   * Resize an image to the target `width` and `height`.
	   *
	   * Returns a Canvas with the resized image on it.
	   */
	  // eslint-disable-next-line class-methods-use-this
	  resizeImage(image, targetWidth, targetHeight) {
	    // Resizing in steps refactored to use a solution from
	    // https://blog.uploadcare.com/image-resize-in-browsers-is-broken-e38eed08df01
	
	    let img = protect(image);
	    let steps = Math.ceil(Math.log2(img.width / targetWidth));
	    if (steps < 1) {
	      steps = 1;
	    }
	    let sW = targetWidth * 2 ** (steps - 1);
	    let sH = targetHeight * 2 ** (steps - 1);
	    const x = 2;
	    while (steps--) {
	      const canvas = document.createElement('canvas');
	      canvas.width = sW;
	      canvas.height = sH;
	      canvas.getContext('2d').drawImage(img, 0, 0, sW, sH);
	      img = canvas;
	      sW = Math.round(sW / x);
	      sH = Math.round(sH / x);
	    }
	    return img;
	  }
	
	  /**
	   * Set the preview URL for a file.
	   */
	  setPreviewURL(fileID, preview) {
	    this.uppy.setFileState(fileID, {
	      preview
	    });
	  }
	  addToQueue(item) {
	    this.queue.push(item);
	    if (this.queueProcessing === false) {
	      this.processQueue();
	    }
	  }
	  processQueue() {
	    this.queueProcessing = true;
	    if (this.queue.length > 0) {
	      const current = this.uppy.getFile(this.queue.shift());
	      if (!current) {
	        this.uppy.log('[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug', 'error');
	        return Promise.resolve();
	      }
	      return this.requestThumbnail(current).catch(() => {}) // eslint-disable-line node/handle-callback-err
	      .then(() => this.processQueue());
	    }
	    this.queueProcessing = false;
	    this.uppy.log('[ThumbnailGenerator] Emptied thumbnail queue');
	    this.uppy.emit('thumbnail:all-generated');
	    return Promise.resolve();
	  }
	  requestThumbnail(file) {
	    if (isPreviewSupported(file.type) && !file.isRemote) {
	      return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then(preview => {
	        this.setPreviewURL(file.id, preview);
	        this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
	        this.uppy.emit('thumbnail:generated', this.uppy.getFile(file.id), preview);
	      }).catch(err => {
	        this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, 'warning');
	        this.uppy.log(err, 'warning');
	        this.uppy.emit('thumbnail:error', this.uppy.getFile(file.id), err);
	      });
	    }
	    return Promise.resolve();
	  }
	  install() {
	    this.uppy.on('file-removed', this.onFileRemoved);
	    this.uppy.on('cancel-all', this.onAllFilesRemoved);
	    if (this.opts.lazy) {
	      this.uppy.on('thumbnail:request', this.onFileAdded);
	      this.uppy.on('thumbnail:cancel', this.onCancelRequest);
	    } else {
	      this.uppy.on('file-added', this.onFileAdded);
	      this.uppy.on('restored', this.onRestored);
	    }
	    if (this.opts.waitForThumbnailsBeforeUpload) {
	      this.uppy.addPreProcessor(this.waitUntilAllProcessed);
	    }
	  }
	  uninstall() {
	    this.uppy.off('file-removed', this.onFileRemoved);
	    this.uppy.off('cancel-all', this.onAllFilesRemoved);
	    if (this.opts.lazy) {
	      this.uppy.off('thumbnail:request', this.onFileAdded);
	      this.uppy.off('thumbnail:cancel', this.onCancelRequest);
	    } else {
	      this.uppy.off('file-added', this.onFileAdded);
	      this.uppy.off('restored', this.onRestored);
	    }
	    if (this.opts.waitForThumbnailsBeforeUpload) {
	      this.uppy.removePreProcessor(this.waitUntilAllProcessed);
	    }
	  }
	}
	ThumbnailGenerator.VERSION = packageJson.version;
	
	exports = { default:  ThumbnailGenerator };
	
	return exports 
})({})

const $$uppy$utils$lib__findAllDOMElementsExports = (function (exports) {
 	const { default: isDOMElement } = $$uppy$utils$lib__isDOMElementExports;;
	
	/**
	 * Find one or more DOM elements.
	 */
	function findAllDOMElements(element) {
	  if (typeof element === 'string') {
	    const elements = document.querySelectorAll(element);
	    return elements.length === 0 ? null : Array.from(elements);
	  }
	  if (typeof element === 'object' && isDOMElement(element)) {
	    return [element];
	  }
	  return null;
	}
	
	exports = { default:  findAllDOMElements };
	
	return exports 
})({})

const $$uppy$utils$lib__toArrayExports = (function (exports) {
 	/**
	 * Converts list into array
	 */
	Array.from;
	
	exports = { default: Array };
	
	return exports 
})({})

const $$uppy$utils$lib$getDroppedFiles$utils$webkitGetAsEntryApi__getFilesAndDirectoriesFromDirectoryExports = (function (exports) {
 	/**
	 * Recursive function, calls the original callback() when the directory is entirely parsed.
	 */
	function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
	  let {
	    onSuccess
	  } = _ref;
	  directoryReader.readEntries(entries => {
	    const newEntries = [...oldEntries, ...entries];
	    // According to the FileSystem API spec, getFilesAndDirectoriesFromDirectory()
	    // must be called until it calls the onSuccess with an empty array.
	    if (entries.length) {
	      queueMicrotask(() => {
	        getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
	          onSuccess
	        });
	      });
	      // Done iterating this particular directory
	    } else {
	      onSuccess(newEntries);
	    }
	  },
	  // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
	  error => {
	    logDropError(error);
	    onSuccess(oldEntries);
	  });
	}
	
	exports = { default:  getFilesAndDirectoriesFromDirectory };
	
	return exports 
})({})

const $$uppy$utils$lib$getDroppedFiles$utils$webkitGetAsEntryApi__indexExports = (function (exports) {
 	const { default: getFilesAndDirectoriesFromDirectory } = $$uppy$utils$lib$getDroppedFiles$utils$webkitGetAsEntryApi__getFilesAndDirectoriesFromDirectoryExports;;
	/**
	 * Polyfill for the new (experimental) getAsFileSystemHandle API (using the popular webkitGetAsEntry behind the scenes)
	 * so that we can switch to the getAsFileSystemHandle API once it (hopefully) becomes standard
	 */
	function getAsFileSystemHandleFromEntry(entry, logDropError) {
	  if (entry == null) return entry;
	  return {
	    // eslint-disable-next-line no-nested-ternary
	    kind: entry.isFile ? 'file' : entry.isDirectory ? 'directory' : undefined,
	    name: entry.name,
	    getFile() {
	      return new Promise((resolve, reject) => entry.file(resolve, reject));
	    },
	    async *values() {
	      // If the file is a directory.
	      const directoryReader = entry.createReader();
	      const entries = await new Promise(resolve => {
	        getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
	          onSuccess: dirEntries => resolve(dirEntries.map(
	          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	          file => getAsFileSystemHandleFromEntry(file, logDropError)))
	        });
	      });
	      yield* entries;
	    },
	    isSameEntry: undefined
	  };
	}
	function createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile) {
	  try {
	    if (lastResortFile === void 0) {
	      lastResortFile = undefined;
	    }
	    return async function* () {
	      const getNextRelativePath = () => `${relativePath}/${entry.name}`;
	
	      // For each dropped item, - make sure it's a file/directory, and start deepening in!
	      if (entry.kind === 'file') {
	        const file = await entry.getFile();
	        if (file != null) {
	          ;
	          file.relativePath = relativePath ? getNextRelativePath() : null;
	          yield file;
	        } else if (lastResortFile != null) yield lastResortFile;
	      } else if (entry.kind === 'directory') {
	        for await (const handle of entry.values()) {
	          // Recurse on the directory, appending the dir name to the relative path
	          yield* createPromiseToAddFileOrParseDirectory(handle, relativePath ? getNextRelativePath() : entry.name);
	        }
	      } else if (lastResortFile != null) yield lastResortFile;
	    }();
	  } catch (e) {
	    return Promise.reject(e);
	  }
	}
	
	/**
	 * Load all files from data transfer, and recursively read any directories.
	 * Note that IE is not supported for drag-drop, because IE doesn't support Data Transfers
	 *
	 * @param {DataTransfer} dataTransfer
	 * @param {*} logDropError on error
	 */
	async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
	  // Retrieving the dropped items must happen synchronously
	  // otherwise only the first item gets treated and the other ones are garbage collected.
	  // https://github.com/transloadit/uppy/pull/3998
	  const fileSystemHandles = await Promise.all(Array.from(dataTransfer.items, async item => {
	    var _fileSystemHandle;
	    let fileSystemHandle;
	
	    // TODO enable getAsFileSystemHandle API once we can get it working with subdirectories
	    // IMPORTANT: Need to check isSecureContext *before* calling getAsFileSystemHandle
	    // or else Chrome will crash when running in HTTP: https://github.com/transloadit/uppy/issues/4133
	    // if (window.isSecureContext && item.getAsFileSystemHandle != null)
	    // fileSystemHandle = await item.getAsFileSystemHandle()
	
	    // `webkitGetAsEntry` exists in all popular browsers (including non-WebKit browsers),
	    // however it may be renamed to getAsEntry() in the future, so you should code defensively, looking for both.
	    // from https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
	    const getAsEntry = () => typeof item.getAsEntry === 'function' ? item.getAsEntry() : item.webkitGetAsEntry();
	    // eslint-disable-next-line prefer-const
	    (_fileSystemHandle = fileSystemHandle) != null ? _fileSystemHandle : fileSystemHandle = getAsFileSystemHandleFromEntry(getAsEntry(), logDropError);
	    return {
	      fileSystemHandle,
	      lastResortFile: item.getAsFile() // can be used as a fallback in case other methods fail
	    };
	  }));
	
	  for (const {
	    lastResortFile,
	    fileSystemHandle
	  } of fileSystemHandles) {
	    // fileSystemHandle and lastResortFile can be null when we drop an url.
	    if (fileSystemHandle != null) {
	      try {
	        yield* createPromiseToAddFileOrParseDirectory(fileSystemHandle, '', lastResortFile);
	      } catch (err) {
	        // Example: If dropping a symbolic link, Chromium will throw:
	        // "DOMException: A requested file or directory could not be found at the time an operation was processed.",
	        // So we will use lastResortFile instead. See https://github.com/transloadit/uppy/issues/3505.
	        if (lastResortFile != null) {
	          yield lastResortFile;
	        } else {
	          logDropError(err);
	        }
	      }
	    } else if (lastResortFile != null) yield lastResortFile;
	  }
	}
	
	exports = { default: async };
	
	return exports 
})({})

const $$uppy$utils$lib$getDroppedFiles$utils__fallbackApiExports = (function (exports) {
 	const { default: toArray } = $$uppy$utils$lib__toArrayExports;;
	
	// .files fallback, should be implemented in any browser
	function fallbackApi(dataTransfer) {
	  const files = toArray(dataTransfer.files);
	  return Promise.resolve(files);
	}
	
	exports = { default:  fallbackApi };
	
	return exports 
})({})

const $$uppy$utils$lib__getDroppedFilesExports = (function (exports) {
 	const { default: webkitGetAsEntryApi } = $$uppy$utils$lib$getDroppedFiles$utils$webkitGetAsEntryApi__indexExports;;
	const { default: fallbackApi } = $$uppy$utils$lib$getDroppedFiles$utils__fallbackApiExports;;
	
	/**
	 * Returns a promise that resolves to the array of dropped files (if a folder is
	 * dropped, and browser supports folder parsing - promise resolves to the flat
	 * array of all files in all directories).
	 * Each file has .relativePath prop appended to it (e.g. "/docs/Prague/ticket_from_prague_to_ufa.pdf")
	 * if browser supports it. Otherwise it's undefined.
	 *
	 * @param dataTransfer
	 * @param options
	 * @param options.logDropError - a function that's called every time some
	 * folder or some file error out (e.g. because of the folder name being too long
	 * on Windows). Notice that resulting promise will always be resolved anyway.
	 *
	 * @returns {Promise} - Array<File>
	 */
	async function getDroppedFiles(dataTransfer, options) {
	  var _options$logDropError;
	  // Get all files from all subdirs. Works (at least) in Chrome, Mozilla, and Safari
	  const logDropError = (_options$logDropError = options == null ? void 0 : options.logDropError) != null ? _options$logDropError : Function.prototype;
	  try {
	    const accumulator = [];
	    for await (const file of webkitGetAsEntryApi(dataTransfer, logDropError)) {
	      accumulator.push(file);
	    }
	    return accumulator;
	    // Otherwise just return all first-order files
	  } catch {
	    return fallbackApi(dataTransfer);
	  }
	}
	
	exports = { default: async };
	
	return exports 
})({})

const $__eventemitter3Exports = (function (exports) {
 	'use strict';
	
	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';
	
	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}
	
	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);
	
	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}
	
	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }
	
	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;
	
	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];
	
	  return emitter;
	}
	
	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}
	
	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;
	
	  if (this._eventsCount === 0) return names;
	
	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];
	
	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];
	
	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];
	
	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};
	
	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};
	
	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};
	
	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }
	
	  var listeners = this._events[evt];
	
	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }
	
	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;
	
	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;
	
	//
	// Expose the module.
	//
	if ('undefined' !== typeof module) {
	  module.exports = EventEmitter;
	}
	
	exports = {  };
	
	return exports 
})({})

const $p$queue$dist__lower$boundExports = (function (exports) {
 	// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
	// Used to compute insertion index to keep queue sorted after insertion
	function lowerBound(array, value, comparator) {
	    let first = 0;
	    let count = array.length;
	    while (count > 0) {
	        const step = Math.trunc(count / 2);
	        let it = first + step;
	        if (comparator(array[it], value) <= 0) {
	            first = ++it;
	            count -= step + 1;
	        }
	        else {
	            count = step;
	        }
	    }
	    return first;
	}
	
	exports = { default:  lowerBound };
	
	return exports 
})({})

const $p$queue$dist__priority$queueExports = (function (exports) {
 	var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var _PriorityQueue_queue;
	const { default: lowerBound } = $p$queue$dist__lower$boundExports;;
	class PriorityQueue {
	    constructor() {
	        _PriorityQueue_queue.set(this, []);
	    }
	    enqueue(run, options) {
	        options = {
	            priority: 0,
	            ...options,
	        };
	        const element = {
	            priority: options.priority,
	            run,
	        };
	        if (this.size && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[this.size - 1].priority >= options.priority) {
	            __classPrivateFieldGet(this, _PriorityQueue_queue, "f").push(element);
	            return;
	        }
	        const index = lowerBound(__classPrivateFieldGet(this, _PriorityQueue_queue, "f"), element, (a, b) => b.priority - a.priority);
	        __classPrivateFieldGet(this, _PriorityQueue_queue, "f").splice(index, 0, element);
	    }
	    dequeue() {
	        const item = __classPrivateFieldGet(this, _PriorityQueue_queue, "f").shift();
	        return item === null || item === void 0 ? void 0 : item.run;
	    }
	    filter(options) {
	        return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").filter((element) => element.priority === options.priority).map((element) => element.run);
	    }
	    get size() {
	        return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length;
	    }
	}
	_PriorityQueue_queue = new WeakMap();
	
	exports = { default: PriorityQueue };
	
	return exports 
})({})

const $__p$queueExports = (function (exports) {
 	var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
	    if (kind === "m") throw new TypeError("Private method is not writable");
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	};
	var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var _PQueue_instances, _PQueue_carryoverConcurrencyCount, _PQueue_isIntervalIgnored, _PQueue_intervalCount, _PQueue_intervalCap, _PQueue_interval, _PQueue_intervalEnd, _PQueue_intervalId, _PQueue_timeoutId, _PQueue_queue, _PQueue_queueClass, _PQueue_pending, _PQueue_concurrency, _PQueue_isPaused, _PQueue_throwOnTimeout, _PQueue_doesIntervalAllowAnother_get, _PQueue_doesConcurrentAllowAnother_get, _PQueue_next, _PQueue_onResumeInterval, _PQueue_isIntervalPaused_get, _PQueue_tryToStartAnother, _PQueue_initializeIntervalIfNeeded, _PQueue_onInterval, _PQueue_processQueue, _PQueue_throwOnAbort, _PQueue_onEvent;
	const { EventEmitter } = $__eventemitter3Exports;
	import pTimeout, { TimeoutError } from 'p-timeout';
	const { default: PriorityQueue } = $p$queue$dist__priority$queueExports;;
	/**
	The error thrown by `queue.add()` when a job is aborted before it is run. See `signal`.
	*/
	class AbortError extends Error {
	}
	/**
	Promise queue with concurrency control.
	*/
	class PQueue extends EventEmitter {
	    // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
	    constructor(options) {
	        var _a, _b, _c, _d;
	        super();
	        _PQueue_instances.add(this);
	        _PQueue_carryoverConcurrencyCount.set(this, void 0);
	        _PQueue_isIntervalIgnored.set(this, void 0);
	        _PQueue_intervalCount.set(this, 0);
	        _PQueue_intervalCap.set(this, void 0);
	        _PQueue_interval.set(this, void 0);
	        _PQueue_intervalEnd.set(this, 0);
	        _PQueue_intervalId.set(this, void 0);
	        _PQueue_timeoutId.set(this, void 0);
	        _PQueue_queue.set(this, void 0);
	        _PQueue_queueClass.set(this, void 0);
	        _PQueue_pending.set(this, 0);
	        // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
	        _PQueue_concurrency.set(this, void 0);
	        _PQueue_isPaused.set(this, void 0);
	        _PQueue_throwOnTimeout.set(this, void 0);
	        /**
	        Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
	    
	        Applies to each future operation.
	        */
	        Object.defineProperty(this, "timeout", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: void 0
	        });
	        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	        options = {
	            carryoverConcurrencyCount: false,
	            intervalCap: Number.POSITIVE_INFINITY,
	            interval: 0,
	            concurrency: Number.POSITIVE_INFINITY,
	            autoStart: true,
	            queueClass: PriorityQueue,
	            ...options,
	        };
	        if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
	            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ''}\` (${typeof options.intervalCap})`);
	        }
	        if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
	            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ''}\` (${typeof options.interval})`);
	        }
	        __classPrivateFieldSet(this, _PQueue_carryoverConcurrencyCount, options.carryoverConcurrencyCount, "f");
	        __classPrivateFieldSet(this, _PQueue_isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0, "f");
	        __classPrivateFieldSet(this, _PQueue_intervalCap, options.intervalCap, "f");
	        __classPrivateFieldSet(this, _PQueue_interval, options.interval, "f");
	        __classPrivateFieldSet(this, _PQueue_queue, new options.queueClass(), "f");
	        __classPrivateFieldSet(this, _PQueue_queueClass, options.queueClass, "f");
	        this.concurrency = options.concurrency;
	        this.timeout = options.timeout;
	        __classPrivateFieldSet(this, _PQueue_throwOnTimeout, options.throwOnTimeout === true, "f");
	        __classPrivateFieldSet(this, _PQueue_isPaused, options.autoStart === false, "f");
	    }
	    get concurrency() {
	        return __classPrivateFieldGet(this, _PQueue_concurrency, "f");
	    }
	    set concurrency(newConcurrency) {
	        if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
	            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
	        }
	        __classPrivateFieldSet(this, _PQueue_concurrency, newConcurrency, "f");
	        __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
	    }
	    async add(function_, options = {}) {
	        options = {
	            timeout: this.timeout,
	            throwOnTimeout: __classPrivateFieldGet(this, _PQueue_throwOnTimeout, "f"),
	            ...options,
	        };
	        return new Promise((resolve, reject) => {
	            __classPrivateFieldGet(this, _PQueue_queue, "f").enqueue(async () => {
	                var _a;
	                var _b, _c;
	                __classPrivateFieldSet(this, _PQueue_pending, (_b = __classPrivateFieldGet(this, _PQueue_pending, "f"), _b++, _b), "f");
	                __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
	                try {
	                    // TODO: Use options.signal?.throwIfAborted() when targeting Node.js 18
	                    if ((_a = options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
	                        // TODO: Use ABORT_ERR code when targeting Node.js 16 (https://nodejs.org/docs/latest-v16.x/api/errors.html#abort_err)
	                        throw new AbortError('The task was aborted.');
	                    }
	                    let operation = function_({ signal: options.signal });
	                    if (options.timeout) {
	                        operation = pTimeout(Promise.resolve(operation), options.timeout);
	                    }
	                    if (options.signal) {
	                        operation = Promise.race([operation, __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_throwOnAbort).call(this, options.signal)]);
	                    }
	                    const result = await operation;
	                    resolve(result);
	                    this.emit('completed', result);
	                }
	                catch (error) {
	                    if (error instanceof TimeoutError && !options.throwOnTimeout) {
	                        resolve();
	                        return;
	                    }
	                    reject(error);
	                    this.emit('error', error);
	                }
	                finally {
	                    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_next).call(this);
	                }
	            }, options);
	            this.emit('add');
	            __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
	        });
	    }
	    async addAll(functions, options) {
	        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
	    }
	    /**
	    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
	    */
	    start() {
	        if (!__classPrivateFieldGet(this, _PQueue_isPaused, "f")) {
	            return this;
	        }
	        __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
	        __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
	        return this;
	    }
	    /**
	    Put queue execution on hold.
	    */
	    pause() {
	        __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
	    }
	    /**
	    Clear the queue.
	    */
	    clear() {
	        __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet(this, _PQueue_queueClass, "f"))(), "f");
	    }
	    /**
	    Can be called multiple times. Useful if you for example add additional items at a later time.
	
	    @returns A promise that settles when the queue becomes empty.
	    */
	    async onEmpty() {
	        // Instantly resolve if the queue is empty
	        if (__classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
	            return;
	        }
	        await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, 'empty');
	    }
	    /**
	    @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
	
	    If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
	
	    Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
	    */
	    async onSizeLessThan(limit) {
	        // Instantly resolve if the queue is empty.
	        if (__classPrivateFieldGet(this, _PQueue_queue, "f").size < limit) {
	            return;
	        }
	        await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, 'next', () => __classPrivateFieldGet(this, _PQueue_queue, "f").size < limit);
	    }
	    /**
	    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
	
	    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
	    */
	    async onIdle() {
	        // Instantly resolve if none pending and if nothing else is queued
	        if (__classPrivateFieldGet(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
	            return;
	        }
	        await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, 'idle');
	    }
	    /**
	    Size of the queue, the number of queued items waiting to run.
	    */
	    get size() {
	        return __classPrivateFieldGet(this, _PQueue_queue, "f").size;
	    }
	    /**
	    Size of the queue, filtered by the given options.
	
	    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
	    */
	    sizeBy(options) {
	        // eslint-disable-next-line unicorn/no-array-callback-reference
	        return __classPrivateFieldGet(this, _PQueue_queue, "f").filter(options).length;
	    }
	    /**
	    Number of running items (no longer in the queue).
	    */
	    get pending() {
	        return __classPrivateFieldGet(this, _PQueue_pending, "f");
	    }
	    /**
	    Whether the queue is currently paused.
	    */
	    get isPaused() {
	        return __classPrivateFieldGet(this, _PQueue_isPaused, "f");
	    }
	}
	_PQueue_carryoverConcurrencyCount = new WeakMap(), _PQueue_isIntervalIgnored = new WeakMap(), _PQueue_intervalCount = new WeakMap(), _PQueue_intervalCap = new WeakMap(), _PQueue_interval = new WeakMap(), _PQueue_intervalEnd = new WeakMap(), _PQueue_intervalId = new WeakMap(), _PQueue_timeoutId = new WeakMap(), _PQueue_queue = new WeakMap(), _PQueue_queueClass = new WeakMap(), _PQueue_pending = new WeakMap(), _PQueue_concurrency = new WeakMap(), _PQueue_isPaused = new WeakMap(), _PQueue_throwOnTimeout = new WeakMap(), _PQueue_instances = new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get() {
	    return __classPrivateFieldGet(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet(this, _PQueue_intervalCap, "f");
	}, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get() {
	    return __classPrivateFieldGet(this, _PQueue_pending, "f") < __classPrivateFieldGet(this, _PQueue_concurrency, "f");
	}, _PQueue_next = function _PQueue_next() {
	    var _a;
	    __classPrivateFieldSet(this, _PQueue_pending, (_a = __classPrivateFieldGet(this, _PQueue_pending, "f"), _a--, _a), "f");
	    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
	    this.emit('next');
	}, _PQueue_onResumeInterval = function _PQueue_onResumeInterval() {
	    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
	    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
	    __classPrivateFieldSet(this, _PQueue_timeoutId, undefined, "f");
	}, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get() {
	    const now = Date.now();
	    if (__classPrivateFieldGet(this, _PQueue_intervalId, "f") === undefined) {
	        const delay = __classPrivateFieldGet(this, _PQueue_intervalEnd, "f") - now;
	        if (delay < 0) {
	            // Act as the interval was done
	            // We don't need to resume it here because it will be resumed on line 160
	            __classPrivateFieldSet(this, _PQueue_intervalCount, (__classPrivateFieldGet(this, _PQueue_carryoverConcurrencyCount, "f")) ? __classPrivateFieldGet(this, _PQueue_pending, "f") : 0, "f");
	        }
	        else {
	            // Act as the interval is pending
	            if (__classPrivateFieldGet(this, _PQueue_timeoutId, "f") === undefined) {
	                __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
	                    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
	                }, delay), "f");
	            }
	            return true;
	        }
	    }
	    return false;
	}, _PQueue_tryToStartAnother = function _PQueue_tryToStartAnother() {
	    if (__classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
	        // We can clear the interval ("pause")
	        // Because we can redo it later ("resume")
	        if (__classPrivateFieldGet(this, _PQueue_intervalId, "f")) {
	            clearInterval(__classPrivateFieldGet(this, _PQueue_intervalId, "f"));
	        }
	        __classPrivateFieldSet(this, _PQueue_intervalId, undefined, "f");
	        this.emit('empty');
	        if (__classPrivateFieldGet(this, _PQueue_pending, "f") === 0) {
	            this.emit('idle');
	        }
	        return false;
	    }
	    if (!__classPrivateFieldGet(this, _PQueue_isPaused, "f")) {
	        const canInitializeInterval = !__classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_isIntervalPaused_get);
	        if (__classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_doesIntervalAllowAnother_get) && __classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_doesConcurrentAllowAnother_get)) {
	            const job = __classPrivateFieldGet(this, _PQueue_queue, "f").dequeue();
	            if (!job) {
	                return false;
	            }
	            this.emit('active');
	            job();
	            if (canInitializeInterval) {
	                __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
	            }
	            return true;
	        }
	    }
	    return false;
	}, _PQueue_initializeIntervalIfNeeded = function _PQueue_initializeIntervalIfNeeded() {
	    if (__classPrivateFieldGet(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet(this, _PQueue_intervalId, "f") !== undefined) {
	        return;
	    }
	    __classPrivateFieldSet(this, _PQueue_intervalId, setInterval(() => {
	        __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
	    }, __classPrivateFieldGet(this, _PQueue_interval, "f")), "f");
	    __classPrivateFieldSet(this, _PQueue_intervalEnd, Date.now() + __classPrivateFieldGet(this, _PQueue_interval, "f"), "f");
	}, _PQueue_onInterval = function _PQueue_onInterval() {
	    if (__classPrivateFieldGet(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet(this, _PQueue_intervalId, "f")) {
	        clearInterval(__classPrivateFieldGet(this, _PQueue_intervalId, "f"));
	        __classPrivateFieldSet(this, _PQueue_intervalId, undefined, "f");
	    }
	    __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet(this, _PQueue_pending, "f") : 0, "f");
	    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
	}, _PQueue_processQueue = function _PQueue_processQueue() {
	    // eslint-disable-next-line no-empty
	    while (__classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) { }
	}, _PQueue_throwOnAbort = async function _PQueue_throwOnAbort(signal) {
	    return new Promise((_resolve, reject) => {
	        signal.addEventListener('abort', () => {
	            // TODO: Reject with signal.throwIfAborted() when targeting Node.js 18
	            // TODO: Use ABORT_ERR code when targeting Node.js 16 (https://nodejs.org/docs/latest-v16.x/api/errors.html#abort_err)
	            reject(new AbortError('The task was aborted.'));
	        }, { once: true });
	    });
	}, _PQueue_onEvent = async function _PQueue_onEvent(event, filter) {
	    return new Promise(resolve => {
	        const listener = () => {
	            if (filter && !filter()) {
	                return;
	            }
	            this.off(event, listener);
	            resolve();
	        };
	        this.on(event, listener);
	    });
	};
	
	exports = { AbortError, default: PQueue };
	
	return exports 
})({})

const $$uppy$provider$views$lib$ProviderView__AuthViewExports = (function (exports) {
 	const { h } = $__preactExports;
	function GoogleIcon() {
	  return h("svg", {
	    width: "26",
	    height: "26",
	    viewBox: "0 0 26 26",
	    xmlns: "http://www.w3.org/2000/svg"
	  }, h("g", {
	    fill: "none",
	    "fill-rule": "evenodd"
	  }, h("circle", {
	    fill: "#FFF",
	    cx: "13",
	    cy: "13",
	    r: "13"
	  }), h("path", {
	    d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
	    fill: "#4285F4",
	    "fill-rule": "nonzero"
	  }), h("path", {
	    d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
	    fill: "#34A853",
	    "fill-rule": "nonzero"
	  }), h("path", {
	    d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
	    fill: "#FBBC05",
	    "fill-rule": "nonzero"
	  }), h("path", {
	    d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
	    fill: "#EA4335",
	    "fill-rule": "nonzero"
	  }), h("path", {
	    d: "M4 4h18v18H4z"
	  })));
	}
	function AuthView(props) {
	  const {
	    pluginName,
	    pluginIcon,
	    i18nArray,
	    handleAuth
	  } = props;
	  // In order to comply with Google's brand we need to create a different button
	  // for the Google Drive plugin
	  const isGoogleDrive = pluginName === 'Google Drive';
	  const pluginNameComponent = h("span", {
	    className: "uppy-Provider-authTitleName"
	  }, pluginName, h("br", null));
	  return h("div", {
	    className: "uppy-Provider-auth"
	  }, h("div", {
	    className: "uppy-Provider-authIcon"
	  }, pluginIcon()), h("div", {
	    className: "uppy-Provider-authTitle"
	  }, i18nArray('authenticateWithTitle', {
	    pluginName: pluginNameComponent
	  })), isGoogleDrive ? h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
	    onClick: handleAuth,
	    "data-uppy-super-focusable": true
	  }, h(GoogleIcon, null), i18nArray('signInWithGoogle')) : h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
	    onClick: handleAuth,
	    "data-uppy-super-focusable": true
	  }, i18nArray('authenticateWith', {
	    pluginName
	  })));
	}
	
	exports = { default: AuthView };
	
	return exports 
})({})

const $$uppy$provider$views$lib$ProviderView__UserExports = (function (exports) {
 	const { h } = $__preactExports;
	(_ref => {
	  let {
	    i18n,
	    logout,
	    username
	  } = _ref;
	  return [h("span", {
	    className: "uppy-ProviderBrowser-user",
	    key: "username"
	  }, username), h("button", {
	    type: "button",
	    onClick: logout,
	    className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
	    key: "logout"
	  }, i18n('logOut'))];
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$provider$views$lib__BreadcrumbsExports = (function (exports) {
 	const { h, Fragment } = $__preactExports;
	const Breadcrumb = props => {
	  const {
	    getFolder,
	    title,
	    isLast
	  } = props;
	  return h(Fragment, null, h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn",
	    onClick: getFolder
	  }, title), !isLast ? ' / ' : '');
	};
	(props => {
	  const {
	    getFolder,
	    title,
	    breadcrumbsIcon,
	    breadcrumbs
	  } = props;
	  return h("div", {
	    className: "uppy-Provider-breadcrumbs"
	  }, h("div", {
	    className: "uppy-Provider-breadcrumbsIcon"
	  }, breadcrumbsIcon), breadcrumbs.map((directory, i) => h(Breadcrumb, {
	    key: directory.id,
	    getFolder: () => getFolder(directory.requestPath),
	    title: i === 0 ? title : directory.name,
	    isLast: i + 1 === breadcrumbs.length
	  })));
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$provider$views$lib$ProviderView__HeaderExports = (function (exports) {
 	const { default: User } = $$uppy$provider$views$lib$ProviderView__UserExports;;
	const { default: Breadcrumbs } = $$uppy$provider$views$lib$ProviderView__BreadcrumbsExports;;
	(props => {
	  const components = [];
	  if (props.showBreadcrumbs) {
	    components.push(Breadcrumbs({
	      getFolder: props.getFolder,
	      breadcrumbs: props.breadcrumbs,
	      breadcrumbsIcon: props.pluginIcon && props.pluginIcon(),
	      title: props.title
	    }));
	  }
	  components.push(User({
	    logout: props.logout,
	    username: props.username,
	    i18n: props.i18n
	  }));
	  return components;
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$utils$lib__remoteFileObjToLocalExports = (function (exports) {
 	const { default: getFileNameAndExtension } = $$uppy$utils$lib__getFileNameAndExtensionExports;;
	function remoteFileObjToLocal(file) {
	  return {
	    ...file,
	    type: file.mimeType,
	    extension: file.name ? getFileNameAndExtension(file.name).extension : null
	  };
	}
	
	exports = { default:  remoteFileObjToLocal };
	
	return exports 
})({})

const $preact__hooksExports = (function (exports) {
 	import{options as n}from"preact";var t,r,u,i,o=0,f=[],c=[],e=n.__b,a=n.__r,v=n.diffed,l=n.__c,m=n.unmount;function d(t,u){n.__h&&n.__h(r,t,o||u),o=0;var i=r.__H||(r.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:c}),i.__[t]}function h(n){return o=1,s(B,n)}function s(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):B(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function p(u,i){var o=d(t++,3);!n.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__H.__h.push(o))}function y(u,i){var o=d(t++,4);!n.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__h.push(o))}function _(n){return o=5,F(function(){return{current:n}},[])}function A(n,t,r){o=6,y(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n))}function F(n,r){var u=d(t++,7);return z(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function T(n,t){return o=8,F(function(){return n},t)}function q(n){var u=r.context[n.__c],i=d(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function x(t,r){n.useDebugValue&&n.useDebugValue(r?r(t):t)}function P(n){var u=d(t++,10),i=h();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function V(){var n=d(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++}return n.__}function b(){for(var t;t=f.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(k),t.__H.__h.forEach(w),t.__H.__h=[]}catch(r){t.__H.__h=[],n.__e(r,t.__v)}}n.__b=function(n){r=null,e&&e(n)},n.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0})):(i.__h.forEach(k),i.__h.forEach(w),i.__h=[],t=0)),u=r},n.diffed=function(t){v&&v(t);var o=t.__c;o&&o.__H&&(o.__H.__h.length&&(1!==f.push(o)&&i===n.requestAnimationFrame||((i=n.requestAnimationFrame)||j)(b)),o.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c})),u=r=null},n.__c=function(t,r){r.some(function(t){try{t.__h.forEach(k),t.__h=t.__h.filter(function(n){return!n.__||w(n)})}catch(u){r.some(function(n){n.__h&&(n.__h=[])}),r=[],n.__e(u,t.__v)}}),l&&l(t,r)},n.unmount=function(t){m&&m(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{k(n)}catch(n){r=n}}),u.__H=void 0,r&&n.__e(r,u.__v))};var g="function"==typeof requestAnimationFrame;function j(n){var t,r=function(){clearTimeout(u),g&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);g&&(t=requestAnimationFrame(r))}function k(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t}function w(n){var t=r;n.__c=n.__(),r=t}function z(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function B(n,t){return"function"==typeof t?t(n):t}export{T as useCallback,q as useContext,x as useDebugValue,p as useEffect,P as useErrorBoundary,V as useId,A as useImperativeHandle,y as useLayoutEffect,F as useMemo,s as useReducer,_ as useRef,h as useState};
	//# sourceMappingURL=hooks.module.js.map
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$utils$lib__VirtualListExports = (function (exports) {
 	function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
	/**
	 * Adapted from preact-virtual-list: https://github.com/developit/preact-virtual-list
	 *
	 * © 2016 Jason Miller
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 *
	 * Adaptations:
	 * - Added role=presentation to helper elements
	 * - Tweaked styles for Uppy's Dashboard use case
	 */
	
	const { h, Component } = $__preactExports;
	const STYLE_INNER = {
	  position: 'relative',
	  // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
	  // and this additional property would hide things that we want to show.
	  //
	  // overflow: 'hidden',
	  width: '100%',
	  minHeight: '100%'
	};
	const STYLE_CONTENT = {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  // Because the `top` value gets set to some offset, this `height` being 100% would make the scrollbar
	  // stretch far beyond the content. For our use case, the content div actually can get its height from
	  // the elements inside it, so we don't need to specify a `height` property at all.
	  //
	  // height: '100%',
	  width: '100%',
	  overflow: 'visible'
	};
	class VirtualList extends Component {
	  constructor(props) {
	    super(props);
	
	    // The currently focused node, used to retain focus when the visible rows change.
	    // To avoid update loops, this should not cause state updates, so it's kept as a plain property.
	    this.handleScroll = () => {
	      this.setState({
	        offset: this.base.scrollTop
	      });
	    };
	    this.handleResize = () => {
	      this.resize();
	    };
	    this.focusElement = null;
	    this.state = {
	      offset: 0,
	      height: 0
	    };
	  }
	  componentDidMount() {
	    this.resize();
	    window.addEventListener('resize', this.handleResize);
	  }
	
	  // TODO: refactor to stable lifecycle method
	  // eslint-disable-next-line
	  componentWillUpdate() {
	    if (this.base.contains(document.activeElement)) {
	      this.focusElement = document.activeElement;
	    }
	  }
	  componentDidUpdate() {
	    // Maintain focus when rows are added and removed.
	    if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
	      this.focusElement.focus();
	    }
	    this.focusElement = null;
	    this.resize();
	  }
	  componentWillUnmount() {
	    window.removeEventListener('resize', this.handleResize);
	  }
	  resize() {
	    const {
	      height
	    } = this.state;
	    if (height !== this.base.offsetHeight) {
	      this.setState({
	        height: this.base.offsetHeight
	      });
	    }
	  }
	  render(_ref) {
	    let {
	      data,
	      rowHeight,
	      renderRow,
	      overscanCount = 10,
	      ...props
	    } = _ref;
	    const {
	      offset,
	      height
	    } = this.state;
	    // first visible row index
	    let start = Math.floor(offset / rowHeight);
	
	    // actual number of visible rows (without overscan)
	    let visibleRowCount = Math.floor(height / rowHeight);
	
	    // Overscan: render blocks of rows modulo an overscan row count
	    // This dramatically reduces DOM writes during scrolling
	    if (overscanCount) {
	      start = Math.max(0, start - start % overscanCount);
	      visibleRowCount += overscanCount;
	    }
	
	    // last visible + overscan row index + padding to allow keyboard focus to travel past the visible area
	    const end = start + visibleRowCount + 4;
	
	    // data slice currently in viewport plus overscan items
	    const selection = data.slice(start, end);
	    const styleInner = {
	      ...STYLE_INNER,
	      height: data.length * rowHeight
	    };
	    const styleContent = {
	      ...STYLE_CONTENT,
	      top: start * rowHeight
	    };
	
	    // The `role="presentation"` attributes ensure that these wrapper elements are not treated as list
	    // items by accessibility and outline tools.
	    return (
	      // eslint-disable-next-line react/jsx-props-no-spreading
	      h("div", _extends({
	        onScroll: this.handleScroll
	      }, props), h("div", {
	        role: "presentation",
	        style: styleInner
	      }, h("div", {
	        role: "presentation",
	        style: styleContent
	      }, selection.map(renderRow))))
	    );
	  }
	}
	
	exports = { default: VirtualList };
	
	return exports 
})({})

const $Exports = (function (exports) {
 	const { h, Fragment } = $__preactExports;
	const { useEffect, useState, useCallback } = $preact__hooksExports;
	const { nanoid } = $nanoid__non$secureExports;
	// import debounce from 'lodash.debounce'
	
	function SearchFilterInput(props) {
	  const {
	    search,
	    searchOnInput,
	    searchTerm,
	    showButton,
	    inputLabel,
	    clearSearchLabel,
	    buttonLabel,
	    clearSearch,
	    inputClassName,
	    buttonCSSClassName
	  } = props;
	  const [searchText, setSearchText] = useState(searchTerm != null ? searchTerm : '');
	  // const debouncedSearch = debounce((q) => search(q), 1000)
	
	  const validateAndSearch = useCallback(ev => {
	    ev.preventDefault();
	    search(searchText);
	  }, [search, searchText]);
	  const handleInput = useCallback(ev => {
	    const inputValue = ev.target.value;
	    setSearchText(inputValue);
	    if (searchOnInput) search(inputValue);
	  }, [setSearchText, searchOnInput, search]);
	  const handleReset = () => {
	    setSearchText('');
	    if (clearSearch) clearSearch();
	  };
	  const [form] = useState(() => {
	    const formEl = document.createElement('form');
	    formEl.setAttribute('tabindex', '-1');
	    formEl.id = nanoid();
	    return formEl;
	  });
	  useEffect(() => {
	    document.body.appendChild(form);
	    form.addEventListener('submit', validateAndSearch);
	    return () => {
	      form.removeEventListener('submit', validateAndSearch);
	      document.body.removeChild(form);
	    };
	  }, [form, validateAndSearch]);
	  return h(Fragment, null, h("input", {
	    className: `uppy-u-reset ${inputClassName}`,
	    type: "search",
	    "aria-label": inputLabel,
	    placeholder: inputLabel,
	    value: searchText,
	    onInput: handleInput,
	    form: form.id,
	    "data-uppy-super-focusable": true
	  }), !showButton && h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    class: "uppy-c-icon uppy-ProviderBrowser-searchFilterIcon",
	    width: "12",
	    height: "12",
	    viewBox: "0 0 12 12"
	  }, h("path", {
	    d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
	  })), !showButton && searchText && h("button", {
	    className: "uppy-u-reset uppy-ProviderBrowser-searchFilterReset",
	    type: "button",
	    "aria-label": clearSearchLabel,
	    title: clearSearchLabel,
	    onClick: handleReset
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    viewBox: "0 0 19 19"
	  }, h("path", {
	    d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
	  }))), showButton && h("button", {
	    className: `uppy-u-reset uppy-c-btn uppy-c-btn-primary ${buttonCSSClassName}`,
	    type: "submit",
	    form: form.id
	  }, buttonLabel));
	}
	
	exports = { default:  SearchFilterInput };
	
	return exports 
})({})

const $$uppy$provider$views$lib$Item$components__ItemIconExports = (function (exports) {
 	const { h } = $__preactExports;
	function FileIcon() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: 11,
	    height: 14.5,
	    viewBox: "0 0 44 58"
	  }, h("path", {
	    d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
	  }));
	}
	function FolderIcon() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    style: {
	      minWidth: 16,
	      marginRight: 3
	    },
	    viewBox: "0 0 276.157 276.157"
	  }, h("path", {
	    d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
	  }));
	}
	function VideoIcon() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    style: {
	      width: 16,
	      marginRight: 4
	    },
	    viewBox: "0 0 58 58"
	  }, h("path", {
	    d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
	  }), h("path", {
	    d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
	  }));
	}
	(props => {
	  const {
	    itemIconString
	  } = props;
	  if (itemIconString === null) return undefined;
	  switch (itemIconString) {
	    case 'file':
	      return h(FileIcon, null);
	    case 'folder':
	      return h(FolderIcon, null);
	    case 'video':
	      return h(VideoIcon, null);
	    default:
	      {
	        const {
	          alt
	        } = props;
	        return h("img", {
	          src: itemIconString,
	          alt: alt,
	          loading: "lazy",
	          width: 16,
	          height: 16
	        });
	      }
	  }
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$provider$views$lib$Item$components__GridLiExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	function GridListItem(props) {
	  const {
	    className,
	    isDisabled,
	    restrictionError,
	    isChecked,
	    title,
	    itemIconEl,
	    showTitles,
	    toggleCheckbox,
	    recordShiftKeyPress,
	    id,
	    children
	  } = props;
	  const checkBoxClassName = classNames('uppy-u-reset', 'uppy-ProviderBrowserItem-checkbox', 'uppy-ProviderBrowserItem-checkbox--grid', {
	    'uppy-ProviderBrowserItem-checkbox--is-checked': isChecked
	  });
	  return h("li", {
	    className: className,
	    title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
	  }, h("input", {
	    type: "checkbox",
	    className: checkBoxClassName,
	    onChange: toggleCheckbox,
	    onKeyDown: recordShiftKeyPress,
	    onMouseDown: recordShiftKeyPress,
	    name: "listitem",
	    id: id,
	    checked: isChecked,
	    disabled: isDisabled,
	    "data-uppy-super-focusable": true
	  }), h("label", {
	    htmlFor: id,
	    "aria-label": title,
	    className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
	  }, itemIconEl, showTitles && title, children));
	}
	
	exports = { default: GridListItem };
	
	return exports 
})({})

const $$uppy$provider$views$lib$Item$components__ListLiExports = (function (exports) {
 	const { h } = $__preactExports;
	
	// if folder:
	//   + checkbox (selects all files from folder)
	//   + folder name (opens folder)
	// if file:
	//   + checkbox (selects file)
	//   + file name (selects file)
	
	function ListItem(props) {
	  const {
	    className,
	    isDisabled,
	    restrictionError,
	    isCheckboxDisabled,
	    isChecked,
	    toggleCheckbox,
	    recordShiftKeyPress,
	    type,
	    id,
	    itemIconEl,
	    title,
	    handleFolderClick,
	    showTitles,
	    i18n
	  } = props;
	  return h("li", {
	    className: className,
	    title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
	  }, !isCheckboxDisabled ? h("input", {
	    type: "checkbox",
	    className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? 'uppy-ProviderBrowserItem-checkbox--is-checked' : ''}`,
	    onChange: toggleCheckbox,
	    onKeyDown: recordShiftKeyPress,
	    onMouseDown: recordShiftKeyPress
	    // for the <label/>
	    ,
	    name: "listitem",
	    id: id,
	    checked: isChecked,
	    "aria-label": type === 'file' ? null : i18n('allFilesFromFolderNamed', {
	      name: title
	    }),
	    disabled: isDisabled,
	    "data-uppy-super-focusable": true
	  }) : null, type === 'file' ?
	  // label for a checkbox
	  h("label", {
	    htmlFor: id,
	    className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
	  }, h("div", {
	    className: "uppy-ProviderBrowserItem-iconWrap"
	  }, itemIconEl), showTitles && title) :
	  // button to open a folder
	  h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
	    onClick: handleFolderClick,
	    "aria-label": i18n('openFolderNamed', {
	      name: title
	    })
	  }, h("div", {
	    className: "uppy-ProviderBrowserItem-iconWrap"
	  }, itemIconEl), showTitles && h("span", null, title)));
	}
	
	exports = { default: ListItem };
	
	return exports 
})({})

const $$uppy$provider$views$lib$Item__indexExports = (function (exports) {
 	function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: ItemIcon } = $$uppy$provider$views$lib$Item$components__ItemIconExports;;
	const { default: GridListItem } = $$uppy$provider$views$lib$Item$components__GridLiExports;;
	const { default: ListItem } = $$uppy$provider$views$lib$Item$components__ListLiExports;;
	(props => {
	  const {
	    author,
	    getItemIcon,
	    isChecked,
	    isDisabled,
	    viewType
	  } = props;
	  const itemIconString = getItemIcon();
	  const className = classNames('uppy-ProviderBrowserItem', {
	    'uppy-ProviderBrowserItem--selected': isChecked
	  }, {
	    'uppy-ProviderBrowserItem--disabled': isDisabled
	  }, {
	    'uppy-ProviderBrowserItem--noPreview': itemIconString === 'video'
	  });
	  const itemIconEl = h(ItemIcon, {
	    itemIconString: itemIconString
	  });
	  switch (viewType) {
	    case 'grid':
	      return h(GridListItem
	      // eslint-disable-next-line react/jsx-props-no-spreading
	      , _extends({}, props, {
	        className: className,
	        itemIconEl: itemIconEl
	      }));
	    case 'list':
	      return (
	        // eslint-disable-next-line react/jsx-props-no-spreading
	        h(ListItem, _extends({}, props, {
	          className: className,
	          itemIconEl: itemIconEl
	        }))
	      );
	    case 'unsplash':
	      return (
	        // eslint-disable-next-line react/jsx-props-no-spreading
	        h(GridListItem, _extends({}, props, {
	          className: className,
	          itemIconEl: itemIconEl
	        }), h("a", {
	          href: `${author.url}?utm_source=Companion&utm_medium=referral`,
	          target: "_blank",
	          rel: "noopener noreferrer",
	          className: "uppy-ProviderBrowserItem-author",
	          tabIndex: "-1"
	        }, author.name))
	      );
	    default:
	      throw new Error(`There is no such type ${viewType}`);
	  }
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$provider$views$lib__BrowserExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: remoteFileObjToLocal } = $$uppy$utils$lib__remoteFileObjToLocalExports;;
	const { useMemo } = $preact__hooksExports;
	const { default: VirtualList } = $$uppy$utils$lib__VirtualListExports;;
	const { default: SearchFilterInput } = $Exports;;
	const { default: FooterActions } = $Exports;;
	const { default: Item } = $$uppy$provider$views$lib$Item__indexExports;;
	const VIRTUAL_SHARED_DIR = 'shared-with-me';
	function ListItem(props) {
	  const {
	    currentSelection,
	    uppyFiles,
	    viewType,
	    isChecked,
	    toggleCheckbox,
	    recordShiftKeyPress,
	    showTitles,
	    i18n,
	    validateRestrictions,
	    getNextFolder,
	    columns,
	    f
	  } = props;
	  if (f.isFolder) {
	    var _isChecked;
	    return Item({
	      columns,
	      showTitles,
	      viewType,
	      i18n,
	      id: f.id,
	      title: f.name,
	      getItemIcon: () => f.icon,
	      isChecked: isChecked(f),
	      toggleCheckbox: event => toggleCheckbox(event, f),
	      recordShiftKeyPress,
	      type: 'folder',
	      isDisabled: (_isChecked = isChecked(f)) == null ? void 0 : _isChecked.loading,
	      isCheckboxDisabled: f.id === VIRTUAL_SHARED_DIR,
	      handleFolderClick: () => getNextFolder(f)
	    });
	  }
	  const restrictionError = validateRestrictions(remoteFileObjToLocal(f), [...uppyFiles, ...currentSelection]);
	  return Item({
	    id: f.id,
	    title: f.name,
	    author: f.author,
	    getItemIcon: () => f.icon,
	    isChecked: isChecked(f),
	    toggleCheckbox: event => toggleCheckbox(event, f),
	    recordShiftKeyPress,
	    columns,
	    showTitles,
	    viewType,
	    i18n,
	    type: 'file',
	    isDisabled: restrictionError && !isChecked(f),
	    restrictionError
	  });
	}
	function Browser(props) {
	  const {
	    currentSelection,
	    folders,
	    files,
	    uppyFiles,
	    viewType,
	    headerComponent,
	    showBreadcrumbs,
	    isChecked,
	    toggleCheckbox,
	    recordShiftKeyPress,
	    handleScroll,
	    showTitles,
	    i18n,
	    validateRestrictions,
	    isLoading,
	    showSearchFilter,
	    search,
	    searchTerm,
	    clearSearch,
	    searchOnInput,
	    searchInputLabel,
	    clearSearchLabel,
	    getNextFolder,
	    cancel,
	    done,
	    columns,
	    noResultsLabel,
	    loadAllFiles
	  } = props;
	  const selected = currentSelection.length;
	  const rows = useMemo(() => [...folders, ...files], [folders, files]);
	  return h("div", {
	    className: classNames('uppy-ProviderBrowser', `uppy-ProviderBrowser-viewType--${viewType}`)
	  }, headerComponent && h("div", {
	    className: "uppy-ProviderBrowser-header"
	  }, h("div", {
	    className: classNames('uppy-ProviderBrowser-headerBar', !showBreadcrumbs && 'uppy-ProviderBrowser-headerBar--simple')
	  }, headerComponent)), showSearchFilter && h("div", {
	    class: "uppy-ProviderBrowser-searchFilter"
	  }, h(SearchFilterInput, {
	    search: search,
	    searchTerm: searchTerm,
	    clearSearch: clearSearch,
	    inputLabel: searchInputLabel,
	    clearSearchLabel: clearSearchLabel,
	    inputClassName: "uppy-ProviderBrowser-searchFilterInput",
	    searchOnInput: searchOnInput
	  })), (() => {
	    if (isLoading) {
	      return h("div", {
	        className: "uppy-Provider-loading"
	      }, h("span", null, i18n('loading')));
	    }
	    if (!folders.length && !files.length) {
	      return h("div", {
	        className: "uppy-Provider-empty"
	      }, noResultsLabel);
	    }
	    if (loadAllFiles) {
	      return h("div", {
	        className: "uppy-ProviderBrowser-body"
	      }, h("ul", {
	        className: "uppy-ProviderBrowser-list"
	      }, h(VirtualList, {
	        data: rows,
	        renderRow: f => h(ListItem, {
	          currentSelection: currentSelection,
	          uppyFiles: uppyFiles,
	          viewType: viewType,
	          isChecked: isChecked,
	          toggleCheckbox: toggleCheckbox,
	          recordShiftKeyPress: recordShiftKeyPress,
	          showTitles: showTitles,
	          i18n: i18n,
	          validateRestrictions: validateRestrictions,
	          getNextFolder: getNextFolder,
	          columns: columns,
	          f: f
	        }),
	        rowHeight: 31
	      })));
	    }
	    return h("div", {
	      className: "uppy-ProviderBrowser-body"
	    }, h("ul", {
	      className: "uppy-ProviderBrowser-list",
	      onScroll: handleScroll,
	      role: "listbox"
	      // making <ul> not focusable for firefox
	      ,
	      tabIndex: "-1"
	    }, rows.map(f => h(ListItem, {
	      currentSelection: currentSelection,
	      uppyFiles: uppyFiles,
	      viewType: viewType,
	      isChecked: isChecked,
	      toggleCheckbox: toggleCheckbox,
	      recordShiftKeyPress: recordShiftKeyPress,
	      showTitles: showTitles,
	      i18n: i18n,
	      validateRestrictions: validateRestrictions,
	      getNextFolder: getNextFolder,
	      columns: columns,
	      f: f
	    }))));
	  })(), selected > 0 && h(FooterActions, {
	    selected: selected,
	    done: done,
	    cancel: cancel,
	    i18n: i18n
	  }));
	}
	
	exports = { default: Browser };
	
	return exports 
})({})

const $$uppy$provider$views$lib__LoaderExports = (function (exports) {
 	const { h } = $__preactExports;
	(_ref => {
	  let {
	    i18n,
	    loading
	  } = _ref;
	  return h("div", {
	    className: "uppy-Provider-loading"
	  }, h("span", null, i18n('loading')), typeof loading === 'string' &&
	  // todo improve this, see discussion in https://github.com/transloadit/uppy/pull/4399#discussion_r1162564445
	  h("span", {
	    style: {
	      marginTop: '.7em'
	    }
	  }, loading));
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$provider$views$lib__CloseWrapperExports = (function (exports) {
 	const { Component, toChildArray } = $__preactExports;
	class CloseWrapper extends Component {
	  componentWillUnmount() {
	    const {
	      onUnmount
	    } = this.props;
	    onUnmount();
	  }
	  render() {
	    const {
	      children
	    } = this.props;
	    return toChildArray(children)[0];
	  }
	}
	
	exports = { default:  CloseWrapper };
	
	return exports 
})({})

const $$uppy$provider$views$lib__ViewExports = (function (exports) {
 	const { default: getFileType } = $$uppy$utils$lib__getFileTypeExports;;
	const { default: isPreviewSupported } = $$uppy$utils$lib__isPreviewSupportedExports;;
	const { default: remoteFileObjToLocal } = $$uppy$utils$lib__remoteFileObjToLocalExports;;
	class View {
	  constructor(plugin, opts) {
	    this.filterItems = items => {
	      const state = this.plugin.getPluginState();
	      if (!state.filterInput || state.filterInput === '') {
	        return items;
	      }
	      return items.filter(folder => {
	        return folder.name.toLowerCase().indexOf(state.filterInput.toLowerCase()) !== -1;
	      });
	    };
	    this.recordShiftKeyPress = e => {
	      this.isShiftKeyPressed = e.shiftKey;
	    };
	    /**
	     * Toggles file/folder checkbox to on/off state while updating files list.
	     *
	     * Note that some extra complexity comes from supporting shift+click to
	     * toggle multiple checkboxes at once, which is done by getting all files
	     * in between last checked file and current one.
	     */
	    this.toggleCheckbox = (e, file) => {
	      e.stopPropagation();
	      e.preventDefault();
	      e.currentTarget.focus();
	      const {
	        folders,
	        files
	      } = this.plugin.getPluginState();
	      const items = this.filterItems(folders.concat(files));
	      // Shift-clicking selects a single consecutive list of items
	      // starting at the previous click.
	      if (this.lastCheckbox && this.isShiftKeyPressed) {
	        const {
	          currentSelection
	        } = this.plugin.getPluginState();
	        const prevIndex = items.indexOf(this.lastCheckbox);
	        const currentIndex = items.indexOf(file);
	        const newSelection = prevIndex < currentIndex ? items.slice(prevIndex, currentIndex + 1) : items.slice(currentIndex, prevIndex + 1);
	        const reducedNewSelection = [];
	
	        // Check restrictions on each file in currentSelection,
	        // reduce it to only contain files that pass restrictions
	        for (const item of newSelection) {
	          const {
	            uppy
	          } = this.plugin;
	          const restrictionError = uppy.validateRestrictions(remoteFileObjToLocal(item), [...uppy.getFiles(), ...reducedNewSelection]);
	          if (!restrictionError) {
	            reducedNewSelection.push(item);
	          } else {
	            uppy.info({
	              message: restrictionError.message
	            }, 'error', uppy.opts.infoTimeout);
	          }
	        }
	        this.plugin.setPluginState({
	          currentSelection: [...new Set([...currentSelection, ...reducedNewSelection])]
	        });
	        return;
	      }
	      this.lastCheckbox = file;
	      const {
	        currentSelection
	      } = this.plugin.getPluginState();
	      if (this.isChecked(file)) {
	        this.plugin.setPluginState({
	          currentSelection: currentSelection.filter(item => item.id !== file.id)
	        });
	      } else {
	        this.plugin.setPluginState({
	          currentSelection: currentSelection.concat([file])
	        });
	      }
	    };
	    this.isChecked = file => {
	      const {
	        currentSelection
	      } = this.plugin.getPluginState();
	      // comparing id instead of the file object, because the reference to the object
	      // changes when we switch folders, and the file list is updated
	      return currentSelection.some(item => item.id === file.id);
	    };
	    this.plugin = plugin;
	    this.provider = opts.provider;
	    this.isHandlingScroll = false;
	    this.preFirstRender = this.preFirstRender.bind(this);
	    this.handleError = this.handleError.bind(this);
	    this.clearSelection = this.clearSelection.bind(this);
	    this.cancelPicking = this.cancelPicking.bind(this);
	  }
	  preFirstRender() {
	    this.plugin.setPluginState({
	      didFirstRender: true
	    });
	    this.plugin.onFirstRender();
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  shouldHandleScroll(event) {
	    const {
	      scrollHeight,
	      scrollTop,
	      offsetHeight
	    } = event.target;
	    const scrollPosition = scrollHeight - (scrollTop + offsetHeight);
	    return scrollPosition < 50 && !this.isHandlingScroll;
	  }
	  clearSelection() {
	    this.plugin.setPluginState({
	      currentSelection: [],
	      filterInput: ''
	    });
	  }
	  cancelPicking() {
	    this.clearSelection();
	    const dashboard = this.plugin.uppy.getPlugin('Dashboard');
	    if (dashboard) {
	      dashboard.hideAllPanels();
	    }
	  }
	  handleError(error) {
	    var _error$cause;
	    const {
	      uppy
	    } = this.plugin;
	    const message = uppy.i18n('companionError');
	    uppy.log(error.toString());
	    if (error.isAuthError || ((_error$cause = error.cause) == null ? void 0 : _error$cause.name) === 'AbortError') {
	      // authError just means we're not authenticated, don't show to user
	      // AbortError means the user has clicked "cancel" on an operation
	      return;
	    }
	    uppy.info({
	      message,
	      details: error.toString()
	    }, 'error', 5000);
	  }
	
	  // todo document what is a "tagFile" or get rid of this concept
	  getTagFile(file) {
	    const tagFile = {
	      id: file.id,
	      source: this.plugin.id,
	      data: file,
	      name: file.name || file.id,
	      type: file.mimeType,
	      isRemote: true,
	      meta: {},
	      body: {
	        fileId: file.id
	      },
	      remote: {
	        companionUrl: this.plugin.opts.companionUrl,
	        url: `${this.provider.fileUrl(file.requestPath)}`,
	        body: {
	          fileId: file.id
	        },
	        providerName: this.provider.name,
	        provider: this.provider.provider
	      }
	    };
	
	    // all properties on this object get saved into the Uppy store.
	    // Some users might serialize their store (for example using JSON.stringify),
	    // or when using Golden Retriever it will serialize state into e.g. localStorage.
	    // However RequestClient is not serializable so we need to prevent it from being serialized.
	    Object.defineProperty(tagFile.remote, 'requestClient', {
	      value: this.provider,
	      enumerable: false
	    });
	    const fileType = getFileType(tagFile);
	
	    // TODO Should we just always use the thumbnail URL if it exists?
	    if (fileType && isPreviewSupported(fileType)) {
	      tagFile.preview = file.thumbnail;
	    }
	    if (file.author) {
	      if (file.author.name != null) tagFile.meta.authorName = String(file.author.name);
	      if (file.author.url) tagFile.meta.authorUrl = file.author.url;
	    }
	
	    // add relativePath similar to non-remote files: https://github.com/transloadit/uppy/pull/4486#issuecomment-1579203717
	    if (file.relDirPath != null) tagFile.meta.relativePath = file.relDirPath ? `${file.relDirPath}/${tagFile.name}` : null;
	    // and absolutePath (with leading slash) https://github.com/transloadit/uppy/pull/4537#issuecomment-1614236655
	    if (file.absDirPath != null) tagFile.meta.absolutePath = file.absDirPath ? `/${file.absDirPath}/${tagFile.name}` : `/${tagFile.name}`;
	    return tagFile;
	  }
	  setLoading(loading) {
	    this.plugin.setPluginState({
	      loading
	    });
	  }
	}
	
	exports = { default:  View };
	
	return exports 
})({})

const $$uppy$provider$views$lib$ProviderView__ProviderViewExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { h } = $__preactExports;
	const { default: PQueue } = $__p$queueExports;;
	const { getSafeFileId } = $$uppy$utils$lib__generateFileIDExports;
	const { default: AuthView } = $$uppy$provider$views$lib$ProviderView__AuthViewExports;;
	const { default: Header } = $$uppy$provider$views$lib$ProviderView__HeaderExports;;
	const { default: Browser } = $$uppy$provider$views$lib$ProviderView__BrowserExports;;
	const { default: LoaderView } = $$uppy$provider$views$lib$ProviderView__LoaderExports;;
	const { default: CloseWrapper } = $$uppy$provider$views$lib$ProviderView__CloseWrapperExports;;
	const { default: View } = $$uppy$provider$views$lib$ProviderView__ViewExports;;
	const packageJson = {
	  "version": "3.7.0"
	};
	function formatBreadcrumbs(breadcrumbs) {
	  return breadcrumbs.slice(1).map(directory => directory.name).join('/');
	}
	function prependPath(path, component) {
	  if (!path) return component;
	  return `${path}/${component}`;
	}
	function defaultPickerIcon() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "30",
	    height: "30",
	    viewBox: "0 0 30 30"
	  }, h("path", {
	    d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
	  }));
	}
	
	/**
	 * Class to easily generate generic views for Provider plugins
	 */
	var _abortController = /*#__PURE__*/_classPrivateFieldLooseKey("abortController");
	var _withAbort = /*#__PURE__*/_classPrivateFieldLooseKey("withAbort");
	var _list = /*#__PURE__*/_classPrivateFieldLooseKey("list");
	var _listFilesAndFolders = /*#__PURE__*/_classPrivateFieldLooseKey("listFilesAndFolders");
	var _recursivelyListAllFiles = /*#__PURE__*/_classPrivateFieldLooseKey("recursivelyListAllFiles");
	class ProviderView extends View {
	  /**
	   * @param {object} plugin instance of the plugin
	   * @param {object} opts
	   */
	  constructor(plugin, opts) {
	    super(plugin, opts);
	    // set default options
	    Object.defineProperty(this, _recursivelyListAllFiles, {
	      value: _recursivelyListAllFiles2
	    });
	    Object.defineProperty(this, _listFilesAndFolders, {
	      value: _listFilesAndFolders2
	    });
	    Object.defineProperty(this, _list, {
	      value: _list2
	    });
	    Object.defineProperty(this, _withAbort, {
	      value: _withAbort2
	    });
	    Object.defineProperty(this, _abortController, {
	      writable: true,
	      value: void 0
	    });
	    const defaultOptions = {
	      viewType: 'list',
	      showTitles: true,
	      showFilter: true,
	      showBreadcrumbs: true,
	      loadAllFiles: false
	    };
	
	    // merge default options with the ones set by user
	    this.opts = {
	      ...defaultOptions,
	      ...opts
	    };
	
	    // Logic
	    this.filterQuery = this.filterQuery.bind(this);
	    this.clearFilter = this.clearFilter.bind(this);
	    this.getFolder = this.getFolder.bind(this);
	    this.getNextFolder = this.getNextFolder.bind(this);
	    this.logout = this.logout.bind(this);
	    this.handleAuth = this.handleAuth.bind(this);
	    this.handleScroll = this.handleScroll.bind(this);
	    this.donePicking = this.donePicking.bind(this);
	
	    // Visual
	    this.render = this.render.bind(this);
	
	    // Set default state for the plugin
	    this.plugin.setPluginState({
	      authenticated: false,
	      files: [],
	      folders: [],
	      breadcrumbs: [],
	      filterInput: '',
	      isSearchVisible: false,
	      currentSelection: []
	    });
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  tearDown() {
	    // Nothing.
	  }
	  /**
	   * Select a folder based on its id: fetches the folder and then updates state with its contents
	   * TODO rename to something better like selectFolder or navigateToFolder (breaking change?)
	   *
	   * @param  {string} requestPath
	   * the path we need to use when sending list request to companion (for some providers it's different from ID)
	   * @param  {string} name used in the UI and to build the absDirPath
	   * @returns {Promise}   Folders/files in folder
	   */
	  async getFolder(requestPath, name) {
	    this.setLoading(true);
	    try {
	      await _classPrivateFieldLooseBase(this, _withAbort)[_withAbort](async signal => {
	        this.lastCheckbox = undefined;
	        let {
	          breadcrumbs
	        } = this.plugin.getPluginState();
	        const index = breadcrumbs.findIndex(dir => requestPath === dir.requestPath);
	        if (index !== -1) {
	          // means we navigated back to a known directory (already in the stack), so cut the stack off there
	          breadcrumbs = breadcrumbs.slice(0, index + 1);
	        } else {
	          // we have navigated into a new (unknown) folder, add it to the stack
	          breadcrumbs = [...breadcrumbs, {
	            requestPath,
	            name
	          }];
	        }
	        this.nextPagePath = requestPath;
	        let files = [];
	        let folders = [];
	        do {
	          const {
	            files: newFiles,
	            folders: newFolders
	          } = await _classPrivateFieldLooseBase(this, _listFilesAndFolders)[_listFilesAndFolders]({
	            breadcrumbs,
	            signal
	          });
	          files = files.concat(newFiles);
	          folders = folders.concat(newFolders);
	          this.setLoading(this.plugin.uppy.i18n('loadedXFiles', {
	            numFiles: files.length + folders.length
	          }));
	        } while (this.opts.loadAllFiles && this.nextPagePath);
	        this.plugin.setPluginState({
	          folders,
	          files,
	          breadcrumbs,
	          filterInput: ''
	        });
	      });
	    } catch (err) {
	      this.handleError(err);
	    } finally {
	      this.setLoading(false);
	    }
	  }
	
	  /**
	   * Fetches new folder
	   *
	   * @param  {object} folder
	   */
	  getNextFolder(folder) {
	    this.getFolder(folder.requestPath, folder.name);
	    this.lastCheckbox = undefined;
	  }
	
	  /**
	   * Removes session token on client side.
	   */
	  async logout() {
	    try {
	      await _classPrivateFieldLooseBase(this, _withAbort)[_withAbort](async signal => {
	        const res = await this.provider.logout({
	          signal
	        });
	        if (res.ok) {
	          if (!res.revoked) {
	            const message = this.plugin.uppy.i18n('companionUnauthorizeHint', {
	              provider: this.plugin.title,
	              url: res.manual_revoke_url
	            });
	            this.plugin.uppy.info(message, 'info', 7000);
	          }
	          const newState = {
	            authenticated: false,
	            files: [],
	            folders: [],
	            breadcrumbs: [],
	            filterInput: ''
	          };
	          this.plugin.setPluginState(newState);
	        }
	      });
	    } catch (err) {
	      this.handleError(err);
	    }
	  }
	  filterQuery(input) {
	    this.plugin.setPluginState({
	      filterInput: input
	    });
	  }
	  clearFilter() {
	    this.plugin.setPluginState({
	      filterInput: ''
	    });
	  }
	  async handleAuth() {
	    const clientVersion = `@uppy/provider-views=${ProviderView.VERSION}`;
	    try {
	      await this.provider.login({
	        uppyVersions: clientVersion
	      });
	      this.plugin.setPluginState({
	        authenticated: true
	      });
	      this.preFirstRender();
	    } catch (e) {
	      this.plugin.uppy.log(`login failed: ${e.message}`);
	    }
	  }
	  async handleScroll(event) {
	    if (this.shouldHandleScroll(event) && this.nextPagePath) {
	      this.isHandlingScroll = true;
	      try {
	        await _classPrivateFieldLooseBase(this, _withAbort)[_withAbort](async signal => {
	          const {
	            files,
	            folders,
	            breadcrumbs
	          } = this.plugin.getPluginState();
	          const {
	            files: newFiles,
	            folders: newFolders
	          } = await _classPrivateFieldLooseBase(this, _listFilesAndFolders)[_listFilesAndFolders]({
	            breadcrumbs,
	            signal
	          });
	          const combinedFiles = files.concat(newFiles);
	          const combinedFolders = folders.concat(newFolders);
	          this.plugin.setPluginState({
	            folders: combinedFolders,
	            files: combinedFiles
	          });
	        });
	      } catch (error) {
	        this.handleError(error);
	      } finally {
	        this.isHandlingScroll = false;
	      }
	    }
	  }
	  async donePicking() {
	    this.setLoading(true);
	    try {
	      await _classPrivateFieldLooseBase(this, _withAbort)[_withAbort](async signal => {
	        const {
	          currentSelection
	        } = this.plugin.getPluginState();
	        const messages = [];
	        const newFiles = [];
	        for (const selectedItem of currentSelection) {
	          const {
	            requestPath
	          } = selectedItem;
	          const withRelDirPath = newItem => ({
	            ...newItem,
	            // calculate the file's path relative to the user's selected item's path
	            // see https://github.com/transloadit/uppy/pull/4537#issuecomment-1614236655
	            relDirPath: newItem.absDirPath.replace(selectedItem.absDirPath, '').replace(/^\//, '')
	          });
	          if (selectedItem.isFolder) {
	            let isEmpty = true;
	            let numNewFiles = 0;
	            const queue = new PQueue({
	              concurrency: 6
	            });
	            const onFiles = files => {
	              for (const newFile of files) {
	                const tagFile = this.getTagFile(newFile);
	                const id = getSafeFileId(tagFile);
	                // If the same folder is added again, we don't want to send
	                // X amount of duplicate file notifications, we want to say
	                // the folder was already added. This checks if all files are duplicate,
	                // if that's the case, we don't add the files.
	                if (!this.plugin.uppy.checkIfFileAlreadyExists(id)) {
	                  newFiles.push(withRelDirPath(newFile));
	                  numNewFiles++;
	                  this.setLoading(this.plugin.uppy.i18n('addedNumFiles', {
	                    numFiles: numNewFiles
	                  }));
	                }
	                isEmpty = false;
	              }
	            };
	            await _classPrivateFieldLooseBase(this, _recursivelyListAllFiles)[_recursivelyListAllFiles]({
	              requestPath,
	              absDirPath: prependPath(selectedItem.absDirPath, selectedItem.name),
	              relDirPath: selectedItem.name,
	              queue,
	              onFiles,
	              signal
	            });
	            await queue.onIdle();
	            let message;
	            if (isEmpty) {
	              message = this.plugin.uppy.i18n('emptyFolderAdded');
	            } else if (numNewFiles === 0) {
	              message = this.plugin.uppy.i18n('folderAlreadyAdded', {
	                folder: selectedItem.name
	              });
	            } else {
	              // TODO we don't really know at this point whether any files were actually added
	              // (only later after addFiles has been called) so we should probably rewrite this.
	              // Example: If all files fail to add due to restriction error, it will still say "Added 100 files from folder"
	              message = this.plugin.uppy.i18n('folderAdded', {
	                smart_count: numNewFiles,
	                folder: selectedItem.name
	              });
	            }
	            messages.push(message);
	          } else {
	            newFiles.push(withRelDirPath(selectedItem));
	          }
	        }
	
	        // Note: this.plugin.uppy.addFiles must be only run once we are done fetching all files,
	        // because it will cause the loading screen to disappear,
	        // and that will allow the user to start the upload, so we need to make sure we have
	        // finished all async operations before we add any file
	        // see https://github.com/transloadit/uppy/pull/4384
	        this.plugin.uppy.log('Adding files from a remote provider');
	        this.plugin.uppy.addFiles(newFiles.map(file => this.getTagFile(file)));
	        this.plugin.setPluginState({
	          filterInput: ''
	        });
	        messages.forEach(message => this.plugin.uppy.info(message));
	        this.clearSelection();
	      });
	    } catch (err) {
	      this.handleError(err);
	    } finally {
	      this.setLoading(false);
	    }
	  }
	  render(state, viewOptions) {
	    var _this = this;
	    if (viewOptions === void 0) {
	      viewOptions = {};
	    }
	    const {
	      authenticated,
	      didFirstRender
	    } = this.plugin.getPluginState();
	    const {
	      i18n
	    } = this.plugin.uppy;
	    if (!didFirstRender) {
	      this.preFirstRender();
	    }
	    const targetViewOptions = {
	      ...this.opts,
	      ...viewOptions
	    };
	    const {
	      files,
	      folders,
	      filterInput,
	      loading,
	      currentSelection
	    } = this.plugin.getPluginState();
	    const {
	      isChecked,
	      toggleCheckbox,
	      recordShiftKeyPress,
	      filterItems
	    } = this;
	    const hasInput = filterInput !== '';
	    const pluginIcon = this.plugin.icon || defaultPickerIcon;
	    const headerProps = {
	      showBreadcrumbs: targetViewOptions.showBreadcrumbs,
	      getFolder: this.getFolder,
	      breadcrumbs: this.plugin.getPluginState().breadcrumbs,
	      pluginIcon,
	      title: this.plugin.title,
	      logout: this.logout,
	      username: this.username,
	      i18n
	    };
	    const browserProps = {
	      isChecked,
	      toggleCheckbox,
	      recordShiftKeyPress,
	      currentSelection,
	      files: hasInput ? filterItems(files) : files,
	      folders: hasInput ? filterItems(folders) : folders,
	      username: this.username,
	      getNextFolder: this.getNextFolder,
	      getFolder: this.getFolder,
	      loadAllFiles: this.opts.loadAllFiles,
	      // For SearchFilterInput component
	      showSearchFilter: targetViewOptions.showFilter,
	      search: this.filterQuery,
	      clearSearch: this.clearFilter,
	      searchTerm: filterInput,
	      searchOnInput: true,
	      searchInputLabel: i18n('filter'),
	      clearSearchLabel: i18n('resetFilter'),
	      noResultsLabel: i18n('noFilesFound'),
	      logout: this.logout,
	      handleScroll: this.handleScroll,
	      done: this.donePicking,
	      cancel: this.cancelPicking,
	      headerComponent: Header(headerProps),
	      title: this.plugin.title,
	      viewType: targetViewOptions.viewType,
	      showTitles: targetViewOptions.showTitles,
	      showBreadcrumbs: targetViewOptions.showBreadcrumbs,
	      pluginIcon,
	      i18n: this.plugin.uppy.i18n,
	      uppyFiles: this.plugin.uppy.getFiles(),
	      validateRestrictions: function () {
	        return _this.plugin.uppy.validateRestrictions(...arguments);
	      }
	    };
	    if (loading) {
	      return h(CloseWrapper, {
	        onUnmount: this.clearSelection
	      }, h(LoaderView, {
	        i18n: this.plugin.uppy.i18n,
	        loading: loading
	      }));
	    }
	    if (!authenticated) {
	      return h(CloseWrapper, {
	        onUnmount: this.clearSelection
	      }, h(AuthView, {
	        pluginName: this.plugin.title,
	        pluginIcon: pluginIcon,
	        handleAuth: this.handleAuth,
	        i18n: this.plugin.uppy.i18n,
	        i18nArray: this.plugin.uppy.i18nArray
	      }));
	    }
	    return h(CloseWrapper, {
	      onUnmount: this.clearSelection
	    }, h(Browser, browserProps));
	  }
	}
	async function _withAbort2(op) {
	  var _classPrivateFieldLoo;
	  // prevent multiple requests in parallel from causing race conditions
	  (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _abortController)[_abortController]) == null ? void 0 : _classPrivateFieldLoo.abort();
	  const abortController = new AbortController();
	  _classPrivateFieldLooseBase(this, _abortController)[_abortController] = abortController;
	  const cancelRequest = () => {
	    abortController.abort();
	    this.clearSelection();
	  };
	  try {
	    this.plugin.uppy.on('dashboard:close-panel', cancelRequest);
	    this.plugin.uppy.on('cancel-all', cancelRequest);
	    await op(abortController.signal);
	  } finally {
	    this.plugin.uppy.off('dashboard:close-panel', cancelRequest);
	    this.plugin.uppy.off('cancel-all', cancelRequest);
	    _classPrivateFieldLooseBase(this, _abortController)[_abortController] = undefined;
	  }
	}
	async function _list2(_ref) {
	  let {
	    requestPath,
	    absDirPath,
	    signal
	  } = _ref;
	  const {
	    username,
	    nextPagePath,
	    items
	  } = await this.provider.list(requestPath, {
	    signal
	  });
	  this.username = username || this.username;
	  return {
	    items: items.map(item => ({
	      ...item,
	      absDirPath
	    })),
	    nextPagePath
	  };
	}
	async function _listFilesAndFolders2(_ref2) {
	  let {
	    breadcrumbs,
	    signal
	  } = _ref2;
	  const absDirPath = formatBreadcrumbs(breadcrumbs);
	  const {
	    items,
	    nextPagePath
	  } = await _classPrivateFieldLooseBase(this, _list)[_list]({
	    requestPath: this.nextPagePath,
	    absDirPath,
	    signal
	  });
	  this.nextPagePath = nextPagePath;
	  const files = [];
	  const folders = [];
	  items.forEach(item => {
	    if (item.isFolder) {
	      folders.push(item);
	    } else {
	      files.push(item);
	    }
	  });
	  return {
	    files,
	    folders
	  };
	}
	async function _recursivelyListAllFiles2(_ref3) {
	  let {
	    requestPath,
	    absDirPath,
	    relDirPath,
	    queue,
	    onFiles,
	    signal
	  } = _ref3;
	  let curPath = requestPath;
	  while (curPath) {
	    const res = await _classPrivateFieldLooseBase(this, _list)[_list]({
	      requestPath: curPath,
	      absDirPath,
	      signal
	    });
	    curPath = res.nextPagePath;
	    const files = res.items.filter(item => !item.isFolder);
	    const folders = res.items.filter(item => item.isFolder);
	    onFiles(files);
	
	    // recursively queue call to self for each folder
	    const promises = folders.map(async folder => queue.add(async () => _classPrivateFieldLooseBase(this, _recursivelyListAllFiles)[_recursivelyListAllFiles]({
	      requestPath: folder.requestPath,
	      absDirPath: prependPath(absDirPath, folder.name),
	      relDirPath: prependPath(relDirPath, folder.name),
	      queue,
	      onFiles,
	      signal
	    })));
	    await Promise.all(promises); // in case we get an error
	  }
	}
	ProviderView.VERSION = packageJson.version;
	
	exports = { defaultPickerIcon, default:  ProviderView };
	
	return exports 
})({})

const $$uppy$provider$views$lib$ProviderView__indexExports = (function (exports) {
 	const { default: __default, _defaultPickerIcon } = $$uppy$provider$views$lib$ProviderView__ProviderViewExports;
	
	const defaultPickerIcon = _defaultPickerIcon;
	
	exports = { defaultPickerIcon, default: _default };
	
	return exports 
})({})

const $$uppy$provider$views$lib$SearchProviderView__SearchProviderViewExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { h } = $__preactExports;
	const { default: SearchFilterInput } = $$uppy$provider$views$lib$SearchProviderView__SearchFilterInputExports;;
	const { default: Browser } = $$uppy$provider$views$lib$SearchProviderView__BrowserExports;;
	const { default: CloseWrapper } = $$uppy$provider$views$lib$SearchProviderView__CloseWrapperExports;;
	const { default: View } = $$uppy$provider$views$lib$SearchProviderView__ViewExports;;
	const packageJson = {
	  "version": "3.7.0"
	};
	/**
	 * SearchProviderView, used for Unsplash and future image search providers.
	 * Extends generic View, shared with regular providers like Google Drive and Instagram.
	 */
	var _updateFilesAndInputMode = /*#__PURE__*/_classPrivateFieldLooseKey("updateFilesAndInputMode");
	class SearchProviderView extends View {
	  /**
	   * @param {object} plugin instance of the plugin
	   * @param {object} opts
	   */
	  constructor(plugin, opts) {
	    super(plugin, opts);
	
	    // set default options
	    Object.defineProperty(this, _updateFilesAndInputMode, {
	      value: _updateFilesAndInputMode2
	    });
	    const defaultOptions = {
	      viewType: 'grid',
	      showTitles: false,
	      showFilter: false,
	      showBreadcrumbs: false
	    };
	
	    // merge default options with the ones set by user
	    this.opts = {
	      ...defaultOptions,
	      ...opts
	    };
	
	    // Logic
	    this.search = this.search.bind(this);
	    this.clearSearch = this.clearSearch.bind(this);
	    this.resetPluginState = this.resetPluginState.bind(this);
	    this.handleScroll = this.handleScroll.bind(this);
	    this.donePicking = this.donePicking.bind(this);
	
	    // Visual
	    this.render = this.render.bind(this);
	    this.defaultState = {
	      isInputMode: true,
	      files: [],
	      folders: [],
	      breadcrumbs: [],
	      filterInput: '',
	      currentSelection: [],
	      searchTerm: null
	    };
	
	    // Set default state for the plugin
	    this.plugin.setPluginState(this.defaultState);
	  }
	
	  // eslint-disable-next-line class-methods-use-this
	  tearDown() {
	    // Nothing.
	  }
	  resetPluginState() {
	    this.plugin.setPluginState(this.defaultState);
	  }
	  async search(query) {
	    const {
	      searchTerm
	    } = this.plugin.getPluginState();
	    if (query && query === searchTerm) {
	      // no need to search again as this is the same as the previous search
	      return;
	    }
	    this.setLoading(true);
	    try {
	      const res = await this.provider.search(query);
	      _classPrivateFieldLooseBase(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](res, []);
	    } catch (err) {
	      this.handleError(err);
	    } finally {
	      this.setLoading(false);
	    }
	  }
	  clearSearch() {
	    this.plugin.setPluginState({
	      currentSelection: [],
	      files: [],
	      searchTerm: null
	    });
	  }
	  async handleScroll(event) {
	    const query = this.nextPageQuery || null;
	    if (this.shouldHandleScroll(event) && query) {
	      this.isHandlingScroll = true;
	      try {
	        const {
	          files,
	          searchTerm
	        } = this.plugin.getPluginState();
	        const response = await this.provider.search(searchTerm, query);
	        _classPrivateFieldLooseBase(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](response, files);
	      } catch (error) {
	        this.handleError(error);
	      } finally {
	        this.isHandlingScroll = false;
	      }
	    }
	  }
	  donePicking() {
	    const {
	      currentSelection
	    } = this.plugin.getPluginState();
	    this.plugin.uppy.log('Adding remote search provider files');
	    this.plugin.uppy.addFiles(currentSelection.map(file => this.getTagFile(file)));
	    this.resetPluginState();
	  }
	  render(state, viewOptions) {
	    var _this = this;
	    if (viewOptions === void 0) {
	      viewOptions = {};
	    }
	    const {
	      didFirstRender,
	      isInputMode,
	      searchTerm
	    } = this.plugin.getPluginState();
	    const {
	      i18n
	    } = this.plugin.uppy;
	    if (!didFirstRender) {
	      this.preFirstRender();
	    }
	    const targetViewOptions = {
	      ...this.opts,
	      ...viewOptions
	    };
	    const {
	      files,
	      folders,
	      filterInput,
	      loading,
	      currentSelection
	    } = this.plugin.getPluginState();
	    const {
	      isChecked,
	      toggleCheckbox,
	      filterItems,
	      recordShiftKeyPress
	    } = this;
	    const hasInput = filterInput !== '';
	    const browserProps = {
	      isChecked,
	      toggleCheckbox,
	      recordShiftKeyPress,
	      currentSelection,
	      files: hasInput ? filterItems(files) : files,
	      folders: hasInput ? filterItems(folders) : folders,
	      handleScroll: this.handleScroll,
	      done: this.donePicking,
	      cancel: this.cancelPicking,
	      // For SearchFilterInput component
	      showSearchFilter: targetViewOptions.showFilter,
	      search: this.search,
	      clearSearch: this.clearSearch,
	      searchTerm,
	      searchOnInput: false,
	      searchInputLabel: i18n('search'),
	      clearSearchLabel: i18n('resetSearch'),
	      noResultsLabel: i18n('noSearchResults'),
	      title: this.plugin.title,
	      viewType: targetViewOptions.viewType,
	      showTitles: targetViewOptions.showTitles,
	      showFilter: targetViewOptions.showFilter,
	      isLoading: loading,
	      showBreadcrumbs: targetViewOptions.showBreadcrumbs,
	      pluginIcon: this.plugin.icon,
	      i18n,
	      uppyFiles: this.plugin.uppy.getFiles(),
	      validateRestrictions: function () {
	        return _this.plugin.uppy.validateRestrictions(...arguments);
	      }
	    };
	    if (isInputMode) {
	      return h(CloseWrapper, {
	        onUnmount: this.resetPluginState
	      }, h("div", {
	        className: "uppy-SearchProvider"
	      }, h(SearchFilterInput, {
	        search: this.search,
	        clearSelection: this.clearSelection,
	        inputLabel: i18n('enterTextToSearch'),
	        buttonLabel: i18n('searchImages'),
	        inputClassName: "uppy-c-textInput uppy-SearchProvider-input",
	        buttonCSSClassName: "uppy-SearchProvider-searchButton",
	        showButton: true
	      })));
	    }
	    return h(CloseWrapper, {
	      onUnmount: this.resetPluginState
	    }, h(Browser, browserProps));
	  }
	}
	function _updateFilesAndInputMode2(res, files) {
	  this.nextPageQuery = res.nextPageQuery;
	  res.items.forEach(item => {
	    files.push(item);
	  });
	  this.plugin.setPluginState({
	    currentSelection: [],
	    isInputMode: false,
	    files,
	    searchTerm: res.searchedFor
	  });
	}
	SearchProviderView.VERSION = packageJson.version;
	
	exports = { default:  SearchProviderView };
	
	return exports 
})({})

const $$uppy$provider$views$lib$SearchProviderView__indexExports = (function (exports) {
 	const { default: __default } = $$uppy$provider$views$lib$SearchProviderView__SearchProviderViewExports;
	;
	
	exports = { default: __default };
	
	return exports 
})({})

const $$uppy__provider$viewsExports = (function (exports) {
 	const { default: _ProviderViews, _defaultPickerIcon } = $$uppy$provider$views$lib$ProviderView__indexExports;
	const ProviderViews = _ProviderViews
	const defaultPickerIcon = _defaultPickerIcon;
	const { default: _SearchProviderViews } = $$uppy$provider$views$lib$SearchProviderView__indexExports;
	const SearchProviderViews = _SearchProviderViews;
	
	exports = { ProviderViews, defaultPickerIcon, SearchProviderViews };
	
	return exports 
})({})

const $__memoize$oneExports = (function (exports) {
 	var safeIsNaN = Number.isNaN ||
	    function ponyfill(value) {
	        return typeof value === 'number' && value !== value;
	    };
	function isEqual(first, second) {
	    if (first === second) {
	        return true;
	    }
	    if (safeIsNaN(first) && safeIsNaN(second)) {
	        return true;
	    }
	    return false;
	}
	function areInputsEqual(newInputs, lastInputs) {
	    if (newInputs.length !== lastInputs.length) {
	        return false;
	    }
	    for (var i = 0; i < newInputs.length; i++) {
	        if (!isEqual(newInputs[i], lastInputs[i])) {
	            return false;
	        }
	    }
	    return true;
	}
	
	function memoizeOne(resultFn, isEqual) {
	    if (isEqual === void 0) { isEqual = areInputsEqual; }
	    var cache = null;
	    function memoized() {
	        var newArgs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            newArgs[_i] = arguments[_i];
	        }
	        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
	            return cache.lastResult;
	        }
	        var lastResult = resultFn.apply(this, newArgs);
	        cache = {
	            lastResult: lastResult,
	            lastArgs: newArgs,
	            lastThis: this,
	        };
	        return lastResult;
	    }
	    memoized.clear = function clear() {
	        cache = null;
	    };
	    return memoized;
	}
	
	{ memoizeOne };
	
	exports = { default: memoizeOne };
	
	return exports 
})({})

const $$uppy$utils$lib__FOCUSABLE_ELEMENTSExports = (function (exports) {
 	['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'input:not([disabled]):not([inert]):not([aria-hidden])', 'select:not([disabled]):not([inert]):not([aria-hidden])', 'textarea:not([disabled]):not([inert]):not([aria-hidden])', 'button:not([disabled]):not([inert]):not([aria-hidden])', 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$dashboard$lib$utils__getActiveOverlayElExports = (function (exports) {
 	/**
	 * @returns {HTMLElement} - either dashboard element, or the overlay that's most on top
	 */
	function getActiveOverlayEl(dashboardEl, activeOverlayType) {
	  if (activeOverlayType) {
	    const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
	    // if an overlay is already mounted
	    if (overlayEl) return overlayEl;
	  }
	  return dashboardEl;
	}
	
	exports = { default:  getActiveOverlayEl };
	
	return exports 
})({})

const $$uppy$dashboard$lib$utils__trapFocusExports = (function (exports) {
 	const { default: toArray } = $$uppy$utils$lib__toArrayExports;;
	const { default: FOCUSABLE_ELEMENTS } = $$uppy$utils$lib__FOCUSABLE_ELEMENTSExports;;
	const { default: getActiveOverlayEl } = $$uppy$dashboard$lib$utils__getActiveOverlayElExports;;
	function focusOnFirstNode(event, nodes) {
	  const node = nodes[0];
	  if (node) {
	    node.focus();
	    event.preventDefault();
	  }
	}
	function focusOnLastNode(event, nodes) {
	  const node = nodes[nodes.length - 1];
	  if (node) {
	    node.focus();
	    event.preventDefault();
	  }
	}
	
	// ___Why not just use (focusedItemIndex === -1)?
	//    Firefox thinks <ul> is focusable, but we don't have <ul>s in our FOCUSABLE_ELEMENTS. Which means that if we tab into
	//    the <ul>, code will think that we are not in the active overlay, and we should focusOnFirstNode() of the currently
	//    active overlay!
	//    [Practical check] if we use (focusedItemIndex === -1), instagram provider in firefox will never get focus on its pics
	//    in the <ul>.
	function isFocusInOverlay(activeOverlayEl) {
	  return activeOverlayEl.contains(document.activeElement);
	}
	function trapFocus(event, activeOverlayType, dashboardEl) {
	  const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
	  const focusableNodes = toArray(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS));
	  const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
	
	  // If we pressed tab, and focus is not yet within the current overlay - focus on
	  // the first element within the current overlay.
	  // This is a safety measure (for when user returns from another tab e.g.), most
	  // plugins will try to focus on some important element as it loads.
	  if (!isFocusInOverlay(activeOverlayEl)) {
	    focusOnFirstNode(event, focusableNodes);
	    // If we pressed shift + tab, and we're on the first element of a modal
	  } else if (event.shiftKey && focusedItemIndex === 0) {
	    focusOnLastNode(event, focusableNodes);
	    // If we pressed tab, and we're on the last element of the modal
	  } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
	    focusOnFirstNode(event, focusableNodes);
	  }
	}
	
	// Traps focus inside of the currently open overlay (e.g. Dashboard, or e.g. Instagram),
	// never lets focus disappear from the modal.
	{ trapFocus };
	
	// Traps focus inside of the currently open overlay, unless overlay is null - then let the user tab away.
	function forInline(event, activeOverlayType, dashboardEl) {
	  // ___When we're in the bare 'Drop files here, paste, browse or import from' screen
	  if (activeOverlayType === null) {
	    // Do nothing and let the browser handle it, user can tab away from Uppy to other elements on the page
	    // ___When there is some overlay with 'Done' button
	  } else {
	    // Trap the focus inside this overlay!
	    // User can close the overlay (click 'Done') if they want to travel away from Uppy.
	    trapFocus(event, activeOverlayType, dashboardEl);
	  }
	}
	
	exports = { forInlineforModal: trapFocus };
	
	return exports 
})({})

const $$uppy$dashboard$lib$utils__createSuperFocusExports = (function (exports) {
 	const { default: debounce } = $lodash__debounceExports;;
	const { default: FOCUSABLE_ELEMENTS } = $$uppy$utils$lib__FOCUSABLE_ELEMENTSExports;;
	const { default: getActiveOverlayEl } = $$uppy$dashboard$lib$utils__getActiveOverlayElExports;;
	
	/*
	  Focuses on some element in the currently topmost overlay.
	
	  1. If there are some [data-uppy-super-focusable] elements rendered already - focuses
	     on the first superfocusable element, and leaves focus up to the control of
	     a user (until currently focused element disappears from the screen [which
	     can happen when overlay changes, or, e.g., when we click on a folder in googledrive]).
	  2. If there are no [data-uppy-super-focusable] elements yet (or ever) - focuses
	     on the first focusable element, but switches focus if superfocusable elements appear on next render.
	*/
	function createSuperFocus() {
	  let lastFocusWasOnSuperFocusableEl = false;
	  const superFocus = (dashboardEl, activeOverlayType) => {
	    const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
	    const isFocusInOverlay = overlayEl.contains(document.activeElement);
	    // If focus is already in the topmost overlay, AND on last update we focused on the superfocusable
	    // element - then leave focus up to the user.
	    // [Practical check] without this line, typing in the search input in googledrive overlay won't work.
	    if (isFocusInOverlay && lastFocusWasOnSuperFocusableEl) return;
	    const superFocusableEl = overlayEl.querySelector('[data-uppy-super-focusable]');
	    // If we are already in the topmost overlay, AND there are no super focusable elements yet, - leave focus up to the user.
	    // [Practical check] without this line, if you are in an empty folder in google drive, and something's uploading in the
	    // bg, - focus will be jumping to Done all the time.
	    if (isFocusInOverlay && !superFocusableEl) return;
	    if (superFocusableEl) {
	      superFocusableEl.focus({
	        preventScroll: true
	      });
	      lastFocusWasOnSuperFocusableEl = true;
	    } else {
	      const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS);
	      firstEl == null ? void 0 : firstEl.focus({
	        preventScroll: true
	      });
	      lastFocusWasOnSuperFocusableEl = false;
	    }
	  };
	
	  // ___Why do we need to debounce?
	  //    1. To deal with animations: overlay changes via animations, which results in the DOM updating AFTER plugin.update()
	  //       already executed.
	  //    [Practical check] without debounce, if we open the Url overlay, and click 'Done', Dashboard won't get focused again.
	  //    [Practical check] if we delay 250ms instead of 260ms - IE11 won't get focused in same situation.
	  //    2. Performance: there can be many state update()s in a second, and this function is called every time.
	  return debounce(superFocus, 260);
	}
	
	exports = { default:  createSuperFocus };
	
	return exports 
})({})

const $$uppy$utils$lib__isDragDropSupportedExports = (function (exports) {
 	/**
	 * Checks if the browser supports Drag & Drop (not supported on mobile devices, for example).
	 */
	function isDragDropSupported() {
	  const div = document.body;
	  if (!('draggable' in div) || !('ondragstart' in div && 'ondrop' in div)) {
	    return false;
	  }
	  if (!('FormData' in window)) {
	    return false;
	  }
	  if (!('FileReader' in window)) {
	    return false;
	  }
	  return true;
	}
	
	exports = { default:  isDragDropSupported };
	
	return exports 
})({})

const $__is$shallow$equalExports = (function (exports) {
 	var $default = function isShallowEqual (a, b) {
	  if (a === b) return true
	  for (var i in a) if (!(i in b)) return false
	  for (var i in b) if (a[i] !== b[i]) return false
	  return true
	}
	
	exports = { default: $default,  };
	
	return exports 
})({})

const $$uppy$dashboard$lib$utils__getFileTypeIconExports = (function (exports) {
 	const { h } = $__preactExports;
	function iconImage() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("g", {
	    fill: "#686DE0",
	    fillRule: "evenodd"
	  }, h("path", {
	    d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
	    fillRule: "nonzero"
	  }), h("path", {
	    d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
	    fillRule: "nonzero"
	  }), h("circle", {
	    cx: "7.5",
	    cy: "9.5",
	    r: "1.5"
	  })));
	}
	function iconAudio() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("path", {
	    d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
	    fill: "#049BCF",
	    fillRule: "nonzero"
	  }));
	}
	function iconVideo() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("path", {
	    d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
	    fill: "#19AF67",
	    fillRule: "nonzero"
	  }));
	}
	function iconPDF() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("path", {
	    d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
	    fill: "#E2514A",
	    fillRule: "nonzero"
	  }));
	}
	function iconArchive() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("path", {
	    d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
	    fill: "#00C469",
	    fillRule: "nonzero"
	  }));
	}
	function iconFile() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("g", {
	    fill: "#A7AFB7",
	    fillRule: "nonzero"
	  }, h("path", {
	    d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
	  }), h("path", {
	    d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
	  })));
	}
	function iconText() {
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "25",
	    height: "25",
	    viewBox: "0 0 25 25"
	  }, h("path", {
	    d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
	    fill: "#5A5E69",
	    fillRule: "nonzero"
	  }));
	}
	function getIconByMime(fileType) {
	  const defaultChoice = {
	    color: '#838999',
	    icon: iconFile()
	  };
	  if (!fileType) return defaultChoice;
	  const fileTypeGeneral = fileType.split('/')[0];
	  const fileTypeSpecific = fileType.split('/')[1];
	
	  // Text
	  if (fileTypeGeneral === 'text') {
	    return {
	      color: '#5a5e69',
	      icon: iconText()
	    };
	  }
	
	  // Image
	  if (fileTypeGeneral === 'image') {
	    return {
	      color: '#686de0',
	      icon: iconImage()
	    };
	  }
	
	  // Audio
	  if (fileTypeGeneral === 'audio') {
	    return {
	      color: '#068dbb',
	      icon: iconAudio()
	    };
	  }
	
	  // Video
	  if (fileTypeGeneral === 'video') {
	    return {
	      color: '#19af67',
	      icon: iconVideo()
	    };
	  }
	
	  // PDF
	  if (fileTypeGeneral === 'application' && fileTypeSpecific === 'pdf') {
	    return {
	      color: '#e25149',
	      icon: iconPDF()
	    };
	  }
	
	  // Archive
	  const archiveTypes = ['zip', 'x-7z-compressed', 'x-rar-compressed', 'x-tar', 'x-gzip', 'x-apple-diskimage'];
	  if (fileTypeGeneral === 'application' && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
	    return {
	      color: '#00C469',
	      icon: iconArchive()
	    };
	  }
	  return defaultChoice;
	}
	
	exports = { default:  getIconByMime };
	
	return exports 
})({})

const $$uppy$dashboard$lib__FilePreviewExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: getFileTypeIcon } = $$uppy$dashboard$lib$components$utils__getFileTypeIconExports;;
	function FilePreview(props) {
	  const {
	    file
	  } = props;
	  if (file.preview) {
	    return h("img", {
	      className: "uppy-Dashboard-Item-previewImg",
	      alt: file.name,
	      src: file.preview
	    });
	  }
	  const {
	    color,
	    icon
	  } = getFileTypeIcon(file.type);
	  return h("div", {
	    className: "uppy-Dashboard-Item-previewIconWrap"
	  }, h("span", {
	    className: "uppy-Dashboard-Item-previewIcon",
	    style: {
	      color
	    }
	  }, icon), h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-Dashboard-Item-previewIconBg",
	    width: "58",
	    height: "76",
	    viewBox: "0 0 58 76"
	  }, h("rect", {
	    fill: "#FFF",
	    width: "58",
	    height: "76",
	    rx: "3",
	    fillRule: "evenodd"
	  })));
	}
	
	exports = { default:  FilePreview };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem__MetaErrorMessageExports = (function (exports) {
 	const { h } = $__preactExports;
	const metaFieldIdToName = (metaFieldId, metaFields) => {
	  const fields = typeof metaFields === 'function' ? metaFields() : metaFields;
	  const field = fields.filter(f => f.id === metaFieldId);
	  return field[0].name;
	};
	function renderMissingMetaFieldsError(props) {
	  const {
	    file,
	    toggleFileCard,
	    i18n,
	    metaFields
	  } = props;
	  const {
	    missingRequiredMetaFields
	  } = file;
	  if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
	    return null;
	  }
	  const metaFieldsString = missingRequiredMetaFields.map(missingMetaField => metaFieldIdToName(missingMetaField, metaFields)).join(', ');
	  return h("div", {
	    className: "uppy-Dashboard-Item-errorMessage"
	  }, i18n('missingRequiredMetaFields', {
	    smart_count: missingRequiredMetaFields.length,
	    fields: metaFieldsString
	  }), ' ', h("button", {
	    type: "button",
	    class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
	    onClick: () => toggleFileCard(true, file.id)
	  }, i18n('editFile')));
	}
	
	exports = { default:  renderMissingMetaFieldsError };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem$FilePreviewAndLink__indexExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: FilePreview } = $$uppy$dashboard$lib$components__FilePreviewExports;;
	const { default: MetaErrorMessage } = $$uppy$dashboard$lib$components$FileItem$FilePreviewAndLink__MetaErrorMessageExports;;
	const { default: getFileTypeIcon } = $$uppy$dashboard$utils__getFileTypeIconExports;;
	function FilePreviewAndLink(props) {
	  const {
	    file,
	    i18n,
	    toggleFileCard,
	    metaFields,
	    showLinkToFileUploadResult
	  } = props;
	  const white = 'rgba(255, 255, 255, 0.5)';
	  const previewBackgroundColor = file.preview ? white : getFileTypeIcon(props.file.type).color;
	  return h("div", {
	    className: "uppy-Dashboard-Item-previewInnerWrap",
	    style: {
	      backgroundColor: previewBackgroundColor
	    }
	  }, showLinkToFileUploadResult && file.uploadURL && h("a", {
	    className: "uppy-Dashboard-Item-previewLink",
	    href: file.uploadURL,
	    rel: "noreferrer noopener",
	    target: "_blank",
	    "aria-label": file.meta.name
	  }, h("span", {
	    hidden: true
	  }, file.meta.name)), h(FilePreview, {
	    file: file
	  }), h(MetaErrorMessage, {
	    file: file,
	    i18n: i18n,
	    toggleFileCard: toggleFileCard,
	    metaFields: metaFields
	  }));
	}
	
	exports = { default:  FilePreviewAndLink };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem$FileProgress__indexExports = (function (exports) {
 	const { h } = $__preactExports;
	function onPauseResumeCancelRetry(props) {
	  if (props.isUploaded) return;
	  if (props.error && !props.hideRetryButton) {
	    props.uppy.retryUpload(props.file.id);
	    return;
	  }
	  if (props.resumableUploads && !props.hidePauseResumeButton) {
	    props.uppy.pauseResume(props.file.id);
	  } else if (props.individualCancellation && !props.hideCancelButton) {
	    props.uppy.removeFile(props.file.id);
	  }
	}
	function progressIndicatorTitle(props) {
	  if (props.isUploaded) {
	    return props.i18n('uploadComplete');
	  }
	  if (props.error) {
	    return props.i18n('retryUpload');
	  }
	  if (props.resumableUploads) {
	    if (props.file.isPaused) {
	      return props.i18n('resumeUpload');
	    }
	    return props.i18n('pauseUpload');
	  }
	  if (props.individualCancellation) {
	    return props.i18n('cancelUpload');
	  }
	  return '';
	}
	function ProgressIndicatorButton(props) {
	  return h("div", {
	    className: "uppy-Dashboard-Item-progress"
	  }, h("button", {
	    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
	    type: "button",
	    "aria-label": progressIndicatorTitle(props),
	    title: progressIndicatorTitle(props),
	    onClick: () => onPauseResumeCancelRetry(props)
	  }, props.children));
	}
	function ProgressCircleContainer(_ref) {
	  let {
	    children
	  } = _ref;
	  return h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "70",
	    height: "70",
	    viewBox: "0 0 36 36",
	    className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
	  }, children);
	}
	function ProgressCircle(_ref2) {
	  let {
	    progress
	  } = _ref2;
	  // circle length equals 2 * PI * R
	  const circleLength = 2 * Math.PI * 15;
	  return h("g", null, h("circle", {
	    className: "uppy-Dashboard-Item-progressIcon--bg",
	    r: "15",
	    cx: "18",
	    cy: "18",
	    "stroke-width": "2",
	    fill: "none"
	  }), h("circle", {
	    className: "uppy-Dashboard-Item-progressIcon--progress",
	    r: "15",
	    cx: "18",
	    cy: "18",
	    transform: "rotate(-90, 18, 18)",
	    fill: "none",
	    "stroke-width": "2",
	    "stroke-dasharray": circleLength,
	    "stroke-dashoffset": circleLength - circleLength / 100 * progress
	  }));
	}
	function FileProgress(props) {
	  // Nothing if upload has not started
	  if (!props.file.progress.uploadStarted) {
	    return null;
	  }
	
	  // Green checkmark when complete
	  if (props.isUploaded) {
	    return h("div", {
	      className: "uppy-Dashboard-Item-progress"
	    }, h("div", {
	      className: "uppy-Dashboard-Item-progressIndicator"
	    }, h(ProgressCircleContainer, null, h("circle", {
	      r: "15",
	      cx: "18",
	      cy: "18",
	      fill: "#1bb240"
	    }), h("polygon", {
	      className: "uppy-Dashboard-Item-progressIcon--check",
	      transform: "translate(2, 3)",
	      points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
	    }))));
	  }
	  if (props.recoveredState) {
	    return undefined;
	  }
	
	  // Retry button for error
	  if (props.error && !props.hideRetryButton) {
	    return (
	      // eslint-disable-next-line react/jsx-props-no-spreading
	      h(ProgressIndicatorButton, props, h("svg", {
	        "aria-hidden": "true",
	        focusable: "false",
	        className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
	        width: "28",
	        height: "31",
	        viewBox: "0 0 16 19"
	      }, h("path", {
	        d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
	      }), h("path", {
	        d: "M7.9 3H10v2H7.9z"
	      }), h("path", {
	        d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
	      }), h("path", {
	        d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
	      })))
	    );
	  }
	
	  // Pause/resume button for resumable uploads
	  if (props.resumableUploads && !props.hidePauseResumeButton) {
	    return (
	      // eslint-disable-next-line react/jsx-props-no-spreading
	      h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
	        progress: props.file.progress.percentage
	      }), props.file.isPaused ? h("polygon", {
	        className: "uppy-Dashboard-Item-progressIcon--play",
	        transform: "translate(3, 3)",
	        points: "12 20 12 10 20 15"
	      }) : h("g", {
	        className: "uppy-Dashboard-Item-progressIcon--pause",
	        transform: "translate(14.5, 13)"
	      }, h("rect", {
	        x: "0",
	        y: "0",
	        width: "2",
	        height: "10",
	        rx: "0"
	      }), h("rect", {
	        x: "5",
	        y: "0",
	        width: "2",
	        height: "10",
	        rx: "0"
	      }))))
	    );
	  }
	
	  // Cancel button for non-resumable uploads if individualCancellation is supported (not bundled)
	  if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
	    return (
	      // eslint-disable-next-line react/jsx-props-no-spreading
	      h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
	        progress: props.file.progress.percentage
	      }), h("polygon", {
	        className: "cancel",
	        transform: "translate(2, 2)",
	        points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
	      })))
	    );
	  }
	
	  // Just progress when buttons are disabled
	  return h("div", {
	    className: "uppy-Dashboard-Item-progress"
	  }, h("div", {
	    className: "uppy-Dashboard-Item-progressIndicator"
	  }, h(ProgressCircleContainer, null, h(ProgressCircle, {
	    progress: props.file.progress.percentage
	  }))));
	}
	
	exports = { default:  FileProgress };
	
	return exports 
})({})

const $$uppy$utils$lib__truncateStringExports = (function (exports) {
 	/**
	 * Truncates a string to the given number of chars (maxLength) by inserting '...' in the middle of that string.
	 * Partially taken from https://stackoverflow.com/a/5723274/3192470.
	 */
	const separator = '...';
	function truncateString(string, maxLength) {
	  // Return the empty string if maxLength is zero
	  if (maxLength === 0) return '';
	  // Return original string if it's already shorter than maxLength
	  if (string.length <= maxLength) return string;
	  // Return truncated substring appended of the ellipsis char if string can't be meaningfully truncated
	  if (maxLength <= separator.length + 1) return `${string.slice(0, maxLength - 1)}…`;
	  const charsToShow = maxLength - separator.length;
	  const frontChars = Math.ceil(charsToShow / 2);
	  const backChars = Math.floor(charsToShow / 2);
	  return string.slice(0, frontChars) + separator + string.slice(-backChars);
	}
	
	exports = { default:  truncateString };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem$FileInfo__indexExports = (function (exports) {
 	const { h, Fragment } = $__preactExports;
	const { default: prettierBytes } = $$transloadit__prettier$bytesExports;;
	const { default: truncateString } = $$uppy$utils$lib__truncateStringExports;;
	const { default: MetaErrorMessage } = $$uppy$dashboard$lib$components$FileItem$FileInfo__MetaErrorMessageExports;;
	const renderFileName = props => {
	  const {
	    author,
	    name
	  } = props.file.meta;
	  function getMaxNameLength() {
	    if (props.isSingleFile && props.containerHeight >= 350) {
	      return 90;
	    }
	    if (props.containerWidth <= 352) {
	      return 35;
	    }
	    if (props.containerWidth <= 576) {
	      return 60;
	    }
	    // When `author` is present, we want to make sure
	    // the file name fits on one line so we can place
	    // the author on the second line.
	    return author ? 20 : 30;
	  }
	  return h("div", {
	    className: "uppy-Dashboard-Item-name",
	    title: name
	  }, truncateString(name, getMaxNameLength()));
	};
	const renderAuthor = props => {
	  const {
	    author
	  } = props.file.meta;
	  const {
	    providerName
	  } = props.file.remote;
	  const dot = `\u00B7`;
	  if (!author) {
	    return null;
	  }
	  return h("div", {
	    className: "uppy-Dashboard-Item-author"
	  }, h("a", {
	    href: `${author.url}?utm_source=Companion&utm_medium=referral`,
	    target: "_blank",
	    rel: "noopener noreferrer"
	  }, truncateString(author.name, 13)), providerName ? h(Fragment, null, ` ${dot} `, providerName, ` ${dot} `) : null);
	};
	const renderFileSize = props => props.file.size && h("div", {
	  className: "uppy-Dashboard-Item-statusSize"
	}, prettierBytes(props.file.size));
	const ReSelectButton = props => props.file.isGhost && h("span", null, ' \u2022 ', h("button", {
	  className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
	  type: "button",
	  onClick: props.toggleAddFilesPanel
	}, props.i18n('reSelect')));
	const ErrorButton = _ref => {
	  let {
	    file,
	    onClick
	  } = _ref;
	  if (file.error) {
	    return h("button", {
	      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
	      "aria-label": file.error,
	      "data-microtip-position": "bottom",
	      "data-microtip-size": "medium",
	      onClick: onClick,
	      type: "button"
	    }, "?");
	  }
	  return null;
	};
	function FileInfo(props) {
	  const {
	    file
	  } = props;
	  return h("div", {
	    className: "uppy-Dashboard-Item-fileInfo",
	    "data-uppy-file-source": file.source
	  }, h("div", {
	    className: "uppy-Dashboard-Item-fileName"
	  }, renderFileName(props), h(ErrorButton, {
	    file: props.file
	    // eslint-disable-next-line no-alert
	    ,
	    onClick: () => alert(props.file.error) // TODO: move to a custom alert implementation
	  })), h("div", {
	    className: "uppy-Dashboard-Item-status"
	  }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), h(MetaErrorMessage, {
	    file: props.file,
	    i18n: props.i18n,
	    toggleFileCard: props.toggleFileCard,
	    metaFields: props.metaFields
	  }));
	}
	
	exports = { default:  FileInfo };
	
	return exports 
})({})

const $$uppy$utils__copyToClipboardExports = (function (exports) {
 	/**
	 * Copies text to clipboard by creating an almost invisible textarea,
	 * adding text there, then running execCommand('copy').
	 * Falls back to prompt() when the easy way fails (hello, Safari!)
	 * From http://stackoverflow.com/a/30810322
	 *
	 * @param {string} textToCopy
	 * @param {string} fallbackString
	 * @returns {Promise}
	 */
	function copyToClipboard(textToCopy, fallbackString) {
	  if (fallbackString === void 0) {
	    fallbackString = 'Copy the URL below';
	  }
	  return new Promise(resolve => {
	    const textArea = document.createElement('textarea');
	    textArea.setAttribute('style', {
	      position: 'fixed',
	      top: 0,
	      left: 0,
	      width: '2em',
	      height: '2em',
	      padding: 0,
	      border: 'none',
	      outline: 'none',
	      boxShadow: 'none',
	      background: 'transparent'
	    });
	    textArea.value = textToCopy;
	    document.body.appendChild(textArea);
	    textArea.select();
	    const magicCopyFailed = () => {
	      document.body.removeChild(textArea);
	      // eslint-disable-next-line no-alert
	      window.prompt(fallbackString, textToCopy);
	      resolve();
	    };
	    try {
	      const successful = document.execCommand('copy');
	      if (!successful) {
	        return magicCopyFailed('copy command unavailable');
	      }
	      document.body.removeChild(textArea);
	      return resolve();
	    } catch (err) {
	      document.body.removeChild(textArea);
	      return magicCopyFailed(err);
	    }
	  });
	}
	
	exports = { default:  copyToClipboard };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem$Buttons__indexExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: copyToClipboard } = $$uppy$dashboard$utils__copyToClipboardExports;;
	function EditButton(_ref) {
	  let {
	    file,
	    uploadInProgressOrComplete,
	    metaFields,
	    canEditFile,
	    i18n,
	    onClick
	  } = _ref;
	  if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
	    return h("button", {
	      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
	      type: "button",
	      "aria-label": i18n('editFileWithFilename', {
	        file: file.meta.name
	      }),
	      title: i18n('editFileWithFilename', {
	        file: file.meta.name
	      }),
	      onClick: () => onClick()
	    }, h("svg", {
	      "aria-hidden": "true",
	      focusable: "false",
	      className: "uppy-c-icon",
	      width: "14",
	      height: "14",
	      viewBox: "0 0 14 14"
	    }, h("g", {
	      fillRule: "evenodd"
	    }, h("path", {
	      d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
	      fillRule: "nonzero"
	    }), h("rect", {
	      x: "1",
	      y: "12.293",
	      width: "11",
	      height: "1",
	      rx: ".5"
	    }), h("path", {
	      fillRule: "nonzero",
	      d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
	    }))));
	  }
	  return null;
	}
	function RemoveButton(_ref2) {
	  let {
	    i18n,
	    onClick,
	    file
	  } = _ref2;
	  return h("button", {
	    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
	    type: "button",
	    "aria-label": i18n('removeFile', {
	      file: file.meta.name
	    }),
	    title: i18n('removeFile', {
	      file: file.meta.name
	    }),
	    onClick: () => onClick()
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "18",
	    height: "18",
	    viewBox: "0 0 18 18"
	  }, h("path", {
	    d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
	  }), h("path", {
	    fill: "#FFF",
	    d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
	  })));
	}
	const copyLinkToClipboard = (event, props) => {
	  copyToClipboard(props.file.uploadURL, props.i18n('copyLinkToClipboardFallback')).then(() => {
	    props.uppy.log('Link copied to clipboard.');
	    props.uppy.info(props.i18n('copyLinkToClipboardSuccess'), 'info', 3000);
	  }).catch(props.uppy.log)
	  // avoid losing focus
	  .then(() => event.target.focus({
	    preventScroll: true
	  }));
	};
	function CopyLinkButton(props) {
	  const {
	    i18n
	  } = props;
	  return h("button", {
	    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
	    type: "button",
	    "aria-label": i18n('copyLink'),
	    title: i18n('copyLink'),
	    onClick: event => copyLinkToClipboard(event, props)
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "14",
	    height: "14",
	    viewBox: "0 0 14 12"
	  }, h("path", {
	    d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
	  })));
	}
	function Buttons(props) {
	  const {
	    uppy,
	    file,
	    uploadInProgressOrComplete,
	    canEditFile,
	    metaFields,
	    showLinkToFileUploadResult,
	    showRemoveButton,
	    i18n,
	    toggleFileCard,
	    openFileEditor
	  } = props;
	  const editAction = () => {
	    if (metaFields && metaFields.length > 0) {
	      toggleFileCard(true, file.id);
	    } else {
	      openFileEditor(file);
	    }
	  };
	  return h("div", {
	    className: "uppy-Dashboard-Item-actionWrapper"
	  }, h(EditButton, {
	    i18n: i18n,
	    file: file,
	    uploadInProgressOrComplete: uploadInProgressOrComplete,
	    canEditFile: canEditFile,
	    metaFields: metaFields,
	    onClick: editAction
	  }), showLinkToFileUploadResult && file.uploadURL ? h(CopyLinkButton, {
	    file: file,
	    uppy: uppy,
	    i18n: i18n
	  }) : null, showRemoveButton ? h(RemoveButton, {
	    i18n: i18n,
	    file: file,
	    uppy: uppy,
	    onClick: () => props.uppy.removeFile(file.id, 'removed-by-user')
	  }) : null);
	}
	
	exports = { default:  Buttons };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileItem__indexExports = (function (exports) {
 	const { h, Component } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: shallowEqual } = $__is$shallow$equalExports;;
	const { default: FilePreviewAndLink } = $$uppy$dashboard$lib$components$FileItem$FilePreviewAndLink__indexExports;;
	const { default: FileProgress } = $$uppy$dashboard$lib$components$FileItem$FileProgress__indexExports;;
	const { default: FileInfo } = $$uppy$dashboard$lib$components$FileItem$FileInfo__indexExports;;
	const { default: Buttons } = $$uppy$dashboard$lib$components$FileItem$Buttons__indexExports;;
	class FileItem extends Component {
	  componentDidMount() {
	    const {
	      file
	    } = this.props;
	    if (!file.preview) {
	      this.props.handleRequestThumbnail(file);
	    }
	  }
	  shouldComponentUpdate(nextProps) {
	    return !shallowEqual(this.props, nextProps);
	  }
	
	  // VirtualList mounts FileItems again and they emit `thumbnail:request`
	  // Otherwise thumbnails are broken or missing after Golden Retriever restores files
	  componentDidUpdate() {
	    const {
	      file
	    } = this.props;
	    if (!file.preview) {
	      this.props.handleRequestThumbnail(file);
	    }
	  }
	  componentWillUnmount() {
	    const {
	      file
	    } = this.props;
	    if (!file.preview) {
	      this.props.handleCancelThumbnail(file);
	    }
	  }
	  render() {
	    const {
	      file
	    } = this.props;
	    const isProcessing = file.progress.preprocess || file.progress.postprocess;
	    const isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
	    const uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
	    const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
	    const error = file.error || false;
	
	    // File that Golden Retriever was able to partly restore (only meta, not blob),
	    // users still need to re-add it, so it’s a ghost
	    const {
	      isGhost
	    } = file;
	    let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
	    if (isUploaded && this.props.showRemoveButtonAfterComplete) {
	      showRemoveButton = true;
	    }
	    const dashboardItemClass = classNames({
	      'uppy-Dashboard-Item': true,
	      'is-inprogress': uploadInProgress && !this.props.recoveredState,
	      'is-processing': isProcessing,
	      'is-complete': isUploaded,
	      'is-error': !!error,
	      'is-resumable': this.props.resumableUploads,
	      'is-noIndividualCancellation': !this.props.individualCancellation,
	      'is-ghost': isGhost
	    });
	    return h("div", {
	      className: dashboardItemClass,
	      id: `uppy_${file.id}`,
	      role: this.props.role
	    }, h("div", {
	      className: "uppy-Dashboard-Item-preview"
	    }, h(FilePreviewAndLink, {
	      file: file,
	      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
	      i18n: this.props.i18n,
	      toggleFileCard: this.props.toggleFileCard,
	      metaFields: this.props.metaFields
	    }), h(FileProgress, {
	      uppy: this.props.uppy,
	      file: file,
	      error: error,
	      isUploaded: isUploaded,
	      hideRetryButton: this.props.hideRetryButton,
	      hideCancelButton: this.props.hideCancelButton,
	      hidePauseResumeButton: this.props.hidePauseResumeButton,
	      recoveredState: this.props.recoveredState,
	      showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
	      resumableUploads: this.props.resumableUploads,
	      individualCancellation: this.props.individualCancellation,
	      i18n: this.props.i18n
	    })), h("div", {
	      className: "uppy-Dashboard-Item-fileInfoAndButtons"
	    }, h(FileInfo, {
	      file: file,
	      id: this.props.id,
	      acquirers: this.props.acquirers,
	      containerWidth: this.props.containerWidth,
	      containerHeight: this.props.containerHeight,
	      i18n: this.props.i18n,
	      toggleAddFilesPanel: this.props.toggleAddFilesPanel,
	      toggleFileCard: this.props.toggleFileCard,
	      metaFields: this.props.metaFields,
	      isSingleFile: this.props.isSingleFile
	    }), h(Buttons, {
	      file: file,
	      metaFields: this.props.metaFields,
	      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
	      showRemoveButton: showRemoveButton,
	      canEditFile: this.props.canEditFile,
	      uploadInProgressOrComplete: uploadInProgressOrComplete,
	      toggleFileCard: this.props.toggleFileCard,
	      openFileEditor: this.props.openFileEditor,
	      uppy: this.props.uppy,
	      i18n: this.props.i18n
	    })));
	  }
	}
	
	exports = { default:  FileItem };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__FileListExports = (function (exports) {
 	const { h } = $__preactExports;
	const { useMemo } = $preact__hooksExports;
	const { default: VirtualList } = $$uppy$utils$lib__VirtualListExports;;
	const { default: FileItem } = $$uppy$dashboard$lib$components$FileItem__indexExports;;
	function chunks(list, size) {
	  const chunked = [];
	  let currentChunk = [];
	  list.forEach(item => {
	    if (currentChunk.length < size) {
	      currentChunk.push(item);
	    } else {
	      chunked.push(currentChunk);
	      currentChunk = [item];
	    }
	  });
	  if (currentChunk.length) chunked.push(currentChunk);
	  return chunked;
	}
	(_ref => {
	  let {
	    id,
	    error,
	    i18n,
	    uppy,
	    files,
	    acquirers,
	    resumableUploads,
	    hideRetryButton,
	    hidePauseResumeButton,
	    hideCancelButton,
	    showLinkToFileUploadResult,
	    showRemoveButtonAfterComplete,
	    isWide,
	    metaFields,
	    isSingleFile,
	    toggleFileCard,
	    handleRequestThumbnail,
	    handleCancelThumbnail,
	    recoveredState,
	    individualCancellation,
	    itemsPerRow,
	    openFileEditor,
	    canEditFile,
	    toggleAddFilesPanel,
	    containerWidth,
	    containerHeight
	  } = _ref;
	  // It's not great that this is hardcoded!
	  // It's ESPECIALLY not great that this is checking against `itemsPerRow`!
	  const rowHeight = itemsPerRow === 1
	  // Mobile
	  ? 71
	  // 190px height + 2 * 5px margin
	  : 200;
	
	  // Sort files by file.isGhost, ghost files first, only if recoveredState is present
	  const rows = useMemo(() => {
	    const sortByGhostComesFirst = (file1, file2) => files[file2].isGhost - files[file1].isGhost;
	    const fileIds = Object.keys(files);
	    if (recoveredState) fileIds.sort(sortByGhostComesFirst);
	    return chunks(fileIds, itemsPerRow);
	  }, [files, itemsPerRow, recoveredState]);
	  const renderRow = row =>
	  // The `role="presentation` attribute ensures that the list items are properly
	  // associated with the `VirtualList` element.
	  // We use the first file ID as the key—this should not change across scroll rerenders
	  h("div", {
	    class: "uppy-Dashboard-filesInner",
	    role: "presentation",
	    key: row[0]
	  }, row.map(fileID => h(FileItem, {
	    key: fileID,
	    uppy: uppy
	    // FIXME This is confusing, it's actually the Dashboard's plugin ID
	    ,
	    id: id,
	    error: error
	    // TODO move this to context
	    ,
	    i18n: i18n
	    // features
	    ,
	    acquirers: acquirers,
	    resumableUploads: resumableUploads,
	    individualCancellation: individualCancellation
	    // visual options
	    ,
	    hideRetryButton: hideRetryButton,
	    hidePauseResumeButton: hidePauseResumeButton,
	    hideCancelButton: hideCancelButton,
	    showLinkToFileUploadResult: showLinkToFileUploadResult,
	    showRemoveButtonAfterComplete: showRemoveButtonAfterComplete,
	    isWide: isWide,
	    metaFields: metaFields,
	    recoveredState: recoveredState,
	    isSingleFile: isSingleFile,
	    containerWidth: containerWidth,
	    containerHeight: containerHeight
	    // callbacks
	    ,
	    toggleFileCard: toggleFileCard,
	    handleRequestThumbnail: handleRequestThumbnail,
	    handleCancelThumbnail: handleCancelThumbnail,
	    role: "listitem",
	    openFileEditor: openFileEditor,
	    canEditFile: canEditFile,
	    toggleAddFilesPanel: toggleAddFilesPanel,
	    file: files[fileID]
	  })));
	  if (isSingleFile) {
	    return h("div", {
	      class: "uppy-Dashboard-files"
	    }, renderRow(rows[0]));
	  }
	  return h(VirtualList, {
	    class: "uppy-Dashboard-files",
	    role: "list",
	    data: rows,
	    renderRow: renderRow,
	    rowHeight: rowHeight
	  });
	});
	
	exports = {  };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__AddFilesExports = (function (exports) {
 	let _Symbol$for;
	const { h, Component, Fragment } = $__preactExports;
	_Symbol$for = Symbol.for('uppy test: disable unused locale key warning');
	class AddFiles extends Component {
	  constructor() {
	    super(...arguments);
	    this.triggerFileInputClick = () => {
	      this.fileInput.click();
	    };
	    this.triggerFolderInputClick = () => {
	      this.folderInput.click();
	    };
	    this.triggerVideoCameraInputClick = () => {
	      this.mobileVideoFileInput.click();
	    };
	    this.triggerPhotoCameraInputClick = () => {
	      this.mobilePhotoFileInput.click();
	    };
	    this.onFileInputChange = event => {
	      this.props.handleInputChange(event);
	
	      // We clear the input after a file is selected, because otherwise
	      // change event is not fired in Chrome and Safari when a file
	      // with the same name is selected.
	      // ___Why not use value="" on <input/> instead?
	      //    Because if we use that method of clearing the input,
	      //    Chrome will not trigger change if we drop the same file twice (Issue #768).
	      event.target.value = null; // eslint-disable-line no-param-reassign
	    };
	    this.renderHiddenInput = (isFolder, refCallback) => {
	      return h("input", {
	        className: "uppy-Dashboard-input",
	        hidden: true,
	        "aria-hidden": "true",
	        tabIndex: -1,
	        webkitdirectory: isFolder,
	        type: "file",
	        name: "files[]",
	        multiple: this.props.maxNumberOfFiles !== 1,
	        onChange: this.onFileInputChange,
	        accept: this.props.allowedFileTypes,
	        ref: refCallback
	      });
	    };
	    this.renderHiddenCameraInput = (type, nativeCameraFacingMode, refCallback) => {
	      const typeToAccept = {
	        photo: 'image/*',
	        video: 'video/*'
	      };
	      const accept = typeToAccept[type];
	      return h("input", {
	        className: "uppy-Dashboard-input",
	        hidden: true,
	        "aria-hidden": "true",
	        tabIndex: -1,
	        type: "file",
	        name: `camera-${type}`,
	        onChange: this.onFileInputChange,
	        capture: nativeCameraFacingMode,
	        accept: accept,
	        ref: refCallback
	      });
	    };
	    this.renderMyDeviceAcquirer = () => {
	      return h("div", {
	        className: "uppy-DashboardTab",
	        role: "presentation",
	        "data-uppy-acquirer-id": "MyDevice"
	      }, h("button", {
	        type: "button",
	        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
	        role: "tab",
	        tabIndex: 0,
	        "data-uppy-super-focusable": true,
	        onClick: this.triggerFileInputClick
	      }, h("div", {
	        className: "uppy-DashboardTab-inner"
	      }, h("svg", {
	        className: "uppy-DashboardTab-iconMyDevice",
	        "aria-hidden": "true",
	        focusable: "false",
	        width: "32",
	        height: "32",
	        viewBox: "0 0 32 32"
	      }, h("path", {
	        d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
	        fill: "currentcolor",
	        "fill-rule": "evenodd"
	      }))), h("div", {
	        className: "uppy-DashboardTab-name"
	      }, this.props.i18n('myDevice'))));
	    };
	    this.renderPhotoCamera = () => {
	      return h("div", {
	        className: "uppy-DashboardTab",
	        role: "presentation",
	        "data-uppy-acquirer-id": "MobilePhotoCamera"
	      }, h("button", {
	        type: "button",
	        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
	        role: "tab",
	        tabIndex: 0,
	        "data-uppy-super-focusable": true,
	        onClick: this.triggerPhotoCameraInputClick
	      }, h("div", {
	        className: "uppy-DashboardTab-inner"
	      }, h("svg", {
	        "aria-hidden": "true",
	        focusable: "false",
	        width: "32",
	        height: "32",
	        viewBox: "0 0 32 32"
	      }, h("path", {
	        d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
	        fill: "#02B383",
	        "fill-rule": "nonzero"
	      }))), h("div", {
	        className: "uppy-DashboardTab-name"
	      }, this.props.i18n('takePictureBtn'))));
	    };
	    this.renderVideoCamera = () => {
	      return h("div", {
	        className: "uppy-DashboardTab",
	        role: "presentation",
	        "data-uppy-acquirer-id": "MobileVideoCamera"
	      }, h("button", {
	        type: "button",
	        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
	        role: "tab",
	        tabIndex: 0,
	        "data-uppy-super-focusable": true,
	        onClick: this.triggerVideoCameraInputClick
	      }, h("div", {
	        className: "uppy-DashboardTab-inner"
	      }, h("svg", {
	        "aria-hidden": "true",
	        width: "32",
	        height: "32",
	        viewBox: "0 0 32 32"
	      }, h("path", {
	        fill: "#FF675E",
	        fillRule: "nonzero",
	        d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
	      }))), h("div", {
	        className: "uppy-DashboardTab-name"
	      }, this.props.i18n('recordVideoBtn'))));
	    };
	    this.renderBrowseButton = (text, onClickFn) => {
	      const numberOfAcquirers = this.props.acquirers.length;
	      return h("button", {
	        type: "button",
	        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
	        onClick: onClickFn,
	        "data-uppy-super-focusable": numberOfAcquirers === 0
	      }, text);
	    };
	    this.renderDropPasteBrowseTagline = numberOfAcquirers => {
	      const browseFiles = this.renderBrowseButton(this.props.i18n('browseFiles'), this.triggerFileInputClick);
	      const browseFolders = this.renderBrowseButton(this.props.i18n('browseFolders'), this.triggerFolderInputClick);
	
	      // in order to keep the i18n CamelCase and options lower (as are defaults) we will want to transform a lower
	      // to Camel
	      const lowerFMSelectionType = this.props.fileManagerSelectionType;
	      const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
	      return h("div", {
	        class: "uppy-Dashboard-AddFiles-title"
	      },
	      // eslint-disable-next-line no-nested-ternary
	      this.props.disableLocalFiles ? this.props.i18n('importFiles') : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
	        browseFiles,
	        browseFolders,
	        browse: browseFiles
	      }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
	        browseFiles,
	        browseFolders,
	        browse: browseFiles
	      }));
	    };
	    this.renderAcquirer = acquirer => {
	      return h("div", {
	        className: "uppy-DashboardTab",
	        role: "presentation",
	        "data-uppy-acquirer-id": acquirer.id
	      }, h("button", {
	        type: "button",
	        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
	        role: "tab",
	        tabIndex: 0,
	        "data-cy": acquirer.id,
	        "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
	        "aria-selected": this.props.activePickerPanel.id === acquirer.id,
	        "data-uppy-super-focusable": true,
	        onClick: () => this.props.showPanel(acquirer.id)
	      }, h("div", {
	        className: "uppy-DashboardTab-inner"
	      }, acquirer.icon()), h("div", {
	        className: "uppy-DashboardTab-name"
	      }, acquirer.name)));
	    };
	    this.renderAcquirers = acquirers => {
	      // Group last two buttons, so we don’t end up with
	      // just one button on a new line
	      const acquirersWithoutLastTwo = [...acquirers];
	      const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
	      return h(Fragment, null, acquirersWithoutLastTwo.map(acquirer => this.renderAcquirer(acquirer)), h("span", {
	        role: "presentation",
	        style: {
	          'white-space': 'nowrap'
	        }
	      }, lastTwoAcquirers.map(acquirer => this.renderAcquirer(acquirer))));
	    };
	    this.renderSourcesList = (acquirers, disableLocalFiles) => {
	      const {
	        showNativePhotoCameraButton,
	        showNativeVideoCameraButton
	      } = this.props;
	      let list = [];
	      const myDeviceKey = 'myDevice';
	      if (!disableLocalFiles) {
	        list.push({
	          key: myDeviceKey,
	          elements: this.renderMyDeviceAcquirer()
	        });
	        if (showNativePhotoCameraButton) list.push({
	          key: 'nativePhotoCameraButton',
	          elements: this.renderPhotoCamera()
	        });
	        if (showNativeVideoCameraButton) list.push({
	          key: 'nativePhotoCameraButton',
	          elements: this.renderVideoCamera()
	        });
	      }
	      list.push(...acquirers.map(acquirer => ({
	        key: acquirer.id,
	        elements: this.renderAcquirer(acquirer)
	      })));
	
	      // doesn't make sense to show only a lonely "My Device"
	      const hasOnlyMyDevice = list.length === 1 && list[0].key === myDeviceKey;
	      if (hasOnlyMyDevice) list = [];
	
	      // Group last two buttons, so we don’t end up with
	      // just one button on a new line
	      const listWithoutLastTwo = [...list];
	      const lastTwo = listWithoutLastTwo.splice(list.length - 2, list.length);
	      const renderList = l => l.map(_ref => {
	        let {
	          key,
	          elements
	        } = _ref;
	        return h(Fragment, {
	          key: key
	        }, elements);
	      });
	      return h(Fragment, null, this.renderDropPasteBrowseTagline(list.length), h("div", {
	        className: "uppy-Dashboard-AddFiles-list",
	        role: "tablist"
	      }, renderList(listWithoutLastTwo), h("span", {
	        role: "presentation",
	        style: {
	          'white-space': 'nowrap'
	        }
	      }, renderList(lastTwo))));
	    };
	  }
	  [_Symbol$for]() {
	    // Those are actually used in `renderDropPasteBrowseTagline` method.
	    this.props.i18nArray('dropPasteBoth');
	    this.props.i18nArray('dropPasteFiles');
	    this.props.i18nArray('dropPasteFolders');
	    this.props.i18nArray('dropPasteImportBoth');
	    this.props.i18nArray('dropPasteImportFiles');
	    this.props.i18nArray('dropPasteImportFolders');
	  }
	  renderPoweredByUppy() {
	    const {
	      i18nArray
	    } = this.props;
	    const uppyBranding = h("span", null, h("svg", {
	      "aria-hidden": "true",
	      focusable: "false",
	      className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
	      width: "11",
	      height: "11",
	      viewBox: "0 0 11 11"
	    }, h("path", {
	      d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
	      fillRule: "evenodd"
	    })), h("span", {
	      className: "uppy-Dashboard-poweredByUppy"
	    }, "Uppy"));
	    const linkText = i18nArray('poweredBy', {
	      uppy: uppyBranding
	    });
	    return h("a", {
	      tabIndex: "-1",
	      href: "https://uppy.io",
	      rel: "noreferrer noopener",
	      target: "_blank",
	      className: "uppy-Dashboard-poweredBy"
	    }, linkText);
	  }
	  render() {
	    const {
	      showNativePhotoCameraButton,
	      showNativeVideoCameraButton,
	      nativeCameraFacingMode
	    } = this.props;
	    return h("div", {
	      className: "uppy-Dashboard-AddFiles"
	    }, this.renderHiddenInput(false, ref => {
	      this.fileInput = ref;
	    }), this.renderHiddenInput(true, ref => {
	      this.folderInput = ref;
	    }), showNativePhotoCameraButton && this.renderHiddenCameraInput('photo', nativeCameraFacingMode, ref => {
	      this.mobilePhotoFileInput = ref;
	    }), showNativeVideoCameraButton && this.renderHiddenCameraInput('video', nativeCameraFacingMode, ref => {
	      this.mobileVideoFileInput = ref;
	    }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), h("div", {
	      className: "uppy-Dashboard-AddFiles-info"
	    }, this.props.note && h("div", {
	      className: "uppy-Dashboard-note"
	    }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
	  }
	}
	
	exports = { default: AddFiles };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__AddFilesPanelExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: AddFiles } = $$uppy$dashboard$lib$components__AddFilesExports;;
	const AddFilesPanel = props => {
	  return h("div", {
	    className: classNames('uppy-Dashboard-AddFilesPanel', props.className),
	    "data-uppy-panelType": "AddFiles",
	    "aria-hidden": !props.showAddFilesPanel
	  }, h("div", {
	    className: "uppy-DashboardContent-bar"
	  }, h("div", {
	    className: "uppy-DashboardContent-title",
	    role: "heading",
	    "aria-level": "1"
	  }, props.i18n('addingMoreFiles')), h("button", {
	    className: "uppy-DashboardContent-back",
	    type: "button",
	    onClick: () => props.toggleAddFilesPanel(false)
	  }, props.i18n('back'))), h(AddFiles, props));
	};
	
	exports = { default: AddFilesPanel };
	
	return exports 
})({})

const $$uppy$dashboard$lib$utils__ignoreEventExports = (function (exports) {
 	// ignore drop/paste events if they are not in input or textarea —
	// otherwise when Url plugin adds drop/paste listeners to this.el,
	// draging UI elements or pasting anything into any field triggers those events —
	// Url treats them as URLs that need to be imported
	
	function ignoreEvent(ev) {
	  const {
	    tagName
	  } = ev.target;
	  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
	    ev.stopPropagation();
	    return;
	  }
	  ev.preventDefault();
	  ev.stopPropagation();
	}
	
	exports = { default: ignoreEvent };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__PickerPanelContentExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: ignoreEvent } = $$uppy$dashboard$lib$components$utils__ignoreEventExports;;
	function PickerPanelContent(_ref) {
	  let {
	    activePickerPanel,
	    className,
	    hideAllPanels,
	    i18n,
	    state,
	    uppy
	  } = _ref;
	  return h("div", {
	    className: classNames('uppy-DashboardContent-panel', className),
	    role: "tabpanel",
	    "data-uppy-panelType": "PickerPanel",
	    id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
	    onDragOver: ignoreEvent,
	    onDragLeave: ignoreEvent,
	    onDrop: ignoreEvent,
	    onPaste: ignoreEvent
	  }, h("div", {
	    className: "uppy-DashboardContent-bar"
	  }, h("div", {
	    className: "uppy-DashboardContent-title",
	    role: "heading",
	    "aria-level": "1"
	  }, i18n('importFrom', {
	    name: activePickerPanel.name
	  })), h("button", {
	    className: "uppy-DashboardContent-back",
	    type: "button",
	    onClick: hideAllPanels
	  }, i18n('cancel'))), h("div", {
	    className: "uppy-DashboardContent-panelBody"
	  }, uppy.getPlugin(activePickerPanel.id).render(state)));
	}
	
	exports = { default: PickerPanelContent };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__EditorPanelExports = (function (exports) {
 	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	function EditorPanel(props) {
	  const file = props.files[props.fileCardFor];
	  const handleCancel = () => {
	    props.uppy.emit('file-editor:cancel', file);
	    props.hideAllPanels();
	  };
	  return h("div", {
	    className: classNames('uppy-DashboardContent-panel', props.className),
	    role: "tabpanel",
	    "data-uppy-panelType": "FileEditor",
	    id: "uppy-DashboardContent-panel--editor"
	  }, h("div", {
	    className: "uppy-DashboardContent-bar"
	  }, h("div", {
	    className: "uppy-DashboardContent-title",
	    role: "heading",
	    "aria-level": "1"
	  }, props.i18nArray('editing', {
	    file: h("span", {
	      className: "uppy-DashboardContent-titleFile"
	    }, file.meta ? file.meta.name : file.name)
	  })), h("button", {
	    className: "uppy-DashboardContent-back",
	    type: "button",
	    onClick: handleCancel
	  }, props.i18n('cancel')), h("button", {
	    className: "uppy-DashboardContent-save",
	    type: "button",
	    onClick: props.saveFileEditor
	  }, props.i18n('save'))), h("div", {
	    className: "uppy-DashboardContent-panelBody"
	  }, props.editors.map(target => {
	    return props.uppy.getPlugin(target.id).render(props.state);
	  })));
	}
	
	exports = { default: EditorPanel };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__PickerPanelTopBarExports = (function (exports) {
 	const { h } = $__preactExports;
	const uploadStates = {
	  STATE_ERROR: 'error',
	  STATE_WAITING: 'waiting',
	  STATE_PREPROCESSING: 'preprocessing',
	  STATE_UPLOADING: 'uploading',
	  STATE_POSTPROCESSING: 'postprocessing',
	  STATE_COMPLETE: 'complete',
	  STATE_PAUSED: 'paused'
	};
	function getUploadingState(isAllErrored, isAllComplete, isAllPaused, files) {
	  if (files === void 0) {
	    files = {};
	  }
	  if (isAllErrored) {
	    return uploadStates.STATE_ERROR;
	  }
	  if (isAllComplete) {
	    return uploadStates.STATE_COMPLETE;
	  }
	  if (isAllPaused) {
	    return uploadStates.STATE_PAUSED;
	  }
	  let state = uploadStates.STATE_WAITING;
	  const fileIDs = Object.keys(files);
	  for (let i = 0; i < fileIDs.length; i++) {
	    const {
	      progress
	    } = files[fileIDs[i]];
	    // If ANY files are being uploaded right now, show the uploading state.
	    if (progress.uploadStarted && !progress.uploadComplete) {
	      return uploadStates.STATE_UPLOADING;
	    }
	    // If files are being preprocessed AND postprocessed at this time, we show the
	    // preprocess state. If any files are being uploaded we show uploading.
	    if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
	      state = uploadStates.STATE_PREPROCESSING;
	    }
	    // If NO files are being preprocessed or uploaded right now, but some files are
	    // being postprocessed, show the postprocess state.
	    if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
	      state = uploadStates.STATE_POSTPROCESSING;
	    }
	  }
	  return state;
	}
	function UploadStatus(_ref) {
	  let {
	    files,
	    i18n,
	    isAllComplete,
	    isAllErrored,
	    isAllPaused,
	    inProgressNotPausedFiles,
	    newFiles,
	    processingFiles
	  } = _ref;
	  const uploadingState = getUploadingState(isAllErrored, isAllComplete, isAllPaused, files);
	  switch (uploadingState) {
	    case 'uploading':
	      return i18n('uploadingXFiles', {
	        smart_count: inProgressNotPausedFiles.length
	      });
	    case 'preprocessing':
	    case 'postprocessing':
	      return i18n('processingXFiles', {
	        smart_count: processingFiles.length
	      });
	    case 'paused':
	      return i18n('uploadPaused');
	    case 'waiting':
	      return i18n('xFilesSelected', {
	        smart_count: newFiles.length
	      });
	    case 'complete':
	      return i18n('uploadComplete');
	    case 'error':
	      return i18n('error');
	    default:
	  }
	}
	function PanelTopBar(props) {
	  const {
	    i18n,
	    isAllComplete,
	    hideCancelButton,
	    maxNumberOfFiles,
	    toggleAddFilesPanel,
	    uppy
	  } = props;
	  let {
	    allowNewUpload
	  } = props;
	  // TODO maybe this should be done in ../Dashboard.jsx, then just pass that down as `allowNewUpload`
	  if (allowNewUpload && maxNumberOfFiles) {
	    // eslint-disable-next-line react/destructuring-assignment
	    allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
	  }
	  return h("div", {
	    className: "uppy-DashboardContent-bar"
	  }, !isAllComplete && !hideCancelButton ? h("button", {
	    className: "uppy-DashboardContent-back",
	    type: "button",
	    onClick: () => uppy.cancelAll()
	  }, i18n('cancel')) : h("div", null), h("div", {
	    className: "uppy-DashboardContent-title",
	    role: "heading",
	    "aria-level": "1"
	  }, h(UploadStatus, props)), allowNewUpload ? h("button", {
	    className: "uppy-DashboardContent-addMore",
	    type: "button",
	    "aria-label": i18n('addMoreFiles'),
	    title: i18n('addMoreFiles'),
	    onClick: () => toggleAddFilesPanel(true)
	  }, h("svg", {
	    "aria-hidden": "true",
	    focusable: "false",
	    className: "uppy-c-icon",
	    width: "15",
	    height: "15",
	    viewBox: "0 0 15 15"
	  }, h("path", {
	    d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
	  })), h("span", {
	    className: "uppy-DashboardContent-addMoreCaption"
	  }, i18n('addMore'))) : h("div", null));
	}
	
	exports = { default: PanelTopBar };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileCard__RenderMetaFieldsExports = (function (exports) {
 	const { h } = $__preactExports;
	function RenderMetaFields(props) {
	  const {
	    computedMetaFields,
	    requiredMetaFields,
	    updateMeta,
	    form,
	    formState
	  } = props;
	  const fieldCSSClasses = {
	    text: 'uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input'
	  };
	  return computedMetaFields.map(field => {
	    const id = `uppy-Dashboard-FileCard-input-${field.id}`;
	    const required = requiredMetaFields.includes(field.id);
	    return h("fieldset", {
	      key: field.id,
	      className: "uppy-Dashboard-FileCard-fieldset"
	    }, h("label", {
	      className: "uppy-Dashboard-FileCard-label",
	      htmlFor: id
	    }, field.name), field.render !== undefined ? field.render({
	      value: formState[field.id],
	      onChange: newVal => updateMeta(newVal, field.id),
	      fieldCSSClasses,
	      required,
	      form: form.id
	    }, h) : h("input", {
	      className: fieldCSSClasses.text,
	      id: id,
	      form: form.id,
	      type: field.type || 'text',
	      required: required,
	      value: formState[field.id],
	      placeholder: field.placeholder,
	      onInput: ev => updateMeta(ev.target.value, field.id),
	      "data-uppy-super-focusable": true
	    }));
	  });
	}
	
	exports = { default:  RenderMetaFields };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components$FileCard__indexExports = (function (exports) {
 	const { h } = $__preactExports;
	const { useEffect, useState, useCallback } = $preact__hooksExports;
	const { default: classNames } = $__classnamesExports;;
	const { nanoid } = $nanoid__non$secureExports;
	const { default: getFileTypeIcon } = $$uppy$dashboard$lib$utils__getFileTypeIconExports;;
	const { default: ignoreEvent } = $$uppy$dashboard$lib$utils__ignoreEventExports;;
	const { default: FilePreview } = $$uppy$dashboard$lib$components$FileCard__FilePreviewExports;;
	const { default: RenderMetaFields } = $$uppy$dashboard$lib$components$FileCard__RenderMetaFieldsExports;;
	function FileCard(props) {
	  var _getMetaFields;
	  const {
	    files,
	    fileCardFor,
	    toggleFileCard,
	    saveFileCard,
	    metaFields,
	    requiredMetaFields,
	    openFileEditor,
	    i18n,
	    i18nArray,
	    className,
	    canEditFile
	  } = props;
	  const getMetaFields = () => {
	    return typeof metaFields === 'function' ? metaFields(files[fileCardFor]) : metaFields;
	  };
	  const file = files[fileCardFor];
	  const computedMetaFields = (_getMetaFields = getMetaFields()) != null ? _getMetaFields : [];
	  const showEditButton = canEditFile(file);
	  const storedMetaData = {};
	  computedMetaFields.forEach(field => {
	    var _file$meta$field$id;
	    storedMetaData[field.id] = (_file$meta$field$id = file.meta[field.id]) != null ? _file$meta$field$id : '';
	  });
	  const [formState, setFormState] = useState(storedMetaData);
	  const handleSave = useCallback(ev => {
	    ev.preventDefault();
	    saveFileCard(formState, fileCardFor);
	  }, [saveFileCard, formState, fileCardFor]);
	  const updateMeta = (newVal, name) => {
	    setFormState({
	      ...formState,
	      [name]: newVal
	    });
	  };
	  const handleCancel = () => {
	    toggleFileCard(false);
	  };
	  const [form] = useState(() => {
	    const formEl = document.createElement('form');
	    formEl.setAttribute('tabindex', '-1');
	    formEl.id = nanoid();
	    return formEl;
	  });
	  useEffect(() => {
	    document.body.appendChild(form);
	    form.addEventListener('submit', handleSave);
	    return () => {
	      form.removeEventListener('submit', handleSave);
	      document.body.removeChild(form);
	    };
	  }, [form, handleSave]);
	  return h("div", {
	    className: classNames('uppy-Dashboard-FileCard', className),
	    "data-uppy-panelType": "FileCard",
	    onDragOver: ignoreEvent,
	    onDragLeave: ignoreEvent,
	    onDrop: ignoreEvent,
	    onPaste: ignoreEvent
	  }, h("div", {
	    className: "uppy-DashboardContent-bar"
	  }, h("div", {
	    className: "uppy-DashboardContent-title",
	    role: "heading",
	    "aria-level": "1"
	  }, i18nArray('editing', {
	    file: h("span", {
	      className: "uppy-DashboardContent-titleFile"
	    }, file.meta ? file.meta.name : file.name)
	  })), h("button", {
	    className: "uppy-DashboardContent-back",
	    type: "button",
	    form: form.id,
	    title: i18n('finishEditingFile'),
	    onClick: handleCancel
	  }, i18n('cancel'))), h("div", {
	    className: "uppy-Dashboard-FileCard-inner"
	  }, h("div", {
	    className: "uppy-Dashboard-FileCard-preview",
	    style: {
	      backgroundColor: getFileTypeIcon(file.type).color
	    }
	  }, h(FilePreview, {
	    file: file
	  }), showEditButton && h("button", {
	    type: "button",
	    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
	    onClick: event => {
	      // When opening the image editor we want to save any meta fields changes.
	      // Otherwise it's confusing for the user to click save in the editor,
	      // but the changes here are discarded. This bypasses validation,
	      // but we are okay with that.
	      handleSave(event);
	      openFileEditor(file);
	    }
	  }, i18n('editFile'))), h("div", {
	    className: "uppy-Dashboard-FileCard-info"
	  }, h(RenderMetaFields, {
	    computedMetaFields: computedMetaFields,
	    requiredMetaFields: requiredMetaFields,
	    updateMeta: updateMeta,
	    form: form,
	    formState: formState
	  })), h("div", {
	    className: "uppy-Dashboard-FileCard-actions"
	  }, h("button", {
	    className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn"
	    // If `form` attribute is supported, we want a submit button to trigger the form validation.
	    // Otherwise, fallback to a classic button with a onClick event handler.
	    ,
	    type: "submit",
	    form: form.id
	  }, i18n('saveChanges')), h("button", {
	    className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
	    type: "button",
	    onClick: handleCancel,
	    form: form.id
	  }, i18n('cancel')))));
	}
	
	exports = { default:  FileCard };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__SlideExports = (function (exports) {
 	const { cloneElement, Component, toChildArray } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const transitionName = 'uppy-transition-slideDownUp';
	const duration = 250;
	
	/**
	 * Vertical slide transition.
	 *
	 * This can take a _single_ child component, which _must_ accept a `className` prop.
	 *
	 * Currently this is specific to the `uppy-transition-slideDownUp` transition,
	 * but it should be simple to extend this for any type of single-element
	 * transition by setting the CSS name and duration as props.
	 */
	class Slide extends Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      cachedChildren: null,
	      className: ''
	    };
	  }
	
	  // TODO: refactor to stable lifecycle method
	  // eslint-disable-next-line
	  componentWillUpdate(nextProps) {
	    const {
	      cachedChildren
	    } = this.state;
	    const child = toChildArray(nextProps.children)[0];
	    if (cachedChildren === child) return null;
	    const patch = {
	      cachedChildren: child
	    };
	
	    // Enter transition
	    if (child && !cachedChildren) {
	      patch.className = `${transitionName}-enter`;
	      cancelAnimationFrame(this.animationFrame);
	      clearTimeout(this.leaveTimeout);
	      this.leaveTimeout = undefined;
	      this.animationFrame = requestAnimationFrame(() => {
	        // Force it to render before we add the active class
	        // this.base.getBoundingClientRect()
	
	        this.setState({
	          className: `${transitionName}-enter ${transitionName}-enter-active`
	        });
	        this.enterTimeout = setTimeout(() => {
	          this.setState({
	            className: ''
	          });
	        }, duration);
	      });
	    }
	
	    // Leave transition
	    if (cachedChildren && !child && this.leaveTimeout === undefined) {
	      patch.cachedChildren = cachedChildren;
	      patch.className = `${transitionName}-leave`;
	      cancelAnimationFrame(this.animationFrame);
	      clearTimeout(this.enterTimeout);
	      this.enterTimeout = undefined;
	      this.animationFrame = requestAnimationFrame(() => {
	        this.setState({
	          className: `${transitionName}-leave ${transitionName}-leave-active`
	        });
	        this.leaveTimeout = setTimeout(() => {
	          this.setState({
	            cachedChildren: null,
	            className: ''
	          });
	        }, duration);
	      });
	    }
	
	    // eslint-disable-next-line
	    this.setState(patch);
	  }
	  render() {
	    const {
	      cachedChildren,
	      className
	    } = this.state;
	    if (!cachedChildren) {
	      return null;
	    }
	    return cloneElement(cachedChildren, {
	      className: classNames(className, cachedChildren.props.className)
	    });
	  }
	}
	
	exports = { default: Slide };
	
	return exports 
})({})

const $$uppy$dashboard$lib$components__DashboardExports = (function (exports) {
 	function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
	const { h } = $__preactExports;
	const { default: classNames } = $__classnamesExports;;
	const { default: isDragDropSupported } = $$uppy$utils$lib__isDragDropSupportedExports;;
	const { default: FileList } = $$uppy$dashboard$lib$components__FileListExports;;
	const { default: AddFiles } = $$uppy$dashboard$lib$components__AddFilesExports;;
	const { default: AddFilesPanel } = $$uppy$dashboard$lib$components__AddFilesPanelExports;;
	const { default: PickerPanelContent } = $$uppy$dashboard$lib$components__PickerPanelContentExports;;
	const { default: EditorPanel } = $$uppy$dashboard$lib$components__EditorPanelExports;;
	const { default: PanelTopBar } = $$uppy$dashboard$lib$components__PickerPanelTopBarExports;;
	const { default: FileCard } = $$uppy$dashboard$lib$components$FileCard__indexExports;;
	const { default: Slide } = $$uppy$dashboard$lib$components__SlideExports;;
	
	// http://dev.edenspiekermann.com/2016/02/11/introducing-accessible-modal-dialog
	// https://github.com/ghosh/micromodal
	
	const WIDTH_XL = 900;
	const WIDTH_LG = 700;
	const WIDTH_MD = 576;
	const HEIGHT_MD = 330;
	// We might want to enable this in the future
	// const HEIGHT_LG = 400
	// const HEIGHT_XL = 460
	
	function Dashboard(props) {
	  const isNoFiles = props.totalFileCount === 0;
	  const isSingleFile = props.totalFileCount === 1;
	  const isSizeMD = props.containerWidth > WIDTH_MD;
	  const isSizeHeightMD = props.containerHeight > HEIGHT_MD;
	  const dashboardClassName = classNames({
	    'uppy-Dashboard': true,
	    'uppy-Dashboard--isDisabled': props.disabled,
	    'uppy-Dashboard--animateOpenClose': props.animateOpenClose,
	    'uppy-Dashboard--isClosing': props.isClosing,
	    'uppy-Dashboard--isDraggingOver': props.isDraggingOver,
	    'uppy-Dashboard--modal': !props.inline,
	    'uppy-size--md': props.containerWidth > WIDTH_MD,
	    'uppy-size--lg': props.containerWidth > WIDTH_LG,
	    'uppy-size--xl': props.containerWidth > WIDTH_XL,
	    'uppy-size--height-md': props.containerHeight > HEIGHT_MD,
	    // We might want to enable this in the future
	    // 'uppy-size--height-lg': props.containerHeight > HEIGHT_LG,
	    // 'uppy-size--height-xl': props.containerHeight > HEIGHT_XL,
	    'uppy-Dashboard--isAddFilesPanelVisible': props.showAddFilesPanel,
	    'uppy-Dashboard--isInnerWrapVisible': props.areInsidesReadyToBeVisible,
	    // Only enable “centered single file” mode when Dashboard is tall enough
	    'uppy-Dashboard--singleFile': props.singleFileFullScreen && isSingleFile && isSizeHeightMD
	  });
	
	  // Important: keep these in sync with the percent width values in `src/components/FileItem/index.scss`.
	  let itemsPerRow = 1; // mobile
	  if (props.containerWidth > WIDTH_XL) {
	    itemsPerRow = 5;
	  } else if (props.containerWidth > WIDTH_LG) {
	    itemsPerRow = 4;
	  } else if (props.containerWidth > WIDTH_MD) {
	    itemsPerRow = 3;
	  }
	  const showFileList = props.showSelectedFiles && !isNoFiles;
	  const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
	  const numberOfGhosts = props.files ? Object.keys(props.files).filter(fileID => props.files[fileID].isGhost).length : null;
	  const renderRestoredText = () => {
	    if (numberOfGhosts > 0) {
	      return props.i18n('recoveredXFiles', {
	        smart_count: numberOfGhosts
	      });
	    }
	    return props.i18n('recoveredAllFiles');
	  };
	  const dashboard = h("div", {
	    className: dashboardClassName,
	    "data-uppy-theme": props.theme,
	    "data-uppy-num-acquirers": props.acquirers.length,
	    "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
	    "aria-hidden": props.inline ? 'false' : props.isHidden,
	    "aria-disabled": props.disabled,
	    "aria-label": !props.inline ? props.i18n('dashboardWindowTitle') : props.i18n('dashboardTitle'),
	    onPaste: props.handlePaste,
	    onDragOver: props.handleDragOver,
	    onDragLeave: props.handleDragLeave,
	    onDrop: props.handleDrop
	  }, h("div", {
	    "aria-hidden": "true",
	    className: "uppy-Dashboard-overlay",
	    tabIndex: -1,
	    onClick: props.handleClickOutside
	  }), h("div", {
	    className: "uppy-Dashboard-inner",
	    "aria-modal": !props.inline && 'true',
	    role: !props.inline && 'dialog',
	    style: {
	      width: props.inline && props.width ? props.width : '',
	      height: props.inline && props.height ? props.height : ''
	    }
	  }, !props.inline ? h("button", {
	    className: "uppy-u-reset uppy-Dashboard-close",
	    type: "button",
	    "aria-label": props.i18n('closeModal'),
	    title: props.i18n('closeModal'),
	    onClick: props.closeModal
	  }, h("span", {
	    "aria-hidden": "true"
	  }, "\xD7")) : null, h("div", {
	    className: "uppy-Dashboard-innerWrap"
	  }, h("div", {
	    className: "uppy-Dashboard-dropFilesHereHint"
	  }, props.i18n('dropHint')), showFileList && h(PanelTopBar, props), numberOfFilesForRecovery && h("div", {
	    className: "uppy-Dashboard-serviceMsg"
	  }, h("svg", {
	    className: "uppy-Dashboard-serviceMsg-icon",
	    "aria-hidden": "true",
	    focusable: "false",
	    width: "21",
	    height: "16",
	    viewBox: "0 0 24 19"
	  }, h("g", {
	    transform: "translate(0 -1)",
	    fill: "none",
	    fillRule: "evenodd"
	  }, h("path", {
	    d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
	    fill: "#FFD300"
	  }), h("path", {
	    fill: "#000",
	    d: "M11 6h2l-.3 8h-1.4z"
	  }), h("circle", {
	    fill: "#000",
	    cx: "12",
	    cy: "17",
	    r: "1"
	  }))), h("strong", {
	    className: "uppy-Dashboard-serviceMsg-title"
	  }, props.i18n('sessionRestored')), h("div", {
	    className: "uppy-Dashboard-serviceMsg-text"
	  }, renderRestoredText())), showFileList ? h(FileList, {
	    id: props.id,
	    error: props.error,
	    i18n: props.i18n,
	    uppy: props.uppy,
	    files: props.files,
	    acquirers: props.acquirers,
	    resumableUploads: props.resumableUploads,
	    hideRetryButton: props.hideRetryButton,
	    hidePauseResumeButton: props.hidePauseResumeButton,
	    hideCancelButton: props.hideCancelButton,
	    showLinkToFileUploadResult: props.showLinkToFileUploadResult,
	    showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
	    isWide: props.isWide,
	    metaFields: props.metaFields,
	    toggleFileCard: props.toggleFileCard,
	    handleRequestThumbnail: props.handleRequestThumbnail,
	    handleCancelThumbnail: props.handleCancelThumbnail,
	    recoveredState: props.recoveredState,
	    individualCancellation: props.individualCancellation,
	    openFileEditor: props.openFileEditor,
	    canEditFile: props.canEditFile,
	    toggleAddFilesPanel: props.toggleAddFilesPanel,
	    isSingleFile: isSingleFile,
	    itemsPerRow: itemsPerRow
	  }) :
	  // eslint-disable-next-line react/jsx-props-no-spreading
	  h(AddFiles, _extends({}, props, {
	    isSizeMD: isSizeMD
	  })), h(Slide, null, props.showAddFilesPanel ? h(AddFilesPanel, _extends({
	    key: "AddFiles"
	  }, props, {
	    isSizeMD: isSizeMD
	  })) : null), h(Slide, null, props.fileCardFor ? h(FileCard, _extends({
	    key: "FileCard"
	  }, props)) : null), h(Slide, null, props.activePickerPanel ? h(PickerPanelContent, _extends({
	    key: "Picker"
	  }, props)) : null), h(Slide, null, props.showFileEditor ? h(EditorPanel, _extends({
	    key: "Editor"
	  }, props)) : null), h("div", {
	    className: "uppy-Dashboard-progressindicators"
	  }, props.progressindicators.map(target => {
	    return props.uppy.getPlugin(target.id).render(props.state);
	  })))));
	  return dashboard;
	}
	
	exports = { default:  Dashboard };
	
	return exports 
})({})

const $$uppy$dashboard$lib__localeExports = (function (exports) {
 	var _default = {
	  strings: {
	    // When `inline: false`, used as the screen reader label for the button that closes the modal.
	    closeModal: 'Close Modal',
	    // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
	    addMoreFiles: 'Add more files',
	    addingMoreFiles: 'Adding more files',
	    // Used as the header for import panels, e.g., “Import from Google Drive”.
	    importFrom: 'Import from %{name}',
	    // When `inline: false`, used as the screen reader label for the dashboard modal.
	    dashboardWindowTitle: 'Uppy Dashboard Window (Press escape to close)',
	    // When `inline: true`, used as the screen reader label for the dashboard area.
	    dashboardTitle: 'Uppy Dashboard',
	    // Shown in the Informer when a link to a file was copied to the clipboard.
	    copyLinkToClipboardSuccess: 'Link copied to clipboard.',
	    // Used when a link cannot be copied automatically — the user has to select the text from the
	    // input element below this string.
	    copyLinkToClipboardFallback: 'Copy the URL below',
	    // Used as the hover title and screen reader label for buttons that copy a file link.
	    copyLink: 'Copy link',
	    back: 'Back',
	    // Used as the screen reader label for buttons that remove a file.
	    removeFile: 'Remove file',
	    // Used as the screen reader label for buttons that open the metadata editor panel for a file.
	    editFile: 'Edit file',
	    // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
	    editing: 'Editing %{file}',
	    // Shown on the main upload screen when an upload error occurs
	    error: 'Error',
	    // Used as the screen reader label for the button that saves metadata edits and returns to the
	    // file list view.
	    finishEditingFile: 'Finish editing file',
	    saveChanges: 'Save changes',
	    // Used as the label for the tab button that opens the system file selection dialog.
	    myDevice: 'My Device',
	    dropHint: 'Drop your files here',
	    // Used as the hover text and screen reader label for file progress indicators when
	    // they have been fully uploaded.
	    uploadComplete: 'Upload complete',
	    uploadPaused: 'Upload paused',
	    // Used as the hover text and screen reader label for the buttons to resume paused uploads.
	    resumeUpload: 'Resume upload',
	    // Used as the hover text and screen reader label for the buttons to pause uploads.
	    pauseUpload: 'Pause upload',
	    // Used as the hover text and screen reader label for the buttons to retry failed uploads.
	    retryUpload: 'Retry upload',
	    // Used as the hover text and screen reader label for the buttons to cancel uploads.
	    cancelUpload: 'Cancel upload',
	    // Used in a title, how many files are currently selected
	    xFilesSelected: {
	      0: '%{smart_count} file selected',
	      1: '%{smart_count} files selected'
	    },
	    uploadingXFiles: {
	      0: 'Uploading %{smart_count} file',
	      1: 'Uploading %{smart_count} files'
	    },
	    processingXFiles: {
	      0: 'Processing %{smart_count} file',
	      1: 'Processing %{smart_count} files'
	    },
	    // The "powered by Uppy" link at the bottom of the Dashboard.
	    poweredBy: 'Powered by %{uppy}',
	    addMore: 'Add more',
	    editFileWithFilename: 'Edit file %{file}',
	    save: 'Save',
	    cancel: 'Cancel',
	    dropPasteFiles: 'Drop files here or %{browseFiles}',
	    dropPasteFolders: 'Drop files here or %{browseFolders}',
	    dropPasteBoth: 'Drop files here, %{browseFiles} or %{browseFolders}',
	    dropPasteImportFiles: 'Drop files here, %{browseFiles} or import from:',
	    dropPasteImportFolders: 'Drop files here, %{browseFolders} or import from:',
	    dropPasteImportBoth: 'Drop files here, %{browseFiles}, %{browseFolders} or import from:',
	    importFiles: 'Import files from:',
	    browseFiles: 'browse files',
	    browseFolders: 'browse folders',
	    recoveredXFiles: {
	      0: 'We could not fully recover 1 file. Please re-select it and resume the upload.',
	      1: 'We could not fully recover %{smart_count} files. Please re-select them and resume the upload.'
	    },
	    recoveredAllFiles: 'We restored all files. You can now resume the upload.',
	    sessionRestored: 'Session restored',
	    reSelect: 'Re-select',
	    missingRequiredMetaFields: {
	      0: 'Missing required meta field: %{fields}.',
	      1: 'Missing required meta fields: %{fields}.'
	    },
	    // Used for native device camera buttons on mobile
	    takePictureBtn: 'Take Picture',
	    recordVideoBtn: 'Record Video'
	  }
	
	};
	
	exports = { default: _default };
	
	return exports 
})({})

const $$uppy$dashboard$lib__DashboardExports = (function (exports) {
 	function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
	var id = 0;
	function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
	const { UIPlugin } = $$uppy__coreExports;
	const { default: StatusBar } = $$uppy__status$barExports;;
	const { default: Informer } = $$uppy__informerExports;;
	const { default: ThumbnailGenerator } = $$uppy__thumbnail$generatorExports;;
	const { default: findAllDOMElements } = $$uppy$utils$lib__findAllDOMElementsExports;;
	const { default: toArray } = $$uppy$utils$lib__toArrayExports;;
	const { default: getDroppedFiles } = $$uppy$utils$lib__getDroppedFilesExports;;
	const { defaultPickerIcon } = $$uppy__provider$viewsExports;
	const { nanoid } = $nanoid__non$secureExports;
	const { default: memoizeOne } = $__memoize$oneExports;;
	const trapFocus = $$uppy$dashboard$lib$utils__trapFocusExports;;
	const { default: createSuperFocus } = $$uppy$dashboard$lib$utils__createSuperFocusExports;;
	const { default: DashboardUI } = $$uppy$dashboard$lib$components__DashboardExports;;
	const packageJson = {
	  "version": "3.7.1"
	};
	const { default: locale } = $$uppy$dashboard$lib__localeExports;;
	const memoize = memoizeOne.default || memoizeOne;
	const TAB_KEY = 9;
	const ESC_KEY = 27;
	function createPromise() {
	  const o = {};
	  o.promise = new Promise((resolve, reject) => {
	    o.resolve = resolve;
	    o.reject = reject;
	  });
	  return o;
	}
	
	/**
	 * Dashboard UI with previews, metadata editing, tabs for various services and more
	 */
	var _disabledNodes = /*#__PURE__*/_classPrivateFieldLooseKey("disabledNodes");
	var _generateLargeThumbnailIfSingleFile = /*#__PURE__*/_classPrivateFieldLooseKey("generateLargeThumbnailIfSingleFile");
	var _openFileEditorWhenFilesAdded = /*#__PURE__*/_classPrivateFieldLooseKey("openFileEditorWhenFilesAdded");
	var _attachRenderFunctionToTarget = /*#__PURE__*/_classPrivateFieldLooseKey("attachRenderFunctionToTarget");
	var _isTargetSupported = /*#__PURE__*/_classPrivateFieldLooseKey("isTargetSupported");
	var _getAcquirers = /*#__PURE__*/_classPrivateFieldLooseKey("getAcquirers");
	var _getProgressIndicators = /*#__PURE__*/_classPrivateFieldLooseKey("getProgressIndicators");
	var _getEditors = /*#__PURE__*/_classPrivateFieldLooseKey("getEditors");
	var _addSpecifiedPluginsFromOptions = /*#__PURE__*/_classPrivateFieldLooseKey("addSpecifiedPluginsFromOptions");
	var _autoDiscoverPlugins = /*#__PURE__*/_classPrivateFieldLooseKey("autoDiscoverPlugins");
	var _addSupportedPluginIfNoTarget = /*#__PURE__*/_classPrivateFieldLooseKey("addSupportedPluginIfNoTarget");
	class Dashboard extends UIPlugin {
	  constructor(uppy, _opts) {
	    var _this;
	    super(uppy, _opts);
	    _this = this;
	    Object.defineProperty(this, _disabledNodes, {
	      writable: true,
	      value: null
	    });
	    this.removeTarget = plugin => {
	      const pluginState = this.getPluginState();
	      // filter out the one we want to remove
	      const newTargets = pluginState.targets.filter(target => target.id !== plugin.id);
	      this.setPluginState({
	        targets: newTargets
	      });
	    };
	    this.addTarget = plugin => {
	      const callerPluginId = plugin.id || plugin.constructor.name;
	      const callerPluginName = plugin.title || callerPluginId;
	      const callerPluginType = plugin.type;
	      if (callerPluginType !== 'acquirer' && callerPluginType !== 'progressindicator' && callerPluginType !== 'editor') {
	        const msg = 'Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor';
	        this.uppy.log(msg, 'error');
	        return undefined;
	      }
	      const target = {
	        id: callerPluginId,
	        name: callerPluginName,
	        type: callerPluginType
	      };
	      const state = this.getPluginState();
	      const newTargets = state.targets.slice();
	      newTargets.push(target);
	      this.setPluginState({
	        targets: newTargets
	      });
	      return this.el;
	    };
	    this.hideAllPanels = () => {
	      const state = this.getPluginState();
	      const update = {
	        activePickerPanel: false,
	        showAddFilesPanel: false,
	        activeOverlayType: null,
	        fileCardFor: null,
	        showFileEditor: false
	      };
	      if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
	        // avoid doing a state update if nothing changed
	        return;
	      }
	      this.setPluginState(update);
	      this.uppy.emit('dashboard:close-panel', state.activePickerPanel.id);
	    };
	    this.showPanel = id => {
	      const {
	        targets
	      } = this.getPluginState();
	      const activePickerPanel = targets.filter(target => {
	        return target.type === 'acquirer' && target.id === id;
	      })[0];
	      this.setPluginState({
	        activePickerPanel,
	        activeOverlayType: 'PickerPanel'
	      });
	      this.uppy.emit('dashboard:show-panel', id);
	    };
	    this.canEditFile = file => {
	      const {
	        targets
	      } = this.getPluginState();
	      const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
	      return editors.some(target => this.uppy.getPlugin(target.id).canEditFile(file));
	    };
	    this.openFileEditor = file => {
	      const {
	        targets
	      } = this.getPluginState();
	      const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
	      this.setPluginState({
	        showFileEditor: true,
	        fileCardFor: file.id || null,
	        activeOverlayType: 'FileEditor'
	      });
	      editors.forEach(editor => {
	        this.uppy.getPlugin(editor.id).selectFile(file);
	      });
	    };
	    this.saveFileEditor = () => {
	      const {
	        targets
	      } = this.getPluginState();
	      const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
	      editors.forEach(editor => {
	        this.uppy.getPlugin(editor.id).save();
	      });
	      this.hideAllPanels();
	    };
	    this.openModal = () => {
	      const {
	        promise,
	        resolve
	      } = createPromise();
	      // save scroll position
	      this.savedScrollPosition = window.pageYOffset;
	      // save active element, so we can restore focus when modal is closed
	      this.savedActiveElement = document.activeElement;
	      if (this.opts.disablePageScrollWhenModalOpen) {
	        document.body.classList.add('uppy-Dashboard-isFixed');
	      }
	      if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
	        const handler = () => {
	          this.setPluginState({
	            isHidden: false
	          });
	          this.el.removeEventListener('animationend', handler, false);
	          resolve();
	        };
	        this.el.addEventListener('animationend', handler, false);
	      } else {
	        this.setPluginState({
	          isHidden: false
	        });
	        resolve();
	      }
	      if (this.opts.browserBackButtonClose) {
	        this.updateBrowserHistory();
	      }
	
	      // handle ESC and TAB keys in modal dialog
	      document.addEventListener('keydown', this.handleKeyDownInModal);
	      this.uppy.emit('dashboard:modal-open');
	      return promise;
	    };
	    this.closeModal = function (opts) {
	      if (opts === void 0) {
	        opts = {};
	      }
	      const {
	        // Whether the modal is being closed by the user (`true`) or by other means (e.g. browser back button)
	        manualClose = true
	      } = opts;
	      const {
	        isHidden,
	        isClosing
	      } = _this.getPluginState();
	      if (isHidden || isClosing) {
	        // short-circuit if animation is ongoing
	        return undefined;
	      }
	      const {
	        promise,
	        resolve
	      } = createPromise();
	      if (_this.opts.disablePageScrollWhenModalOpen) {
	        document.body.classList.remove('uppy-Dashboard-isFixed');
	      }
	      if (_this.opts.animateOpenClose) {
	        _this.setPluginState({
	          isClosing: true
	        });
	        const handler = () => {
	          _this.setPluginState({
	            isHidden: true,
	            isClosing: false
	          });
	          _this.superFocus.cancel();
	          _this.savedActiveElement.focus();
	          _this.el.removeEventListener('animationend', handler, false);
	          resolve();
	        };
	        _this.el.addEventListener('animationend', handler, false);
	      } else {
	        _this.setPluginState({
	          isHidden: true
	        });
	        _this.superFocus.cancel();
	        _this.savedActiveElement.focus();
	        resolve();
	      }
	
	      // handle ESC and TAB keys in modal dialog
	      document.removeEventListener('keydown', _this.handleKeyDownInModal);
	      if (manualClose) {
	        if (_this.opts.browserBackButtonClose) {
	          var _history$state;
	          // Make sure that the latest entry in the history state is our modal name
	          // eslint-disable-next-line no-restricted-globals
	          if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
	            // Go back in history to clear out the entry we created (ultimately closing the modal)
	            // eslint-disable-next-line no-restricted-globals
	            history.back();
	          }
	        }
	      }
	      _this.uppy.emit('dashboard:modal-closed');
	      return promise;
	    };
	    this.isModalOpen = () => {
	      return !this.getPluginState().isHidden || false;
	    };
	    this.requestCloseModal = () => {
	      if (this.opts.onRequestCloseModal) {
	        return this.opts.onRequestCloseModal();
	      }
	      return this.closeModal();
	    };
	    this.setDarkModeCapability = isDarkModeOn => {
	      const {
	        capabilities
	      } = this.uppy.getState();
	      this.uppy.setState({
	        capabilities: {
	          ...capabilities,
	          darkMode: isDarkModeOn
	        }
	      });
	    };
	    this.handleSystemDarkModeChange = event => {
	      const isDarkModeOnNow = event.matches;
	      this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? 'on' : 'off'}`);
	      this.setDarkModeCapability(isDarkModeOnNow);
	    };
	    this.toggleFileCard = (show, fileID) => {
	      const file = this.uppy.getFile(fileID);
	      if (show) {
	        this.uppy.emit('dashboard:file-edit-start', file);
	      } else {
	        this.uppy.emit('dashboard:file-edit-complete', file);
	      }
	      this.setPluginState({
	        fileCardFor: show ? fileID : null,
	        activeOverlayType: show ? 'FileCard' : null
	      });
	    };
	    this.toggleAddFilesPanel = show => {
	      this.setPluginState({
	        showAddFilesPanel: show,
	        activeOverlayType: show ? 'AddFiles' : null
	      });
	    };
	    this.addFiles = files => {
	      const descriptors = files.map(file => ({
	        source: this.id,
	        name: file.name,
	        type: file.type,
	        data: file,
	        meta: {
	          // path of the file relative to the ancestor directory the user selected.
	          // e.g. 'docs/Old Prague/airbnb.pdf'
	          relativePath: file.relativePath || file.webkitRelativePath || null
	        }
	      }));
	      try {
	        this.uppy.addFiles(descriptors);
	      } catch (err) {
	        this.uppy.log(err);
	      }
	    };
	    // ___Why make insides of Dashboard invisible until first ResizeObserver event is emitted?
	    //    ResizeOberserver doesn't emit the first resize event fast enough, users can see the jump from one .uppy-size-- to
	    //    another (e.g. in Safari)
	    // ___Why not apply visibility property to .uppy-Dashboard-inner?
	    //    Because ideally, acc to specs, ResizeObserver should see invisible elements as of width 0. So even though applying
	    //    invisibility to .uppy-Dashboard-inner works now, it may not work in the future.
	    this.startListeningToResize = () => {
	      // Watch for Dashboard container (`.uppy-Dashboard-inner`) resize
	      // and update containerWidth/containerHeight in plugin state accordingly.
	      // Emits first event on initialization.
	      this.resizeObserver = new ResizeObserver(entries => {
	        const uppyDashboardInnerEl = entries[0];
	        const {
	          width,
	          height
	        } = uppyDashboardInnerEl.contentRect;
	        this.setPluginState({
	          containerWidth: width,
	          containerHeight: height,
	          areInsidesReadyToBeVisible: true
	        });
	      });
	      this.resizeObserver.observe(this.el.querySelector('.uppy-Dashboard-inner'));
	
	      // If ResizeObserver fails to emit an event telling us what size to use - default to the mobile view
	      this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
	        const pluginState = this.getPluginState();
	        const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
	        if (
	        // We might want to enable this in the future
	
	        // if ResizeObserver hasn't yet fired,
	        !pluginState.areInsidesReadyToBeVisible
	        // and it's not due to the modal being closed
	        && !isModalAndClosed) {
	          this.uppy.log('[Dashboard] resize event didn’t fire on time: defaulted to mobile layout', 'warning');
	          this.setPluginState({
	            areInsidesReadyToBeVisible: true
	          });
	        }
	      }, 1000);
	    };
	    this.stopListeningToResize = () => {
	      this.resizeObserver.disconnect();
	      clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
	    };
	    // Records whether we have been interacting with uppy right now,
	    // which is then used to determine whether state updates should trigger a refocusing.
	    this.recordIfFocusedOnUppyRecently = event => {
	      if (this.el.contains(event.target)) {
	        this.ifFocusedOnUppyRecently = true;
	      } else {
	        this.ifFocusedOnUppyRecently = false;
	        // ___Why run this.superFocus.cancel here when it already runs in superFocusOnEachUpdate?
	        //    Because superFocus is debounced, when we move from Uppy to some other element on the page,
	        //    previously run superFocus sometimes hits and moves focus back to Uppy.
	        this.superFocus.cancel();
	      }
	    };
	    this.disableInteractiveElements = disable => {
	      var _classPrivateFieldLoo;
	      const NODES_TO_DISABLE = ['a[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', '[role="button"]:not([disabled])'];
	      const nodesToDisable = (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _disabledNodes)[_disabledNodes]) != null ? _classPrivateFieldLoo : toArray(this.el.querySelectorAll(NODES_TO_DISABLE)).filter(node => !node.classList.contains('uppy-Dashboard-close'));
	      for (const node of nodesToDisable) {
	        // Links can’t have `disabled` attr, so we use `aria-disabled` for a11y
	        if (node.tagName === 'A') {
	          node.setAttribute('aria-disabled', disable);
	        } else {
	          node.disabled = disable;
	        }
	      }
	      if (disable) {
	        _classPrivateFieldLooseBase(this, _disabledNodes)[_disabledNodes] = nodesToDisable;
	      } else {
	        _classPrivateFieldLooseBase(this, _disabledNodes)[_disabledNodes] = null;
	      }
	      this.dashboardIsDisabled = disable;
	    };
	    this.updateBrowserHistory = () => {
	      var _history$state2;
	      // Ensure history state does not already contain our modal name to avoid double-pushing
	      // eslint-disable-next-line no-restricted-globals
	      if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
	        // Push to history so that the page is not lost on browser back button press
	        // eslint-disable-next-line no-restricted-globals
	        history.pushState({
	          // eslint-disable-next-line no-restricted-globals
	          ...history.state,
	          [this.modalName]: true
	        }, '');
	      }
	
	      // Listen for back button presses
	      window.addEventListener('popstate', this.handlePopState, false);
	    };
	    this.handlePopState = event => {
	      var _event$state;
	      // Close the modal if the history state no longer contains our modal name
	      if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
	        this.closeModal({
	          manualClose: false
	        });
	      }
	
	      // When the browser back button is pressed and uppy is now the latest entry
	      // in the history but the modal is closed, fix the history by removing the
	      // uppy history entry.
	      // This occurs when another entry is added into the history state while the
	      // modal is open, and then the modal gets manually closed.
	      // Solves PR #575 (https://github.com/transloadit/uppy/pull/575)
	      if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
	        // eslint-disable-next-line no-restricted-globals
	        history.back();
	      }
	    };
	    this.handleKeyDownInModal = event => {
	      // close modal on esc key press
	      if (event.keyCode === ESC_KEY) this.requestCloseModal(event);
	      // trap focus on tab key press
	      if (event.keyCode === TAB_KEY) trapFocus.forModal(event, this.getPluginState().activeOverlayType, this.el);
	    };
	    this.handleClickOutside = () => {
	      if (this.opts.closeModalOnClickOutside) this.requestCloseModal();
	    };
	    this.handlePaste = event => {
	      // Let any acquirer plugin (Url/Webcam/etc.) handle pastes to the root
	      this.uppy.iteratePlugins(plugin => {
	        if (plugin.type === 'acquirer') {
	          // Every Plugin with .type acquirer can define handleRootPaste(event)
	          plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
	        }
	      });
	
	      // Add all dropped files
	      const files = toArray(event.clipboardData.files);
	      if (files.length > 0) {
	        this.uppy.log('[Dashboard] Files pasted');
	        this.addFiles(files);
	      }
	    };
	    this.handleInputChange = event => {
	      event.preventDefault();
	      const files = toArray(event.target.files);
	      if (files.length > 0) {
	        this.uppy.log('[Dashboard] Files selected through input');
	        this.addFiles(files);
	      }
	    };
	    this.handleDragOver = event => {
	      var _this$opts$onDragOver, _this$opts;
	      event.preventDefault();
	      event.stopPropagation();
	
	      // Check if some plugin can handle the datatransfer without files —
	      // for instance, the Url plugin can import a url
	      const canSomePluginHandleRootDrop = () => {
	        let somePluginCanHandleRootDrop = true;
	        this.uppy.iteratePlugins(plugin => {
	          if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
	            somePluginCanHandleRootDrop = true;
	          }
	        });
	        return somePluginCanHandleRootDrop;
	      };
	
	      // Check if the "type" of the datatransfer object includes files
	      const doesEventHaveFiles = () => {
	        const {
	          types
	        } = event.dataTransfer;
	        return types.some(type => type === 'Files');
	      };
	
	      // Deny drop, if no plugins can handle datatransfer, there are no files,
	      // or when opts.disabled is set, or new uploads are not allowed
	      const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
	      const hasFiles = doesEventHaveFiles(event);
	      if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled
	      // opts.disableLocalFiles should only be taken into account if no plugins
	      // can handle the datatransfer
	      || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
	        event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
	        clearTimeout(this.removeDragOverClassTimeout);
	        return;
	      }
	
	      // Add a small (+) icon on drop
	      // (and prevent browsers from interpreting this as files being _moved_ into the
	      // browser, https://github.com/transloadit/uppy/issues/1978).
	      event.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
	
	      clearTimeout(this.removeDragOverClassTimeout);
	      this.setPluginState({
	        isDraggingOver: true
	      });
	      (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
	    };
	    this.handleDragLeave = event => {
	      var _this$opts$onDragLeav, _this$opts2;
	      event.preventDefault();
	      event.stopPropagation();
	      clearTimeout(this.removeDragOverClassTimeout);
	      // Timeout against flickering, this solution is taken from drag-drop library.
	      // Solution with 'pointer-events: none' didn't work across browsers.
	      this.removeDragOverClassTimeout = setTimeout(() => {
	        this.setPluginState({
	          isDraggingOver: false
	        });
	      }, 50);
	      (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
	    };
	    this.handleDrop = async event => {
	      var _this$opts$onDrop, _this$opts3;
	      event.preventDefault();
	      event.stopPropagation();
	      clearTimeout(this.removeDragOverClassTimeout);
	      this.setPluginState({
	        isDraggingOver: false
	      });
	
	      // Let any acquirer plugin (Url/Webcam/etc.) handle drops to the root
	      this.uppy.iteratePlugins(plugin => {
	        if (plugin.type === 'acquirer') {
	          // Every Plugin with .type acquirer can define handleRootDrop(event)
	          plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
	        }
	      });
	
	      // Add all dropped files
	      let executedDropErrorOnce = false;
	      const logDropError = error => {
	        this.uppy.log(error, 'error');
	
	        // In practice all drop errors are most likely the same,
	        // so let's just show one to avoid overwhelming the user
	        if (!executedDropErrorOnce) {
	          this.uppy.info(error.message, 'error');
	          executedDropErrorOnce = true;
	        }
	      };
	      this.uppy.log('[Dashboard] Processing dropped files');
	
	      // Add all dropped files
	      const files = await getDroppedFiles(event.dataTransfer, {
	        logDropError
	      });
	      if (files.length > 0) {
	        this.uppy.log('[Dashboard] Files dropped');
	        this.addFiles(files);
	      }
	      (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
	    };
	    this.handleRequestThumbnail = file => {
	      if (!this.opts.waitForThumbnailsBeforeUpload) {
	        this.uppy.emit('thumbnail:request', file);
	      }
	    };
	    /**
	     * We cancel thumbnail requests when a file item component unmounts to avoid
	     * clogging up the queue when the user scrolls past many elements.
	     */
	    this.handleCancelThumbnail = file => {
	      if (!this.opts.waitForThumbnailsBeforeUpload) {
	        this.uppy.emit('thumbnail:cancel', file);
	      }
	    };
	    this.handleKeyDownInInline = event => {
	      // Trap focus on tab key press.
	      if (event.keyCode === TAB_KEY) trapFocus.forInline(event, this.getPluginState().activeOverlayType, this.el);
	    };
	    // ___Why do we listen to the 'paste' event on a document instead of onPaste={props.handlePaste} prop,
	    //    or this.el.addEventListener('paste')?
	    //    Because (at least) Chrome doesn't handle paste if focus is on some button, e.g. 'My Device'.
	    //    => Therefore, the best option is to listen to all 'paste' events, and only react to them when we are focused on our
	    //       particular Uppy instance.
	    // ___Why do we still need onPaste={props.handlePaste} for the DashboardUi?
	    //    Because if we click on the 'Drop files here' caption e.g., `document.activeElement` will be 'body'. Which means our
	    //    standard determination of whether we're pasting into our Uppy instance won't work.
	    //    => Therefore, we need a traditional onPaste={props.handlePaste} handler too.
	    this.handlePasteOnBody = event => {
	      const isFocusInOverlay = this.el.contains(document.activeElement);
	      if (isFocusInOverlay) {
	        this.handlePaste(event);
	      }
	    };
	    this.handleComplete = _ref => {
	      let {
	        failed
	      } = _ref;
	      if (this.opts.closeAfterFinish && failed.length === 0) {
	        // All uploads are done
	        this.requestCloseModal();
	      }
	    };
	    this.handleCancelRestore = () => {
	      this.uppy.emit('restore-canceled');
	    };
	    Object.defineProperty(this, _generateLargeThumbnailIfSingleFile, {
	      writable: true,
	      value: () => {
	        if (this.opts.disableThumbnailGenerator) {
	          return;
	        }
	        const LARGE_THUMBNAIL = 600;
	        const files = this.uppy.getFiles();
	        if (files.length === 1) {
	          const thumbnailGenerator = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
	          thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
	            thumbnailWidth: LARGE_THUMBNAIL
	          });
	          const fileForThumbnail = {
	            ...files[0],
	            preview: undefined
	          };
	          thumbnailGenerator.requestThumbnail(fileForThumbnail).then(() => {
	            thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
	              thumbnailWidth: this.opts.thumbnailWidth
	            });
	          });
	        }
	      }
	    });
	    Object.defineProperty(this, _openFileEditorWhenFilesAdded, {
	      writable: true,
	      value: files => {
	        const firstFile = files[0];
	        if (this.canEditFile(firstFile)) {
	          this.openFileEditor(firstFile);
	        }
	      }
	    });
	    this.initEvents = () => {
	      // Modal open button
	      if (this.opts.trigger && !this.opts.inline) {
	        const showModalTrigger = findAllDOMElements(this.opts.trigger);
	        if (showModalTrigger) {
	          showModalTrigger.forEach(trigger => trigger.addEventListener('click', this.openModal));
	        } else {
	          this.uppy.log('Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself', 'warning');
	        }
	      }
	      this.startListeningToResize();
	      document.addEventListener('paste', this.handlePasteOnBody);
	      this.uppy.on('plugin-added', _classPrivateFieldLooseBase(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
	      this.uppy.on('plugin-remove', this.removeTarget);
	      this.uppy.on('file-added', this.hideAllPanels);
	      this.uppy.on('dashboard:modal-closed', this.hideAllPanels);
	      this.uppy.on('file-editor:complete', this.hideAllPanels);
	      this.uppy.on('complete', this.handleComplete);
	      this.uppy.on('files-added', _classPrivateFieldLooseBase(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
	      this.uppy.on('file-removed', _classPrivateFieldLooseBase(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
	
	      // ___Why fire on capture?
	      //    Because this.ifFocusedOnUppyRecently needs to change before onUpdate() fires.
	      document.addEventListener('focus', this.recordIfFocusedOnUppyRecently, true);
	      document.addEventListener('click', this.recordIfFocusedOnUppyRecently, true);
	      if (this.opts.inline) {
	        this.el.addEventListener('keydown', this.handleKeyDownInInline);
	      }
	      if (this.opts.autoOpenFileEditor) {
	        this.uppy.on('files-added', _classPrivateFieldLooseBase(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
	      }
	    };
	    this.removeEvents = () => {
	      const showModalTrigger = findAllDOMElements(this.opts.trigger);
	      if (!this.opts.inline && showModalTrigger) {
	        showModalTrigger.forEach(trigger => trigger.removeEventListener('click', this.openModal));
	      }
	      this.stopListeningToResize();
	      document.removeEventListener('paste', this.handlePasteOnBody);
	      window.removeEventListener('popstate', this.handlePopState, false);
	      this.uppy.off('plugin-added', _classPrivateFieldLooseBase(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
	      this.uppy.off('plugin-remove', this.removeTarget);
	      this.uppy.off('file-added', this.hideAllPanels);
	      this.uppy.off('dashboard:modal-closed', this.hideAllPanels);
	      this.uppy.off('file-editor:complete', this.hideAllPanels);
	      this.uppy.off('complete', this.handleComplete);
	      this.uppy.off('files-added', _classPrivateFieldLooseBase(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
	      this.uppy.off('file-removed', _classPrivateFieldLooseBase(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
	      document.removeEventListener('focus', this.recordIfFocusedOnUppyRecently);
	      document.removeEventListener('click', this.recordIfFocusedOnUppyRecently);
	      if (this.opts.inline) {
	        this.el.removeEventListener('keydown', this.handleKeyDownInInline);
	      }
	      if (this.opts.autoOpenFileEditor) {
	        this.uppy.off('files-added', _classPrivateFieldLooseBase(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
	      }
	    };
	    this.superFocusOnEachUpdate = () => {
	      const isFocusInUppy = this.el.contains(document.activeElement);
	      // When focus is lost on the page (== focus is on body for most browsers, or focus is null for IE11)
	      const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
	      const isInformerHidden = this.uppy.getState().info.length === 0;
	      const isModal = !this.opts.inline;
	      if (
	      // If update is connected to showing the Informer - let the screen reader calmly read it.
	      isInformerHidden && (
	      // If we are in a modal - always superfocus without concern for other elements
	      // on the page (user is unlikely to want to interact with the rest of the page)
	      isModal
	      // If we are already inside of Uppy, or
	      || isFocusInUppy
	      // If we are not focused on anything BUT we have already, at least once, focused on uppy
	      //   1. We focus when isFocusNowhere, because when the element we were focused
	      //      on disappears (e.g. an overlay), - focus gets lost. If user is typing
	      //      something somewhere else on the page, - focus won't be 'nowhere'.
	      //   2. We only focus when focus is nowhere AND this.ifFocusedOnUppyRecently,
	      //      to avoid focus jumps if we do something else on the page.
	      //   [Practical check] Without '&& this.ifFocusedOnUppyRecently', in Safari, in inline mode,
	      //                     when file is uploading, - navigate via tab to the checkbox,
	      //                     try to press space multiple times. Focus will jump to Uppy.
	      || isFocusNowhere && this.ifFocusedOnUppyRecently)) {
	        this.superFocus(this.el, this.getPluginState().activeOverlayType);
	      } else {
	        this.superFocus.cancel();
	      }
	    };
	    this.afterUpdate = () => {
	      if (this.opts.disabled && !this.dashboardIsDisabled) {
	        this.disableInteractiveElements(true);
	        return;
	      }
	      if (!this.opts.disabled && this.dashboardIsDisabled) {
	        this.disableInteractiveElements(false);
	      }
	      this.superFocusOnEachUpdate();
	    };
	    this.saveFileCard = (meta, fileID) => {
	      this.uppy.setFileMeta(fileID, meta);
	      this.toggleFileCard(false, fileID);
	    };
	    Object.defineProperty(this, _attachRenderFunctionToTarget, {
	      writable: true,
	      value: target => {
	        const plugin = this.uppy.getPlugin(target.id);
	        return {
	          ...target,
	          icon: plugin.icon || this.opts.defaultPickerIcon,
	          render: plugin.render
	        };
	      }
	    });
	    Object.defineProperty(this, _isTargetSupported, {
	      writable: true,
	      value: target => {
	        const plugin = this.uppy.getPlugin(target.id);
	        // If the plugin does not provide a `supported` check, assume the plugin works everywhere.
	        if (typeof plugin.isSupported !== 'function') {
	          return true;
	        }
	        return plugin.isSupported();
	      }
	    });
	    Object.defineProperty(this, _getAcquirers, {
	      writable: true,
	      value: memoize(targets => {
	        return targets.filter(target => target.type === 'acquirer' && _classPrivateFieldLooseBase(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
	      })
	    });
	    Object.defineProperty(this, _getProgressIndicators, {
	      writable: true,
	      value: memoize(targets => {
	        return targets.filter(target => target.type === 'progressindicator').map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
	      })
	    });
	    Object.defineProperty(this, _getEditors, {
	      writable: true,
	      value: memoize(targets => {
	        return targets.filter(target => target.type === 'editor').map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
	      })
	    });
	    this.render = state => {
	      const pluginState = this.getPluginState();
	      const {
	        files,
	        capabilities,
	        allowNewUpload
	      } = state;
	      const {
	        newFiles,
	        uploadStartedFiles,
	        completeFiles,
	        erroredFiles,
	        inProgressFiles,
	        inProgressNotPausedFiles,
	        processingFiles,
	        isUploadStarted,
	        isAllComplete,
	        isAllErrored,
	        isAllPaused
	      } = this.uppy.getObjectOfFilesPerState();
	      const acquirers = _classPrivateFieldLooseBase(this, _getAcquirers)[_getAcquirers](pluginState.targets);
	      const progressindicators = _classPrivateFieldLooseBase(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
	      const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](pluginState.targets);
	      let theme;
	      if (this.opts.theme === 'auto') {
	        theme = capabilities.darkMode ? 'dark' : 'light';
	      } else {
	        theme = this.opts.theme;
	      }
	      if (['files', 'folders', 'both'].indexOf(this.opts.fileManagerSelectionType) < 0) {
	        this.opts.fileManagerSelectionType = 'files';
	        // eslint-disable-next-line no-console
	        console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
	      }
	      return DashboardUI({
	        state,
	        isHidden: pluginState.isHidden,
	        files,
	        newFiles,
	        uploadStartedFiles,
	        completeFiles,
	        erroredFiles,
	        inProgressFiles,
	        inProgressNotPausedFiles,
	        processingFiles,
	        isUploadStarted,
	        isAllComplete,
	        isAllErrored,
	        isAllPaused,
	        totalFileCount: Object.keys(files).length,
	        totalProgress: state.totalProgress,
	        allowNewUpload,
	        acquirers,
	        theme,
	        disabled: this.opts.disabled,
	        disableLocalFiles: this.opts.disableLocalFiles,
	        direction: this.opts.direction,
	        activePickerPanel: pluginState.activePickerPanel,
	        showFileEditor: pluginState.showFileEditor,
	        saveFileEditor: this.saveFileEditor,
	        disableInteractiveElements: this.disableInteractiveElements,
	        animateOpenClose: this.opts.animateOpenClose,
	        isClosing: pluginState.isClosing,
	        progressindicators,
	        editors,
	        autoProceed: this.uppy.opts.autoProceed,
	        id: this.id,
	        closeModal: this.requestCloseModal,
	        handleClickOutside: this.handleClickOutside,
	        handleInputChange: this.handleInputChange,
	        handlePaste: this.handlePaste,
	        inline: this.opts.inline,
	        showPanel: this.showPanel,
	        hideAllPanels: this.hideAllPanels,
	        i18n: this.i18n,
	        i18nArray: this.i18nArray,
	        uppy: this.uppy,
	        note: this.opts.note,
	        recoveredState: state.recoveredState,
	        metaFields: pluginState.metaFields,
	        resumableUploads: capabilities.resumableUploads || false,
	        individualCancellation: capabilities.individualCancellation,
	        isMobileDevice: capabilities.isMobileDevice,
	        fileCardFor: pluginState.fileCardFor,
	        toggleFileCard: this.toggleFileCard,
	        toggleAddFilesPanel: this.toggleAddFilesPanel,
	        showAddFilesPanel: pluginState.showAddFilesPanel,
	        saveFileCard: this.saveFileCard,
	        openFileEditor: this.openFileEditor,
	        canEditFile: this.canEditFile,
	        width: this.opts.width,
	        height: this.opts.height,
	        showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
	        fileManagerSelectionType: this.opts.fileManagerSelectionType,
	        proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
	        hideCancelButton: this.opts.hideCancelButton,
	        hideRetryButton: this.opts.hideRetryButton,
	        hidePauseResumeButton: this.opts.hidePauseResumeButton,
	        showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
	        containerWidth: pluginState.containerWidth,
	        containerHeight: pluginState.containerHeight,
	        areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
	        isTargetDOMEl: this.isTargetDOMEl,
	        parentElement: this.el,
	        allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
	        maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
	        requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
	        showSelectedFiles: this.opts.showSelectedFiles,
	        showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
	        showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
	        nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
	        singleFileFullScreen: this.opts.singleFileFullScreen,
	        handleCancelRestore: this.handleCancelRestore,
	        handleRequestThumbnail: this.handleRequestThumbnail,
	        handleCancelThumbnail: this.handleCancelThumbnail,
	        // drag props
	        isDraggingOver: pluginState.isDraggingOver,
	        handleDragOver: this.handleDragOver,
	        handleDragLeave: this.handleDragLeave,
	        handleDrop: this.handleDrop
	      });
	    };
	    Object.defineProperty(this, _addSpecifiedPluginsFromOptions, {
	      writable: true,
	      value: () => {
	        const plugins = this.opts.plugins || [];
	        plugins.forEach(pluginID => {
	          const plugin = this.uppy.getPlugin(pluginID);
	          if (plugin) {
	            plugin.mount(this, plugin);
	          } else {
	            this.uppy.log(`[Uppy] Dashboard could not find plugin '${pluginID}', make sure to uppy.use() the plugins you are specifying`, 'warning');
	          }
	        });
	      }
	    });
	    Object.defineProperty(this, _autoDiscoverPlugins, {
	      writable: true,
	      value: () => {
	        this.uppy.iteratePlugins(_classPrivateFieldLooseBase(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
	      }
	    });
	    Object.defineProperty(this, _addSupportedPluginIfNoTarget, {
	      writable: true,
	      value: plugin => {
	        var _plugin$opts;
	        // Only these types belong on the Dashboard,
	        // we wouldn’t want to try and mount Compressor or Tus, for example.
	        const typesAllowed = ['acquirer', 'editor'];
	        if (plugin && !((_plugin$opts = plugin.opts) != null && _plugin$opts.target) && typesAllowed.includes(plugin.type)) {
	          const pluginAlreadyAdded = this.getPluginState().targets.some(installedPlugin => plugin.id === installedPlugin.id);
	          if (!pluginAlreadyAdded) {
	            plugin.mount(this, plugin);
	          }
	        }
	      }
	    });
	    this.install = () => {
	      // Set default state for Dashboard
	      this.setPluginState({
	        isHidden: true,
	        fileCardFor: null,
	        activeOverlayType: null,
	        showAddFilesPanel: false,
	        activePickerPanel: false,
	        showFileEditor: false,
	        metaFields: this.opts.metaFields,
	        targets: [],
	        // We'll make them visible once .containerWidth is determined
	        areInsidesReadyToBeVisible: false,
	        isDraggingOver: false
	      });
	      const {
	        inline,
	        closeAfterFinish
	      } = this.opts;
	      if (inline && closeAfterFinish) {
	        throw new Error('[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.');
	      }
	      const {
	        allowMultipleUploads,
	        allowMultipleUploadBatches
	      } = this.uppy.opts;
	      if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
	        this.uppy.log('[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true', 'warning');
	      }
	      const {
	        target
	      } = this.opts;
	      if (target) {
	        this.mount(target, this);
	      }
	      if (!this.opts.disableStatusBar) {
	        this.uppy.use(StatusBar, {
	          id: `${this.id}:StatusBar`,
	          target: this,
	          hideUploadButton: this.opts.hideUploadButton,
	          hideRetryButton: this.opts.hideRetryButton,
	          hidePauseResumeButton: this.opts.hidePauseResumeButton,
	          hideCancelButton: this.opts.hideCancelButton,
	          showProgressDetails: this.opts.showProgressDetails,
	          hideAfterFinish: this.opts.hideProgressAfterFinish,
	          locale: this.opts.locale,
	          doneButtonHandler: this.opts.doneButtonHandler
	        });
	      }
	      if (!this.opts.disableInformer) {
	        this.uppy.use(Informer, {
	          id: `${this.id}:Informer`,
	          target: this
	        });
	      }
	      if (!this.opts.disableThumbnailGenerator) {
	        this.uppy.use(ThumbnailGenerator, {
	          id: `${this.id}:ThumbnailGenerator`,
	          thumbnailWidth: this.opts.thumbnailWidth,
	          thumbnailHeight: this.opts.thumbnailHeight,
	          thumbnailType: this.opts.thumbnailType,
	          waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
	          // If we don't block on thumbnails, we can lazily generate them
	          lazy: !this.opts.waitForThumbnailsBeforeUpload
	        });
	      }
	
	      // Dark Mode / theme
	      this.darkModeMediaQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
	      const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
	      this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? 'on' : 'off'}`);
	      this.setDarkModeCapability(isDarkModeOnFromTheStart);
	      if (this.opts.theme === 'auto') {
	        this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
	      }
	      _classPrivateFieldLooseBase(this, _addSpecifiedPluginsFromOptions)[_addSpecifiedPluginsFromOptions]();
	      _classPrivateFieldLooseBase(this, _autoDiscoverPlugins)[_autoDiscoverPlugins]();
	      this.initEvents();
	    };
	    this.uninstall = () => {
	      if (!this.opts.disableInformer) {
	        const informer = this.uppy.getPlugin(`${this.id}:Informer`);
	        // Checking if this plugin exists, in case it was removed by uppy-core
	        // before the Dashboard was.
	        if (informer) this.uppy.removePlugin(informer);
	      }
	      if (!this.opts.disableStatusBar) {
	        const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
	        if (statusBar) this.uppy.removePlugin(statusBar);
	      }
	      if (!this.opts.disableThumbnailGenerator) {
	        const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
	        if (thumbnail) this.uppy.removePlugin(thumbnail);
	      }
	      const plugins = this.opts.plugins || [];
	      plugins.forEach(pluginID => {
	        const plugin = this.uppy.getPlugin(pluginID);
	        if (plugin) plugin.unmount();
	      });
	      if (this.opts.theme === 'auto') {
	        this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
	      }
	      if (this.opts.disablePageScrollWhenModalOpen) {
	        document.body.classList.remove('uppy-Dashboard-isFixed');
	      }
	      this.unmount();
	      this.removeEvents();
	    };
	    this.id = this.opts.id || 'Dashboard';
	    this.title = 'Dashboard';
	    this.type = 'orchestrator';
	    this.modalName = `uppy-Dashboard-${nanoid()}`;
	    this.defaultLocale = locale;
	
	    // set default options, must be kept in sync with packages/@uppy/react/src/DashboardModal.js
	    const defaultOptions = {
	      target: 'body',
	      metaFields: [],
	      trigger: null,
	      inline: false,
	      width: 750,
	      height: 550,
	      thumbnailWidth: 280,
	      thumbnailType: 'image/jpeg',
	      waitForThumbnailsBeforeUpload: false,
	      defaultPickerIcon,
	      showLinkToFileUploadResult: false,
	      showProgressDetails: false,
	      hideUploadButton: false,
	      hideCancelButton: false,
	      hideRetryButton: false,
	      hidePauseResumeButton: false,
	      hideProgressAfterFinish: false,
	      doneButtonHandler: () => {
	        this.uppy.clearUploadedFiles();
	        this.requestCloseModal();
	      },
	      note: null,
	      closeModalOnClickOutside: false,
	      closeAfterFinish: false,
	      singleFileFullScreen: true,
	      disableStatusBar: false,
	      disableInformer: false,
	      disableThumbnailGenerator: false,
	      disablePageScrollWhenModalOpen: true,
	      animateOpenClose: true,
	      fileManagerSelectionType: 'files',
	      proudlyDisplayPoweredByUppy: true,
	      onRequestCloseModal: () => this.closeModal(),
	      showSelectedFiles: true,
	      showRemoveButtonAfterComplete: false,
	      browserBackButtonClose: false,
	      showNativePhotoCameraButton: false,
	      showNativeVideoCameraButton: false,
	      theme: 'light',
	      autoOpenFileEditor: false,
	      disabled: false,
	      disableLocalFiles: false
	    };
	
	    // merge default options with the ones set by user
	    this.opts = {
	      ...defaultOptions,
	      ..._opts
	    };
	    this.i18nInit();
	    this.superFocus = createSuperFocus();
	    this.ifFocusedOnUppyRecently = false;
	
	    // Timeouts
	    this.makeDashboardInsidesVisibleAnywayTimeout = null;
	    this.removeDragOverClassTimeout = null;
	  }
	}
	Dashboard.VERSION = packageJson.version;
	
	exports = { default:  Dashboard };
	
	return exports 
})({})

const $$uppy__dashboardExports = (function (exports) {
 	// import {default as __default} from "./Dashboard.js";
	;
	
	const { default: $__a } = $$uppy$dashboard$lib__DashboardExports;
	
	exports = { default: __default };
	
	return exports 
})({})

const $nested_folder__util1Exports = (function (exports) {
 	//@ts-check
	// export const a = 1;
	
	var a = () => {
	    
	}
	
	// const a = 1;
	// export {
	//     a
	// }
	
	const b = 1;
	const c = 8;
	{
	    b,
	    c
	}
	
	exports = { a, B: b, c };
	
	return exports 
})({})

const $nested_folder__indexUtilExports = (function (exports) {
 	//@ts-check
	const { B: _B1 } = $nested_folder__util1Exports;
	
	
	const B = _B1;
	
	exports = { B, default: a };
	
	return exports 
})({})


//@app.js: 
//@ts-check

const { default: Dashboard } = $$uppy__dashboardExports;

// import { default as A } from "./routes";
const { default: A } = $nested_folder__indexUtilExports;;
// import A from "./nested_folder/util1";

console.log(Dashboard);
console.log(A);


