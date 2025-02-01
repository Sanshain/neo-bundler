(function () {
  'use strict';

  function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function _classPrivateFieldLooseBase$3(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
  var id$3 = 0;
  function _classPrivateFieldLooseKey$3(name) { return "__private_" + id$3++ + "_" + name; }

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
  var _apply = /*#__PURE__*/_classPrivateFieldLooseKey$3("apply");
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
        locales.forEach(_classPrivateFieldLooseBase$3(this, _apply)[_apply], this);
      } else {
        _classPrivateFieldLooseBase$3(this, _apply)[_apply](locales);
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  let urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  let nanoid = (size = 21) => {
    let id = '';
    let i = size;
    while (i--) {
      id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id
  };

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

  function isObject$2(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$2;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$2 = freeGlobal || freeSelf || Function('return this')();

  var _root = root$2;

  var root$1 = _root;

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
  var now$1 = function() {
    return root$1.Date.now();
  };

  var now_1 = now$1;

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
  function trimmedEndIndex$1(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex$1;

  var trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim$1;

  var root = _root;

  /** Built-in value references. */
  var Symbol$3 = root.Symbol;

  var _Symbol = Symbol$3;

  var Symbol$2 = _Symbol;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag$1;

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
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString$1;

  var Symbol$1 = _Symbol,
      getRawTag = _getRawTag,
      objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$1(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  var _baseGetTag = baseGetTag$1;

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

  function isObjectLike$1(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike$1;

  var baseGetTag = _baseGetTag,
      isObjectLike = isObjectLike_1;

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
  function isSymbol$1(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol$1;

  var baseTrim = _baseTrim,
      isObject$1 = isObject_1,
      isSymbol = isSymbol_1;

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
  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$1(other) ? (other + '') : other;
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

  var toNumber_1 = toNumber$1;

  var isObject = isObject_1,
      now = now_1,
      toNumber = toNumber_1;

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
  function debounce$1(func, wait, options) {
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

  var debounce_1 = debounce$1;

  var debounce$2 = /*@__PURE__*/getDefaultExportFromCjs(debounce_1);

  // Adapted from https://github.com/Flet/prettier-bytes/
  // Changing 1000 bytes to 1024, so we can keep uppercase KB vs kB
  // ISC License (c) Dan Flettre https://github.com/Flet/prettier-bytes/blob/master/LICENSE
  var prettierBytes$2 = function prettierBytes (num) {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new TypeError(`Expected a number, got ${typeof num}`)
    }

    const neg = num < 0;
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return `${(neg ? '-' : '') + num} B`
    }

    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
    num = Number(num / Math.pow(1024, exponent));
    const unit = units[exponent];

    if (num >= 10 || num % 1 === 0) {
      // Do not show decimals when the number is two-digit, or if the number has no
      // decimal component.
      return `${(neg ? '-' : '') + num.toFixed(0)} ${unit}`
    }
    return `${(neg ? '-' : '') + num.toFixed(1)} ${unit}`
  };

  var prettierBytes$3 = /*@__PURE__*/getDefaultExportFromCjs(prettierBytes$2);

  var n$1,l$2,u$2,i$2,o$2,r$2,f$2,c$2={},s$2=[],a$2=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h$2=Array.isArray;function v$2(n,l){for(var u in l)n[u]=l[u];return n}function p$2(n){var l=n.parentNode;l&&l.removeChild(n);}function y$1(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n$1.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return d$2(l,f,i,o,null)}function d$2(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u$2:r,__i:-1,__u:0};return null==r&&null!=l$2.vnode&&l$2.vnode(f),f}function _$1(){return {current:null}}function g$2(n){return n.children}function b$2(n,l){this.props=n,this.context=l;}function m$2(n,l){if(null==l)return n.__?m$2(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?m$2(n):null}function k$2(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k$2(n)}}function w$2(n){(!n.__d&&(n.__d=!0)&&i$2.push(n)&&!x$1.__r++||o$2!==l$2.debounceRendering)&&((o$2=l$2.debounceRendering)||r$2)(x$1);}function x$1(){var n,u,t,o,r,e,c,s,a;for(i$2.sort(f$2);n=i$2.shift();)n.__d&&(u=i$2.length,o=void 0,e=(r=(t=n).__v).__e,s=[],a=[],(c=t.__P)&&((o=v$2({},r)).__v=r.__v+1,l$2.vnode&&l$2.vnode(o),L$1(c,o,r,t.__n,void 0!==c.ownerSVGElement,32&r.__u?[e]:null,s,null==e?m$2(r):e,!!(32&r.__u),a),o.__.__k[o.__i]=o,M$1(s,o,a),o.__e!=e&&k$2(o)),i$2.length>u&&i$2.sort(f$2));x$1.__r=0;}function C$1(n,l,u,t,i,o,r,f,e,a,h){var v,p,y,d,_,g=t&&t.__k||s$2,b=l.length;for(u.__d=e,P$1(u,l,g),e=u.__d,v=0;v<b;v++)null!=(y=u.__k[v])&&"boolean"!=typeof y&&"function"!=typeof y&&(p=-1===y.__i?c$2:g[y.__i]||c$2,y.__i=v,L$1(n,y,p,i,o,r,f,e,a,h),d=y.__e,y.ref&&p.ref!=y.ref&&(p.ref&&z$2(p.ref,null,y),h.push(y.ref,y.__c||d,y)),null==_&&null!=d&&(_=d),65536&y.__u||p.__k===y.__k?e=S$1(y,e,n):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=_;}function P$1(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)null!=(i=n.__k[t]=null==(i=l[t])||"boolean"==typeof i||"function"==typeof i?null:"string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?d$2(null,i,null,null,i):h$2(i)?d$2(g$2,{children:i},null,null,null):i.__b>0?d$2(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)?(i.__=n,i.__b=n.__b+1,f=H$1(i,u,r=t+a,s),i.__i=f,o=null,-1!==f&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f===r+1?a++:f>r?s>e-r?a+=f-r:a--:a=f<r&&f==r-1?f-r:0,f!==t+a&&(i.__u|=65536))):(o=u[t])&&null==o.key&&o.__e&&(o.__e==n.__d&&(n.__d=m$2(o)),N$1(o,o,!1),u[t]=null,s--);if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=m$2(o)),N$1(o,o));}function S$1(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=S$1(t[i],l,u));return l}return n.__e!=l&&(u.insertBefore(n.__e,l||null),l=n.__e),l&&l.nextSibling}function $$1(n,l){return l=l||[],null==n||"boolean"==typeof n||(h$2(n)?n.some(function(n){$$1(n,l);}):l.push(n)),l}function H$1(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++;}}return -1}function I$1(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a$2.test(l)?u:u+"px";}function T$2(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||I$1(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||I$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/,"$1")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=Date.now(),n.addEventListener(l,o?D$1:A$1,o)):n.removeEventListener(l,o?D$1:A$1,o);else {if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&"rowSpan"!==l&&"colSpan"!==l&&"role"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function A$1(n){var u=this.l[n.type+!1];if(n.t){if(n.t<=u.u)return}else n.t=Date.now();return u(l$2.event?l$2.event(n):n)}function D$1(n){return this.l[n.type+!0](l$2.event?l$2.event(n):n)}function L$1(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,m,k,w,x,P,S,$,H,I,T,A=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l$2.__b)&&a(u);n:if("function"==typeof A)try{if(w=u.props,x=(a=A.contextType)&&i[a.__c],P=a?x?x.props.value:a.__:i,t.__c?k=(p=u.__c=t.__c).__=p.__E:("prototype"in A&&A.prototype.render?u.__c=p=new A(w,P):(u.__c=p=new b$2(w,P),p.constructor=A,p.render=O$1),x&&x.sub(p),p.props=w,p.state||(p.state={}),p.context=P,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=A.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v$2({},p.__s)),v$2(p.__s,A.getDerivedStateFromProps(w,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==A.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else {if(null==A.getDerivedStateFromProps&&w!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,P),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,P)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=w,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),S=0;S<p._sb.length;S++)p.__h.push(p._sb[S]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,P),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,m);});}if(p.context=P,p.props=w,p.__P=n,p.__e=!1,$=l$2.__r,H=0,"prototype"in A&&A.prototype.render){for(p.state=p.__s,p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),I=0;I<p._sb.length;I++)p.__h.push(p._sb[I]);p._sb=[];}else do{p.__d=!1,$&&$(u),a=p.render(p.props,p.state,p.context),p.state=p.__s;}while(p.__d&&++H<25);p.state=p.__s,null!=p.getChildContext&&(i=v$2(v$2({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(m=p.getSnapshotBeforeUpdate(d,_)),C$1(n,h$2(T=null!=a&&a.type===g$2&&null==a.key?a.props.children:a)?T:[T],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__u&=-161,p.__h.length&&f.push(p),k&&(p.__E=p.__=null);}catch(n){u.__v=null,c||null!=r?(u.__e=e,u.__u|=c?160:32,r[r.indexOf(e)]=null):(u.__e=t.__e,u.__k=t.__k),l$2.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=j$2(t.__e,u,t,i,o,r,f,c,s);(a=l$2.diffed)&&a(u);}function M$1(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)z$2(t[i],t[++i],t[++i]);l$2.__c&&l$2.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$2.__e(n,u.__v);}});}function j$2(l,u,t,i,o,r,f,e,s){var a,v,y,d,_,g,b,k=t.props,w=u.props,x=u.type;if("svg"===x&&(o=!0),null!=r)for(a=0;a<r.length;a++)if((_=r[a])&&"setAttribute"in _==!!x&&(x?_.localName===x:3===_.nodeType)){l=_,r[a]=null;break}if(null==l){if(null===x)return document.createTextNode(w);l=o?document.createElementNS("http://www.w3.org/2000/svg",x):document.createElement(x,w.is&&w),r=null,e=!1;}if(null===x)k===w||e&&l.data===w||(l.data=w);else {if(r=r&&n$1.call(l.childNodes),k=t.props||c$2,!e&&null!=r)for(k={},a=0;a<l.attributes.length;a++)k[(_=l.attributes[a]).name]=_.value;for(a in k)_=k[a],"children"==a||("dangerouslySetInnerHTML"==a?y=_:"key"===a||a in w||T$2(l,a,null,_,o));for(a in w)_=w[a],"children"==a?d=_:"dangerouslySetInnerHTML"==a?v=_:"value"==a?g=_:"checked"==a?b=_:"key"===a||e&&"function"!=typeof _||k[a]===_||T$2(l,a,_,k[a],o);if(v)e||y&&(v.__html===y.__html||v.__html===l.innerHTML)||(l.innerHTML=v.__html),u.__k=[];else if(y&&(l.innerHTML=""),C$1(l,h$2(d)?d:[d],u,t,i,o&&"foreignObject"!==x,r,f,r?r[0]:t.__k&&m$2(t,0),e,s),null!=r)for(a=r.length;a--;)null!=r[a]&&p$2(r[a]);e||(a="value",void 0!==g&&(g!==l[a]||"progress"===x&&!g||"option"===x&&g!==k[a])&&T$2(l,a,g,k[a],!1),a="checked",void 0!==b&&b!==l[a]&&T$2(l,a,b,k[a],!1));}return l}function z$2(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$2.__e(n,t);}}function N$1(n,u,t){var i,o;if(l$2.unmount&&l$2.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||z$2(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$2.__e(n,u);}i.base=i.__P=null,n.__c=void 0;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&N$1(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||p$2(n.__e),n.__=n.__e=n.__d=void 0;}function O$1(n,l,u){return this.constructor(n,u)}function q$1(u,t,i){var o,r,f,e;l$2.__&&l$2.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],L$1(t,u=(!o&&i||t).__k=y$1(g$2,null,[u]),r||c$2,c$2,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n$1.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),M$1(f,u,e);}function E$1(l,u,t){var i,o,r,f,e=v$2({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n$1.call(arguments,2):t),d$2(l.type,e,i||l.key,o||l.ref,null)}n$1=s$2.slice,l$2={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$2=0,b$2.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v$2({},this.state),"function"==typeof n&&(n=n(v$2({},u),this.props)),n&&v$2(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),w$2(this));},b$2.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w$2(this));},b$2.prototype.render=g$2,i$2=[],r$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f$2=function(n,l){return n.__v.__b-l.__v.__b},x$1.__r=0;

  /**
   * Check if an object is a DOM element. Duck-typing based on `nodeType`.
   */
  function isDOMElement(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    if (!('nodeType' in obj)) return false;
    return obj.nodeType === Node.ELEMENT_NODE;
  }

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

  /**
   * Core plugin logic that all plugins share.
   *
   * BasePlugin does not contain DOM rendering so it can be used for plugins
   * without a user interface.
   *
   * See `Plugin` for the extended version with Preact rendering for interfaces.
   */
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

  function _classPrivateFieldLooseBase$2(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
  var id$2 = 0;
  function _classPrivateFieldLooseKey$2(name) { return "__private_" + id$2++ + "_" + name; }

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
  var _updateUI = /*#__PURE__*/_classPrivateFieldLooseKey$2("updateUI");
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
        _classPrivateFieldLooseBase$2(this, _updateUI)[_updateUI] = debounce(state => {
          // plugin could be removed, but this.rerender is debounced below,
          // so it could still be called even after uppy.removePlugin or uppy.close
          // hence the check
          if (!this.uppy.getPlugin(this.id)) return;
          q$1(this.render(state), uppyRootElement);
          this.afterUpdate();
        });
        this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
        if (this.opts.replaceTargetContent) {
          // Doing render(h(null), targetElement), which should have been
          // a better way, since because the component might need to do additional cleanup when it is removed,
          // stopped working — Preact just adds null into target, not replacing
          targetElement.innerHTML = '';
        }
        q$1(this.render(this.uppy.getState()), uppyRootElement);
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
        (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase$2(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
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
  var UIPlugin$1 = UIPlugin;

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

  var statusBarStates = {
    STATE_ERROR: 'error',
    STATE_WAITING: 'waiting',
    STATE_PREPROCESSING: 'preprocessing',
    STATE_UPLOADING: 'uploading',
    STATE_POSTPROCESSING: 'postprocessing',
    STATE_COMPLETE: 'complete'
  };

  var classnames = {exports: {}};

  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
  classnames.exports;

  (function (module) {
  	/* global define */

  	(function () {

  		var hasOwn = {}.hasOwnProperty;

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

  		if (module.exports) {
  			classNames.default = classNames;
  			module.exports = classNames;
  		} else {
  			window.classNames = classNames;
  		}
  	}()); 
  } (classnames));

  var classnamesExports = classnames.exports;
  var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

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
    return y$1("button", {
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
    return y$1("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
      "aria-label": i18n('retryUpload'),
      onClick: () => uppy.retryAll().catch(() => {/* Error reported and handled via an event */}),
      "data-uppy-super-focusable": true,
      "data-cy": "retry"
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "8",
      height: "10",
      viewBox: "0 0 8 10"
    }, y$1("path", {
      d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
    })), i18n('retry'));
  }
  function CancelBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return y$1("button", {
      type: "button",
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      title: i18n('cancel'),
      "aria-label": i18n('cancel'),
      onClick: () => uppy.cancelAll(),
      "data-cy": "cancel",
      "data-uppy-super-focusable": true
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, y$1("g", {
      fill: "none",
      fillRule: "evenodd"
    }, y$1("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), y$1("path", {
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
    return y$1("button", {
      title: title,
      "aria-label": title,
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      type: "button",
      onClick: togglePauseResume,
      "data-cy": "togglePauseResume",
      "data-uppy-super-focusable": true
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, y$1("g", {
      fill: "none",
      fillRule: "evenodd"
    }, y$1("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), y$1("path", {
      fill: "#FFF",
      d: isAllPaused ? 'M6 4.25L11.5 8 6 11.75z' : 'M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z'
    }))));
  }
  function DoneBtn(props) {
    const {
      i18n,
      doneButtonHandler
    } = props;
    return y$1("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
      onClick: doneButtonHandler,
      "data-uppy-super-focusable": true
    }, i18n('done'));
  }
  function LoadingSpinner() {
    return y$1("svg", {
      className: "uppy-StatusBar-spinner",
      "aria-hidden": "true",
      focusable: "false",
      width: "14",
      height: "14"
    }, y$1("path", {
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
    return y$1("div", {
      className: "uppy-StatusBar-content"
    }, y$1(LoadingSpinner, null), mode === 'determinate' ? `${roundedValue}% ${dot} ` : '', message);
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
    return y$1("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, ifShowFilesUploadedOfTotal && i18n('filesUploadedOfTotal', {
      complete,
      smart_count: numUploads
    }), y$1("span", {
      className: "uppy-StatusBar-additionalInfo"
    }, ifShowFilesUploadedOfTotal && renderDot(), i18n('dataUploadedOfTotal', {
      complete: prettierBytes$3(totalUploadedSize),
      total: prettierBytes$3(totalSize)
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
    return y$1("div", {
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
    return y$1("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, y$1("div", {
      className: "uppy-StatusBar-statusSecondaryHint"
    }, i18n('xMoreFilesAdded', {
      smart_count: newFiles
    })), y$1("button", {
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
          return y$1(ProgressDetails, {
            numUploads: numUploads,
            complete: complete,
            totalUploadedSize: totalUploadedSize,
            totalSize: totalSize,
            totalETA: totalETA,
            i18n: i18n
          });
        }
        return y$1(FileUploadCount, {
          i18n: i18n,
          complete: complete,
          numUploads: numUploads
        });
      }
      return null;
    }
    return y$1("div", {
      className: "uppy-StatusBar-content",
      "aria-label": title,
      title: title
    }, !isAllPaused ? y$1(LoadingSpinner, null) : null, y$1("div", {
      className: "uppy-StatusBar-status"
    }, y$1("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, supportsUploadProgress ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? y$1(UploadNewlyAddedFiles, {
      i18n: i18n,
      newFiles: newFiles,
      startUpload: startUpload
    }) : null));
  }
  function ProgressBarComplete(props) {
    const {
      i18n
    } = props;
    return y$1("div", {
      className: "uppy-StatusBar-content",
      role: "status",
      title: i18n('complete')
    }, y$1("div", {
      className: "uppy-StatusBar-status"
    }, y$1("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "15",
      height: "11",
      viewBox: "0 0 15 11"
    }, y$1("path", {
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

    return y$1("div", {
      className: "uppy-StatusBar-content",
      title: i18n('uploadFailed')
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, y$1("path", {
      d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
    })), y$1("div", {
      className: "uppy-StatusBar-status"
    }, y$1("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, i18n('uploadFailed'), y$1("button", {
      className: "uppy-u-reset uppy-StatusBar-details",
      "aria-label": i18n('showErrorDetails'),
      "data-microtip-position": "top-right",
      "data-microtip-size": "medium",
      onClick: displayErrorAlert,
      type: "button"
    }, "?")), y$1(FileUploadCount, {
      i18n: i18n,
      complete: complete,
      numUploads: numUploads
    })));
  }

  const {
    STATE_ERROR,
    STATE_WAITING,
    STATE_PREPROCESSING,
    STATE_UPLOADING,
    STATE_POSTPROCESSING,
    STATE_COMPLETE
  } = statusBarStates;

  // TODO: rename the function to StatusBarUI on the next major.
  function StatusBar$1(props) {
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
    return y$1("div", {
      className: statusBarClassNames,
      "aria-hidden": isHidden
    }, y$1("div", {
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
          return y$1(ProgressBarProcessing, {
            progress: calculateProcessingProgress(files)
          });
        case STATE_COMPLETE:
          return y$1(ProgressBarComplete, {
            i18n: i18n
          });
        case STATE_ERROR:
          return y$1(ProgressBarError, {
            error: error,
            i18n: i18n,
            numUploads: numUploads,
            complete: complete
          });
        case STATE_UPLOADING:
          return y$1(ProgressBarUploading, {
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
    })(), y$1("div", {
      className: "uppy-StatusBar-actions"
    }, recoveredState || showUploadBtn ? y$1(UploadBtn, {
      newFiles: newFiles,
      isUploadStarted: isUploadStarted,
      recoveredState: recoveredState,
      i18n: i18n,
      isSomeGhost: isSomeGhost,
      startUpload: startUpload,
      uploadState: uploadState
    }) : null, showRetryBtn ? y$1(RetryBtn, {
      i18n: i18n,
      uppy: uppy
    }) : null, showPauseResumeBtn ? y$1(PauseResumeButton, {
      isAllPaused: isAllPaused,
      i18n: i18n,
      isAllComplete: isAllComplete,
      resumableUploads: resumableUploads,
      uppy: uppy
    }) : null, showCancelBtn ? y$1(CancelBtn, {
      i18n: i18n,
      uppy: uppy
    }) : null, showDoneBtn ? y$1(DoneBtn, {
      i18n: i18n,
      doneButtonHandler: doneButtonHandler
    }) : null));
  }

  var locale$2 = {
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

  function _classPrivateFieldLooseBase$1(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
  var id$1 = 0;
  function _classPrivateFieldLooseKey$1(name) { return "__private_" + id$1++ + "_" + name; }
  const packageJson$3 = {
    "version": "3.2.5"
  };
  const speedFilterHalfLife = 2000;
  const ETAFilterHalfLife = 2000;
  function getUploadingState$1(error, isAllComplete, recoveredState, files) {
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
  var _lastUpdateTime = /*#__PURE__*/_classPrivateFieldLooseKey$1("lastUpdateTime");
  var _previousUploadedBytes = /*#__PURE__*/_classPrivateFieldLooseKey$1("previousUploadedBytes");
  var _previousSpeed = /*#__PURE__*/_classPrivateFieldLooseKey$1("previousSpeed");
  var _previousETA = /*#__PURE__*/_classPrivateFieldLooseKey$1("previousETA");
  var _computeSmoothETA = /*#__PURE__*/_classPrivateFieldLooseKey$1("computeSmoothETA");
  var _onUploadStart = /*#__PURE__*/_classPrivateFieldLooseKey$1("onUploadStart");
  class StatusBar extends UIPlugin$1 {
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
          _classPrivateFieldLooseBase$1(this, _previousSpeed)[_previousSpeed] = null;
          _classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA] = null;
          if (recoveredState) {
            _classPrivateFieldLooseBase$1(this, _previousUploadedBytes)[_previousUploadedBytes] = Object.values(recoveredState.files).reduce((pv, _ref) => {
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
          _classPrivateFieldLooseBase$1(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
          _classPrivateFieldLooseBase$1(this, _previousUploadedBytes)[_previousUploadedBytes] = 0;
        }
      });
      this.id = this.opts.id || 'StatusBar';
      this.title = 'StatusBar';
      this.type = 'progressindicator';
      this.defaultLocale = locale$2;

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
      const totalETA = _classPrivateFieldLooseBase$1(this, _computeSmoothETA)[_computeSmoothETA]({
        uploaded: totalUploadedSize,
        total: totalSize,
        remaining: totalSize - totalUploadedSize
      });
      return StatusBar$1({
        error,
        uploadState: getUploadingState$1(error, isAllComplete, recoveredState, state.files || {}),
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
      this.uppy.on('upload', _classPrivateFieldLooseBase$1(this, _onUploadStart)[_onUploadStart]);

      // To cover the use case where the status bar is installed while the upload
      // has started, we set `lastUpdateTime` right away.
      _classPrivateFieldLooseBase$1(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
      _classPrivateFieldLooseBase$1(this, _previousUploadedBytes)[_previousUploadedBytes] = this.uppy.getFiles().reduce((pv, file) => pv + file.progress.bytesUploaded, 0);
    }
    uninstall() {
      this.unmount();
      this.uppy.off('upload', _classPrivateFieldLooseBase$1(this, _onUploadStart)[_onUploadStart]);
    }
  }
  function _computeSmoothETA2(totalBytes) {
    var _classPrivateFieldLoo, _classPrivateFieldLoo2;
    if (totalBytes.total === 0 || totalBytes.remaining === 0) {
      return 0;
    }

    // When state is restored, lastUpdateTime is still nullish at this point.
    (_classPrivateFieldLoo2 = (_classPrivateFieldLoo = _classPrivateFieldLooseBase$1(this, _lastUpdateTime))[_lastUpdateTime]) != null ? _classPrivateFieldLoo2 : _classPrivateFieldLoo[_lastUpdateTime] = performance.now();
    const dt = performance.now() - _classPrivateFieldLooseBase$1(this, _lastUpdateTime)[_lastUpdateTime];
    if (dt === 0) {
      var _classPrivateFieldLoo3;
      return Math.round(((_classPrivateFieldLoo3 = _classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo3 : 0) / 100) / 10;
    }
    const uploadedBytesSinceLastTick = totalBytes.uploaded - _classPrivateFieldLooseBase$1(this, _previousUploadedBytes)[_previousUploadedBytes];
    _classPrivateFieldLooseBase$1(this, _previousUploadedBytes)[_previousUploadedBytes] = totalBytes.uploaded;

    // uploadedBytesSinceLastTick can be negative in some cases (packet loss?)
    // in which case, we wait for next tick to update ETA.
    if (uploadedBytesSinceLastTick <= 0) {
      var _classPrivateFieldLoo4;
      return Math.round(((_classPrivateFieldLoo4 = _classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo4 : 0) / 100) / 10;
    }
    const currentSpeed = uploadedBytesSinceLastTick / dt;
    const filteredSpeed = _classPrivateFieldLooseBase$1(this, _previousSpeed)[_previousSpeed] == null ? currentSpeed : emaFilter(currentSpeed, _classPrivateFieldLooseBase$1(this, _previousSpeed)[_previousSpeed], speedFilterHalfLife, dt);
    _classPrivateFieldLooseBase$1(this, _previousSpeed)[_previousSpeed] = filteredSpeed;
    const instantETA = totalBytes.remaining / filteredSpeed;
    const updatedPreviousETA = Math.max(_classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA] - dt, 0);
    const filteredETA = _classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA] == null ? instantETA : emaFilter(instantETA, updatedPreviousETA, ETAFilterHalfLife, dt);
    _classPrivateFieldLooseBase$1(this, _previousETA)[_previousETA] = filteredETA;
    _classPrivateFieldLooseBase$1(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
    return Math.round(filteredETA / 100) / 10;
  }
  StatusBar.VERSION = packageJson$3.version;

  const TRANSITION_MS = 300;
  class FadeIn extends b$2 {
    constructor() {
      super(...arguments);
      this.ref = _$1();
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
      return y$1("div", {
        className: "uppy-Informer-animated",
        ref: this.ref
      }, children);
    }
  }

  /* eslint-disable */
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
  class TransitionGroup extends b$2 {
    constructor(props, context) {
      super(props, context);
      this.refs = {};
      this.state = {
        children: getChildMapping($$1($$1(this.props.children)) || [])
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
      const nextChildMapping = getChildMapping($$1(nextProps.children) || []);
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
      const currentChildMapping = getChildMapping($$1(this.props.children) || []);
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
      const currentChildMapping = getChildMapping($$1(this.props.children) || []);
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
      const currentChildMapping = getChildMapping($$1(this.props.children) || []);
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
        return E$1(childFactory(child), {
          ref,
          key
        });
      }).filter(Boolean);
      return y$1(component, props, childrenToRender);
    }
  }
  TransitionGroup.defaultProps = {
    component: 'span',
    childFactory: identity
  };

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions  */
  const packageJson$2 = {
    "version": "3.0.4"
  };
  /**
   * Informer
   * Shows rad message bubbles
   * used like this: `uppy.info('hello world', 'info', 5000)`
   * or for errors: `uppy.info('Error uploading img.jpg', 'error', 5000)`
   *
   */
  class Informer extends UIPlugin$1 {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.render = state => {
        return y$1("div", {
          className: "uppy uppy-Informer"
        }, y$1(TransitionGroup, null, state.info.map(info => y$1(FadeIn, {
          key: info.message
        }, y$1("p", {
          role: "alert"
        }, info.message, ' ', info.details && y$1("span", {
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
  Informer.VERSION = packageJson$2.version;

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

  /**
   * Check if a URL string is an object URL from `URL.createObjectURL`.
   */
  function isObjectURL(url) {
    return url.startsWith('blob:');
  }

  function isPreviewSupported(fileType) {
    if (!fileType) return false;
    // list of images that browsers can preview
    return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
  }

  function e$1(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var t$1="undefined"!=typeof self?self:global;const s$1="undefined"!=typeof navigator,i$1=s$1&&"undefined"==typeof HTMLImageElement,n=!("undefined"==typeof global||"undefined"==typeof process||!process.versions||!process.versions.node),r$1=t$1.Buffer,a$1=!!r$1,h$1=e=>void 0!==e;function f$1(e){return void 0===e||(e instanceof Map?0===e.size:0===Object.values(e).filter(h$1).length)}function l$1(e){let t=new Error(e);throw delete t.stack,t}function o$1(e){let t=function(e){let t=0;return e.ifd0.enabled&&(t+=1024),e.exif.enabled&&(t+=2048),e.makerNote&&(t+=2048),e.userComment&&(t+=1024),e.gps.enabled&&(t+=512),e.interop.enabled&&(t+=100),e.ifd1.enabled&&(t+=1024),t+2048}(e);return e.jfif.enabled&&(t+=50),e.xmp.enabled&&(t+=2e4),e.iptc.enabled&&(t+=14e3),e.icc.enabled&&(t+=6e3),t}const u$1=e=>String.fromCharCode.apply(null,e),d$1="undefined"!=typeof TextDecoder?new TextDecoder("utf-8"):void 0;class c$1{static from(e,t){return e instanceof this&&e.le===t?e:new c$1(e,void 0,void 0,t)}constructor(e,t=0,s,i){if("boolean"==typeof i&&(this.le=i),Array.isArray(e)&&(e=new Uint8Array(e)),0===e)this.byteOffset=0,this.byteLength=0;else if(e instanceof ArrayBuffer){void 0===s&&(s=e.byteLength-t);let i=new DataView(e,t,s);this._swapDataView(i);}else if(e instanceof Uint8Array||e instanceof DataView||e instanceof c$1){void 0===s&&(s=e.byteLength-t),(t+=e.byteOffset)+s>e.byteOffset+e.byteLength&&l$1("Creating view outside of available memory in ArrayBuffer");let i=new DataView(e.buffer,t,s);this._swapDataView(i);}else if("number"==typeof e){let t=new DataView(new ArrayBuffer(e));this._swapDataView(t);}else l$1("Invalid input argument for BufferView: "+e);}_swapArrayBuffer(e){this._swapDataView(new DataView(e));}_swapBuffer(e){this._swapDataView(new DataView(e.buffer,e.byteOffset,e.byteLength));}_swapDataView(e){this.dataView=e,this.buffer=e.buffer,this.byteOffset=e.byteOffset,this.byteLength=e.byteLength;}_lengthToEnd(e){return this.byteLength-e}set(e,t,s=c$1){return e instanceof DataView||e instanceof c$1?e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer&&(e=new Uint8Array(e)),e instanceof Uint8Array||l$1("BufferView.set(): Invalid data argument."),this.toUint8().set(e,t),new s(this,t,e.byteLength)}subarray(e,t){return t=t||this._lengthToEnd(e),new c$1(this,e,t)}toUint8(){return new Uint8Array(this.buffer,this.byteOffset,this.byteLength)}getUint8Array(e,t){return new Uint8Array(this.buffer,this.byteOffset+e,t)}getString(e=0,t=this.byteLength){let s=this.getUint8Array(e,t);return i=s,d$1?d$1.decode(i):a$1?Buffer.from(i).toString("utf8"):decodeURIComponent(escape(u$1(i)));var i;}getLatin1String(e=0,t=this.byteLength){let s=this.getUint8Array(e,t);return u$1(s)}getUnicodeString(e=0,t=this.byteLength){const s=[];for(let i=0;i<t&&e+i<this.byteLength;i+=2)s.push(this.getUint16(e+i));return u$1(s)}getInt8(e){return this.dataView.getInt8(e)}getUint8(e){return this.dataView.getUint8(e)}getInt16(e,t=this.le){return this.dataView.getInt16(e,t)}getInt32(e,t=this.le){return this.dataView.getInt32(e,t)}getUint16(e,t=this.le){return this.dataView.getUint16(e,t)}getUint32(e,t=this.le){return this.dataView.getUint32(e,t)}getFloat32(e,t=this.le){return this.dataView.getFloat32(e,t)}getFloat64(e,t=this.le){return this.dataView.getFloat64(e,t)}getFloat(e,t=this.le){return this.dataView.getFloat32(e,t)}getDouble(e,t=this.le){return this.dataView.getFloat64(e,t)}getUintBytes(e,t,s){switch(t){case 1:return this.getUint8(e,s);case 2:return this.getUint16(e,s);case 4:return this.getUint32(e,s);case 8:return this.getUint64&&this.getUint64(e,s)}}getUint(e,t,s){switch(t){case 8:return this.getUint8(e,s);case 16:return this.getUint16(e,s);case 32:return this.getUint32(e,s);case 64:return this.getUint64&&this.getUint64(e,s)}}toString(e){return this.dataView.toString(e,this.constructor.name)}ensureChunk(){}}function p$1(e,t){l$1(`${e} '${t}' was not loaded, try using full build of exifr.`);}class g$1 extends Map{constructor(e){super(),this.kind=e;}get(e,t){return this.has(e)||p$1(this.kind,e),t&&(e in t||function(e,t){l$1(`Unknown ${e} '${t}'.`);}(this.kind,e),t[e].enabled||p$1(this.kind,e)),super.get(e)}keyList(){return Array.from(this.keys())}}var m$1=new g$1("file parser"),y=new g$1("segment parser"),b$1=new g$1("file reader");let w$1=t$1.fetch;function k$1(e,t){return (i=e).startsWith("data:")||i.length>1e4?v$1(e,t,"base64"):n&&e.includes("://")?O(e,t,"url",S):n?v$1(e,t,"fs"):s$1?O(e,t,"url",S):void l$1("Invalid input argument");var i;}async function O(e,t,s,i){return b$1.has(s)?v$1(e,t,s):i?async function(e,t){let s=await t(e);return new c$1(s)}(e,i):void l$1(`Parser ${s} is not loaded`)}async function v$1(e,t,s){let i=new(b$1.get(s))(e,t);return await i.read(),i}const S=e=>w$1(e).then((e=>e.arrayBuffer())),A=e=>new Promise(((t,s)=>{let i=new FileReader;i.onloadend=()=>t(i.result||new ArrayBuffer),i.onerror=s,i.readAsArrayBuffer(e);}));class U extends Map{get tagKeys(){return this.allKeys||(this.allKeys=Array.from(this.keys())),this.allKeys}get tagValues(){return this.allValues||(this.allValues=Array.from(this.values())),this.allValues}}function x(e,t,s){let i=new U;for(let[e,t]of s)i.set(e,t);if(Array.isArray(t))for(let s of t)e.set(s,i);else e.set(t,i);return i}function C(e,t,s){let i,n=e.get(t);for(i of s)n.set(i[0],i[1]);}const B$1=new Map,V=new Map,I=new Map,L=["chunked","firstChunkSize","firstChunkSizeNode","firstChunkSizeBrowser","chunkSize","chunkLimit"],T$1=["jfif","xmp","icc","iptc","ihdr"],z$1=["tiff",...T$1],P=["ifd0","ifd1","exif","gps","interop"],F$1=[...z$1,...P],j$1=["makerNote","userComment"],E=["translateKeys","translateValues","reviveValues","multiSegment"],M=[...E,"sanitize","mergeOutput","silentErrors"];class _{get translate(){return this.translateKeys||this.translateValues||this.reviveValues}}class D extends _{get needed(){return this.enabled||this.deps.size>0}constructor(t,s,i,n){if(super(),e$1(this,"enabled",!1),e$1(this,"skip",new Set),e$1(this,"pick",new Set),e$1(this,"deps",new Set),e$1(this,"translateKeys",!1),e$1(this,"translateValues",!1),e$1(this,"reviveValues",!1),this.key=t,this.enabled=s,this.parse=this.enabled,this.applyInheritables(n),this.canBeFiltered=P.includes(t),this.canBeFiltered&&(this.dict=B$1.get(t)),void 0!==i)if(Array.isArray(i))this.parse=this.enabled=!0,this.canBeFiltered&&i.length>0&&this.translateTagSet(i,this.pick);else if("object"==typeof i){if(this.enabled=!0,this.parse=!1!==i.parse,this.canBeFiltered){let{pick:e,skip:t}=i;e&&e.length>0&&this.translateTagSet(e,this.pick),t&&t.length>0&&this.translateTagSet(t,this.skip);}this.applyInheritables(i);}else !0===i||!1===i?this.parse=this.enabled=i:l$1(`Invalid options argument: ${i}`);}applyInheritables(e){let t,s;for(t of E)s=e[t],void 0!==s&&(this[t]=s);}translateTagSet(e,t){if(this.dict){let s,i,{tagKeys:n,tagValues:r}=this.dict;for(s of e)"string"==typeof s?(i=r.indexOf(s),-1===i&&(i=n.indexOf(Number(s))),-1!==i&&t.add(Number(n[i]))):t.add(s);}else for(let s of e)t.add(s);}finalizeFilters(){!this.enabled&&this.deps.size>0?(this.enabled=!0,X(this.pick,this.deps)):this.enabled&&this.pick.size>0&&X(this.pick,this.deps);}}var N={jfif:!1,tiff:!0,xmp:!1,icc:!1,iptc:!1,ifd0:!0,ifd1:!1,exif:!0,gps:!0,interop:!1,ihdr:void 0,makerNote:!1,userComment:!1,multiSegment:!1,skip:[],pick:[],translateKeys:!0,translateValues:!0,reviveValues:!0,sanitize:!0,mergeOutput:!0,silentErrors:!0,chunked:!0,firstChunkSize:void 0,firstChunkSizeNode:512,firstChunkSizeBrowser:65536,chunkSize:65536,chunkLimit:5},$=new Map;class R extends _{static useCached(e){let t=$.get(e);return void 0!==t||(t=new this(e),$.set(e,t)),t}constructor(e){super(),!0===e?this.setupFromTrue():void 0===e?this.setupFromUndefined():Array.isArray(e)?this.setupFromArray(e):"object"==typeof e?this.setupFromObject(e):l$1(`Invalid options argument ${e}`),void 0===this.firstChunkSize&&(this.firstChunkSize=s$1?this.firstChunkSizeBrowser:this.firstChunkSizeNode),this.mergeOutput&&(this.ifd1.enabled=!1),this.filterNestedSegmentTags(),this.traverseTiffDependencyTree(),this.checkLoadedPlugins();}setupFromUndefined(){let e;for(e of L)this[e]=N[e];for(e of M)this[e]=N[e];for(e of j$1)this[e]=N[e];for(e of F$1)this[e]=new D(e,N[e],void 0,this);}setupFromTrue(){let e;for(e of L)this[e]=N[e];for(e of M)this[e]=N[e];for(e of j$1)this[e]=!0;for(e of F$1)this[e]=new D(e,!0,void 0,this);}setupFromArray(e){let t;for(t of L)this[t]=N[t];for(t of M)this[t]=N[t];for(t of j$1)this[t]=N[t];for(t of F$1)this[t]=new D(t,!1,void 0,this);this.setupGlobalFilters(e,void 0,P);}setupFromObject(e){let t;for(t of(P.ifd0=P.ifd0||P.image,P.ifd1=P.ifd1||P.thumbnail,Object.assign(this,e),L))this[t]=W(e[t],N[t]);for(t of M)this[t]=W(e[t],N[t]);for(t of j$1)this[t]=W(e[t],N[t]);for(t of z$1)this[t]=new D(t,N[t],e[t],this);for(t of P)this[t]=new D(t,N[t],e[t],this.tiff);this.setupGlobalFilters(e.pick,e.skip,P,F$1),!0===e.tiff?this.batchEnableWithBool(P,!0):!1===e.tiff?this.batchEnableWithUserValue(P,e):Array.isArray(e.tiff)?this.setupGlobalFilters(e.tiff,void 0,P):"object"==typeof e.tiff&&this.setupGlobalFilters(e.tiff.pick,e.tiff.skip,P);}batchEnableWithBool(e,t){for(let s of e)this[s].enabled=t;}batchEnableWithUserValue(e,t){for(let s of e){let e=t[s];this[s].enabled=!1!==e&&void 0!==e;}}setupGlobalFilters(e,t,s,i=s){if(e&&e.length){for(let e of i)this[e].enabled=!1;let t=K(e,s);for(let[e,s]of t)X(this[e].pick,s),this[e].enabled=!0;}else if(t&&t.length){let e=K(t,s);for(let[t,s]of e)X(this[t].skip,s);}}filterNestedSegmentTags(){let{ifd0:e,exif:t,xmp:s,iptc:i,icc:n}=this;this.makerNote?t.deps.add(37500):t.skip.add(37500),this.userComment?t.deps.add(37510):t.skip.add(37510),s.enabled||e.skip.add(700),i.enabled||e.skip.add(33723),n.enabled||e.skip.add(34675);}traverseTiffDependencyTree(){let{ifd0:e,exif:t,gps:s,interop:i}=this;i.needed&&(t.deps.add(40965),e.deps.add(40965)),t.needed&&e.deps.add(34665),s.needed&&e.deps.add(34853),this.tiff.enabled=P.some((e=>!0===this[e].enabled))||this.makerNote||this.userComment;for(let e of P)this[e].finalizeFilters();}get onlyTiff(){return !T$1.map((e=>this[e].enabled)).some((e=>!0===e))&&this.tiff.enabled}checkLoadedPlugins(){for(let e of z$1)this[e].enabled&&!y.has(e)&&p$1("segment parser",e);}}function K(e,t){let s,i,n,r,a=[];for(n of t){for(r of(s=B$1.get(n),i=[],s))(e.includes(r[0])||e.includes(r[1]))&&i.push(r[0]);i.length&&a.push([n,i]);}return a}function W(e,t){return void 0!==e?e:void 0!==t?t:void 0}function X(e,t){for(let s of t)e.add(s);}e$1(R,"default",N);class H{constructor(t){e$1(this,"parsers",{}),e$1(this,"output",{}),e$1(this,"errors",[]),e$1(this,"pushToErrors",(e=>this.errors.push(e))),this.options=R.useCached(t);}async read(e){this.file=await function(e,t){return "string"==typeof e?k$1(e,t):s$1&&!i$1&&e instanceof HTMLImageElement?k$1(e.src,t):e instanceof Uint8Array||e instanceof ArrayBuffer||e instanceof DataView?new c$1(e):s$1&&e instanceof Blob?O(e,t,"blob",A):void l$1("Invalid input argument")}(e,this.options);}setup(){if(this.fileParser)return;let{file:e}=this,t=e.getUint16(0);for(let[s,i]of m$1)if(i.canHandle(e,t))return this.fileParser=new i(this.options,this.file,this.parsers),e[s]=!0;this.file.close&&this.file.close(),l$1("Unknown file format");}async parse(){let{output:e,errors:t}=this;return this.setup(),this.options.silentErrors?(await this.executeParsers().catch(this.pushToErrors),t.push(...this.fileParser.errors)):await this.executeParsers(),this.file.close&&this.file.close(),this.options.silentErrors&&t.length>0&&(e.errors=t),f$1(s=e)?void 0:s;var s;}async executeParsers(){let{output:e}=this;await this.fileParser.parse();let t=Object.values(this.parsers).map((async t=>{let s=await t.parse();t.assignToOutput(e,s);}));this.options.silentErrors&&(t=t.map((e=>e.catch(this.pushToErrors)))),await Promise.all(t);}async extractThumbnail(){this.setup();let{options:e,file:t}=this,s=y.get("tiff",e);var i;if(t.tiff?i={start:0,type:"tiff"}:t.jpeg&&(i=await this.fileParser.getOrFindSegment("tiff")),void 0===i)return;let n=await this.fileParser.ensureSegmentChunk(i),r=this.parsers.tiff=new s(n,e,t),a=await r.extractThumbnail();return t.close&&t.close(),a}}async function Y(e,t){let s=new H(t);return await s.read(e),s.parse()}var G=Object.freeze({__proto__:null,parse:Y,Exifr:H,fileParsers:m$1,segmentParsers:y,fileReaders:b$1,tagKeys:B$1,tagValues:V,tagRevivers:I,createDictionary:x,extendDictionary:C,fetchUrlAsArrayBuffer:S,readBlobAsArrayBuffer:A,chunkedProps:L,otherSegments:T$1,segments:z$1,tiffBlocks:P,segmentsAndBlocks:F$1,tiffExtractables:j$1,inheritables:E,allFormatters:M,Options:R});class J{static findPosition(e,t){let s=e.getUint16(t+2)+2,i="function"==typeof this.headerLength?this.headerLength(e,t,s):this.headerLength,n=t+i,r=s-i;return {offset:t,length:s,headerLength:i,start:n,size:r,end:n+r}}static parse(e,t={}){return new this(e,new R({[this.type]:t}),e).parse()}normalizeInput(e){return e instanceof c$1?e:new c$1(e)}constructor(t,s={},i){e$1(this,"errors",[]),e$1(this,"raw",new Map),e$1(this,"handleError",(e=>{if(!this.options.silentErrors)throw e;this.errors.push(e.message);})),this.chunk=this.normalizeInput(t),this.file=i,this.type=this.constructor.type,this.globalOptions=this.options=s,this.localOptions=s[this.type],this.canTranslate=this.localOptions&&this.localOptions.translate;}translate(){this.canTranslate&&(this.translated=this.translateBlock(this.raw,this.type));}get output(){return this.translated?this.translated:this.raw?Object.fromEntries(this.raw):void 0}translateBlock(e,t){let s=I.get(t),i=V.get(t),n=B$1.get(t),r=this.options[t],a=r.reviveValues&&!!s,h=r.translateValues&&!!i,f=r.translateKeys&&!!n,l={};for(let[t,r]of e)a&&s.has(t)?r=s.get(t)(r):h&&i.has(t)&&(r=this.translateValue(r,i.get(t))),f&&n.has(t)&&(t=n.get(t)||t),l[t]=r;return l}translateValue(e,t){return t[e]||t.DEFAULT||e}assignToOutput(e,t){this.assignObjectToOutput(e,this.constructor.type,t);}assignObjectToOutput(e,t,s){if(this.globalOptions.mergeOutput)return Object.assign(e,s);e[t]?Object.assign(e[t],s):e[t]=s;}}e$1(J,"headerLength",4),e$1(J,"type",void 0),e$1(J,"multiSegment",!1),e$1(J,"canHandle",(()=>!1));function q(e){return 192===e||194===e||196===e||219===e||221===e||218===e||254===e}function Q(e){return e>=224&&e<=239}function Z(e,t,s){for(let[i,n]of y)if(n.canHandle(e,t,s))return i}class ee extends class{constructor(t,s,i){e$1(this,"errors",[]),e$1(this,"ensureSegmentChunk",(async e=>{let t=e.start,s=e.size||65536;if(this.file.chunked)if(this.file.available(t,s))e.chunk=this.file.subarray(t,s);else try{e.chunk=await this.file.readChunk(t,s);}catch(t){l$1(`Couldn't read segment: ${JSON.stringify(e)}. ${t.message}`);}else this.file.byteLength>t+s?e.chunk=this.file.subarray(t,s):void 0===e.size?e.chunk=this.file.subarray(t):l$1("Segment unreachable: "+JSON.stringify(e));return e.chunk})),this.extendOptions&&this.extendOptions(t),this.options=t,this.file=s,this.parsers=i;}injectSegment(e,t){this.options[e].enabled&&this.createParser(e,t);}createParser(e,t){let s=new(y.get(e))(t,this.options,this.file);return this.parsers[e]=s}createParsers(e){for(let t of e){let{type:e,chunk:s}=t,i=this.options[e];if(i&&i.enabled){let t=this.parsers[e];t&&t.append||t||this.createParser(e,s);}}}async readSegments(e){let t=e.map(this.ensureSegmentChunk);await Promise.all(t);}}{constructor(...t){super(...t),e$1(this,"appSegments",[]),e$1(this,"jpegSegments",[]),e$1(this,"unknownSegments",[]);}static canHandle(e,t){return 65496===t}async parse(){await this.findAppSegments(),await this.readSegments(this.appSegments),this.mergeMultiSegments(),this.createParsers(this.mergedAppSegments||this.appSegments);}setupSegmentFinderArgs(e){!0===e?(this.findAll=!0,this.wanted=new Set(y.keyList())):(e=void 0===e?y.keyList().filter((e=>this.options[e].enabled)):e.filter((e=>this.options[e].enabled&&y.has(e))),this.findAll=!1,this.remaining=new Set(e),this.wanted=new Set(e)),this.unfinishedMultiSegment=!1;}async findAppSegments(e=0,t){this.setupSegmentFinderArgs(t);let{file:s,findAll:i,wanted:n,remaining:r}=this;if(!i&&this.file.chunked&&(i=Array.from(n).some((e=>{let t=y.get(e),s=this.options[e];return t.multiSegment&&s.multiSegment})),i&&await this.file.readWhole()),e=this.findAppSegmentsInRange(e,s.byteLength),!this.options.onlyTiff&&s.chunked){let t=!1;for(;r.size>0&&!t&&(s.canReadNextChunk||this.unfinishedMultiSegment);){let{nextChunkOffset:i}=s,n=this.appSegments.some((e=>!this.file.available(e.offset||e.start,e.length||e.size)));if(t=e>i&&!n?!await s.readNextChunk(e):!await s.readNextChunk(i),void 0===(e=this.findAppSegmentsInRange(e,s.byteLength)))return}}}findAppSegmentsInRange(e,t){t-=2;let s,i,n,r,a,h,{file:f,findAll:l,wanted:o,remaining:u,options:d}=this;for(;e<t;e++)if(255===f.getUint8(e))if(s=f.getUint8(e+1),Q(s)){if(i=f.getUint16(e+2),n=Z(f,e,i),n&&o.has(n)&&(r=y.get(n),a=r.findPosition(f,e),h=d[n],a.type=n,this.appSegments.push(a),!l&&(r.multiSegment&&h.multiSegment?(this.unfinishedMultiSegment=a.chunkNumber<a.chunkCount,this.unfinishedMultiSegment||u.delete(n)):u.delete(n),0===u.size)))break;d.recordUnknownSegments&&(a=J.findPosition(f,e),a.marker=s,this.unknownSegments.push(a)),e+=i+1;}else if(q(s)){if(i=f.getUint16(e+2),218===s&&!1!==d.stopAfterSos)return;d.recordJpegSegments&&this.jpegSegments.push({offset:e,length:i,marker:s}),e+=i+1;}return e}mergeMultiSegments(){if(!this.appSegments.some((e=>e.multiSegment)))return;let e=function(e,t){let s,i,n,r=new Map;for(let a=0;a<e.length;a++)s=e[a],i=s[t],r.has(i)?n=r.get(i):r.set(i,n=[]),n.push(s);return Array.from(r)}(this.appSegments,"type");this.mergedAppSegments=e.map((([e,t])=>{let s=y.get(e,this.options);if(s.handleMultiSegments){return {type:e,chunk:s.handleMultiSegments(t)}}return t[0]}));}getSegment(e){return this.appSegments.find((t=>t.type===e))}async getOrFindSegment(e){let t=this.getSegment(e);return void 0===t&&(await this.findAppSegments(0,[e]),t=this.getSegment(e)),t}}e$1(ee,"type","jpeg"),m$1.set("jpeg",ee);const te=[void 0,1,1,2,4,8,1,1,2,4,8,4,8,4];class se extends J{parseHeader(){var e=this.chunk.getUint16();18761===e?this.le=!0:19789===e&&(this.le=!1),this.chunk.le=this.le,this.headerParsed=!0;}parseTags(e,t,s=new Map){let{pick:i,skip:n}=this.options[t];i=new Set(i);let r=i.size>0,a=0===n.size,h=this.chunk.getUint16(e);e+=2;for(let f=0;f<h;f++){let h=this.chunk.getUint16(e);if(r){if(i.has(h)&&(s.set(h,this.parseTag(e,h,t)),i.delete(h),0===i.size))break}else !a&&n.has(h)||s.set(h,this.parseTag(e,h,t));e+=12;}return s}parseTag(e,t,s){let{chunk:i}=this,n=i.getUint16(e+2),r=i.getUint32(e+4),a=te[n];if(a*r<=4?e+=8:e=i.getUint32(e+8),(n<1||n>13)&&l$1(`Invalid TIFF value type. block: ${s.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e}`),e>i.byteLength&&l$1(`Invalid TIFF value offset. block: ${s.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e} is outside of chunk size ${i.byteLength}`),1===n)return i.getUint8Array(e,r);if(2===n)return ""===(h=function(e){for(;e.endsWith("\0");)e=e.slice(0,-1);return e}(h=i.getString(e,r)).trim())?void 0:h;var h;if(7===n)return i.getUint8Array(e,r);if(1===r)return this.parseTagValue(n,e);{let t=new(function(e){switch(e){case 1:return Uint8Array;case 3:return Uint16Array;case 4:return Uint32Array;case 5:return Array;case 6:return Int8Array;case 8:return Int16Array;case 9:return Int32Array;case 10:return Array;case 11:return Float32Array;case 12:return Float64Array;default:return Array}}(n))(r),s=a;for(let i=0;i<r;i++)t[i]=this.parseTagValue(n,e),e+=s;return t}}parseTagValue(e,t){let{chunk:s}=this;switch(e){case 1:return s.getUint8(t);case 3:return s.getUint16(t);case 4:return s.getUint32(t);case 5:return s.getUint32(t)/s.getUint32(t+4);case 6:return s.getInt8(t);case 8:return s.getInt16(t);case 9:return s.getInt32(t);case 10:return s.getInt32(t)/s.getInt32(t+4);case 11:return s.getFloat(t);case 12:return s.getDouble(t);case 13:return s.getUint32(t);default:l$1(`Invalid tiff type ${e}`);}}}class ie extends se{static canHandle(e,t){return 225===e.getUint8(t+1)&&1165519206===e.getUint32(t+4)&&0===e.getUint16(t+8)}async parse(){this.parseHeader();let{options:e}=this;return e.ifd0.enabled&&await this.parseIfd0Block(),e.exif.enabled&&await this.safeParse("parseExifBlock"),e.gps.enabled&&await this.safeParse("parseGpsBlock"),e.interop.enabled&&await this.safeParse("parseInteropBlock"),e.ifd1.enabled&&await this.safeParse("parseThumbnailBlock"),this.createOutput()}safeParse(e){let t=this[e]();return void 0!==t.catch&&(t=t.catch(this.handleError)),t}findIfd0Offset(){void 0===this.ifd0Offset&&(this.ifd0Offset=this.chunk.getUint32(4));}findIfd1Offset(){if(void 0===this.ifd1Offset){this.findIfd0Offset();let e=this.chunk.getUint16(this.ifd0Offset),t=this.ifd0Offset+2+12*e;this.ifd1Offset=this.chunk.getUint32(t);}}parseBlock(e,t){let s=new Map;return this[t]=s,this.parseTags(e,t,s),s}async parseIfd0Block(){if(this.ifd0)return;let{file:e}=this;this.findIfd0Offset(),this.ifd0Offset<8&&l$1("Malformed EXIF data"),!e.chunked&&this.ifd0Offset>e.byteLength&&l$1(`IFD0 offset points to outside of file.\nthis.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`),e.tiff&&await e.ensureChunk(this.ifd0Offset,o$1(this.options));let t=this.parseBlock(this.ifd0Offset,"ifd0");return 0!==t.size?(this.exifOffset=t.get(34665),this.interopOffset=t.get(40965),this.gpsOffset=t.get(34853),this.xmp=t.get(700),this.iptc=t.get(33723),this.icc=t.get(34675),this.options.sanitize&&(t.delete(34665),t.delete(40965),t.delete(34853),t.delete(700),t.delete(33723),t.delete(34675)),t):void 0}async parseExifBlock(){if(this.exif)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.exifOffset)return;this.file.tiff&&await this.file.ensureChunk(this.exifOffset,o$1(this.options));let e=this.parseBlock(this.exifOffset,"exif");return this.interopOffset||(this.interopOffset=e.get(40965)),this.makerNote=e.get(37500),this.userComment=e.get(37510),this.options.sanitize&&(e.delete(40965),e.delete(37500),e.delete(37510)),this.unpack(e,41728),this.unpack(e,41729),e}unpack(e,t){let s=e.get(t);s&&1===s.length&&e.set(t,s[0]);}async parseGpsBlock(){if(this.gps)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.gpsOffset)return;let e=this.parseBlock(this.gpsOffset,"gps");return e&&e.has(2)&&e.has(4)&&(e.set("latitude",ne(...e.get(2),e.get(1))),e.set("longitude",ne(...e.get(4),e.get(3)))),e}async parseInteropBlock(){if(!this.interop&&(this.ifd0||await this.parseIfd0Block(),void 0!==this.interopOffset||this.exif||await this.parseExifBlock(),void 0!==this.interopOffset))return this.parseBlock(this.interopOffset,"interop")}async parseThumbnailBlock(e=!1){if(!this.ifd1&&!this.ifd1Parsed&&(!this.options.mergeOutput||e))return this.findIfd1Offset(),this.ifd1Offset>0&&(this.parseBlock(this.ifd1Offset,"ifd1"),this.ifd1Parsed=!0),this.ifd1}async extractThumbnail(){if(this.headerParsed||this.parseHeader(),this.ifd1Parsed||await this.parseThumbnailBlock(!0),void 0===this.ifd1)return;let e=this.ifd1.get(513),t=this.ifd1.get(514);return this.chunk.getUint8Array(e,t)}get image(){return this.ifd0}get thumbnail(){return this.ifd1}createOutput(){let e,t,s,i={};for(t of P)if(e=this[t],!f$1(e))if(s=this.canTranslate?this.translateBlock(e,t):Object.fromEntries(e),this.options.mergeOutput){if("ifd1"===t)continue;Object.assign(i,s);}else i[t]=s;return this.makerNote&&(i.makerNote=this.makerNote),this.userComment&&(i.userComment=this.userComment),i}assignToOutput(e,t){if(this.globalOptions.mergeOutput)Object.assign(e,t);else for(let[s,i]of Object.entries(t))this.assignObjectToOutput(e,s,i);}}function ne(e,t,s,i){var n=e+t/60+s/3600;return "S"!==i&&"W"!==i||(n*=-1),n}e$1(ie,"type","tiff"),e$1(ie,"headerLength",10),y.set("tiff",ie);Object.freeze({__proto__:null,default:G,Exifr:H,fileParsers:m$1,segmentParsers:y,fileReaders:b$1,tagKeys:B$1,tagValues:V,tagRevivers:I,createDictionary:x,extendDictionary:C,fetchUrlAsArrayBuffer:S,readBlobAsArrayBuffer:A,chunkedProps:L,otherSegments:T$1,segments:z$1,tiffBlocks:P,segmentsAndBlocks:F$1,tiffExtractables:j$1,inheritables:E,allFormatters:M,Options:R,parse:Y});const ae={ifd0:!1,ifd1:!1,exif:!1,gps:!1,interop:!1,sanitize:!1,reviveValues:!0,translateKeys:!1,translateValues:!1,mergeOutput:!1};Object.assign({},ae,{firstChunkSize:4e4,gps:[1,2,3,4]});Object.assign({},ae,{tiff:!1,ifd1:!0,mergeOutput:!1});const de=Object.assign({},ae,{firstChunkSize:4e4,ifd0:[274]});async function ce(e){let t=new H(de);await t.read(e);let s=await t.parse();if(s&&s.ifd0)return s.ifd0[274]}const pe=Object.freeze({1:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:0,rad:0},2:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:0,rad:0},3:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:180,rad:180*Math.PI/180},4:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:180,rad:180*Math.PI/180},5:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:90,rad:90*Math.PI/180},6:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:90,rad:90*Math.PI/180},7:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:270,rad:270*Math.PI/180},8:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:270,rad:270*Math.PI/180}});let ge=!0,me=!0;if("object"==typeof navigator){let e=navigator.userAgent;if(e.includes("iPad")||e.includes("iPhone")){let t=e.match(/OS (\d+)_(\d+)/);if(t){let[,e,s]=t,i=Number(e)+.1*Number(s);ge=i<13.4,me=!1;}}else if(e.includes("OS X 10")){let[,t]=e.match(/OS X 10[_.](\d+)/);ge=me=Number(t)<15;}if(e.includes("Chrome/")){let[,t]=e.match(/Chrome\/(\d+)/);ge=me=Number(t)<81;}else if(e.includes("Firefox/")){let[,t]=e.match(/Firefox\/(\d+)/);ge=me=Number(t)<77;}}async function ye(e){let t=await ce(e);return Object.assign({canvas:ge,css:me},pe[t])}class be extends c$1{constructor(...t){super(...t),e$1(this,"ranges",new we),0!==this.byteLength&&this.ranges.add(0,this.byteLength);}_tryExtend(e,t,s){if(0===e&&0===this.byteLength&&s){let e=new DataView(s.buffer||s,s.byteOffset,s.byteLength);this._swapDataView(e);}else {let s=e+t;if(s>this.byteLength){let{dataView:e}=this._extend(s);this._swapDataView(e);}}}_extend(e){let t;t=a$1?r$1.allocUnsafe(e):new Uint8Array(e);let s=new DataView(t.buffer,t.byteOffset,t.byteLength);return t.set(new Uint8Array(this.buffer,this.byteOffset,this.byteLength),0),{uintView:t,dataView:s}}subarray(e,t,s=!1){return t=t||this._lengthToEnd(e),s&&this._tryExtend(e,t),this.ranges.add(e,t),super.subarray(e,t)}set(e,t,s=!1){s&&this._tryExtend(t,e.byteLength,e);let i=super.set(e,t);return this.ranges.add(t,i.byteLength),i}async ensureChunk(e,t){this.chunked&&(this.ranges.available(e,t)||await this.readChunk(e,t));}available(e,t){return this.ranges.available(e,t)}}class we{constructor(){e$1(this,"list",[]);}get length(){return this.list.length}add(e,t,s=0){let i=e+t,n=this.list.filter((t=>ke(e,t.offset,i)||ke(e,t.end,i)));if(n.length>0){e=Math.min(e,...n.map((e=>e.offset))),i=Math.max(i,...n.map((e=>e.end))),t=i-e;let s=n.shift();s.offset=e,s.length=t,s.end=i,this.list=this.list.filter((e=>!n.includes(e)));}else this.list.push({offset:e,length:t,end:i});}available(e,t){let s=e+t;return this.list.some((t=>t.offset<=e&&s<=t.end))}}function ke(e,t,s){return e<=t&&t<=s}class Oe extends be{constructor(t,s){super(0),e$1(this,"chunksRead",0),this.input=t,this.options=s;}async readWhole(){this.chunked=!1,await this.readChunk(this.nextChunkOffset);}async readChunked(){this.chunked=!0,await this.readChunk(0,this.options.firstChunkSize);}async readNextChunk(e=this.nextChunkOffset){if(this.fullyRead)return this.chunksRead++,!1;let t=this.options.chunkSize,s=await this.readChunk(e,t);return !!s&&s.byteLength===t}async readChunk(e,t){if(this.chunksRead++,0!==(t=this.safeWrapAddress(e,t)))return this._readChunk(e,t)}safeWrapAddress(e,t){return void 0!==this.size&&e+t>this.size?Math.max(0,this.size-e):t}get nextChunkOffset(){if(0!==this.ranges.list.length)return this.ranges.list[0].length}get canReadNextChunk(){return this.chunksRead<this.options.chunkLimit}get fullyRead(){return void 0!==this.size&&this.nextChunkOffset===this.size}read(){return this.options.chunked?this.readChunked():this.readWhole()}close(){}}b$1.set("blob",class extends Oe{async readWhole(){this.chunked=!1;let e=await A(this.input);this._swapArrayBuffer(e);}readChunked(){return this.chunked=!0,this.size=this.input.size,super.readChunked()}async _readChunk(e,t){let s=t?e+t:void 0,i=this.input.slice(e,s),n=await A(i);return this.set(n,e,!0)}});

  var locale$1 = {
    strings: {
      generatingThumbnails: 'Generating thumbnails...'
    }
  };

  const packageJson$1 = {
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

  class ThumbnailGenerator extends UIPlugin$1 {
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
      this.defaultLocale = locale$1;
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
      const orientationPromise = ye(file.data).catch(() => 1);
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
  ThumbnailGenerator.VERSION = packageJson$1.version;

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

  /**
   * Converts list into array
   */
  var toArray = Array.from;

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

  // .files fallback, should be implemented in any browser
  function fallbackApi(dataTransfer) {
    const files = toArray(dataTransfer.files);
    return Promise.resolve(files);
  }

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
      for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
        accumulator.push(file);
      }
      return accumulator;
      // Otherwise just return all first-order files
    } catch {
      return fallbackApi(dataTransfer);
    }
  }

  var eventemitter3 = {exports: {}};

  eventemitter3.exports;

  (function (module) {

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
  	{
  	  module.exports = EventEmitter;
  	} 
  } (eventemitter3));

  eventemitter3.exports;

  (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };

  (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  };
  (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };

  var t,r,u,i,o=0,f=[],c=[],e=l$2.__b,a=l$2.__r,v=l$2.diffed,l=l$2.__c,m=l$2.unmount;function d(t,u){l$2.__h&&l$2.__h(r,t,o||u),o=0;var i=r.__H||(r.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:c}),i.__[t]}function h(n){return o=1,s(B,n)}function s(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):B(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return !0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0);}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r.shouldComponentUpdate=f;}return o.__N||o.__}function p(u,i){var o=d(t++,3);!l$2.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__H.__h.push(o));}function F(n,r){var u=d(t++,7);return z(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function T(n,t){return o=8,F(function(){return n},t)}function b(){for(var t;t=f.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(k),t.__H.__h.forEach(w),t.__H.__h=[];}catch(r){t.__H.__h=[],l$2.__e(r,t.__v);}}l$2.__b=function(n){r=null,e&&e(n);},l$2.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0;})):(i.__h.forEach(k),i.__h.forEach(w),i.__h=[],t=0)),u=r;},l$2.diffed=function(t){v&&v(t);var o=t.__c;o&&o.__H&&(o.__H.__h.length&&(1!==f.push(o)&&i===l$2.requestAnimationFrame||((i=l$2.requestAnimationFrame)||j)(b)),o.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c;})),u=r=null;},l$2.__c=function(t,r){r.some(function(t){try{t.__h.forEach(k),t.__h=t.__h.filter(function(n){return !n.__||w(n)});}catch(u){r.some(function(n){n.__h&&(n.__h=[]);}),r=[],l$2.__e(u,t.__v);}}),l&&l(t,r);},l$2.unmount=function(t){m&&m(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{k(n);}catch(n){r=n;}}),u.__H=void 0,r&&l$2.__e(r,u.__v));};var g="function"==typeof requestAnimationFrame;function j(n){var t,r=function(){clearTimeout(u),g&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);g&&(t=requestAnimationFrame(r));}function k(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t;}function w(n){var t=r;n.__c=n.__(),r=t;}function z(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function B(n,t){return "function"==typeof t?t(n):t}

  function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
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
  class VirtualList extends b$2 {
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
        y$1("div", _extends$1({
          onScroll: this.handleScroll
        }, props), y$1("div", {
          role: "presentation",
          style: styleInner
        }, y$1("div", {
          role: "presentation",
          style: styleContent
        }, selection.map(renderRow))))
      );
    }
  }

  function defaultPickerIcon() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "30",
      height: "30",
      viewBox: "0 0 30 30"
    }, y$1("path", {
      d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
    }));
  }

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

  var FOCUSABLE_ELEMENTS = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'input:not([disabled]):not([inert]):not([aria-hidden])', 'select:not([disabled]):not([inert]):not([aria-hidden])', 'textarea:not([disabled]):not([inert]):not([aria-hidden])', 'button:not([disabled]):not([inert]):not([aria-hidden])', 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

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

  // Traps focus inside of the currently open overlay, unless overlay is null - then let the user tab away.
  function forInline(event, activeOverlayType, dashboardEl) {
    // ___When we're in the bare 'Drop files here, paste, browse or import from' screen
    if (activeOverlayType === null) ; else {
      // Trap the focus inside this overlay!
      // User can close the overlay (click 'Done') if they want to travel away from Uppy.
      trapFocus(event, activeOverlayType, dashboardEl);
    }
  }

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
    return debounce$2(superFocus, 260);
  }

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

  var isShallowEqual = function isShallowEqual (a, b) {
    if (a === b) return true
    for (var i in a) if (!(i in b)) return false
    for (var i in b) if (a[i] !== b[i]) return false
    return true
  };

  var shallowEqual = /*@__PURE__*/getDefaultExportFromCjs(isShallowEqual);

  function iconImage() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("g", {
      fill: "#686DE0",
      fillRule: "evenodd"
    }, y$1("path", {
      d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
      fillRule: "nonzero"
    }), y$1("path", {
      d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
      fillRule: "nonzero"
    }), y$1("circle", {
      cx: "7.5",
      cy: "9.5",
      r: "1.5"
    })));
  }
  function iconAudio() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("path", {
      d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
      fill: "#049BCF",
      fillRule: "nonzero"
    }));
  }
  function iconVideo() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("path", {
      d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
      fill: "#19AF67",
      fillRule: "nonzero"
    }));
  }
  function iconPDF() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("path", {
      d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
      fill: "#E2514A",
      fillRule: "nonzero"
    }));
  }
  function iconArchive() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("path", {
      d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
      fill: "#00C469",
      fillRule: "nonzero"
    }));
  }
  function iconFile() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("g", {
      fill: "#A7AFB7",
      fillRule: "nonzero"
    }, y$1("path", {
      d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
    }), y$1("path", {
      d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
    })));
  }
  function iconText() {
    return y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y$1("path", {
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

  function FilePreview(props) {
    const {
      file
    } = props;
    if (file.preview) {
      return y$1("img", {
        className: "uppy-Dashboard-Item-previewImg",
        alt: file.name,
        src: file.preview
      });
    }
    const {
      color,
      icon
    } = getIconByMime(file.type);
    return y$1("div", {
      className: "uppy-Dashboard-Item-previewIconWrap"
    }, y$1("span", {
      className: "uppy-Dashboard-Item-previewIcon",
      style: {
        color
      }
    }, icon), y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-Dashboard-Item-previewIconBg",
      width: "58",
      height: "76",
      viewBox: "0 0 58 76"
    }, y$1("rect", {
      fill: "#FFF",
      width: "58",
      height: "76",
      rx: "3",
      fillRule: "evenodd"
    })));
  }

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
    return y$1("div", {
      className: "uppy-Dashboard-Item-errorMessage"
    }, i18n('missingRequiredMetaFields', {
      smart_count: missingRequiredMetaFields.length,
      fields: metaFieldsString
    }), ' ', y$1("button", {
      type: "button",
      class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
      onClick: () => toggleFileCard(true, file.id)
    }, i18n('editFile')));
  }

  function FilePreviewAndLink(props) {
    const {
      file,
      i18n,
      toggleFileCard,
      metaFields,
      showLinkToFileUploadResult
    } = props;
    const white = 'rgba(255, 255, 255, 0.5)';
    const previewBackgroundColor = file.preview ? white : getIconByMime(props.file.type).color;
    return y$1("div", {
      className: "uppy-Dashboard-Item-previewInnerWrap",
      style: {
        backgroundColor: previewBackgroundColor
      }
    }, showLinkToFileUploadResult && file.uploadURL && y$1("a", {
      className: "uppy-Dashboard-Item-previewLink",
      href: file.uploadURL,
      rel: "noreferrer noopener",
      target: "_blank",
      "aria-label": file.meta.name
    }, y$1("span", {
      hidden: true
    }, file.meta.name)), y$1(FilePreview, {
      file: file
    }), y$1(renderMissingMetaFieldsError, {
      file: file,
      i18n: i18n,
      toggleFileCard: toggleFileCard,
      metaFields: metaFields
    }));
  }

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
    return y$1("div", {
      className: "uppy-Dashboard-Item-progress"
    }, y$1("button", {
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
    return y$1("svg", {
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
    return y$1("g", null, y$1("circle", {
      className: "uppy-Dashboard-Item-progressIcon--bg",
      r: "15",
      cx: "18",
      cy: "18",
      "stroke-width": "2",
      fill: "none"
    }), y$1("circle", {
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
      return y$1("div", {
        className: "uppy-Dashboard-Item-progress"
      }, y$1("div", {
        className: "uppy-Dashboard-Item-progressIndicator"
      }, y$1(ProgressCircleContainer, null, y$1("circle", {
        r: "15",
        cx: "18",
        cy: "18",
        fill: "#1bb240"
      }), y$1("polygon", {
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
        y$1(ProgressIndicatorButton, props, y$1("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
          width: "28",
          height: "31",
          viewBox: "0 0 16 19"
        }, y$1("path", {
          d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
        }), y$1("path", {
          d: "M7.9 3H10v2H7.9z"
        }), y$1("path", {
          d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
        }), y$1("path", {
          d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
        })))
      );
    }

    // Pause/resume button for resumable uploads
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        y$1(ProgressIndicatorButton, props, y$1(ProgressCircleContainer, null, y$1(ProgressCircle, {
          progress: props.file.progress.percentage
        }), props.file.isPaused ? y$1("polygon", {
          className: "uppy-Dashboard-Item-progressIcon--play",
          transform: "translate(3, 3)",
          points: "12 20 12 10 20 15"
        }) : y$1("g", {
          className: "uppy-Dashboard-Item-progressIcon--pause",
          transform: "translate(14.5, 13)"
        }, y$1("rect", {
          x: "0",
          y: "0",
          width: "2",
          height: "10",
          rx: "0"
        }), y$1("rect", {
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
        y$1(ProgressIndicatorButton, props, y$1(ProgressCircleContainer, null, y$1(ProgressCircle, {
          progress: props.file.progress.percentage
        }), y$1("polygon", {
          className: "cancel",
          transform: "translate(2, 2)",
          points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
        })))
      );
    }

    // Just progress when buttons are disabled
    return y$1("div", {
      className: "uppy-Dashboard-Item-progress"
    }, y$1("div", {
      className: "uppy-Dashboard-Item-progressIndicator"
    }, y$1(ProgressCircleContainer, null, y$1(ProgressCircle, {
      progress: props.file.progress.percentage
    }))));
  }

  // Adapted from https://github.com/Flet/prettier-bytes/
  // Changing 1000 bytes to 1024, so we can keep uppercase KB vs kB
  // ISC License (c) Dan Flettre https://github.com/Flet/prettier-bytes/blob/master/LICENSE
  var prettierBytes = function prettierBytes (num) {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new TypeError('Expected a number, got ' + typeof num)
    }

    var neg = num < 0;
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' B'
    }

    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
    num = Number(num / Math.pow(1024, exponent));
    var unit = units[exponent];

    if (num >= 10 || num % 1 === 0) {
      // Do not show decimals when the number is two-digit, or if the number has no
      // decimal component.
      return (neg ? '-' : '') + num.toFixed(0) + ' ' + unit
    } else {
      return (neg ? '-' : '') + num.toFixed(1) + ' ' + unit
    }
  };

  var prettierBytes$1 = /*@__PURE__*/getDefaultExportFromCjs(prettierBytes);

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
    return y$1("div", {
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
    return y$1("div", {
      className: "uppy-Dashboard-Item-author"
    }, y$1("a", {
      href: `${author.url}?utm_source=Companion&utm_medium=referral`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, truncateString(author.name, 13)), providerName ? y$1(g$2, null, ` ${dot} `, providerName, ` ${dot} `) : null);
  };
  const renderFileSize = props => props.file.size && y$1("div", {
    className: "uppy-Dashboard-Item-statusSize"
  }, prettierBytes$1(props.file.size));
  const ReSelectButton = props => props.file.isGhost && y$1("span", null, ' \u2022 ', y$1("button", {
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
      return y$1("button", {
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
    return y$1("div", {
      className: "uppy-Dashboard-Item-fileInfo",
      "data-uppy-file-source": file.source
    }, y$1("div", {
      className: "uppy-Dashboard-Item-fileName"
    }, renderFileName(props), y$1(ErrorButton, {
      file: props.file
      // eslint-disable-next-line no-alert
      ,
      onClick: () => alert(props.file.error) // TODO: move to a custom alert implementation
    })), y$1("div", {
      className: "uppy-Dashboard-Item-status"
    }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), y$1(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }

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
        return magicCopyFailed();
      }
    });
  }

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
      return y$1("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
        type: "button",
        "aria-label": i18n('editFileWithFilename', {
          file: file.meta.name
        }),
        title: i18n('editFileWithFilename', {
          file: file.meta.name
        }),
        onClick: () => onClick()
      }, y$1("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14"
      }, y$1("g", {
        fillRule: "evenodd"
      }, y$1("path", {
        d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
        fillRule: "nonzero"
      }), y$1("rect", {
        x: "1",
        y: "12.293",
        width: "11",
        height: "1",
        rx: ".5"
      }), y$1("path", {
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
    return y$1("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
      type: "button",
      "aria-label": i18n('removeFile', {
        file: file.meta.name
      }),
      title: i18n('removeFile', {
        file: file.meta.name
      }),
      onClick: () => onClick()
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, y$1("path", {
      d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
    }), y$1("path", {
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
    return y$1("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
      type: "button",
      "aria-label": i18n('copyLink'),
      title: i18n('copyLink'),
      onClick: event => copyLinkToClipboard(event, props)
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14",
      height: "14",
      viewBox: "0 0 14 12"
    }, y$1("path", {
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
    return y$1("div", {
      className: "uppy-Dashboard-Item-actionWrapper"
    }, y$1(EditButton, {
      i18n: i18n,
      file: file,
      uploadInProgressOrComplete: uploadInProgressOrComplete,
      canEditFile: canEditFile,
      metaFields: metaFields,
      onClick: editAction
    }), showLinkToFileUploadResult && file.uploadURL ? y$1(CopyLinkButton, {
      file: file,
      uppy: uppy,
      i18n: i18n
    }) : null, showRemoveButton ? y$1(RemoveButton, {
      i18n: i18n,
      file: file,
      uppy: uppy,
      onClick: () => props.uppy.removeFile(file.id, 'removed-by-user')
    }) : null);
  }

  class FileItem extends b$2 {
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
      return y$1("div", {
        className: dashboardItemClass,
        id: `uppy_${file.id}`,
        role: this.props.role
      }, y$1("div", {
        className: "uppy-Dashboard-Item-preview"
      }, y$1(FilePreviewAndLink, {
        file: file,
        showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
        i18n: this.props.i18n,
        toggleFileCard: this.props.toggleFileCard,
        metaFields: this.props.metaFields
      }), y$1(FileProgress, {
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
      })), y$1("div", {
        className: "uppy-Dashboard-Item-fileInfoAndButtons"
      }, y$1(FileInfo, {
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
      }), y$1(Buttons, {
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
  var FileList = (_ref => {
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
    const rows = F(() => {
      const sortByGhostComesFirst = (file1, file2) => files[file2].isGhost - files[file1].isGhost;
      const fileIds = Object.keys(files);
      if (recoveredState) fileIds.sort(sortByGhostComesFirst);
      return chunks(fileIds, itemsPerRow);
    }, [files, itemsPerRow, recoveredState]);
    const renderRow = row =>
    // The `role="presentation` attribute ensures that the list items are properly
    // associated with the `VirtualList` element.
    // We use the first file ID as the key—this should not change across scroll rerenders
    y$1("div", {
      class: "uppy-Dashboard-filesInner",
      role: "presentation",
      key: row[0]
    }, row.map(fileID => y$1(FileItem, {
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
      return y$1("div", {
        class: "uppy-Dashboard-files"
      }, renderRow(rows[0]));
    }
    return y$1(VirtualList, {
      class: "uppy-Dashboard-files",
      role: "list",
      data: rows,
      renderRow: renderRow,
      rowHeight: rowHeight
    });
  });

  let _Symbol$for;
  _Symbol$for = Symbol.for('uppy test: disable unused locale key warning');
  class AddFiles extends b$2 {
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
        return y$1("input", {
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
        return y$1("input", {
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
        return y$1("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MyDevice"
        }, y$1("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerFileInputClick
        }, y$1("div", {
          className: "uppy-DashboardTab-inner"
        }, y$1("svg", {
          className: "uppy-DashboardTab-iconMyDevice",
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y$1("path", {
          d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
          fill: "currentcolor",
          "fill-rule": "evenodd"
        }))), y$1("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n('myDevice'))));
      };
      this.renderPhotoCamera = () => {
        return y$1("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobilePhotoCamera"
        }, y$1("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerPhotoCameraInputClick
        }, y$1("div", {
          className: "uppy-DashboardTab-inner"
        }, y$1("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y$1("path", {
          d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
          fill: "#02B383",
          "fill-rule": "nonzero"
        }))), y$1("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n('takePictureBtn'))));
      };
      this.renderVideoCamera = () => {
        return y$1("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobileVideoCamera"
        }, y$1("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerVideoCameraInputClick
        }, y$1("div", {
          className: "uppy-DashboardTab-inner"
        }, y$1("svg", {
          "aria-hidden": "true",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y$1("path", {
          fill: "#FF675E",
          fillRule: "nonzero",
          d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
        }))), y$1("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n('recordVideoBtn'))));
      };
      this.renderBrowseButton = (text, onClickFn) => {
        const numberOfAcquirers = this.props.acquirers.length;
        return y$1("button", {
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
        return y$1("div", {
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
        return y$1("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": acquirer.id
        }, y$1("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-cy": acquirer.id,
          "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
          "aria-selected": this.props.activePickerPanel.id === acquirer.id,
          "data-uppy-super-focusable": true,
          onClick: () => this.props.showPanel(acquirer.id)
        }, y$1("div", {
          className: "uppy-DashboardTab-inner"
        }, acquirer.icon()), y$1("div", {
          className: "uppy-DashboardTab-name"
        }, acquirer.name)));
      };
      this.renderAcquirers = acquirers => {
        // Group last two buttons, so we don’t end up with
        // just one button on a new line
        const acquirersWithoutLastTwo = [...acquirers];
        const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
        return y$1(g$2, null, acquirersWithoutLastTwo.map(acquirer => this.renderAcquirer(acquirer)), y$1("span", {
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
          return y$1(g$2, {
            key: key
          }, elements);
        });
        return y$1(g$2, null, this.renderDropPasteBrowseTagline(list.length), y$1("div", {
          className: "uppy-Dashboard-AddFiles-list",
          role: "tablist"
        }, renderList(listWithoutLastTwo), y$1("span", {
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
      const uppyBranding = y$1("span", null, y$1("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
        width: "11",
        height: "11",
        viewBox: "0 0 11 11"
      }, y$1("path", {
        d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
        fillRule: "evenodd"
      })), y$1("span", {
        className: "uppy-Dashboard-poweredByUppy"
      }, "Uppy"));
      const linkText = i18nArray('poweredBy', {
        uppy: uppyBranding
      });
      return y$1("a", {
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
      return y$1("div", {
        className: "uppy-Dashboard-AddFiles"
      }, this.renderHiddenInput(false, ref => {
        this.fileInput = ref;
      }), this.renderHiddenInput(true, ref => {
        this.folderInput = ref;
      }), showNativePhotoCameraButton && this.renderHiddenCameraInput('photo', nativeCameraFacingMode, ref => {
        this.mobilePhotoFileInput = ref;
      }), showNativeVideoCameraButton && this.renderHiddenCameraInput('video', nativeCameraFacingMode, ref => {
        this.mobileVideoFileInput = ref;
      }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), y$1("div", {
        className: "uppy-Dashboard-AddFiles-info"
      }, this.props.note && y$1("div", {
        className: "uppy-Dashboard-note"
      }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
    }
  }

  const AddFilesPanel = props => {
    return y$1("div", {
      className: classNames('uppy-Dashboard-AddFilesPanel', props.className),
      "data-uppy-panelType": "AddFiles",
      "aria-hidden": !props.showAddFilesPanel
    }, y$1("div", {
      className: "uppy-DashboardContent-bar"
    }, y$1("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18n('addingMoreFiles')), y$1("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => props.toggleAddFilesPanel(false)
    }, props.i18n('back'))), y$1(AddFiles, props));
  };

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

  function PickerPanelContent(_ref) {
    let {
      activePickerPanel,
      className,
      hideAllPanels,
      i18n,
      state,
      uppy
    } = _ref;
    return y$1("div", {
      className: classNames('uppy-DashboardContent-panel', className),
      role: "tabpanel",
      "data-uppy-panelType": "PickerPanel",
      id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
      onDragOver: ignoreEvent,
      onDragLeave: ignoreEvent,
      onDrop: ignoreEvent,
      onPaste: ignoreEvent
    }, y$1("div", {
      className: "uppy-DashboardContent-bar"
    }, y$1("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18n('importFrom', {
      name: activePickerPanel.name
    })), y$1("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: hideAllPanels
    }, i18n('cancel'))), y$1("div", {
      className: "uppy-DashboardContent-panelBody"
    }, uppy.getPlugin(activePickerPanel.id).render(state)));
  }

  function EditorPanel(props) {
    const file = props.files[props.fileCardFor];
    const handleCancel = () => {
      props.uppy.emit('file-editor:cancel', file);
      props.hideAllPanels();
    };
    return y$1("div", {
      className: classNames('uppy-DashboardContent-panel', props.className),
      role: "tabpanel",
      "data-uppy-panelType": "FileEditor",
      id: "uppy-DashboardContent-panel--editor"
    }, y$1("div", {
      className: "uppy-DashboardContent-bar"
    }, y$1("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18nArray('editing', {
      file: y$1("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), y$1("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: handleCancel
    }, props.i18n('cancel')), y$1("button", {
      className: "uppy-DashboardContent-save",
      type: "button",
      onClick: props.saveFileEditor
    }, props.i18n('save'))), y$1("div", {
      className: "uppy-DashboardContent-panelBody"
    }, props.editors.map(target => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })));
  }

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
    return y$1("div", {
      className: "uppy-DashboardContent-bar"
    }, !isAllComplete && !hideCancelButton ? y$1("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => uppy.cancelAll()
    }, i18n('cancel')) : y$1("div", null), y$1("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, y$1(UploadStatus, props)), allowNewUpload ? y$1("button", {
      className: "uppy-DashboardContent-addMore",
      type: "button",
      "aria-label": i18n('addMoreFiles'),
      title: i18n('addMoreFiles'),
      onClick: () => toggleAddFilesPanel(true)
    }, y$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15"
    }, y$1("path", {
      d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
    })), y$1("span", {
      className: "uppy-DashboardContent-addMoreCaption"
    }, i18n('addMore'))) : y$1("div", null));
  }

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
      return y$1("fieldset", {
        key: field.id,
        className: "uppy-Dashboard-FileCard-fieldset"
      }, y$1("label", {
        className: "uppy-Dashboard-FileCard-label",
        htmlFor: id
      }, field.name), field.render !== undefined ? field.render({
        value: formState[field.id],
        onChange: newVal => updateMeta(newVal, field.id),
        fieldCSSClasses,
        required,
        form: form.id
      }, y$1) : y$1("input", {
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
    const [formState, setFormState] = h(storedMetaData);
    const handleSave = T(ev => {
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
    const [form] = h(() => {
      const formEl = document.createElement('form');
      formEl.setAttribute('tabindex', '-1');
      formEl.id = nanoid();
      return formEl;
    });
    p(() => {
      document.body.appendChild(form);
      form.addEventListener('submit', handleSave);
      return () => {
        form.removeEventListener('submit', handleSave);
        document.body.removeChild(form);
      };
    }, [form, handleSave]);
    return y$1("div", {
      className: classNames('uppy-Dashboard-FileCard', className),
      "data-uppy-panelType": "FileCard",
      onDragOver: ignoreEvent,
      onDragLeave: ignoreEvent,
      onDrop: ignoreEvent,
      onPaste: ignoreEvent
    }, y$1("div", {
      className: "uppy-DashboardContent-bar"
    }, y$1("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18nArray('editing', {
      file: y$1("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), y$1("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      form: form.id,
      title: i18n('finishEditingFile'),
      onClick: handleCancel
    }, i18n('cancel'))), y$1("div", {
      className: "uppy-Dashboard-FileCard-inner"
    }, y$1("div", {
      className: "uppy-Dashboard-FileCard-preview",
      style: {
        backgroundColor: getIconByMime(file.type).color
      }
    }, y$1(FilePreview, {
      file: file
    }), showEditButton && y$1("button", {
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
    }, i18n('editFile'))), y$1("div", {
      className: "uppy-Dashboard-FileCard-info"
    }, y$1(RenderMetaFields, {
      computedMetaFields: computedMetaFields,
      requiredMetaFields: requiredMetaFields,
      updateMeta: updateMeta,
      form: form,
      formState: formState
    })), y$1("div", {
      className: "uppy-Dashboard-FileCard-actions"
    }, y$1("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn"
      // If `form` attribute is supported, we want a submit button to trigger the form validation.
      // Otherwise, fallback to a classic button with a onClick event handler.
      ,
      type: "submit",
      form: form.id
    }, i18n('saveChanges')), y$1("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
      type: "button",
      onClick: handleCancel,
      form: form.id
    }, i18n('cancel')))));
  }

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
  class Slide extends b$2 {
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
      const child = $$1(nextProps.children)[0];
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
      return E$1(cachedChildren, {
        className: classNames(className, cachedChildren.props.className)
      });
    }
  }

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  // http://dev.edenspiekermann.com/2016/02/11/introducing-accessible-modal-dialog
  // https://github.com/ghosh/micromodal

  const WIDTH_XL = 900;
  const WIDTH_LG = 700;
  const WIDTH_MD = 576;
  const HEIGHT_MD = 330;
  // We might want to enable this in the future
  // const HEIGHT_LG = 400
  // const HEIGHT_XL = 460

  function Dashboard$1(props) {
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
    const dashboard = y$1("div", {
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
    }, y$1("div", {
      "aria-hidden": "true",
      className: "uppy-Dashboard-overlay",
      tabIndex: -1,
      onClick: props.handleClickOutside
    }), y$1("div", {
      className: "uppy-Dashboard-inner",
      "aria-modal": !props.inline && 'true',
      role: !props.inline && 'dialog',
      style: {
        width: props.inline && props.width ? props.width : '',
        height: props.inline && props.height ? props.height : ''
      }
    }, !props.inline ? y$1("button", {
      className: "uppy-u-reset uppy-Dashboard-close",
      type: "button",
      "aria-label": props.i18n('closeModal'),
      title: props.i18n('closeModal'),
      onClick: props.closeModal
    }, y$1("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, y$1("div", {
      className: "uppy-Dashboard-innerWrap"
    }, y$1("div", {
      className: "uppy-Dashboard-dropFilesHereHint"
    }, props.i18n('dropHint')), showFileList && y$1(PanelTopBar, props), numberOfFilesForRecovery && y$1("div", {
      className: "uppy-Dashboard-serviceMsg"
    }, y$1("svg", {
      className: "uppy-Dashboard-serviceMsg-icon",
      "aria-hidden": "true",
      focusable: "false",
      width: "21",
      height: "16",
      viewBox: "0 0 24 19"
    }, y$1("g", {
      transform: "translate(0 -1)",
      fill: "none",
      fillRule: "evenodd"
    }, y$1("path", {
      d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
      fill: "#FFD300"
    }), y$1("path", {
      fill: "#000",
      d: "M11 6h2l-.3 8h-1.4z"
    }), y$1("circle", {
      fill: "#000",
      cx: "12",
      cy: "17",
      r: "1"
    }))), y$1("strong", {
      className: "uppy-Dashboard-serviceMsg-title"
    }, props.i18n('sessionRestored')), y$1("div", {
      className: "uppy-Dashboard-serviceMsg-text"
    }, renderRestoredText())), showFileList ? y$1(FileList, {
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
    y$1(AddFiles, _extends({}, props, {
      isSizeMD: isSizeMD
    })), y$1(Slide, null, props.showAddFilesPanel ? y$1(AddFilesPanel, _extends({
      key: "AddFiles"
    }, props, {
      isSizeMD: isSizeMD
    })) : null), y$1(Slide, null, props.fileCardFor ? y$1(FileCard, _extends({
      key: "FileCard"
    }, props)) : null), y$1(Slide, null, props.activePickerPanel ? y$1(PickerPanelContent, _extends({
      key: "Picker"
    }, props)) : null), y$1(Slide, null, props.showFileEditor ? y$1(EditorPanel, _extends({
      key: "Editor"
    }, props)) : null), y$1("div", {
      className: "uppy-Dashboard-progressindicators"
    }, props.progressindicators.map(target => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })))));
    return dashboard;
  }

  var locale = {
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

  function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
  var id = 0;
  function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
  const packageJson = {
    "version": "3.7.1"
  };
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
  class Dashboard extends UIPlugin$1 {
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
        if (event.keyCode === TAB_KEY) trapFocus(event, this.getPluginState().activeOverlayType, this.el);
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
        const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop();
        const hasFiles = doesEventHaveFiles();
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
        if (event.keyCode === TAB_KEY) forInline(event, this.getPluginState().activeOverlayType, this.el);
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
        return Dashboard$1({
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

  //@ts-check

  // import { default as A } from "./routes";
  // import A from "./nested_folder/indexUtil";
  // import A from "./nested_folder/util1";

  console.log(Dashboard);
  // console.log(A);

})();
