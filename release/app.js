"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // tests/_npm/node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes = __commonJS({
    "tests/_npm/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes3(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError(`Expected a number, got ${typeof num}`);
        }
        const neg = num < 0;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return `${(neg ? "-" : "") + num} B`;
        }
        const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        const unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
        }
        return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
      };
    }
  });

  // tests/_npm/node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "tests/_npm/node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        var nativeCodeString = "[native code]";
        function classNames13() {
          var classes = [];
          for (var i4 = 0; i4 < arguments.length; i4++) {
            var arg = arguments[i4];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames13.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
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
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames13.default = classNames13;
          module.exports = classNames13;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames13;
          });
        } else {
          window.classNames = classNames13;
        }
      })();
    }
  });

  // tests/_npm/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "tests/_npm/node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has2 = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has2.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i4 = 0, l4 = handlers.length, ee2 = new Array(l4); i4 < l4; i4++) {
          ee2[i4] = handlers[i4].fn;
        }
        return ee2;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a22, a32, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i4;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a22), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a22, a32), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a22, a32, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a22, a32, a4, a5), true;
          }
          for (i4 = 1, args = new Array(len - 1); i4 < len; i4++) {
            args[i4 - 1] = arguments[i4];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j4;
          for (i4 = 0; i4 < length; i4++) {
            if (listeners[i4].once)
              this.removeListener(event, listeners[i4].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i4].fn.call(listeners[i4].context);
                break;
              case 2:
                listeners[i4].fn.call(listeners[i4].context, a1);
                break;
              case 3:
                listeners[i4].fn.call(listeners[i4].context, a1, a22);
                break;
              case 4:
                listeners[i4].fn.call(listeners[i4].context, a1, a22, a32);
                break;
              default:
                if (!args)
                  for (j4 = 1, args = new Array(len - 1); j4 < len; j4++) {
                    args[j4 - 1] = arguments[j4];
                  }
                listeners[i4].fn.apply(listeners[i4].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i4 = 0, events = [], length = listeners.length; i4 < length; i4++) {
            if (listeners[i4].fn !== fn || once && !listeners[i4].once || context && listeners[i4].context !== context) {
              events.push(listeners[i4]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // tests/_npm/node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "tests/_npm/node_modules/lodash/isObject.js"(exports, module) {
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject;
    }
  });

  // tests/_npm/node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "tests/_npm/node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // tests/_npm/node_modules/lodash/_root.js
  var require_root = __commonJS({
    "tests/_npm/node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // tests/_npm/node_modules/lodash/now.js
  var require_now = __commonJS({
    "tests/_npm/node_modules/lodash/now.js"(exports, module) {
      var root = require_root();
      var now = function() {
        return root.Date.now();
      };
      module.exports = now;
    }
  });

  // tests/_npm/node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    "tests/_npm/node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      module.exports = trimmedEndIndex;
    }
  });

  // tests/_npm/node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    "tests/_npm/node_modules/lodash/_baseTrim.js"(exports, module) {
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      module.exports = baseTrim;
    }
  });

  // tests/_npm/node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "tests/_npm/node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // tests/_npm/node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "tests/_npm/node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e4) {
        }
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
      module.exports = getRawTag;
    }
  });

  // tests/_npm/node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "tests/_npm/node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // tests/_npm/node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "tests/_npm/node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // tests/_npm/node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "tests/_npm/node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // tests/_npm/node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "tests/_npm/node_modules/lodash/isSymbol.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol;
    }
  });

  // tests/_npm/node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    "tests/_npm/node_modules/lodash/toNumber.js"(exports, module) {
      var baseTrim = require_baseTrim();
      var isObject = require_isObject();
      var isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = toNumber;
    }
  });

  // tests/_npm/node_modules/lodash/debounce.js
  var require_debounce = __commonJS({
    "tests/_npm/node_modules/lodash/debounce.js"(exports, module) {
      var isObject = require_isObject();
      var now = require_now();
      var toNumber = require_toNumber();
      var FUNC_ERROR_TEXT = "Expected a function";
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      function debounce3(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      module.exports = debounce3;
    }
  });

  // tests/_npm/node_modules/is-shallow-equal/index.js
  var require_is_shallow_equal = __commonJS({
    "tests/_npm/node_modules/is-shallow-equal/index.js"(exports, module) {
      module.exports = function isShallowEqual(a4, b4) {
        if (a4 === b4)
          return true;
        for (var i4 in a4)
          if (!(i4 in b4))
            return false;
        for (var i4 in b4)
          if (a4[i4] !== b4[i4])
            return false;
        return true;
      };
    }
  });

  // tests/_npm/node_modules/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes2 = __commonJS({
    "tests/_npm/node_modules/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes3(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError("Expected a number, got " + typeof num);
        }
        var neg = num < 0;
        var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return (neg ? "-" : "") + num + " B";
        }
        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        var unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return (neg ? "-" : "") + num.toFixed(0) + " " + unit;
        } else {
          return (neg ? "-" : "") + num.toFixed(1) + " " + unit;
        }
      };
    }
  });

  // tests/_npm/node_modules/@uppy/utils/lib/hasProperty.js
  function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  // tests/_npm/node_modules/@uppy/utils/lib/Translator.js
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id = 0;
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function insertReplacement(source, rx, replacement) {
    const newParts = [];
    source.forEach((chunk) => {
      if (typeof chunk !== "string") {
        return newParts.push(chunk);
      }
      return rx[Symbol.split](chunk).forEach((raw, i4, list) => {
        if (raw !== "") {
          newParts.push(raw);
        }
        if (i4 < list.length - 1) {
          newParts.push(replacement);
        }
      });
    });
    return newParts;
  }
  function interpolate(phrase, options) {
    const dollarRegex = /\$/g;
    const dollarBillsYall = "$$$$";
    let interpolated = [phrase];
    if (options == null)
      return interpolated;
    for (const arg of Object.keys(options)) {
      if (arg !== "_") {
        let replacement = options[arg];
        if (typeof replacement === "string") {
          replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
        }
        interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
      }
    }
    return interpolated;
  }
  var _apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply");
  var Translator = class {
    constructor(locales) {
      Object.defineProperty(this, _apply, {
        value: _apply2
      });
      this.locale = {
        strings: {},
        pluralize(n3) {
          if (n3 === 1) {
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
      return this.translateArray(key, options).join("");
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
      const hasPluralForms = typeof string === "object";
      if (hasPluralForms) {
        if (options && typeof options.smart_count !== "undefined") {
          const plural = this.locale.pluralize(options.smart_count);
          return interpolate(string[plural], options);
        }
        throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
      }
      return interpolate(string, options);
    }
  };
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

  // tests/_npm/node_modules/nanoid/non-secure/index.js
  var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  var nanoid = (size = 21) => {
    let id7 = "";
    let i4 = size;
    while (i4--) {
      id7 += urlAlphabet[Math.random() * 64 | 0];
    }
    return id7;
  };

  // tests/_npm/node_modules/@uppy/utils/lib/getFileNameAndExtension.js
  function getFileNameAndExtension(fullFileName) {
    const lastDot = fullFileName.lastIndexOf(".");
    if (lastDot === -1 || lastDot === fullFileName.length - 1) {
      return {
        name: fullFileName,
        extension: void 0
      };
    }
    return {
      name: fullFileName.slice(0, lastDot),
      extension: fullFileName.slice(lastDot + 1)
    };
  }

  // tests/_npm/node_modules/@uppy/utils/lib/mimeTypes.js
  var mimeTypes_default = {
    __proto__: null,
    md: "text/markdown",
    markdown: "text/markdown",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
    yaml: "text/yaml",
    yml: "text/yaml",
    csv: "text/csv",
    tsv: "text/tab-separated-values",
    tab: "text/tab-separated-values",
    avi: "video/x-msvideo",
    mks: "video/x-matroska",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    dicom: "application/dicom",
    doc: "application/msword",
    docm: "application/vnd.ms-word.document.macroenabled.12",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    dot: "application/msword",
    dotm: "application/vnd.ms-word.template.macroenabled.12",
    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    xla: "application/vnd.ms-excel",
    xlam: "application/vnd.ms-excel.addin.macroenabled.12",
    xlc: "application/vnd.ms-excel",
    xlf: "application/x-xliff+xml",
    xlm: "application/vnd.ms-excel",
    xls: "application/vnd.ms-excel",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlt: "application/vnd.ms-excel",
    xltm: "application/vnd.ms-excel.template.macroenabled.12",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    xlw: "application/vnd.ms-excel",
    txt: "text/plain",
    text: "text/plain",
    conf: "text/plain",
    log: "text/plain",
    pdf: "application/pdf",
    zip: "application/zip",
    "7z": "application/x-7z-compressed",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    gz: "application/gzip",
    dmg: "application/x-apple-diskimage"
  };

  // tests/_npm/node_modules/@uppy/utils/lib/getFileType.js
  function getFileType(file) {
    var _getFileNameAndExtens;
    if (file.type)
      return file.type;
    const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
    if (fileExtension && fileExtension in mimeTypes_default) {
      return mimeTypes_default[fileExtension];
    }
    return "application/octet-stream";
  }

  // tests/_npm/node_modules/@uppy/utils/lib/generateFileID.js
  function encodeCharacter(character) {
    return character.charCodeAt(0).toString(32);
  }
  function encodeFilename(name) {
    let suffix = "";
    return name.replace(/[^A-Z0-9]/gi, (character) => {
      suffix += `-${encodeCharacter(character)}`;
      return "/";
    }) + suffix;
  }
  function generateFileID(file) {
    let id7 = "uppy";
    if (typeof file.name === "string") {
      id7 += `-${encodeFilename(file.name.toLowerCase())}`;
    }
    if (file.type !== void 0) {
      id7 += `-${file.type}`;
    }
    if (file.meta && typeof file.meta.relativePath === "string") {
      id7 += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
    }
    if (file.data.size !== void 0) {
      id7 += `-${file.data.size}`;
    }
    if (file.data.lastModified !== void 0) {
      id7 += `-${file.data.lastModified}`;
    }
    return id7;
  }
  function hasFileStableId(file) {
    if (!file.isRemote || !file.remote)
      return false;
    const stableIdProviders = /* @__PURE__ */ new Set(["box", "dropbox", "drive", "facebook", "unsplash"]);
    return stableIdProviders.has(file.remote.provider);
  }
  function getSafeFileId(file) {
    if (hasFileStableId(file))
      return file.id;
    const fileType = getFileType(file);
    return generateFileID({
      ...file,
      type: fileType
    });
  }

  // tests/_npm/node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c = {};
  var s = [];
  var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var h = Array.isArray;
  function v(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function p(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function y(l4, u4, t4) {
    var i4, o4, r4, f4 = {};
    for (r4 in u4)
      "key" == r4 ? i4 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f4[r4] = u4[r4];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : t4), "function" == typeof l4 && null != l4.defaultProps)
      for (r4 in l4.defaultProps)
        void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
    return d(l4, f4, i4, o4, null);
  }
  function d(n3, t4, i4, o4, r4) {
    var f4 = { type: n3, props: t4, key: i4, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r4 ? ++u : r4, __i: -1, __u: 0 };
    return null == r4 && null != l.vnode && l.vnode(f4), f4;
  }
  function _() {
    return { current: null };
  }
  function g(n3) {
    return n3.children;
  }
  function b(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function m(n3, l4) {
    if (null == l4)
      return n3.__ ? m(n3.__, n3.__i + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? m(n3) : null;
  }
  function k(n3) {
    var l4, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return k(n3);
    }
  }
  function w(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n3, u4, t4, o4, r4, e4, c4, s4, a4;
    for (i.sort(f); n3 = i.shift(); )
      n3.__d && (u4 = i.length, o4 = void 0, e4 = (r4 = (t4 = n3).__v).__e, s4 = [], a4 = [], (c4 = t4.__P) && ((o4 = v({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(o4), L(c4, o4, r4, t4.__n, void 0 !== c4.ownerSVGElement, 32 & r4.__u ? [e4] : null, s4, null == e4 ? m(r4) : e4, !!(32 & r4.__u), a4), o4.__.__k[o4.__i] = o4, M(s4, o4, a4), o4.__e != e4 && k(o4)), i.length > u4 && i.sort(f));
    x.__r = 0;
  }
  function C(n3, l4, u4, t4, i4, o4, r4, f4, e4, a4, h4) {
    var v4, p4, y3, d4, _3, g4 = t4 && t4.__k || s, b4 = l4.length;
    for (u4.__d = e4, P(u4, l4, g4), e4 = u4.__d, v4 = 0; v4 < b4; v4++)
      null != (y3 = u4.__k[v4]) && "boolean" != typeof y3 && "function" != typeof y3 && (p4 = -1 === y3.__i ? c : g4[y3.__i] || c, y3.__i = v4, L(n3, y3, p4, i4, o4, r4, f4, e4, a4, h4), d4 = y3.__e, y3.ref && p4.ref != y3.ref && (p4.ref && z(p4.ref, null, y3), h4.push(y3.ref, y3.__c || d4, y3)), null == _3 && null != d4 && (_3 = d4), 65536 & y3.__u || p4.__k === y3.__k ? e4 = S(y3, e4, n3) : "function" == typeof y3.type && void 0 !== y3.__d ? e4 = y3.__d : d4 && (e4 = d4.nextSibling), y3.__d = void 0, y3.__u &= -196609);
    u4.__d = e4, u4.__e = _3;
  }
  function P(n3, l4, u4) {
    var t4, i4, o4, r4, f4, e4 = l4.length, c4 = u4.length, s4 = c4, a4 = 0;
    for (n3.__k = [], t4 = 0; t4 < e4; t4++)
      null != (i4 = n3.__k[t4] = null == (i4 = l4[t4]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? d(null, i4, null, null, i4) : h(i4) ? d(g, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? d(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n3, i4.__b = n3.__b + 1, f4 = H(i4, u4, r4 = t4 + a4, s4), i4.__i = f4, o4 = null, -1 !== f4 && (s4--, (o4 = u4[f4]) && (o4.__u |= 131072)), null == o4 || null === o4.__v ? (-1 == f4 && a4--, "function" != typeof i4.type && (i4.__u |= 65536)) : f4 !== r4 && (f4 === r4 + 1 ? a4++ : f4 > r4 ? s4 > e4 - r4 ? a4 += f4 - r4 : a4-- : a4 = f4 < r4 && f4 == r4 - 1 ? f4 - r4 : 0, f4 !== t4 + a4 && (i4.__u |= 65536))) : (o4 = u4[t4]) && null == o4.key && o4.__e && (o4.__e == n3.__d && (n3.__d = m(o4)), N(o4, o4, false), u4[t4] = null, s4--);
    if (s4)
      for (t4 = 0; t4 < c4; t4++)
        null != (o4 = u4[t4]) && 0 == (131072 & o4.__u) && (o4.__e == n3.__d && (n3.__d = m(o4)), N(o4, o4));
  }
  function S(n3, l4, u4) {
    var t4, i4;
    if ("function" == typeof n3.type) {
      for (t4 = n3.__k, i4 = 0; t4 && i4 < t4.length; i4++)
        t4[i4] && (t4[i4].__ = n3, l4 = S(t4[i4], l4, u4));
      return l4;
    }
    return n3.__e != l4 && (u4.insertBefore(n3.__e, l4 || null), l4 = n3.__e), l4 && l4.nextSibling;
  }
  function $(n3, l4) {
    return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (h(n3) ? n3.some(function(n4) {
      $(n4, l4);
    }) : l4.push(n3)), l4;
  }
  function H(n3, l4, u4, t4) {
    var i4 = n3.key, o4 = n3.type, r4 = u4 - 1, f4 = u4 + 1, e4 = l4[u4];
    if (null === e4 || e4 && i4 == e4.key && o4 === e4.type)
      return u4;
    if (t4 > (null != e4 && 0 == (131072 & e4.__u) ? 1 : 0))
      for (; r4 >= 0 || f4 < l4.length; ) {
        if (r4 >= 0) {
          if ((e4 = l4[r4]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return r4;
          r4--;
        }
        if (f4 < l4.length) {
          if ((e4 = l4[f4]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return f4;
          f4++;
        }
      }
    return -1;
  }
  function I(n3, l4, u4) {
    "-" === l4[0] ? n3.setProperty(l4, null == u4 ? "" : u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || a.test(l4) ? u4 : u4 + "px";
  }
  function T(n3, l4, u4, t4, i4) {
    var o4;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof t4 && (n3.style.cssText = t4 = ""), t4)
            for (l4 in t4)
              u4 && l4 in u4 || I(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              t4 && u4[l4] === t4[l4] || I(n3.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o4 = l4 !== (l4 = l4.replace(/(PointerCapture)$|Capture$/, "$1")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o4] = u4, u4 ? t4 ? u4.u = t4.u : (u4.u = Date.now(), n3.addEventListener(l4, o4 ? D : A, o4)) : n3.removeEventListener(l4, o4 ? D : A, o4);
      else {
        if (i4)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l4 && "height" !== l4 && "href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && "rowSpan" !== l4 && "colSpan" !== l4 && "role" !== l4 && l4 in n3)
          try {
            n3[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l4[4] ? n3.removeAttribute(l4) : n3.setAttribute(l4, u4));
      }
  }
  function A(n3) {
    var u4 = this.l[n3.type + false];
    if (n3.t) {
      if (n3.t <= u4.u)
        return;
    } else
      n3.t = Date.now();
    return u4(l.event ? l.event(n3) : n3);
  }
  function D(n3) {
    return this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function L(n3, u4, t4, i4, o4, r4, f4, e4, c4, s4) {
    var a4, p4, y3, d4, _3, m4, k4, w4, x3, P3, S3, $3, H3, I3, T4, A3 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    128 & t4.__u && (c4 = !!(32 & t4.__u), r4 = [e4 = u4.__e = t4.__e]), (a4 = l.__b) && a4(u4);
    n:
      if ("function" == typeof A3)
        try {
          if (w4 = u4.props, x3 = (a4 = A3.contextType) && i4[a4.__c], P3 = a4 ? x3 ? x3.props.value : a4.__ : i4, t4.__c ? k4 = (p4 = u4.__c = t4.__c).__ = p4.__E : ("prototype" in A3 && A3.prototype.render ? u4.__c = p4 = new A3(w4, P3) : (u4.__c = p4 = new b(w4, P3), p4.constructor = A3, p4.render = O), x3 && x3.sub(p4), p4.props = w4, p4.state || (p4.state = {}), p4.context = P3, p4.__n = i4, y3 = p4.__d = true, p4.__h = [], p4._sb = []), null == p4.__s && (p4.__s = p4.state), null != A3.getDerivedStateFromProps && (p4.__s == p4.state && (p4.__s = v({}, p4.__s)), v(p4.__s, A3.getDerivedStateFromProps(w4, p4.__s))), d4 = p4.props, _3 = p4.state, p4.__v = u4, y3)
            null == A3.getDerivedStateFromProps && null != p4.componentWillMount && p4.componentWillMount(), null != p4.componentDidMount && p4.__h.push(p4.componentDidMount);
          else {
            if (null == A3.getDerivedStateFromProps && w4 !== d4 && null != p4.componentWillReceiveProps && p4.componentWillReceiveProps(w4, P3), !p4.__e && (null != p4.shouldComponentUpdate && false === p4.shouldComponentUpdate(w4, p4.__s, P3) || u4.__v === t4.__v)) {
              for (u4.__v !== t4.__v && (p4.props = w4, p4.state = p4.__s, p4.__d = false), u4.__e = t4.__e, u4.__k = t4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), S3 = 0; S3 < p4._sb.length; S3++)
                p4.__h.push(p4._sb[S3]);
              p4._sb = [], p4.__h.length && f4.push(p4);
              break n;
            }
            null != p4.componentWillUpdate && p4.componentWillUpdate(w4, p4.__s, P3), null != p4.componentDidUpdate && p4.__h.push(function() {
              p4.componentDidUpdate(d4, _3, m4);
            });
          }
          if (p4.context = P3, p4.props = w4, p4.__P = n3, p4.__e = false, $3 = l.__r, H3 = 0, "prototype" in A3 && A3.prototype.render) {
            for (p4.state = p4.__s, p4.__d = false, $3 && $3(u4), a4 = p4.render(p4.props, p4.state, p4.context), I3 = 0; I3 < p4._sb.length; I3++)
              p4.__h.push(p4._sb[I3]);
            p4._sb = [];
          } else
            do {
              p4.__d = false, $3 && $3(u4), a4 = p4.render(p4.props, p4.state, p4.context), p4.state = p4.__s;
            } while (p4.__d && ++H3 < 25);
          p4.state = p4.__s, null != p4.getChildContext && (i4 = v(v({}, i4), p4.getChildContext())), y3 || null == p4.getSnapshotBeforeUpdate || (m4 = p4.getSnapshotBeforeUpdate(d4, _3)), C(n3, h(T4 = null != a4 && a4.type === g && null == a4.key ? a4.props.children : a4) ? T4 : [T4], u4, t4, i4, o4, r4, f4, e4, c4, s4), p4.base = u4.__e, u4.__u &= -161, p4.__h.length && f4.push(p4), k4 && (p4.__E = p4.__ = null);
        } catch (n4) {
          u4.__v = null, c4 || null != r4 ? (u4.__e = e4, u4.__u |= c4 ? 160 : 32, r4[r4.indexOf(e4)] = null) : (u4.__e = t4.__e, u4.__k = t4.__k), l.__e(n4, u4, t4);
        }
      else
        null == r4 && u4.__v === t4.__v ? (u4.__k = t4.__k, u4.__e = t4.__e) : u4.__e = j(t4.__e, u4, t4, i4, o4, r4, f4, c4, s4);
    (a4 = l.diffed) && a4(u4);
  }
  function M(n3, u4, t4) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t4.length; i4++)
      z(t4[i4], t4[++i4], t4[++i4]);
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function j(l4, u4, t4, i4, o4, r4, f4, e4, s4) {
    var a4, v4, y3, d4, _3, g4, b4, k4 = t4.props, w4 = u4.props, x3 = u4.type;
    if ("svg" === x3 && (o4 = true), null != r4) {
      for (a4 = 0; a4 < r4.length; a4++)
        if ((_3 = r4[a4]) && "setAttribute" in _3 == !!x3 && (x3 ? _3.localName === x3 : 3 === _3.nodeType)) {
          l4 = _3, r4[a4] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === x3)
        return document.createTextNode(w4);
      l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", x3) : document.createElement(x3, w4.is && w4), r4 = null, e4 = false;
    }
    if (null === x3)
      k4 === w4 || e4 && l4.data === w4 || (l4.data = w4);
    else {
      if (r4 = r4 && n.call(l4.childNodes), k4 = t4.props || c, !e4 && null != r4)
        for (k4 = {}, a4 = 0; a4 < l4.attributes.length; a4++)
          k4[(_3 = l4.attributes[a4]).name] = _3.value;
      for (a4 in k4)
        _3 = k4[a4], "children" == a4 || ("dangerouslySetInnerHTML" == a4 ? y3 = _3 : "key" === a4 || a4 in w4 || T(l4, a4, null, _3, o4));
      for (a4 in w4)
        _3 = w4[a4], "children" == a4 ? d4 = _3 : "dangerouslySetInnerHTML" == a4 ? v4 = _3 : "value" == a4 ? g4 = _3 : "checked" == a4 ? b4 = _3 : "key" === a4 || e4 && "function" != typeof _3 || k4[a4] === _3 || T(l4, a4, _3, k4[a4], o4);
      if (v4)
        e4 || y3 && (v4.__html === y3.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4.__html), u4.__k = [];
      else if (y3 && (l4.innerHTML = ""), C(l4, h(d4) ? d4 : [d4], u4, t4, i4, o4 && "foreignObject" !== x3, r4, f4, r4 ? r4[0] : t4.__k && m(t4, 0), e4, s4), null != r4)
        for (a4 = r4.length; a4--; )
          null != r4[a4] && p(r4[a4]);
      e4 || (a4 = "value", void 0 !== g4 && (g4 !== l4[a4] || "progress" === x3 && !g4 || "option" === x3 && g4 !== k4[a4]) && T(l4, a4, g4, k4[a4], false), a4 = "checked", void 0 !== b4 && b4 !== l4[a4] && T(l4, a4, b4, k4[a4], false));
    }
    return l4;
  }
  function z(n3, u4, t4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, t4);
    }
  }
  function N(n3, u4, t4) {
    var i4, o4;
    if (l.unmount && l.unmount(n3), (i4 = n3.ref) && (i4.current && i4.current !== n3.__e || z(i4, null, u4)), null != (i4 = n3.__c)) {
      if (i4.componentWillUnmount)
        try {
          i4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      i4.base = i4.__P = null, n3.__c = void 0;
    }
    if (i4 = n3.__k)
      for (o4 = 0; o4 < i4.length; o4++)
        i4[o4] && N(i4[o4], u4, t4 || "function" != typeof n3.type);
    t4 || null == n3.__e || p(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
  }
  function O(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function q(u4, t4, i4) {
    var o4, r4, f4, e4;
    l.__ && l.__(u4, t4), r4 = (o4 = "function" == typeof i4) ? null : i4 && i4.__k || t4.__k, f4 = [], e4 = [], L(t4, u4 = (!o4 && i4 || t4).__k = y(g, null, [u4]), r4 || c, c, void 0 !== t4.ownerSVGElement, !o4 && i4 ? [i4] : r4 ? null : t4.firstChild ? n.call(t4.childNodes) : null, f4, !o4 && i4 ? i4 : r4 ? r4.__e : t4.firstChild, o4, e4), M(f4, u4, e4);
  }
  function E(l4, u4, t4) {
    var i4, o4, r4, f4, e4 = v({}, l4.props);
    for (r4 in l4.type && l4.type.defaultProps && (f4 = l4.type.defaultProps), u4)
      "key" == r4 ? i4 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : e4[r4] = void 0 === u4[r4] && void 0 !== f4 ? f4[r4] : u4[r4];
    return arguments.length > 2 && (e4.children = arguments.length > 3 ? n.call(arguments, 2) : t4), d(l4.type, e4, i4 || l4.key, o4 || l4.ref, null);
  }
  n = s.slice, l = { __e: function(n3, l4, u4, t4) {
    for (var i4, o4, r4; l4 = l4.__; )
      if ((i4 = l4.__c) && !i4.__)
        try {
          if ((o4 = i4.constructor) && null != o4.getDerivedStateFromError && (i4.setState(o4.getDerivedStateFromError(n3)), r4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n3, t4 || {}), r4 = i4.__d), r4)
            return i4.__E = i4;
        } catch (l5) {
          n3 = l5;
        }
    throw n3;
  } }, u = 0, t = function(n3) {
    return null != n3 && null == n3.constructor;
  }, b.prototype.setState = function(n3, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n3 && (n3 = n3(v({}, u4), this.props)), n3 && v(u4, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), w(this));
  }, b.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), w(this));
  }, b.prototype.render = g, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n3, l4) {
    return n3.__v.__b - l4.__v.__b;
  }, x.__r = 0, e = 0;

  // tests/_npm/node_modules/@uppy/utils/lib/isDOMElement.js
  function isDOMElement(obj) {
    if (typeof obj !== "object" || obj === null)
      return false;
    if (!("nodeType" in obj))
      return false;
    return obj.nodeType === Node.ELEMENT_NODE;
  }

  // tests/_npm/node_modules/@uppy/utils/lib/findDOMElement.js
  function findDOMElement(element, context) {
    if (context === void 0) {
      context = document;
    }
    if (typeof element === "string") {
      return context.querySelector(element);
    }
    if (isDOMElement(element)) {
      return element;
    }
    return null;
  }

  // tests/_npm/node_modules/@uppy/utils/lib/getTextDirection.js
  function getTextDirection(element) {
    var _element;
    while (element && !element.dir) {
      element = element.parentNode;
    }
    return (_element = element) == null ? void 0 : _element.dir;
  }
  var getTextDirection_default = getTextDirection;

  // tests/_npm/node_modules/@uppy/core/lib/BasePlugin.js
  var BasePlugin = class {
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
      this.setPluginState();
      this.i18nInit();
    }
    i18nInit() {
      const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
      this.i18n = translator.translate.bind(translator);
      this.i18nArray = translator.translateArray.bind(translator);
      this.setPluginState();
    }
    /**
     * Extendable methods
     * ==================
     * These methods are here to serve as an overview of the extendable methods as well as
     * making them not conditional in use, such as `if (this.afterUpdate)`.
     */
    // eslint-disable-next-line class-methods-use-this
    addTarget() {
      throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
    }
    // eslint-disable-next-line class-methods-use-this
    install() {
    }
    // eslint-disable-next-line class-methods-use-this
    uninstall() {
    }
    /**
     * Called when plugin is mounted, whether in DOM or into another plugin.
     * Needed because sometimes plugins are mounted separately/after `install`,
     * so this.el and this.parent might not be available in `install`.
     * This is the case with @uppy/react plugins, for example.
     */
    render() {
      throw new Error("Extend the render method to add your plugin to a DOM element");
    }
    // eslint-disable-next-line class-methods-use-this
    update() {
    }
    // Called after every state update, after everything's mounted. Debounced.
    // eslint-disable-next-line class-methods-use-this
    afterUpdate() {
    }
  };

  // tests/_npm/node_modules/@uppy/core/lib/UIPlugin.js
  function _classPrivateFieldLooseBase2(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id2 = 0;
  function _classPrivateFieldLooseKey2(name) {
    return "__private_" + id2++ + "_" + name;
  }
  function debounce(fn) {
    let calling = null;
    let latestArgs = null;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      latestArgs = args;
      if (!calling) {
        calling = Promise.resolve().then(() => {
          calling = null;
          return fn(...latestArgs);
        });
      }
      return calling;
    };
  }
  var _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey2("updateUI");
  var UIPlugin = class _UIPlugin extends BasePlugin {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, _updateUI, {
        writable: true,
        value: void 0
      });
    }
    getTargetPlugin(target) {
      let targetPlugin;
      if (typeof target === "object" && target instanceof _UIPlugin) {
        targetPlugin = target;
      } else if (typeof target === "function") {
        const Target = target;
        this.uppy.iteratePlugins((p4) => {
          if (p4 instanceof Target) {
            targetPlugin = p4;
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
        const uppyRootElement = document.createElement("div");
        uppyRootElement.classList.add("uppy-Root");
        _classPrivateFieldLooseBase2(this, _updateUI)[_updateUI] = debounce((state) => {
          if (!this.uppy.getPlugin(this.id))
            return;
          q(this.render(state), uppyRootElement);
          this.afterUpdate();
        });
        this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
        if (this.opts.replaceTargetContent) {
          targetElement.innerHTML = "";
        }
        q(this.render(this.uppy.getState()), uppyRootElement);
        this.el = uppyRootElement;
        targetElement.appendChild(uppyRootElement);
        uppyRootElement.dir = this.opts.direction || getTextDirection_default(uppyRootElement) || "ltr";
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
      if (typeof target === "function") {
        message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
      } else {
        message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
      }
      throw new Error(message);
    }
    update(state) {
      if (this.el != null) {
        var _classPrivateFieldLoo, _classPrivateFieldLoo2;
        (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase2(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
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
    onMount() {
    }
    // eslint-disable-next-line class-methods-use-this
    onUnmount() {
    }
  };
  var UIPlugin_default = UIPlugin;

  // tests/_npm/node_modules/@uppy/utils/lib/emaFilter.js
  function emaFilter(newValue, previousSmoothedValue, halfLife, dt) {
    if (halfLife === 0 || newValue === previousSmoothedValue)
      return newValue;
    if (dt === 0)
      return previousSmoothedValue;
    return newValue + (previousSmoothedValue - newValue) * 2 ** (-dt / halfLife);
  }

  // tests/_npm/node_modules/@uppy/status-bar/lib/StatusBarStates.js
  var StatusBarStates_default = {
    STATE_ERROR: "error",
    STATE_WAITING: "waiting",
    STATE_PREPROCESSING: "preprocessing",
    STATE_UPLOADING: "uploading",
    STATE_POSTPROCESSING: "postprocessing",
    STATE_COMPLETE: "complete"
  };

  // tests/_npm/node_modules/@uppy/status-bar/lib/StatusBarUI.js
  var import_classnames2 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/status-bar/lib/calculateProcessingProgress.js
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
      if (message == null && (preprocess || postprocess)) {
        ({
          mode,
          message
        } = preprocess || postprocess);
      }
      if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
        values.push(preprocess.value);
      if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
        values.push(postprocess.value);
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

  // tests/_npm/node_modules/@uppy/status-bar/lib/Components.js
  var import_classnames = __toESM(require_classnames(), 1);
  var import_prettier_bytes = __toESM(require_prettierBytes(), 1);

  // tests/_npm/node_modules/@uppy/utils/lib/secondsToTime.js
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

  // tests/_npm/node_modules/@uppy/utils/lib/prettyETA.js
  function prettyETA(seconds) {
    const time = secondsToTime(seconds);
    const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
    const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
    const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
    return `${hoursStr}${minutesStr}${secondsStr}`;
  }

  // tests/_npm/node_modules/@uppy/status-bar/lib/Components.js
  var DOT = `\xB7`;
  var renderDot = () => ` ${DOT} `;
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
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
      "uppy-c-btn-primary": uploadState === StatusBarStates_default.STATE_WAITING
    }, {
      "uppy-StatusBar-actionBtn--disabled": isSomeGhost
    });
    const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
      smart_count: newFiles
    }) : i18n("uploadXFiles", {
      smart_count: newFiles
    });
    return y("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
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
    return y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
      "aria-label": i18n("retryUpload"),
      onClick: () => uppy.retryAll().catch(() => {
      }),
      "data-uppy-super-focusable": true,
      "data-cy": "retry"
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "8",
      height: "10",
      viewBox: "0 0 8 10"
    }, y("path", {
      d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
    })), i18n("retry"));
  }
  function CancelBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return y("button", {
      type: "button",
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      title: i18n("cancel"),
      "aria-label": i18n("cancel"),
      onClick: () => uppy.cancelAll(),
      "data-cy": "cancel",
      "data-uppy-super-focusable": true
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, y("g", {
      fill: "none",
      fillRule: "evenodd"
    }, y("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), y("path", {
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
    const title = isAllPaused ? i18n("resume") : i18n("pause");
    function togglePauseResume() {
      if (isAllComplete)
        return null;
      if (!resumableUploads) {
        return uppy.cancelAll();
      }
      if (isAllPaused) {
        return uppy.resumeAll();
      }
      return uppy.pauseAll();
    }
    return y("button", {
      title,
      "aria-label": title,
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      type: "button",
      onClick: togglePauseResume,
      "data-cy": "togglePauseResume",
      "data-uppy-super-focusable": true
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, y("g", {
      fill: "none",
      fillRule: "evenodd"
    }, y("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), y("path", {
      fill: "#FFF",
      d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
    }))));
  }
  function DoneBtn(props) {
    const {
      i18n,
      doneButtonHandler
    } = props;
    return y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
      onClick: doneButtonHandler,
      "data-uppy-super-focusable": true
    }, i18n("done"));
  }
  function LoadingSpinner() {
    return y("svg", {
      className: "uppy-StatusBar-spinner",
      "aria-hidden": "true",
      focusable: "false",
      width: "14",
      height: "14"
    }, y("path", {
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
    const dot = `\xB7`;
    return y("div", {
      className: "uppy-StatusBar-content"
    }, y(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
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
    return y("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }), y("span", {
      className: "uppy-StatusBar-additionalInfo"
    }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
      complete: (0, import_prettier_bytes.default)(totalUploadedSize),
      total: (0, import_prettier_bytes.default)(totalSize)
    }), renderDot(), i18n("xTimeLeft", {
      time: prettyETA(totalETA)
    })));
  }
  function FileUploadCount(props) {
    const {
      i18n,
      complete,
      numUploads
    } = props;
    return y("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, i18n("filesUploadedOfTotal", {
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
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
    return y("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, y("div", {
      className: "uppy-StatusBar-statusSecondaryHint"
    }, i18n("xMoreFilesAdded", {
      smart_count: newFiles
    })), y("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload
    }, i18n("upload")));
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
    const title = isAllPaused ? i18n("paused") : i18n("uploading");
    function renderProgressDetails() {
      if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
        if (supportsUploadProgress) {
          return y(ProgressDetails, {
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            i18n
          });
        }
        return y(FileUploadCount, {
          i18n,
          complete,
          numUploads
        });
      }
      return null;
    }
    return y("div", {
      className: "uppy-StatusBar-content",
      "aria-label": title,
      title
    }, !isAllPaused ? y(LoadingSpinner, null) : null, y("div", {
      className: "uppy-StatusBar-status"
    }, y("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, supportsUploadProgress ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? y(UploadNewlyAddedFiles, {
      i18n,
      newFiles,
      startUpload
    }) : null));
  }
  function ProgressBarComplete(props) {
    const {
      i18n
    } = props;
    return y("div", {
      className: "uppy-StatusBar-content",
      role: "status",
      title: i18n("complete")
    }, y("div", {
      className: "uppy-StatusBar-status"
    }, y("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "15",
      height: "11",
      viewBox: "0 0 15 11"
    }, y("path", {
      d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
    })), i18n("complete"))));
  }
  function ProgressBarError(props) {
    const {
      error,
      i18n,
      complete,
      numUploads
    } = props;
    function displayErrorAlert() {
      const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
      alert(errorMessage);
    }
    return y("div", {
      className: "uppy-StatusBar-content",
      title: i18n("uploadFailed")
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, y("path", {
      d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
    })), y("div", {
      className: "uppy-StatusBar-status"
    }, y("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, i18n("uploadFailed"), y("button", {
      className: "uppy-u-reset uppy-StatusBar-details",
      "aria-label": i18n("showErrorDetails"),
      "data-microtip-position": "top-right",
      "data-microtip-size": "medium",
      onClick: displayErrorAlert,
      type: "button"
    }, "?")), y(FileUploadCount, {
      i18n,
      complete,
      numUploads
    })));
  }

  // tests/_npm/node_modules/@uppy/status-bar/lib/StatusBarUI.js
  var {
    STATE_ERROR,
    STATE_WAITING,
    STATE_PREPROCESSING,
    STATE_UPLOADING,
    STATE_POSTPROCESSING,
    STATE_COMPLETE
  } = StatusBarStates_default;
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
        case STATE_PREPROCESSING: {
          const progress = calculateProcessingProgress(files);
          if (progress.mode === "determinate") {
            return progress.value * 100;
          }
          return totalProgress;
        }
        case STATE_ERROR: {
          return null;
        }
        case STATE_UPLOADING: {
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
        case STATE_PREPROCESSING: {
          const {
            mode
          } = calculateProcessingProgress(files);
          return mode === "indeterminate";
        }
        case STATE_UPLOADING: {
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
    const progressClassNames = (0, import_classnames2.default)("uppy-StatusBar-progress", {
      "is-indeterminate": getIsIndeterminate()
    });
    const statusBarClassNames = (0, import_classnames2.default)("uppy-StatusBar", `is-${uploadState}`, {
      "has-ghosts": isSomeGhost
    });
    return y("div", {
      className: statusBarClassNames,
      "aria-hidden": isHidden
    }, y("div", {
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
          return y(ProgressBarProcessing, {
            progress: calculateProcessingProgress(files)
          });
        case STATE_COMPLETE:
          return y(ProgressBarComplete, {
            i18n
          });
        case STATE_ERROR:
          return y(ProgressBarError, {
            error,
            i18n,
            numUploads,
            complete
          });
        case STATE_UPLOADING:
          return y(ProgressBarUploading, {
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
          });
        default:
          return null;
      }
    })(), y("div", {
      className: "uppy-StatusBar-actions"
    }, recoveredState || showUploadBtn ? y(UploadBtn, {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      isSomeGhost,
      startUpload,
      uploadState
    }) : null, showRetryBtn ? y(RetryBtn, {
      i18n,
      uppy
    }) : null, showPauseResumeBtn ? y(PauseResumeButton, {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    }) : null, showCancelBtn ? y(CancelBtn, {
      i18n,
      uppy
    }) : null, showDoneBtn ? y(DoneBtn, {
      i18n,
      doneButtonHandler
    }) : null));
  }

  // tests/_npm/node_modules/@uppy/status-bar/lib/locale.js
  var locale_default = {
    strings: {
      // Shown in the status bar while files are being uploaded.
      uploading: "Uploading",
      // Shown in the status bar once all files have been uploaded.
      complete: "Complete",
      // Shown in the status bar if an upload failed.
      uploadFailed: "Upload failed",
      // Shown in the status bar while the upload is paused.
      paused: "Paused",
      // Used as the label for the button that retries an upload.
      retry: "Retry",
      // Used as the label for the button that cancels an upload.
      cancel: "Cancel",
      // Used as the label for the button that pauses an upload.
      pause: "Pause",
      // Used as the label for the button that resumes an upload.
      resume: "Resume",
      // Used as the label for the button that resets the upload state after an upload
      done: "Done",
      // When `showProgressDetails` is set, shows the number of files that have been fully uploaded so far.
      filesUploadedOfTotal: {
        0: "%{complete} of %{smart_count} file uploaded",
        1: "%{complete} of %{smart_count} files uploaded"
      },
      // When `showProgressDetails` is set, shows the amount of bytes that have been uploaded so far.
      dataUploadedOfTotal: "%{complete} of %{total}",
      // When `showProgressDetails` is set, shows an estimation of how long the upload will take to complete.
      xTimeLeft: "%{time} left",
      // Used as the label for the button that starts an upload.
      uploadXFiles: {
        0: "Upload %{smart_count} file",
        1: "Upload %{smart_count} files"
      },
      // Used as the label for the button that starts an upload, if another upload has been started in the past
      // and new files were added later.
      uploadXNewFiles: {
        0: "Upload +%{smart_count} file",
        1: "Upload +%{smart_count} files"
      },
      upload: "Upload",
      retryUpload: "Retry upload",
      xMoreFilesAdded: {
        0: "%{smart_count} more file added",
        1: "%{smart_count} more files added"
      },
      showErrorDetails: "Show error details"
    }
  };

  // tests/_npm/node_modules/@uppy/status-bar/lib/StatusBar.js
  function _classPrivateFieldLooseBase3(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id3 = 0;
  function _classPrivateFieldLooseKey3(name) {
    return "__private_" + id3++ + "_" + name;
  }
  var packageJson = {
    "version": "3.2.5"
  };
  var speedFilterHalfLife = 2e3;
  var ETAFilterHalfLife = 2e3;
  function getUploadingState(error, isAllComplete, recoveredState, files) {
    if (error) {
      return StatusBarStates_default.STATE_ERROR;
    }
    if (isAllComplete) {
      return StatusBarStates_default.STATE_COMPLETE;
    }
    if (recoveredState) {
      return StatusBarStates_default.STATE_WAITING;
    }
    let state = StatusBarStates_default.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return StatusBarStates_default.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== StatusBarStates_default.STATE_UPLOADING) {
        state = StatusBarStates_default.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== StatusBarStates_default.STATE_UPLOADING && state !== StatusBarStates_default.STATE_PREPROCESSING) {
        state = StatusBarStates_default.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  var _lastUpdateTime = /* @__PURE__ */ _classPrivateFieldLooseKey3("lastUpdateTime");
  var _previousUploadedBytes = /* @__PURE__ */ _classPrivateFieldLooseKey3("previousUploadedBytes");
  var _previousSpeed = /* @__PURE__ */ _classPrivateFieldLooseKey3("previousSpeed");
  var _previousETA = /* @__PURE__ */ _classPrivateFieldLooseKey3("previousETA");
  var _computeSmoothETA = /* @__PURE__ */ _classPrivateFieldLooseKey3("computeSmoothETA");
  var _onUploadStart = /* @__PURE__ */ _classPrivateFieldLooseKey3("onUploadStart");
  var StatusBar2 = class extends UIPlugin_default {
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
        });
      };
      Object.defineProperty(this, _onUploadStart, {
        writable: true,
        value: () => {
          const {
            recoveredState
          } = this.uppy.getState();
          _classPrivateFieldLooseBase3(this, _previousSpeed)[_previousSpeed] = null;
          _classPrivateFieldLooseBase3(this, _previousETA)[_previousETA] = null;
          if (recoveredState) {
            _classPrivateFieldLooseBase3(this, _previousUploadedBytes)[_previousUploadedBytes] = Object.values(recoveredState.files).reduce((pv, _ref) => {
              let {
                progress
              } = _ref;
              return pv + progress.bytesUploaded;
            }, 0);
            this.uppy.emit("restore-confirmed");
            return;
          }
          _classPrivateFieldLooseBase3(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
          _classPrivateFieldLooseBase3(this, _previousUploadedBytes)[_previousUploadedBytes] = 0;
        }
      });
      this.id = this.opts.id || "StatusBar";
      this.title = "StatusBar";
      this.type = "progressindicator";
      this.defaultLocale = locale_default;
      const defaultOptions = {
        target: "body",
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
      const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
      const resumableUploads = !!capabilities.resumableUploads;
      const supportsUploadProgress = capabilities.uploadProgress !== false;
      let totalSize = 0;
      let totalUploadedSize = 0;
      startedFiles.forEach((file) => {
        totalSize += file.progress.bytesTotal || 0;
        totalUploadedSize += file.progress.bytesUploaded || 0;
      });
      const totalETA = _classPrivateFieldLooseBase3(this, _computeSmoothETA)[_computeSmoothETA]({
        uploaded: totalUploadedSize,
        total: totalSize,
        remaining: totalSize - totalUploadedSize
      });
      return StatusBar({
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
      const element = this.el;
      const direction = getTextDirection_default(element);
      if (!direction) {
        element.dir = "ltr";
      }
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
      this.uppy.on("upload", _classPrivateFieldLooseBase3(this, _onUploadStart)[_onUploadStart]);
      _classPrivateFieldLooseBase3(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
      _classPrivateFieldLooseBase3(this, _previousUploadedBytes)[_previousUploadedBytes] = this.uppy.getFiles().reduce((pv, file) => pv + file.progress.bytesUploaded, 0);
    }
    uninstall() {
      this.unmount();
      this.uppy.off("upload", _classPrivateFieldLooseBase3(this, _onUploadStart)[_onUploadStart]);
    }
  };
  function _computeSmoothETA2(totalBytes) {
    var _classPrivateFieldLoo, _classPrivateFieldLoo2;
    if (totalBytes.total === 0 || totalBytes.remaining === 0) {
      return 0;
    }
    (_classPrivateFieldLoo2 = (_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _lastUpdateTime))[_lastUpdateTime]) != null ? _classPrivateFieldLoo2 : _classPrivateFieldLoo[_lastUpdateTime] = performance.now();
    const dt = performance.now() - _classPrivateFieldLooseBase3(this, _lastUpdateTime)[_lastUpdateTime];
    if (dt === 0) {
      var _classPrivateFieldLoo3;
      return Math.round(((_classPrivateFieldLoo3 = _classPrivateFieldLooseBase3(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo3 : 0) / 100) / 10;
    }
    const uploadedBytesSinceLastTick = totalBytes.uploaded - _classPrivateFieldLooseBase3(this, _previousUploadedBytes)[_previousUploadedBytes];
    _classPrivateFieldLooseBase3(this, _previousUploadedBytes)[_previousUploadedBytes] = totalBytes.uploaded;
    if (uploadedBytesSinceLastTick <= 0) {
      var _classPrivateFieldLoo4;
      return Math.round(((_classPrivateFieldLoo4 = _classPrivateFieldLooseBase3(this, _previousETA)[_previousETA]) != null ? _classPrivateFieldLoo4 : 0) / 100) / 10;
    }
    const currentSpeed = uploadedBytesSinceLastTick / dt;
    const filteredSpeed = _classPrivateFieldLooseBase3(this, _previousSpeed)[_previousSpeed] == null ? currentSpeed : emaFilter(currentSpeed, _classPrivateFieldLooseBase3(this, _previousSpeed)[_previousSpeed], speedFilterHalfLife, dt);
    _classPrivateFieldLooseBase3(this, _previousSpeed)[_previousSpeed] = filteredSpeed;
    const instantETA = totalBytes.remaining / filteredSpeed;
    const updatedPreviousETA = Math.max(_classPrivateFieldLooseBase3(this, _previousETA)[_previousETA] - dt, 0);
    const filteredETA = _classPrivateFieldLooseBase3(this, _previousETA)[_previousETA] == null ? instantETA : emaFilter(instantETA, updatedPreviousETA, ETAFilterHalfLife, dt);
    _classPrivateFieldLooseBase3(this, _previousETA)[_previousETA] = filteredETA;
    _classPrivateFieldLooseBase3(this, _lastUpdateTime)[_lastUpdateTime] = performance.now();
    return Math.round(filteredETA / 100) / 10;
  }
  StatusBar2.VERSION = packageJson.version;

  // tests/_npm/node_modules/@uppy/informer/lib/FadeIn.js
  var TRANSITION_MS = 300;
  var FadeIn = class extends b {
    constructor() {
      super(...arguments);
      this.ref = _();
    }
    componentWillEnter(callback) {
      this.ref.current.style.opacity = "1";
      this.ref.current.style.transform = "none";
      setTimeout(callback, TRANSITION_MS);
    }
    componentWillLeave(callback) {
      this.ref.current.style.opacity = "0";
      this.ref.current.style.transform = "translateY(350%)";
      setTimeout(callback, TRANSITION_MS);
    }
    render() {
      const {
        children
      } = this.props;
      return y("div", {
        className: "uppy-Informer-animated",
        ref: this.ref
      }, children);
    }
  };

  // tests/_npm/node_modules/@uppy/informer/lib/TransitionGroup.js
  function assign(obj, props) {
    return Object.assign(obj, props);
  }
  function getKey(vnode, fallback) {
    var _vnode$key;
    return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
  }
  function linkRef(component, name) {
    const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
    return cache[name] || (cache[name] = (c4) => {
      component.refs[name] = c4;
    });
  }
  function getChildMapping(children) {
    const out = {};
    for (let i4 = 0; i4 < children.length; i4++) {
      if (children[i4] != null) {
        const key = getKey(children[i4], i4.toString(36));
        out[key] = children[i4];
      }
    }
    return out;
  }
  function mergeChildMappings(prev, next) {
    prev = prev || {};
    next = next || {};
    const getValueForKey = (key) => next.hasOwnProperty(key) ? next[key] : prev[key];
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
        for (let i4 = 0; i4 < nextKeysPending[nextKey].length; i4++) {
          const pendingNextKey = nextKeysPending[nextKey][i4];
          childMapping[nextKeysPending[nextKey][i4]] = getValueForKey(pendingNextKey);
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }
    for (let i4 = 0; i4 < pendingKeys.length; i4++) {
      childMapping[pendingKeys[i4]] = getValueForKey(pendingKeys[i4]);
    }
    return childMapping;
  }
  var identity = (i4) => i4;
  var TransitionGroup = class extends b {
    constructor(props, context) {
      super(props, context);
      this.refs = {};
      this.state = {
        children: getChildMapping($($(this.props.children)) || [])
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
          this.performAppear(key);
        }
      }
    }
    componentWillReceiveProps(nextProps) {
      const nextChildMapping = getChildMapping($(nextProps.children) || []);
      const prevChildMapping = this.state.children;
      this.setState((prevState) => ({
        children: mergeChildMappings(prevState.children, nextChildMapping)
      }));
      let key;
      for (key in nextChildMapping) {
        if (nextChildMapping.hasOwnProperty(key)) {
          const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
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
      const currentChildMapping = getChildMapping($(this.props.children) || []);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
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
      const currentChildMapping = getChildMapping($(this.props.children) || []);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    }
    performLeave(key) {
      const idx = this.keysToAbortLeave.indexOf(key);
      if (idx !== -1) {
        return;
      }
      this.currentlyTransitioningKeys[key] = true;
      const component = this.refs[key];
      if (component != null && component.componentWillLeave) {
        component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
      } else {
        this._handleDoneLeaving(key);
      }
    }
    _handleDoneLeaving(key) {
      const idx = this.keysToAbortLeave.indexOf(key);
      if (idx !== -1) {
        return;
      }
      const component = this.refs[key];
      if (component != null && component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete this.currentlyTransitioningKeys[key];
      const currentChildMapping = getChildMapping($(this.props.children) || []);
      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
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
        transitionName: transitionName2,
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
      const childrenToRender = Object.entries(children).map((_ref3) => {
        let [key, child] = _ref3;
        if (!child)
          return void 0;
        const ref = linkRef(this, key);
        return E(childFactory(child), {
          ref,
          key
        });
      }).filter(Boolean);
      return y(component, props, childrenToRender);
    }
  };
  TransitionGroup.defaultProps = {
    component: "span",
    childFactory: identity
  };
  var TransitionGroup_default = TransitionGroup;

  // tests/_npm/node_modules/@uppy/informer/lib/Informer.js
  var packageJson2 = {
    "version": "3.0.4"
  };
  var Informer = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.render = (state) => {
        return y("div", {
          className: "uppy uppy-Informer"
        }, y(TransitionGroup_default, null, state.info.map((info) => y(FadeIn, {
          key: info.message
        }, y("p", {
          role: "alert"
        }, info.message, " ", info.details && y("span", {
          "aria-label": info.details,
          "data-microtip-position": "top-left",
          "data-microtip-size": "medium",
          role: "tooltip",
          onClick: () => alert(`${info.message} 

 ${info.details}`)
        }, "?"))))));
      };
      this.type = "progressindicator";
      this.id = this.opts.id || "Informer";
      this.title = "Informer";
      const defaultOptions = {};
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
  };
  Informer.VERSION = packageJson2.version;

  // tests/_npm/node_modules/@uppy/utils/lib/dataURItoBlob.js
  var DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
  function dataURItoBlob(dataURI, opts, toFile) {
    var _ref, _opts$mimeType;
    const dataURIData = DATA_URL_PATTERN.exec(dataURI);
    const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : "plain/text";
    let data;
    if ((dataURIData == null ? void 0 : dataURIData[2]) != null) {
      const binary = atob(decodeURIComponent(dataURIData[3]));
      const bytes = new Uint8Array(binary.length);
      for (let i4 = 0; i4 < binary.length; i4++) {
        bytes[i4] = binary.charCodeAt(i4);
      }
      data = [bytes];
    } else if ((dataURIData == null ? void 0 : dataURIData[3]) != null) {
      data = [decodeURIComponent(dataURIData[3])];
    }
    if (toFile) {
      return new File(data, opts.name || "", {
        type: mimeType
      });
    }
    return new Blob(data, {
      type: mimeType
    });
  }

  // tests/_npm/node_modules/@uppy/utils/lib/isObjectURL.js
  function isObjectURL(url) {
    return url.startsWith("blob:");
  }

  // tests/_npm/node_modules/@uppy/utils/lib/isPreviewSupported.js
  function isPreviewSupported(fileType) {
    if (!fileType)
      return false;
    return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
  }

  // tests/_npm/node_modules/exifr/dist/mini.esm.mjs
  function e2(e4, t4, s4) {
    return t4 in e4 ? Object.defineProperty(e4, t4, { value: s4, enumerable: true, configurable: true, writable: true }) : e4[t4] = s4, e4;
  }
  var t2 = "undefined" != typeof self ? self : global;
  var s2 = "undefined" != typeof navigator;
  var i2 = s2 && "undefined" == typeof HTMLImageElement;
  var n2 = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node);
  var r2 = t2.Buffer;
  var a2 = !!r2;
  var h2 = (e4) => void 0 !== e4;
  function f2(e4) {
    return void 0 === e4 || (e4 instanceof Map ? 0 === e4.size : 0 === Object.values(e4).filter(h2).length);
  }
  function l2(e4) {
    let t4 = new Error(e4);
    throw delete t4.stack, t4;
  }
  function o2(e4) {
    let t4 = function(e5) {
      let t5 = 0;
      return e5.ifd0.enabled && (t5 += 1024), e5.exif.enabled && (t5 += 2048), e5.makerNote && (t5 += 2048), e5.userComment && (t5 += 1024), e5.gps.enabled && (t5 += 512), e5.interop.enabled && (t5 += 100), e5.ifd1.enabled && (t5 += 1024), t5 + 2048;
    }(e4);
    return e4.jfif.enabled && (t4 += 50), e4.xmp.enabled && (t4 += 2e4), e4.iptc.enabled && (t4 += 14e3), e4.icc.enabled && (t4 += 6e3), t4;
  }
  var u2 = (e4) => String.fromCharCode.apply(null, e4);
  var d2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
  var c2 = class _c {
    static from(e4, t4) {
      return e4 instanceof this && e4.le === t4 ? e4 : new _c(e4, void 0, void 0, t4);
    }
    constructor(e4, t4 = 0, s4, i4) {
      if ("boolean" == typeof i4 && (this.le = i4), Array.isArray(e4) && (e4 = new Uint8Array(e4)), 0 === e4)
        this.byteOffset = 0, this.byteLength = 0;
      else if (e4 instanceof ArrayBuffer) {
        void 0 === s4 && (s4 = e4.byteLength - t4);
        let i5 = new DataView(e4, t4, s4);
        this._swapDataView(i5);
      } else if (e4 instanceof Uint8Array || e4 instanceof DataView || e4 instanceof _c) {
        void 0 === s4 && (s4 = e4.byteLength - t4), (t4 += e4.byteOffset) + s4 > e4.byteOffset + e4.byteLength && l2("Creating view outside of available memory in ArrayBuffer");
        let i5 = new DataView(e4.buffer, t4, s4);
        this._swapDataView(i5);
      } else if ("number" == typeof e4) {
        let t5 = new DataView(new ArrayBuffer(e4));
        this._swapDataView(t5);
      } else
        l2("Invalid input argument for BufferView: " + e4);
    }
    _swapArrayBuffer(e4) {
      this._swapDataView(new DataView(e4));
    }
    _swapBuffer(e4) {
      this._swapDataView(new DataView(e4.buffer, e4.byteOffset, e4.byteLength));
    }
    _swapDataView(e4) {
      this.dataView = e4, this.buffer = e4.buffer, this.byteOffset = e4.byteOffset, this.byteLength = e4.byteLength;
    }
    _lengthToEnd(e4) {
      return this.byteLength - e4;
    }
    set(e4, t4, s4 = _c) {
      return e4 instanceof DataView || e4 instanceof _c ? e4 = new Uint8Array(e4.buffer, e4.byteOffset, e4.byteLength) : e4 instanceof ArrayBuffer && (e4 = new Uint8Array(e4)), e4 instanceof Uint8Array || l2("BufferView.set(): Invalid data argument."), this.toUint8().set(e4, t4), new s4(this, t4, e4.byteLength);
    }
    subarray(e4, t4) {
      return t4 = t4 || this._lengthToEnd(e4), new _c(this, e4, t4);
    }
    toUint8() {
      return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
    }
    getUint8Array(e4, t4) {
      return new Uint8Array(this.buffer, this.byteOffset + e4, t4);
    }
    getString(e4 = 0, t4 = this.byteLength) {
      let s4 = this.getUint8Array(e4, t4);
      return i4 = s4, d2 ? d2.decode(i4) : a2 ? Buffer.from(i4).toString("utf8") : decodeURIComponent(escape(u2(i4)));
      var i4;
    }
    getLatin1String(e4 = 0, t4 = this.byteLength) {
      let s4 = this.getUint8Array(e4, t4);
      return u2(s4);
    }
    getUnicodeString(e4 = 0, t4 = this.byteLength) {
      const s4 = [];
      for (let i4 = 0; i4 < t4 && e4 + i4 < this.byteLength; i4 += 2)
        s4.push(this.getUint16(e4 + i4));
      return u2(s4);
    }
    getInt8(e4) {
      return this.dataView.getInt8(e4);
    }
    getUint8(e4) {
      return this.dataView.getUint8(e4);
    }
    getInt16(e4, t4 = this.le) {
      return this.dataView.getInt16(e4, t4);
    }
    getInt32(e4, t4 = this.le) {
      return this.dataView.getInt32(e4, t4);
    }
    getUint16(e4, t4 = this.le) {
      return this.dataView.getUint16(e4, t4);
    }
    getUint32(e4, t4 = this.le) {
      return this.dataView.getUint32(e4, t4);
    }
    getFloat32(e4, t4 = this.le) {
      return this.dataView.getFloat32(e4, t4);
    }
    getFloat64(e4, t4 = this.le) {
      return this.dataView.getFloat64(e4, t4);
    }
    getFloat(e4, t4 = this.le) {
      return this.dataView.getFloat32(e4, t4);
    }
    getDouble(e4, t4 = this.le) {
      return this.dataView.getFloat64(e4, t4);
    }
    getUintBytes(e4, t4, s4) {
      switch (t4) {
        case 1:
          return this.getUint8(e4, s4);
        case 2:
          return this.getUint16(e4, s4);
        case 4:
          return this.getUint32(e4, s4);
        case 8:
          return this.getUint64 && this.getUint64(e4, s4);
      }
    }
    getUint(e4, t4, s4) {
      switch (t4) {
        case 8:
          return this.getUint8(e4, s4);
        case 16:
          return this.getUint16(e4, s4);
        case 32:
          return this.getUint32(e4, s4);
        case 64:
          return this.getUint64 && this.getUint64(e4, s4);
      }
    }
    toString(e4) {
      return this.dataView.toString(e4, this.constructor.name);
    }
    ensureChunk() {
    }
  };
  function p2(e4, t4) {
    l2(`${e4} '${t4}' was not loaded, try using full build of exifr.`);
  }
  var g2 = class extends Map {
    constructor(e4) {
      super(), this.kind = e4;
    }
    get(e4, t4) {
      return this.has(e4) || p2(this.kind, e4), t4 && (e4 in t4 || function(e5, t5) {
        l2(`Unknown ${e5} '${t5}'.`);
      }(this.kind, e4), t4[e4].enabled || p2(this.kind, e4)), super.get(e4);
    }
    keyList() {
      return Array.from(this.keys());
    }
  };
  var m2 = new g2("file parser");
  var y2 = new g2("segment parser");
  var b2 = new g2("file reader");
  var w2 = t2.fetch;
  function k2(e4, t4) {
    return (i4 = e4).startsWith("data:") || i4.length > 1e4 ? v2(e4, t4, "base64") : n2 && e4.includes("://") ? O2(e4, t4, "url", S2) : n2 ? v2(e4, t4, "fs") : s2 ? O2(e4, t4, "url", S2) : void l2("Invalid input argument");
    var i4;
  }
  async function O2(e4, t4, s4, i4) {
    return b2.has(s4) ? v2(e4, t4, s4) : i4 ? async function(e5, t5) {
      let s5 = await t5(e5);
      return new c2(s5);
    }(e4, i4) : void l2(`Parser ${s4} is not loaded`);
  }
  async function v2(e4, t4, s4) {
    let i4 = new (b2.get(s4))(e4, t4);
    return await i4.read(), i4;
  }
  var S2 = (e4) => w2(e4).then((e5) => e5.arrayBuffer());
  var A2 = (e4) => new Promise((t4, s4) => {
    let i4 = new FileReader();
    i4.onloadend = () => t4(i4.result || new ArrayBuffer()), i4.onerror = s4, i4.readAsArrayBuffer(e4);
  });
  var U = class extends Map {
    get tagKeys() {
      return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
    }
    get tagValues() {
      return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
    }
  };
  function x2(e4, t4, s4) {
    let i4 = new U();
    for (let [e5, t5] of s4)
      i4.set(e5, t5);
    if (Array.isArray(t4))
      for (let s5 of t4)
        e4.set(s5, i4);
    else
      e4.set(t4, i4);
    return i4;
  }
  function C2(e4, t4, s4) {
    let i4, n3 = e4.get(t4);
    for (i4 of s4)
      n3.set(i4[0], i4[1]);
  }
  var B = /* @__PURE__ */ new Map();
  var V = /* @__PURE__ */ new Map();
  var I2 = /* @__PURE__ */ new Map();
  var L2 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
  var T2 = ["jfif", "xmp", "icc", "iptc", "ihdr"];
  var z2 = ["tiff", ...T2];
  var P2 = ["ifd0", "ifd1", "exif", "gps", "interop"];
  var F = [...z2, ...P2];
  var j2 = ["makerNote", "userComment"];
  var E2 = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
  var M2 = [...E2, "sanitize", "mergeOutput", "silentErrors"];
  var _2 = class {
    get translate() {
      return this.translateKeys || this.translateValues || this.reviveValues;
    }
  };
  var D2 = class extends _2 {
    get needed() {
      return this.enabled || this.deps.size > 0;
    }
    constructor(t4, s4, i4, n3) {
      if (super(), e2(this, "enabled", false), e2(this, "skip", /* @__PURE__ */ new Set()), e2(this, "pick", /* @__PURE__ */ new Set()), e2(this, "deps", /* @__PURE__ */ new Set()), e2(this, "translateKeys", false), e2(this, "translateValues", false), e2(this, "reviveValues", false), this.key = t4, this.enabled = s4, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = P2.includes(t4), this.canBeFiltered && (this.dict = B.get(t4)), void 0 !== i4)
        if (Array.isArray(i4))
          this.parse = this.enabled = true, this.canBeFiltered && i4.length > 0 && this.translateTagSet(i4, this.pick);
        else if ("object" == typeof i4) {
          if (this.enabled = true, this.parse = false !== i4.parse, this.canBeFiltered) {
            let { pick: e4, skip: t5 } = i4;
            e4 && e4.length > 0 && this.translateTagSet(e4, this.pick), t5 && t5.length > 0 && this.translateTagSet(t5, this.skip);
          }
          this.applyInheritables(i4);
        } else
          true === i4 || false === i4 ? this.parse = this.enabled = i4 : l2(`Invalid options argument: ${i4}`);
    }
    applyInheritables(e4) {
      let t4, s4;
      for (t4 of E2)
        s4 = e4[t4], void 0 !== s4 && (this[t4] = s4);
    }
    translateTagSet(e4, t4) {
      if (this.dict) {
        let s4, i4, { tagKeys: n3, tagValues: r4 } = this.dict;
        for (s4 of e4)
          "string" == typeof s4 ? (i4 = r4.indexOf(s4), -1 === i4 && (i4 = n3.indexOf(Number(s4))), -1 !== i4 && t4.add(Number(n3[i4]))) : t4.add(s4);
      } else
        for (let s4 of e4)
          t4.add(s4);
    }
    finalizeFilters() {
      !this.enabled && this.deps.size > 0 ? (this.enabled = true, X(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && X(this.pick, this.deps);
    }
  };
  var N2 = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 };
  var $2 = /* @__PURE__ */ new Map();
  var R = class extends _2 {
    static useCached(e4) {
      let t4 = $2.get(e4);
      return void 0 !== t4 || (t4 = new this(e4), $2.set(e4, t4)), t4;
    }
    constructor(e4) {
      super(), true === e4 ? this.setupFromTrue() : void 0 === e4 ? this.setupFromUndefined() : Array.isArray(e4) ? this.setupFromArray(e4) : "object" == typeof e4 ? this.setupFromObject(e4) : l2(`Invalid options argument ${e4}`), void 0 === this.firstChunkSize && (this.firstChunkSize = s2 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
    }
    setupFromUndefined() {
      let e4;
      for (e4 of L2)
        this[e4] = N2[e4];
      for (e4 of M2)
        this[e4] = N2[e4];
      for (e4 of j2)
        this[e4] = N2[e4];
      for (e4 of F)
        this[e4] = new D2(e4, N2[e4], void 0, this);
    }
    setupFromTrue() {
      let e4;
      for (e4 of L2)
        this[e4] = N2[e4];
      for (e4 of M2)
        this[e4] = N2[e4];
      for (e4 of j2)
        this[e4] = true;
      for (e4 of F)
        this[e4] = new D2(e4, true, void 0, this);
    }
    setupFromArray(e4) {
      let t4;
      for (t4 of L2)
        this[t4] = N2[t4];
      for (t4 of M2)
        this[t4] = N2[t4];
      for (t4 of j2)
        this[t4] = N2[t4];
      for (t4 of F)
        this[t4] = new D2(t4, false, void 0, this);
      this.setupGlobalFilters(e4, void 0, P2);
    }
    setupFromObject(e4) {
      let t4;
      for (t4 of (P2.ifd0 = P2.ifd0 || P2.image, P2.ifd1 = P2.ifd1 || P2.thumbnail, Object.assign(this, e4), L2))
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of M2)
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of j2)
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of z2)
        this[t4] = new D2(t4, N2[t4], e4[t4], this);
      for (t4 of P2)
        this[t4] = new D2(t4, N2[t4], e4[t4], this.tiff);
      this.setupGlobalFilters(e4.pick, e4.skip, P2, F), true === e4.tiff ? this.batchEnableWithBool(P2, true) : false === e4.tiff ? this.batchEnableWithUserValue(P2, e4) : Array.isArray(e4.tiff) ? this.setupGlobalFilters(e4.tiff, void 0, P2) : "object" == typeof e4.tiff && this.setupGlobalFilters(e4.tiff.pick, e4.tiff.skip, P2);
    }
    batchEnableWithBool(e4, t4) {
      for (let s4 of e4)
        this[s4].enabled = t4;
    }
    batchEnableWithUserValue(e4, t4) {
      for (let s4 of e4) {
        let e5 = t4[s4];
        this[s4].enabled = false !== e5 && void 0 !== e5;
      }
    }
    setupGlobalFilters(e4, t4, s4, i4 = s4) {
      if (e4 && e4.length) {
        for (let e5 of i4)
          this[e5].enabled = false;
        let t5 = K(e4, s4);
        for (let [e5, s5] of t5)
          X(this[e5].pick, s5), this[e5].enabled = true;
      } else if (t4 && t4.length) {
        let e5 = K(t4, s4);
        for (let [t5, s5] of e5)
          X(this[t5].skip, s5);
      }
    }
    filterNestedSegmentTags() {
      let { ifd0: e4, exif: t4, xmp: s4, iptc: i4, icc: n3 } = this;
      this.makerNote ? t4.deps.add(37500) : t4.skip.add(37500), this.userComment ? t4.deps.add(37510) : t4.skip.add(37510), s4.enabled || e4.skip.add(700), i4.enabled || e4.skip.add(33723), n3.enabled || e4.skip.add(34675);
    }
    traverseTiffDependencyTree() {
      let { ifd0: e4, exif: t4, gps: s4, interop: i4 } = this;
      i4.needed && (t4.deps.add(40965), e4.deps.add(40965)), t4.needed && e4.deps.add(34665), s4.needed && e4.deps.add(34853), this.tiff.enabled = P2.some((e5) => true === this[e5].enabled) || this.makerNote || this.userComment;
      for (let e5 of P2)
        this[e5].finalizeFilters();
    }
    get onlyTiff() {
      return !T2.map((e4) => this[e4].enabled).some((e4) => true === e4) && this.tiff.enabled;
    }
    checkLoadedPlugins() {
      for (let e4 of z2)
        this[e4].enabled && !y2.has(e4) && p2("segment parser", e4);
    }
  };
  function K(e4, t4) {
    let s4, i4, n3, r4, a4 = [];
    for (n3 of t4) {
      for (r4 of (s4 = B.get(n3), i4 = [], s4))
        (e4.includes(r4[0]) || e4.includes(r4[1])) && i4.push(r4[0]);
      i4.length && a4.push([n3, i4]);
    }
    return a4;
  }
  function W(e4, t4) {
    return void 0 !== e4 ? e4 : void 0 !== t4 ? t4 : void 0;
  }
  function X(e4, t4) {
    for (let s4 of t4)
      e4.add(s4);
  }
  e2(R, "default", N2);
  var H2 = class {
    constructor(t4) {
      e2(this, "parsers", {}), e2(this, "output", {}), e2(this, "errors", []), e2(this, "pushToErrors", (e4) => this.errors.push(e4)), this.options = R.useCached(t4);
    }
    async read(e4) {
      this.file = await function(e5, t4) {
        return "string" == typeof e5 ? k2(e5, t4) : s2 && !i2 && e5 instanceof HTMLImageElement ? k2(e5.src, t4) : e5 instanceof Uint8Array || e5 instanceof ArrayBuffer || e5 instanceof DataView ? new c2(e5) : s2 && e5 instanceof Blob ? O2(e5, t4, "blob", A2) : void l2("Invalid input argument");
      }(e4, this.options);
    }
    setup() {
      if (this.fileParser)
        return;
      let { file: e4 } = this, t4 = e4.getUint16(0);
      for (let [s4, i4] of m2)
        if (i4.canHandle(e4, t4))
          return this.fileParser = new i4(this.options, this.file, this.parsers), e4[s4] = true;
      this.file.close && this.file.close(), l2("Unknown file format");
    }
    async parse() {
      let { output: e4, errors: t4 } = this;
      return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t4.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t4.length > 0 && (e4.errors = t4), f2(s4 = e4) ? void 0 : s4;
      var s4;
    }
    async executeParsers() {
      let { output: e4 } = this;
      await this.fileParser.parse();
      let t4 = Object.values(this.parsers).map(async (t5) => {
        let s4 = await t5.parse();
        t5.assignToOutput(e4, s4);
      });
      this.options.silentErrors && (t4 = t4.map((e5) => e5.catch(this.pushToErrors))), await Promise.all(t4);
    }
    async extractThumbnail() {
      this.setup();
      let { options: e4, file: t4 } = this, s4 = y2.get("tiff", e4);
      var i4;
      if (t4.tiff ? i4 = { start: 0, type: "tiff" } : t4.jpeg && (i4 = await this.fileParser.getOrFindSegment("tiff")), void 0 === i4)
        return;
      let n3 = await this.fileParser.ensureSegmentChunk(i4), r4 = this.parsers.tiff = new s4(n3, e4, t4), a4 = await r4.extractThumbnail();
      return t4.close && t4.close(), a4;
    }
  };
  async function Y(e4, t4) {
    let s4 = new H2(t4);
    return await s4.read(e4), s4.parse();
  }
  var G = Object.freeze({ __proto__: null, parse: Y, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S2, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E2, allFormatters: M2, Options: R });
  var J = class {
    static findPosition(e4, t4) {
      let s4 = e4.getUint16(t4 + 2) + 2, i4 = "function" == typeof this.headerLength ? this.headerLength(e4, t4, s4) : this.headerLength, n3 = t4 + i4, r4 = s4 - i4;
      return { offset: t4, length: s4, headerLength: i4, start: n3, size: r4, end: n3 + r4 };
    }
    static parse(e4, t4 = {}) {
      return new this(e4, new R({ [this.type]: t4 }), e4).parse();
    }
    normalizeInput(e4) {
      return e4 instanceof c2 ? e4 : new c2(e4);
    }
    constructor(t4, s4 = {}, i4) {
      e2(this, "errors", []), e2(this, "raw", /* @__PURE__ */ new Map()), e2(this, "handleError", (e4) => {
        if (!this.options.silentErrors)
          throw e4;
        this.errors.push(e4.message);
      }), this.chunk = this.normalizeInput(t4), this.file = i4, this.type = this.constructor.type, this.globalOptions = this.options = s4, this.localOptions = s4[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
    }
    translate() {
      this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
    }
    get output() {
      return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
    }
    translateBlock(e4, t4) {
      let s4 = I2.get(t4), i4 = V.get(t4), n3 = B.get(t4), r4 = this.options[t4], a4 = r4.reviveValues && !!s4, h4 = r4.translateValues && !!i4, f4 = r4.translateKeys && !!n3, l4 = {};
      for (let [t5, r5] of e4)
        a4 && s4.has(t5) ? r5 = s4.get(t5)(r5) : h4 && i4.has(t5) && (r5 = this.translateValue(r5, i4.get(t5))), f4 && n3.has(t5) && (t5 = n3.get(t5) || t5), l4[t5] = r5;
      return l4;
    }
    translateValue(e4, t4) {
      return t4[e4] || t4.DEFAULT || e4;
    }
    assignToOutput(e4, t4) {
      this.assignObjectToOutput(e4, this.constructor.type, t4);
    }
    assignObjectToOutput(e4, t4, s4) {
      if (this.globalOptions.mergeOutput)
        return Object.assign(e4, s4);
      e4[t4] ? Object.assign(e4[t4], s4) : e4[t4] = s4;
    }
  };
  e2(J, "headerLength", 4), e2(J, "type", void 0), e2(J, "multiSegment", false), e2(J, "canHandle", () => false);
  function q2(e4) {
    return 192 === e4 || 194 === e4 || 196 === e4 || 219 === e4 || 221 === e4 || 218 === e4 || 254 === e4;
  }
  function Q(e4) {
    return e4 >= 224 && e4 <= 239;
  }
  function Z(e4, t4, s4) {
    for (let [i4, n3] of y2)
      if (n3.canHandle(e4, t4, s4))
        return i4;
  }
  var ee = class extends class {
    constructor(t4, s4, i4) {
      e2(this, "errors", []), e2(this, "ensureSegmentChunk", async (e4) => {
        let t5 = e4.start, s5 = e4.size || 65536;
        if (this.file.chunked)
          if (this.file.available(t5, s5))
            e4.chunk = this.file.subarray(t5, s5);
          else
            try {
              e4.chunk = await this.file.readChunk(t5, s5);
            } catch (t6) {
              l2(`Couldn't read segment: ${JSON.stringify(e4)}. ${t6.message}`);
            }
        else
          this.file.byteLength > t5 + s5 ? e4.chunk = this.file.subarray(t5, s5) : void 0 === e4.size ? e4.chunk = this.file.subarray(t5) : l2("Segment unreachable: " + JSON.stringify(e4));
        return e4.chunk;
      }), this.extendOptions && this.extendOptions(t4), this.options = t4, this.file = s4, this.parsers = i4;
    }
    injectSegment(e4, t4) {
      this.options[e4].enabled && this.createParser(e4, t4);
    }
    createParser(e4, t4) {
      let s4 = new (y2.get(e4))(t4, this.options, this.file);
      return this.parsers[e4] = s4;
    }
    createParsers(e4) {
      for (let t4 of e4) {
        let { type: e5, chunk: s4 } = t4, i4 = this.options[e5];
        if (i4 && i4.enabled) {
          let t5 = this.parsers[e5];
          t5 && t5.append || t5 || this.createParser(e5, s4);
        }
      }
    }
    async readSegments(e4) {
      let t4 = e4.map(this.ensureSegmentChunk);
      await Promise.all(t4);
    }
  } {
    constructor(...t4) {
      super(...t4), e2(this, "appSegments", []), e2(this, "jpegSegments", []), e2(this, "unknownSegments", []);
    }
    static canHandle(e4, t4) {
      return 65496 === t4;
    }
    async parse() {
      await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
    }
    setupSegmentFinderArgs(e4) {
      true === e4 ? (this.findAll = true, this.wanted = new Set(y2.keyList())) : (e4 = void 0 === e4 ? y2.keyList().filter((e5) => this.options[e5].enabled) : e4.filter((e5) => this.options[e5].enabled && y2.has(e5)), this.findAll = false, this.remaining = new Set(e4), this.wanted = new Set(e4)), this.unfinishedMultiSegment = false;
    }
    async findAppSegments(e4 = 0, t4) {
      this.setupSegmentFinderArgs(t4);
      let { file: s4, findAll: i4, wanted: n3, remaining: r4 } = this;
      if (!i4 && this.file.chunked && (i4 = Array.from(n3).some((e5) => {
        let t5 = y2.get(e5), s5 = this.options[e5];
        return t5.multiSegment && s5.multiSegment;
      }), i4 && await this.file.readWhole()), e4 = this.findAppSegmentsInRange(e4, s4.byteLength), !this.options.onlyTiff && s4.chunked) {
        let t5 = false;
        for (; r4.size > 0 && !t5 && (s4.canReadNextChunk || this.unfinishedMultiSegment); ) {
          let { nextChunkOffset: i5 } = s4, n4 = this.appSegments.some((e5) => !this.file.available(e5.offset || e5.start, e5.length || e5.size));
          if (t5 = e4 > i5 && !n4 ? !await s4.readNextChunk(e4) : !await s4.readNextChunk(i5), void 0 === (e4 = this.findAppSegmentsInRange(e4, s4.byteLength)))
            return;
        }
      }
    }
    findAppSegmentsInRange(e4, t4) {
      t4 -= 2;
      let s4, i4, n3, r4, a4, h4, { file: f4, findAll: l4, wanted: o4, remaining: u4, options: d4 } = this;
      for (; e4 < t4; e4++)
        if (255 === f4.getUint8(e4)) {
          if (s4 = f4.getUint8(e4 + 1), Q(s4)) {
            if (i4 = f4.getUint16(e4 + 2), n3 = Z(f4, e4, i4), n3 && o4.has(n3) && (r4 = y2.get(n3), a4 = r4.findPosition(f4, e4), h4 = d4[n3], a4.type = n3, this.appSegments.push(a4), !l4 && (r4.multiSegment && h4.multiSegment ? (this.unfinishedMultiSegment = a4.chunkNumber < a4.chunkCount, this.unfinishedMultiSegment || u4.delete(n3)) : u4.delete(n3), 0 === u4.size)))
              break;
            d4.recordUnknownSegments && (a4 = J.findPosition(f4, e4), a4.marker = s4, this.unknownSegments.push(a4)), e4 += i4 + 1;
          } else if (q2(s4)) {
            if (i4 = f4.getUint16(e4 + 2), 218 === s4 && false !== d4.stopAfterSos)
              return;
            d4.recordJpegSegments && this.jpegSegments.push({ offset: e4, length: i4, marker: s4 }), e4 += i4 + 1;
          }
        }
      return e4;
    }
    mergeMultiSegments() {
      if (!this.appSegments.some((e5) => e5.multiSegment))
        return;
      let e4 = function(e5, t4) {
        let s4, i4, n3, r4 = /* @__PURE__ */ new Map();
        for (let a4 = 0; a4 < e5.length; a4++)
          s4 = e5[a4], i4 = s4[t4], r4.has(i4) ? n3 = r4.get(i4) : r4.set(i4, n3 = []), n3.push(s4);
        return Array.from(r4);
      }(this.appSegments, "type");
      this.mergedAppSegments = e4.map(([e5, t4]) => {
        let s4 = y2.get(e5, this.options);
        if (s4.handleMultiSegments) {
          return { type: e5, chunk: s4.handleMultiSegments(t4) };
        }
        return t4[0];
      });
    }
    getSegment(e4) {
      return this.appSegments.find((t4) => t4.type === e4);
    }
    async getOrFindSegment(e4) {
      let t4 = this.getSegment(e4);
      return void 0 === t4 && (await this.findAppSegments(0, [e4]), t4 = this.getSegment(e4)), t4;
    }
  };
  e2(ee, "type", "jpeg"), m2.set("jpeg", ee);
  var te = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
  var se = class extends J {
    parseHeader() {
      var e4 = this.chunk.getUint16();
      18761 === e4 ? this.le = true : 19789 === e4 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
    }
    parseTags(e4, t4, s4 = /* @__PURE__ */ new Map()) {
      let { pick: i4, skip: n3 } = this.options[t4];
      i4 = new Set(i4);
      let r4 = i4.size > 0, a4 = 0 === n3.size, h4 = this.chunk.getUint16(e4);
      e4 += 2;
      for (let f4 = 0; f4 < h4; f4++) {
        let h5 = this.chunk.getUint16(e4);
        if (r4) {
          if (i4.has(h5) && (s4.set(h5, this.parseTag(e4, h5, t4)), i4.delete(h5), 0 === i4.size))
            break;
        } else
          !a4 && n3.has(h5) || s4.set(h5, this.parseTag(e4, h5, t4));
        e4 += 12;
      }
      return s4;
    }
    parseTag(e4, t4, s4) {
      let { chunk: i4 } = this, n3 = i4.getUint16(e4 + 2), r4 = i4.getUint32(e4 + 4), a4 = te[n3];
      if (a4 * r4 <= 4 ? e4 += 8 : e4 = i4.getUint32(e4 + 8), (n3 < 1 || n3 > 13) && l2(`Invalid TIFF value type. block: ${s4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4}`), e4 > i4.byteLength && l2(`Invalid TIFF value offset. block: ${s4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4} is outside of chunk size ${i4.byteLength}`), 1 === n3)
        return i4.getUint8Array(e4, r4);
      if (2 === n3)
        return "" === (h4 = function(e5) {
          for (; e5.endsWith("\0"); )
            e5 = e5.slice(0, -1);
          return e5;
        }(h4 = i4.getString(e4, r4)).trim()) ? void 0 : h4;
      var h4;
      if (7 === n3)
        return i4.getUint8Array(e4, r4);
      if (1 === r4)
        return this.parseTagValue(n3, e4);
      {
        let t5 = new (function(e5) {
          switch (e5) {
            case 1:
              return Uint8Array;
            case 3:
              return Uint16Array;
            case 4:
              return Uint32Array;
            case 5:
              return Array;
            case 6:
              return Int8Array;
            case 8:
              return Int16Array;
            case 9:
              return Int32Array;
            case 10:
              return Array;
            case 11:
              return Float32Array;
            case 12:
              return Float64Array;
            default:
              return Array;
          }
        }(n3))(r4), s5 = a4;
        for (let i5 = 0; i5 < r4; i5++)
          t5[i5] = this.parseTagValue(n3, e4), e4 += s5;
        return t5;
      }
    }
    parseTagValue(e4, t4) {
      let { chunk: s4 } = this;
      switch (e4) {
        case 1:
          return s4.getUint8(t4);
        case 3:
          return s4.getUint16(t4);
        case 4:
          return s4.getUint32(t4);
        case 5:
          return s4.getUint32(t4) / s4.getUint32(t4 + 4);
        case 6:
          return s4.getInt8(t4);
        case 8:
          return s4.getInt16(t4);
        case 9:
          return s4.getInt32(t4);
        case 10:
          return s4.getInt32(t4) / s4.getInt32(t4 + 4);
        case 11:
          return s4.getFloat(t4);
        case 12:
          return s4.getDouble(t4);
        case 13:
          return s4.getUint32(t4);
        default:
          l2(`Invalid tiff type ${e4}`);
      }
    }
  };
  var ie = class extends se {
    static canHandle(e4, t4) {
      return 225 === e4.getUint8(t4 + 1) && 1165519206 === e4.getUint32(t4 + 4) && 0 === e4.getUint16(t4 + 8);
    }
    async parse() {
      this.parseHeader();
      let { options: e4 } = this;
      return e4.ifd0.enabled && await this.parseIfd0Block(), e4.exif.enabled && await this.safeParse("parseExifBlock"), e4.gps.enabled && await this.safeParse("parseGpsBlock"), e4.interop.enabled && await this.safeParse("parseInteropBlock"), e4.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
    }
    safeParse(e4) {
      let t4 = this[e4]();
      return void 0 !== t4.catch && (t4 = t4.catch(this.handleError)), t4;
    }
    findIfd0Offset() {
      void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
    }
    findIfd1Offset() {
      if (void 0 === this.ifd1Offset) {
        this.findIfd0Offset();
        let e4 = this.chunk.getUint16(this.ifd0Offset), t4 = this.ifd0Offset + 2 + 12 * e4;
        this.ifd1Offset = this.chunk.getUint32(t4);
      }
    }
    parseBlock(e4, t4) {
      let s4 = /* @__PURE__ */ new Map();
      return this[t4] = s4, this.parseTags(e4, t4, s4), s4;
    }
    async parseIfd0Block() {
      if (this.ifd0)
        return;
      let { file: e4 } = this;
      this.findIfd0Offset(), this.ifd0Offset < 8 && l2("Malformed EXIF data"), !e4.chunked && this.ifd0Offset > e4.byteLength && l2(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e4.byteLength}`), e4.tiff && await e4.ensureChunk(this.ifd0Offset, o2(this.options));
      let t4 = this.parseBlock(this.ifd0Offset, "ifd0");
      return 0 !== t4.size ? (this.exifOffset = t4.get(34665), this.interopOffset = t4.get(40965), this.gpsOffset = t4.get(34853), this.xmp = t4.get(700), this.iptc = t4.get(33723), this.icc = t4.get(34675), this.options.sanitize && (t4.delete(34665), t4.delete(40965), t4.delete(34853), t4.delete(700), t4.delete(33723), t4.delete(34675)), t4) : void 0;
    }
    async parseExifBlock() {
      if (this.exif)
        return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset)
        return;
      this.file.tiff && await this.file.ensureChunk(this.exifOffset, o2(this.options));
      let e4 = this.parseBlock(this.exifOffset, "exif");
      return this.interopOffset || (this.interopOffset = e4.get(40965)), this.makerNote = e4.get(37500), this.userComment = e4.get(37510), this.options.sanitize && (e4.delete(40965), e4.delete(37500), e4.delete(37510)), this.unpack(e4, 41728), this.unpack(e4, 41729), e4;
    }
    unpack(e4, t4) {
      let s4 = e4.get(t4);
      s4 && 1 === s4.length && e4.set(t4, s4[0]);
    }
    async parseGpsBlock() {
      if (this.gps)
        return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset)
        return;
      let e4 = this.parseBlock(this.gpsOffset, "gps");
      return e4 && e4.has(2) && e4.has(4) && (e4.set("latitude", ne(...e4.get(2), e4.get(1))), e4.set("longitude", ne(...e4.get(4), e4.get(3)))), e4;
    }
    async parseInteropBlock() {
      if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset))
        return this.parseBlock(this.interopOffset, "interop");
    }
    async parseThumbnailBlock(e4 = false) {
      if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e4))
        return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
    }
    async extractThumbnail() {
      if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1)
        return;
      let e4 = this.ifd1.get(513), t4 = this.ifd1.get(514);
      return this.chunk.getUint8Array(e4, t4);
    }
    get image() {
      return this.ifd0;
    }
    get thumbnail() {
      return this.ifd1;
    }
    createOutput() {
      let e4, t4, s4, i4 = {};
      for (t4 of P2)
        if (e4 = this[t4], !f2(e4))
          if (s4 = this.canTranslate ? this.translateBlock(e4, t4) : Object.fromEntries(e4), this.options.mergeOutput) {
            if ("ifd1" === t4)
              continue;
            Object.assign(i4, s4);
          } else
            i4[t4] = s4;
      return this.makerNote && (i4.makerNote = this.makerNote), this.userComment && (i4.userComment = this.userComment), i4;
    }
    assignToOutput(e4, t4) {
      if (this.globalOptions.mergeOutput)
        Object.assign(e4, t4);
      else
        for (let [s4, i4] of Object.entries(t4))
          this.assignObjectToOutput(e4, s4, i4);
    }
  };
  function ne(e4, t4, s4, i4) {
    var n3 = e4 + t4 / 60 + s4 / 3600;
    return "S" !== i4 && "W" !== i4 || (n3 *= -1), n3;
  }
  e2(ie, "type", "tiff"), e2(ie, "headerLength", 10), y2.set("tiff", ie);
  var re = Object.freeze({ __proto__: null, default: G, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S2, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E2, allFormatters: M2, Options: R, parse: Y });
  var ae = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false };
  var he = Object.assign({}, ae, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
  var le = Object.assign({}, ae, { tiff: false, ifd1: true, mergeOutput: false });
  var de = Object.assign({}, ae, { firstChunkSize: 4e4, ifd0: [274] });
  async function ce(e4) {
    let t4 = new H2(de);
    await t4.read(e4);
    let s4 = await t4.parse();
    if (s4 && s4.ifd0)
      return s4.ifd0[274];
  }
  var pe = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
  var ge = true;
  var me = true;
  if ("object" == typeof navigator) {
    let e4 = navigator.userAgent;
    if (e4.includes("iPad") || e4.includes("iPhone")) {
      let t4 = e4.match(/OS (\d+)_(\d+)/);
      if (t4) {
        let [, e5, s4] = t4, i4 = Number(e5) + 0.1 * Number(s4);
        ge = i4 < 13.4, me = false;
      }
    } else if (e4.includes("OS X 10")) {
      let [, t4] = e4.match(/OS X 10[_.](\d+)/);
      ge = me = Number(t4) < 15;
    }
    if (e4.includes("Chrome/")) {
      let [, t4] = e4.match(/Chrome\/(\d+)/);
      ge = me = Number(t4) < 81;
    } else if (e4.includes("Firefox/")) {
      let [, t4] = e4.match(/Firefox\/(\d+)/);
      ge = me = Number(t4) < 77;
    }
  }
  async function ye(e4) {
    let t4 = await ce(e4);
    return Object.assign({ canvas: ge, css: me }, pe[t4]);
  }
  var be = class extends c2 {
    constructor(...t4) {
      super(...t4), e2(this, "ranges", new we()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
    }
    _tryExtend(e4, t4, s4) {
      if (0 === e4 && 0 === this.byteLength && s4) {
        let e5 = new DataView(s4.buffer || s4, s4.byteOffset, s4.byteLength);
        this._swapDataView(e5);
      } else {
        let s5 = e4 + t4;
        if (s5 > this.byteLength) {
          let { dataView: e5 } = this._extend(s5);
          this._swapDataView(e5);
        }
      }
    }
    _extend(e4) {
      let t4;
      t4 = a2 ? r2.allocUnsafe(e4) : new Uint8Array(e4);
      let s4 = new DataView(t4.buffer, t4.byteOffset, t4.byteLength);
      return t4.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t4, dataView: s4 };
    }
    subarray(e4, t4, s4 = false) {
      return t4 = t4 || this._lengthToEnd(e4), s4 && this._tryExtend(e4, t4), this.ranges.add(e4, t4), super.subarray(e4, t4);
    }
    set(e4, t4, s4 = false) {
      s4 && this._tryExtend(t4, e4.byteLength, e4);
      let i4 = super.set(e4, t4);
      return this.ranges.add(t4, i4.byteLength), i4;
    }
    async ensureChunk(e4, t4) {
      this.chunked && (this.ranges.available(e4, t4) || await this.readChunk(e4, t4));
    }
    available(e4, t4) {
      return this.ranges.available(e4, t4);
    }
  };
  var we = class {
    constructor() {
      e2(this, "list", []);
    }
    get length() {
      return this.list.length;
    }
    add(e4, t4, s4 = 0) {
      let i4 = e4 + t4, n3 = this.list.filter((t5) => ke(e4, t5.offset, i4) || ke(e4, t5.end, i4));
      if (n3.length > 0) {
        e4 = Math.min(e4, ...n3.map((e5) => e5.offset)), i4 = Math.max(i4, ...n3.map((e5) => e5.end)), t4 = i4 - e4;
        let s5 = n3.shift();
        s5.offset = e4, s5.length = t4, s5.end = i4, this.list = this.list.filter((e5) => !n3.includes(e5));
      } else
        this.list.push({ offset: e4, length: t4, end: i4 });
    }
    available(e4, t4) {
      let s4 = e4 + t4;
      return this.list.some((t5) => t5.offset <= e4 && s4 <= t5.end);
    }
  };
  function ke(e4, t4, s4) {
    return e4 <= t4 && t4 <= s4;
  }
  var Oe = class extends be {
    constructor(t4, s4) {
      super(0), e2(this, "chunksRead", 0), this.input = t4, this.options = s4;
    }
    async readWhole() {
      this.chunked = false, await this.readChunk(this.nextChunkOffset);
    }
    async readChunked() {
      this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
    }
    async readNextChunk(e4 = this.nextChunkOffset) {
      if (this.fullyRead)
        return this.chunksRead++, false;
      let t4 = this.options.chunkSize, s4 = await this.readChunk(e4, t4);
      return !!s4 && s4.byteLength === t4;
    }
    async readChunk(e4, t4) {
      if (this.chunksRead++, 0 !== (t4 = this.safeWrapAddress(e4, t4)))
        return this._readChunk(e4, t4);
    }
    safeWrapAddress(e4, t4) {
      return void 0 !== this.size && e4 + t4 > this.size ? Math.max(0, this.size - e4) : t4;
    }
    get nextChunkOffset() {
      if (0 !== this.ranges.list.length)
        return this.ranges.list[0].length;
    }
    get canReadNextChunk() {
      return this.chunksRead < this.options.chunkLimit;
    }
    get fullyRead() {
      return void 0 !== this.size && this.nextChunkOffset === this.size;
    }
    read() {
      return this.options.chunked ? this.readChunked() : this.readWhole();
    }
    close() {
    }
  };
  b2.set("blob", class extends Oe {
    async readWhole() {
      this.chunked = false;
      let e4 = await A2(this.input);
      this._swapArrayBuffer(e4);
    }
    readChunked() {
      return this.chunked = true, this.size = this.input.size, super.readChunked();
    }
    async _readChunk(e4, t4) {
      let s4 = t4 ? e4 + t4 : void 0, i4 = this.input.slice(e4, s4), n3 = await A2(i4);
      return this.set(n3, e4, true);
    }
  });

  // tests/_npm/node_modules/@uppy/thumbnail-generator/lib/locale.js
  var locale_default2 = {
    strings: {
      generatingThumbnails: "Generating thumbnails..."
    }
  };

  // tests/_npm/node_modules/@uppy/thumbnail-generator/lib/index.js
  var packageJson3 = {
    "version": "3.0.6"
  };
  function canvasToBlob(canvas, type, quality) {
    try {
      canvas.getContext("2d").getImageData(0, 0, 1, 1);
    } catch (err) {
      if (err.code === 18) {
        return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
      }
    }
    if (canvas.toBlob) {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
      }).then((blob) => {
        if (blob === null) {
          throw new Error("cannot read image, probably an svg with external resources");
        }
        return blob;
      });
    }
    return Promise.resolve().then(() => {
      return dataURItoBlob(canvas.toDataURL(type, quality), {});
    }).then((blob) => {
      if (blob === null) {
        throw new Error("could not extract blob, probably an old browser");
      }
      return blob;
    });
  }
  function rotateImage(image, translate) {
    let w4 = image.width;
    let h4 = image.height;
    if (translate.deg === 90 || translate.deg === 270) {
      w4 = image.height;
      h4 = image.width;
    }
    const canvas = document.createElement("canvas");
    canvas.width = w4;
    canvas.height = h4;
    const context = canvas.getContext("2d");
    context.translate(w4 / 2, h4 / 2);
    if (translate.canvas) {
      context.rotate(translate.rad);
      context.scale(translate.scaleX, translate.scaleY);
    }
    context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    return canvas;
  }
  function protect(image) {
    const ratio = image.width / image.height;
    const maxSquare = 5e6;
    const maxSize = 4096;
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
      const canvas = document.createElement("canvas");
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
      return canvas;
    }
    return image;
  }
  var ThumbnailGenerator = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.onFileAdded = (file) => {
        if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
          this.addToQueue(file.id);
        }
      };
      this.onCancelRequest = (file) => {
        const index = this.queue.indexOf(file.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
      };
      this.onFileRemoved = (file) => {
        const index = this.queue.indexOf(file.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
        if (file.preview && isObjectURL(file.preview)) {
          URL.revokeObjectURL(file.preview);
        }
      };
      this.onRestored = () => {
        const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
        restoredFiles.forEach((file) => {
          if (!file.preview || isObjectURL(file.preview)) {
            this.addToQueue(file.id);
          }
        });
      };
      this.onAllFilesRemoved = () => {
        this.queue = [];
      };
      this.waitUntilAllProcessed = (fileIDs) => {
        fileIDs.forEach((fileID) => {
          const file = this.uppy.getFile(fileID);
          this.uppy.emit("preprocess-progress", file, {
            mode: "indeterminate",
            message: this.i18n("generatingThumbnails")
          });
        });
        const emitPreprocessCompleteForAll = () => {
          fileIDs.forEach((fileID) => {
            const file = this.uppy.getFile(fileID);
            this.uppy.emit("preprocess-complete", file);
          });
        };
        return new Promise((resolve) => {
          if (this.queueProcessing) {
            this.uppy.once("thumbnail:all-generated", () => {
              emitPreprocessCompleteForAll();
              resolve();
            });
          } else {
            emitPreprocessCompleteForAll();
            resolve();
          }
        });
      };
      this.type = "modifier";
      this.id = this.opts.id || "ThumbnailGenerator";
      this.title = "Thumbnail Generator";
      this.queue = [];
      this.queueProcessing = false;
      this.defaultThumbnailDimension = 200;
      this.thumbnailType = this.opts.thumbnailType || "image/jpeg";
      this.defaultLocale = locale_default2;
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
        throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
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
        image.addEventListener("load", () => {
          URL.revokeObjectURL(originalUrl);
          resolve(image);
        });
        image.addEventListener("error", (event) => {
          URL.revokeObjectURL(originalUrl);
          reject(event.error || new Error("Could not create thumbnail"));
        });
      });
      const orientationPromise = ye(file.data).catch(() => 1);
      return Promise.all([onload, orientationPromise]).then((_ref) => {
        let [image, orientation] = _ref;
        const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
        const rotatedImage = rotateImage(image, orientation);
        const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
        return canvasToBlob(resizedImage, this.thumbnailType, 80);
      }).then((blob) => {
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
      let img = protect(image);
      let steps = Math.ceil(Math.log2(img.width / targetWidth));
      if (steps < 1) {
        steps = 1;
      }
      let sW = targetWidth * 2 ** (steps - 1);
      let sH = targetHeight * 2 ** (steps - 1);
      const x3 = 2;
      while (steps--) {
        const canvas = document.createElement("canvas");
        canvas.width = sW;
        canvas.height = sH;
        canvas.getContext("2d").drawImage(img, 0, 0, sW, sH);
        img = canvas;
        sW = Math.round(sW / x3);
        sH = Math.round(sH / x3);
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
          this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
          return Promise.resolve();
        }
        return this.requestThumbnail(current).catch(() => {
        }).then(() => this.processQueue());
      }
      this.queueProcessing = false;
      this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
      this.uppy.emit("thumbnail:all-generated");
      return Promise.resolve();
    }
    requestThumbnail(file) {
      if (isPreviewSupported(file.type) && !file.isRemote) {
        return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
          this.setPreviewURL(file.id, preview);
          this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
          this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
        }).catch((err) => {
          this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
          this.uppy.log(err, "warning");
          this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
        });
      }
      return Promise.resolve();
    }
    install() {
      this.uppy.on("file-removed", this.onFileRemoved);
      this.uppy.on("cancel-all", this.onAllFilesRemoved);
      if (this.opts.lazy) {
        this.uppy.on("thumbnail:request", this.onFileAdded);
        this.uppy.on("thumbnail:cancel", this.onCancelRequest);
      } else {
        this.uppy.on("file-added", this.onFileAdded);
        this.uppy.on("restored", this.onRestored);
      }
      if (this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.addPreProcessor(this.waitUntilAllProcessed);
      }
    }
    uninstall() {
      this.uppy.off("file-removed", this.onFileRemoved);
      this.uppy.off("cancel-all", this.onAllFilesRemoved);
      if (this.opts.lazy) {
        this.uppy.off("thumbnail:request", this.onFileAdded);
        this.uppy.off("thumbnail:cancel", this.onCancelRequest);
      } else {
        this.uppy.off("file-added", this.onFileAdded);
        this.uppy.off("restored", this.onRestored);
      }
      if (this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.removePreProcessor(this.waitUntilAllProcessed);
      }
    }
  };
  ThumbnailGenerator.VERSION = packageJson3.version;

  // tests/_npm/node_modules/@uppy/utils/lib/findAllDOMElements.js
  function findAllDOMElements(element) {
    if (typeof element === "string") {
      const elements = document.querySelectorAll(element);
      return elements.length === 0 ? null : Array.from(elements);
    }
    if (typeof element === "object" && isDOMElement(element)) {
      return [element];
    }
    return null;
  }

  // tests/_npm/node_modules/@uppy/utils/lib/toArray.js
  var toArray_default = Array.from;

  // tests/_npm/node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
  function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
    let {
      onSuccess
    } = _ref;
    directoryReader.readEntries(
      (entries) => {
        const newEntries = [...oldEntries, ...entries];
        if (entries.length) {
          queueMicrotask(() => {
            getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
              onSuccess
            });
          });
        } else {
          onSuccess(newEntries);
        }
      },
      // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
      (error) => {
        logDropError(error);
        onSuccess(oldEntries);
      }
    );
  }

  // tests/_npm/node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
  function getAsFileSystemHandleFromEntry(entry, logDropError) {
    if (entry == null)
      return entry;
    return {
      // eslint-disable-next-line no-nested-ternary
      kind: entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0,
      name: entry.name,
      getFile() {
        return new Promise((resolve, reject) => entry.file(resolve, reject));
      },
      async *values() {
        const directoryReader = entry.createReader();
        const entries = await new Promise((resolve) => {
          getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
            onSuccess: (dirEntries) => resolve(dirEntries.map(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (file) => getAsFileSystemHandleFromEntry(file, logDropError)
            ))
          });
        });
        yield* entries;
      },
      isSameEntry: void 0
    };
  }
  function createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile) {
    try {
      if (lastResortFile === void 0) {
        lastResortFile = void 0;
      }
      return async function* () {
        const getNextRelativePath = () => `${relativePath}/${entry.name}`;
        if (entry.kind === "file") {
          const file = await entry.getFile();
          if (file != null) {
            ;
            file.relativePath = relativePath ? getNextRelativePath() : null;
            yield file;
          } else if (lastResortFile != null)
            yield lastResortFile;
        } else if (entry.kind === "directory") {
          for await (const handle of entry.values()) {
            yield* createPromiseToAddFileOrParseDirectory(handle, relativePath ? getNextRelativePath() : entry.name);
          }
        } else if (lastResortFile != null)
          yield lastResortFile;
      }();
    } catch (e4) {
      return Promise.reject(e4);
    }
  }
  async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
    const fileSystemHandles = await Promise.all(Array.from(dataTransfer.items, async (item) => {
      var _fileSystemHandle;
      let fileSystemHandle;
      const getAsEntry = () => typeof item.getAsEntry === "function" ? item.getAsEntry() : item.webkitGetAsEntry();
      (_fileSystemHandle = fileSystemHandle) != null ? _fileSystemHandle : fileSystemHandle = getAsFileSystemHandleFromEntry(getAsEntry(), logDropError);
      return {
        fileSystemHandle,
        lastResortFile: item.getAsFile()
        // can be used as a fallback in case other methods fail
      };
    }));
    for (const {
      lastResortFile,
      fileSystemHandle
    } of fileSystemHandles) {
      if (fileSystemHandle != null) {
        try {
          yield* createPromiseToAddFileOrParseDirectory(fileSystemHandle, "", lastResortFile);
        } catch (err) {
          if (lastResortFile != null) {
            yield lastResortFile;
          } else {
            logDropError(err);
          }
        }
      } else if (lastResortFile != null)
        yield lastResortFile;
    }
  }

  // tests/_npm/node_modules/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
  function fallbackApi(dataTransfer) {
    const files = toArray_default(dataTransfer.files);
    return Promise.resolve(files);
  }

  // tests/_npm/node_modules/@uppy/utils/lib/getDroppedFiles/index.js
  async function getDroppedFiles(dataTransfer, options) {
    var _options$logDropError;
    const logDropError = (_options$logDropError = options == null ? void 0 : options.logDropError) != null ? _options$logDropError : Function.prototype;
    try {
      const accumulator = [];
      for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
        accumulator.push(file);
      }
      return accumulator;
    } catch {
      return fallbackApi(dataTransfer);
    }
  }

  // tests/_npm/node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);

  // tests/_npm/node_modules/p-timeout/index.js
  var TimeoutError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "TimeoutError";
    }
  };
  var AbortError = class extends Error {
    constructor(message) {
      super();
      this.name = "AbortError";
      this.message = message;
    }
  };
  var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
  var getAbortedReason = (signal) => {
    const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
    return reason instanceof Error ? reason : getDOMException(reason);
  };
  function pTimeout(promise, milliseconds, fallback, options) {
    let timer;
    const cancelablePromise = new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
        throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
      }
      if (milliseconds === Number.POSITIVE_INFINITY) {
        resolve(promise);
        return;
      }
      options = {
        customTimers: { setTimeout, clearTimeout },
        ...options
      };
      if (options.signal) {
        const { signal } = options;
        if (signal.aborted) {
          reject(getAbortedReason(signal));
        }
        signal.addEventListener("abort", () => {
          reject(getAbortedReason(signal));
        });
      }
      timer = options.customTimers.setTimeout.call(void 0, () => {
        if (typeof fallback === "function") {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      (async () => {
        try {
          resolve(await promise);
        } catch (error) {
          reject(error);
        } finally {
          options.customTimers.clearTimeout.call(void 0, timer);
        }
      })();
    });
    cancelablePromise.clear = () => {
      clearTimeout(timer);
      timer = void 0;
    };
    return cancelablePromise;
  }

  // tests/_npm/node_modules/p-queue/dist/lower-bound.js
  function lowerBound(array, value, comparator) {
    let first = 0;
    let count = array.length;
    while (count > 0) {
      const step = Math.trunc(count / 2);
      let it = first + step;
      if (comparator(array[it], value) <= 0) {
        first = ++it;
        count -= step + 1;
      } else {
        count = step;
      }
    }
    return first;
  }

  // tests/_npm/node_modules/p-queue/dist/priority-queue.js
  var __classPrivateFieldGet = function(receiver, state, kind, f4) {
    if (kind === "a" && !f4)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f4 : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f4 : kind === "a" ? f4.call(receiver) : f4 ? f4.value : state.get(receiver);
  };
  var _PriorityQueue_queue;
  var PriorityQueue = class {
    constructor() {
      _PriorityQueue_queue.set(this, []);
    }
    enqueue(run, options) {
      options = {
        priority: 0,
        ...options
      };
      const element = {
        priority: options.priority,
        run
      };
      if (this.size && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[this.size - 1].priority >= options.priority) {
        __classPrivateFieldGet(this, _PriorityQueue_queue, "f").push(element);
        return;
      }
      const index = lowerBound(__classPrivateFieldGet(this, _PriorityQueue_queue, "f"), element, (a4, b4) => b4.priority - a4.priority);
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
  };
  _PriorityQueue_queue = /* @__PURE__ */ new WeakMap();
  var priority_queue_default = PriorityQueue;

  // tests/_npm/node_modules/p-queue/dist/index.js
  var __classPrivateFieldSet = function(receiver, state, value, kind, f4) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f4)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f4 : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f4.call(receiver, value) : f4 ? f4.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet2 = function(receiver, state, kind, f4) {
    if (kind === "a" && !f4)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f4 : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f4 : kind === "a" ? f4.call(receiver) : f4 ? f4.value : state.get(receiver);
  };
  var _PQueue_instances;
  var _PQueue_carryoverConcurrencyCount;
  var _PQueue_isIntervalIgnored;
  var _PQueue_intervalCount;
  var _PQueue_intervalCap;
  var _PQueue_interval;
  var _PQueue_intervalEnd;
  var _PQueue_intervalId;
  var _PQueue_timeoutId;
  var _PQueue_queue;
  var _PQueue_queueClass;
  var _PQueue_pending;
  var _PQueue_concurrency;
  var _PQueue_isPaused;
  var _PQueue_throwOnTimeout;
  var _PQueue_doesIntervalAllowAnother_get;
  var _PQueue_doesConcurrentAllowAnother_get;
  var _PQueue_next;
  var _PQueue_onResumeInterval;
  var _PQueue_isIntervalPaused_get;
  var _PQueue_tryToStartAnother;
  var _PQueue_initializeIntervalIfNeeded;
  var _PQueue_onInterval;
  var _PQueue_processQueue;
  var _PQueue_throwOnAbort;
  var _PQueue_onEvent;
  var AbortError2 = class extends Error {
  };
  var PQueue = class extends import_index.default {
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
      _PQueue_concurrency.set(this, void 0);
      _PQueue_isPaused.set(this, void 0);
      _PQueue_throwOnTimeout.set(this, void 0);
      Object.defineProperty(this, "timeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      options = {
        carryoverConcurrencyCount: false,
        intervalCap: Number.POSITIVE_INFINITY,
        interval: 0,
        concurrency: Number.POSITIVE_INFINITY,
        autoStart: true,
        queueClass: priority_queue_default,
        ...options
      };
      if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
        throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
      }
      if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
        throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
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
      return __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
    }
    set concurrency(newConcurrency) {
      if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
        throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
      }
      __classPrivateFieldSet(this, _PQueue_concurrency, newConcurrency, "f");
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    }
    async add(function_, options = {}) {
      options = {
        timeout: this.timeout,
        throwOnTimeout: __classPrivateFieldGet2(this, _PQueue_throwOnTimeout, "f"),
        ...options
      };
      return new Promise((resolve, reject) => {
        __classPrivateFieldGet2(this, _PQueue_queue, "f").enqueue(async () => {
          var _a;
          var _b, _c;
          __classPrivateFieldSet(this, _PQueue_pending, (_b = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _b++, _b), "f");
          __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet2(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
          try {
            if ((_a = options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
              throw new AbortError2("The task was aborted.");
            }
            let operation = function_({ signal: options.signal });
            if (options.timeout) {
              operation = pTimeout(Promise.resolve(operation), options.timeout);
            }
            if (options.signal) {
              operation = Promise.race([operation, __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_throwOnAbort).call(this, options.signal)]);
            }
            const result = await operation;
            resolve(result);
            this.emit("completed", result);
          } catch (error) {
            if (error instanceof TimeoutError && !options.throwOnTimeout) {
              resolve();
              return;
            }
            reject(error);
            this.emit("error", error);
          } finally {
            __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_next).call(this);
          }
        }, options);
        this.emit("add");
        __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
      });
    }
    async addAll(functions, options) {
      return Promise.all(functions.map(async (function_) => this.add(function_, options)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */
    start() {
      if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
        return this;
      }
      __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
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
      __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet2(this, _PQueue_queueClass, "f"))(), "f");
    }
    /**
        Can be called multiple times. Useful if you for example add additional items at a later time.
    
        @returns A promise that settles when the queue becomes empty.
        */
    async onEmpty() {
      if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
        return;
      }
      await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
    }
    /**
        @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
    
        If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
    
        Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
        */
    async onSizeLessThan(limit) {
      if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit) {
        return;
      }
      await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit);
    }
    /**
        The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
    
        @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
        */
    async onIdle() {
      if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
        return;
      }
      await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
    }
    /**
    Size of the queue, the number of queued items waiting to run.
    */
    get size() {
      return __classPrivateFieldGet2(this, _PQueue_queue, "f").size;
    }
    /**
        Size of the queue, filtered by the given options.
    
        For example, this can be used to find the number of items remaining in the queue with a specific priority level.
        */
    sizeBy(options) {
      return __classPrivateFieldGet2(this, _PQueue_queue, "f").filter(options).length;
    }
    /**
    Number of running items (no longer in the queue).
    */
    get pending() {
      return __classPrivateFieldGet2(this, _PQueue_pending, "f");
    }
    /**
    Whether the queue is currently paused.
    */
    get isPaused() {
      return __classPrivateFieldGet2(this, _PQueue_isPaused, "f");
    }
  };
  _PQueue_carryoverConcurrencyCount = /* @__PURE__ */ new WeakMap(), _PQueue_isIntervalIgnored = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCount = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCap = /* @__PURE__ */ new WeakMap(), _PQueue_interval = /* @__PURE__ */ new WeakMap(), _PQueue_intervalEnd = /* @__PURE__ */ new WeakMap(), _PQueue_intervalId = /* @__PURE__ */ new WeakMap(), _PQueue_timeoutId = /* @__PURE__ */ new WeakMap(), _PQueue_queue = /* @__PURE__ */ new WeakMap(), _PQueue_queueClass = /* @__PURE__ */ new WeakMap(), _PQueue_pending = /* @__PURE__ */ new WeakMap(), _PQueue_concurrency = /* @__PURE__ */ new WeakMap(), _PQueue_isPaused = /* @__PURE__ */ new WeakMap(), _PQueue_throwOnTimeout = /* @__PURE__ */ new WeakMap(), _PQueue_instances = /* @__PURE__ */ new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get2() {
    return __classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet2(this, _PQueue_intervalCap, "f");
  }, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get2() {
    return __classPrivateFieldGet2(this, _PQueue_pending, "f") < __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
  }, _PQueue_next = function _PQueue_next2() {
    var _a;
    __classPrivateFieldSet(this, _PQueue_pending, (_a = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _a--, _a), "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
    this.emit("next");
  }, _PQueue_onResumeInterval = function _PQueue_onResumeInterval2() {
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
    __classPrivateFieldSet(this, _PQueue_timeoutId, void 0, "f");
  }, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get2() {
    const now = Date.now();
    if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f") === void 0) {
      const delay = __classPrivateFieldGet2(this, _PQueue_intervalEnd, "f") - now;
      if (delay < 0) {
        __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
      } else {
        if (__classPrivateFieldGet2(this, _PQueue_timeoutId, "f") === void 0) {
          __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
            __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
          }, delay), "f");
        }
        return true;
      }
    }
    return false;
  }, _PQueue_tryToStartAnother = function _PQueue_tryToStartAnother2() {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
        clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
      }
      __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
      this.emit("empty");
      if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0) {
        this.emit("idle");
      }
      return false;
    }
    if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
      const canInitializeInterval = !__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_isIntervalPaused_get);
      if (__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesIntervalAllowAnother_get) && __classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesConcurrentAllowAnother_get)) {
        const job = __classPrivateFieldGet2(this, _PQueue_queue, "f").dequeue();
        if (!job) {
          return false;
        }
        this.emit("active");
        job();
        if (canInitializeInterval) {
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
        }
        return true;
      }
    }
    return false;
  }, _PQueue_initializeIntervalIfNeeded = function _PQueue_initializeIntervalIfNeeded2() {
    if (__classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalId, "f") !== void 0) {
      return;
    }
    __classPrivateFieldSet(this, _PQueue_intervalId, setInterval(() => {
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
    }, __classPrivateFieldGet2(this, _PQueue_interval, "f")), "f");
    __classPrivateFieldSet(this, _PQueue_intervalEnd, Date.now() + __classPrivateFieldGet2(this, _PQueue_interval, "f"), "f");
  }, _PQueue_onInterval = function _PQueue_onInterval2() {
    if (__classPrivateFieldGet2(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
      clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
      __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
    }
    __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
  }, _PQueue_processQueue = function _PQueue_processQueue2() {
    while (__classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) {
    }
  }, _PQueue_throwOnAbort = async function _PQueue_throwOnAbort2(signal) {
    return new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => {
        reject(new AbortError2("The task was aborted."));
      }, { once: true });
    });
  }, _PQueue_onEvent = async function _PQueue_onEvent2(event, filter) {
    return new Promise((resolve) => {
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
  var dist_default = PQueue;

  // tests/_npm/node_modules/@uppy/provider-views/lib/ProviderView/AuthView.js
  function GoogleIcon() {
    return y("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 26 26",
      xmlns: "http://www.w3.org/2000/svg"
    }, y("g", {
      fill: "none",
      "fill-rule": "evenodd"
    }, y("circle", {
      fill: "#FFF",
      cx: "13",
      cy: "13",
      r: "13"
    }), y("path", {
      d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
      fill: "#4285F4",
      "fill-rule": "nonzero"
    }), y("path", {
      d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
      fill: "#34A853",
      "fill-rule": "nonzero"
    }), y("path", {
      d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
      fill: "#FBBC05",
      "fill-rule": "nonzero"
    }), y("path", {
      d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
      fill: "#EA4335",
      "fill-rule": "nonzero"
    }), y("path", {
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
    const isGoogleDrive = pluginName === "Google Drive";
    const pluginNameComponent = y("span", {
      className: "uppy-Provider-authTitleName"
    }, pluginName, y("br", null));
    return y("div", {
      className: "uppy-Provider-auth"
    }, y("div", {
      className: "uppy-Provider-authIcon"
    }, pluginIcon()), y("div", {
      className: "uppy-Provider-authTitle"
    }, i18nArray("authenticateWithTitle", {
      pluginName: pluginNameComponent
    })), isGoogleDrive ? y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, y(GoogleIcon, null), i18nArray("signInWithGoogle")) : y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, i18nArray("authenticateWith", {
      pluginName
    })));
  }
  var AuthView_default = AuthView;

  // tests/_npm/node_modules/@uppy/provider-views/lib/ProviderView/User.js
  var User_default = (_ref) => {
    let {
      i18n,
      logout,
      username
    } = _ref;
    return [y("span", {
      className: "uppy-ProviderBrowser-user",
      key: "username"
    }, username), y("button", {
      type: "button",
      onClick: logout,
      className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
      key: "logout"
    }, i18n("logOut"))];
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/Breadcrumbs.js
  var Breadcrumb = (props) => {
    const {
      getFolder,
      title,
      isLast
    } = props;
    return y(g, null, y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      onClick: getFolder
    }, title), !isLast ? " / " : "");
  };
  var Breadcrumbs_default = (props) => {
    const {
      getFolder,
      title,
      breadcrumbsIcon,
      breadcrumbs
    } = props;
    return y("div", {
      className: "uppy-Provider-breadcrumbs"
    }, y("div", {
      className: "uppy-Provider-breadcrumbsIcon"
    }, breadcrumbsIcon), breadcrumbs.map((directory, i4) => y(Breadcrumb, {
      key: directory.id,
      getFolder: () => getFolder(directory.requestPath),
      title: i4 === 0 ? title : directory.name,
      isLast: i4 + 1 === breadcrumbs.length
    })));
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/ProviderView/Header.js
  var Header_default = (props) => {
    const components = [];
    if (props.showBreadcrumbs) {
      components.push(Breadcrumbs_default({
        getFolder: props.getFolder,
        breadcrumbs: props.breadcrumbs,
        breadcrumbsIcon: props.pluginIcon && props.pluginIcon(),
        title: props.title
      }));
    }
    components.push(User_default({
      logout: props.logout,
      username: props.username,
      i18n: props.i18n
    }));
    return components;
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/Browser.js
  var import_classnames5 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/utils/lib/remoteFileObjToLocal.js
  function remoteFileObjToLocal(file) {
    return {
      ...file,
      type: file.mimeType,
      extension: file.name ? getFileNameAndExtension(file.name).extension : null
    };
  }

  // tests/_npm/node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var r3;
  var u3;
  var i3;
  var o3 = 0;
  var f3 = [];
  var c3 = [];
  var e3 = l.__b;
  var a3 = l.__r;
  var v3 = l.diffed;
  var l3 = l.__c;
  var m3 = l.unmount;
  function d3(t4, u4) {
    l.__h && l.__h(r3, t4, o3 || u4), o3 = 0;
    var i4 = r3.__H || (r3.__H = { __: [], __h: [] });
    return t4 >= i4.__.length && i4.__.push({ __V: c3 }), i4.__[t4];
  }
  function h3(n3) {
    return o3 = 1, s3(B2, n3);
  }
  function s3(n3, u4, i4) {
    var o4 = d3(t3++, 2);
    if (o4.t = n3, !o4.__c && (o4.__ = [i4 ? i4(u4) : B2(void 0, u4), function(n4) {
      var t4 = o4.__N ? o4.__N[0] : o4.__[0], r4 = o4.t(t4, n4);
      t4 !== r4 && (o4.__N = [r4, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r3, !r3.u)) {
      var f4 = function(n4, t4, r4) {
        if (!o4.__c.__H)
          return true;
        var u5 = o4.__c.__H.__.filter(function(n5) {
          return n5.__c;
        });
        if (u5.every(function(n5) {
          return !n5.__N;
        }))
          return !c4 || c4.call(this, n4, t4, r4);
        var i5 = false;
        return u5.forEach(function(n5) {
          if (n5.__N) {
            var t5 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t5 !== n5.__[0] && (i5 = true);
          }
        }), !(!i5 && o4.__c.props === n4) && (!c4 || c4.call(this, n4, t4, r4));
      };
      r3.u = true;
      var c4 = r3.shouldComponentUpdate, e4 = r3.componentWillUpdate;
      r3.componentWillUpdate = function(n4, t4, r4) {
        if (this.__e) {
          var u5 = c4;
          c4 = void 0, f4(n4, t4, r4), c4 = u5;
        }
        e4 && e4.call(this, n4, t4, r4);
      }, r3.shouldComponentUpdate = f4;
    }
    return o4.__N || o4.__;
  }
  function p3(u4, i4) {
    var o4 = d3(t3++, 3);
    !l.__s && z3(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r3.__H.__h.push(o4));
  }
  function F2(n3, r4) {
    var u4 = d3(t3++, 7);
    return z3(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
  }
  function T3(n3, t4) {
    return o3 = 8, F2(function() {
      return n3;
    }, t4);
  }
  function b3() {
    for (var t4; t4 = f3.shift(); )
      if (t4.__P && t4.__H)
        try {
          t4.__H.__h.forEach(k3), t4.__H.__h.forEach(w3), t4.__H.__h = [];
        } catch (r4) {
          t4.__H.__h = [], l.__e(r4, t4.__v);
        }
  }
  l.__b = function(n3) {
    r3 = null, e3 && e3(n3);
  }, l.__r = function(n3) {
    a3 && a3(n3), t3 = 0;
    var i4 = (r3 = n3.__c).__H;
    i4 && (u3 === r3 ? (i4.__h = [], r3.__h = [], i4.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.__V = c3, n4.__N = n4.i = void 0;
    })) : (i4.__h.forEach(k3), i4.__h.forEach(w3), i4.__h = [], t3 = 0)), u3 = r3;
  }, l.diffed = function(t4) {
    v3 && v3(t4);
    var o4 = t4.__c;
    o4 && o4.__H && (o4.__H.__h.length && (1 !== f3.push(o4) && i3 === l.requestAnimationFrame || ((i3 = l.requestAnimationFrame) || j3)(b3)), o4.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c3 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c3;
    })), u3 = r3 = null;
  }, l.__c = function(t4, r4) {
    r4.some(function(t5) {
      try {
        t5.__h.forEach(k3), t5.__h = t5.__h.filter(function(n3) {
          return !n3.__ || w3(n3);
        });
      } catch (u4) {
        r4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), r4 = [], l.__e(u4, t5.__v);
      }
    }), l3 && l3(t4, r4);
  }, l.unmount = function(t4) {
    m3 && m3(t4);
    var r4, u4 = t4.__c;
    u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
      try {
        k3(n3);
      } catch (n4) {
        r4 = n4;
      }
    }), u4.__H = void 0, r4 && l.__e(r4, u4.__v));
  };
  var g3 = "function" == typeof requestAnimationFrame;
  function j3(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), g3 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g3 && (t4 = requestAnimationFrame(r4));
  }
  function k3(n3) {
    var t4 = r3, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r3 = t4;
  }
  function w3(n3) {
    var t4 = r3;
    n3.__c = n3.__(), r3 = t4;
  }
  function z3(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n3[r4];
    });
  }
  function B2(n3, t4) {
    return "function" == typeof t4 ? t4(n3) : t4;
  }

  // tests/_npm/node_modules/@uppy/utils/lib/VirtualList.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var STYLE_INNER = {
    position: "relative",
    // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
    // and this additional property would hide things that we want to show.
    //
    // overflow: 'hidden',
    width: "100%",
    minHeight: "100%"
  };
  var STYLE_CONTENT = {
    position: "absolute",
    top: 0,
    left: 0,
    // Because the `top` value gets set to some offset, this `height` being 100% would make the scrollbar
    // stretch far beyond the content. For our use case, the content div actually can get its height from
    // the elements inside it, so we don't need to specify a `height` property at all.
    //
    // height: '100%',
    width: "100%",
    overflow: "visible"
  };
  var VirtualList = class extends b {
    constructor(props) {
      super(props);
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
      window.addEventListener("resize", this.handleResize);
    }
    // TODO: refactor to stable lifecycle method
    // eslint-disable-next-line
    componentWillUpdate() {
      if (this.base.contains(document.activeElement)) {
        this.focusElement = document.activeElement;
      }
    }
    componentDidUpdate() {
      if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
        this.focusElement.focus();
      }
      this.focusElement = null;
      this.resize();
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
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
      let start = Math.floor(offset / rowHeight);
      let visibleRowCount = Math.floor(height / rowHeight);
      if (overscanCount) {
        start = Math.max(0, start - start % overscanCount);
        visibleRowCount += overscanCount;
      }
      const end = start + visibleRowCount + 4;
      const selection = data.slice(start, end);
      const styleInner = {
        ...STYLE_INNER,
        height: data.length * rowHeight
      };
      const styleContent = {
        ...STYLE_CONTENT,
        top: start * rowHeight
      };
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        y("div", _extends({
          onScroll: this.handleScroll
        }, props), y("div", {
          role: "presentation",
          style: styleInner
        }, y("div", {
          role: "presentation",
          style: styleContent
        }, selection.map(renderRow))))
      );
    }
  };
  var VirtualList_default = VirtualList;

  // tests/_npm/node_modules/@uppy/provider-views/lib/SearchFilterInput.js
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
    const [searchText, setSearchText] = h3(searchTerm != null ? searchTerm : "");
    const validateAndSearch = T3((ev) => {
      ev.preventDefault();
      search(searchText);
    }, [search, searchText]);
    const handleInput = T3((ev) => {
      const inputValue = ev.target.value;
      setSearchText(inputValue);
      if (searchOnInput)
        search(inputValue);
    }, [setSearchText, searchOnInput, search]);
    const handleReset = () => {
      setSearchText("");
      if (clearSearch)
        clearSearch();
    };
    const [form] = h3(() => {
      const formEl = document.createElement("form");
      formEl.setAttribute("tabindex", "-1");
      formEl.id = nanoid();
      return formEl;
    });
    p3(() => {
      document.body.appendChild(form);
      form.addEventListener("submit", validateAndSearch);
      return () => {
        form.removeEventListener("submit", validateAndSearch);
        document.body.removeChild(form);
      };
    }, [form, validateAndSearch]);
    return y(g, null, y("input", {
      className: `uppy-u-reset ${inputClassName}`,
      type: "search",
      "aria-label": inputLabel,
      placeholder: inputLabel,
      value: searchText,
      onInput: handleInput,
      form: form.id,
      "data-uppy-super-focusable": true
    }), !showButton && y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      class: "uppy-c-icon uppy-ProviderBrowser-searchFilterIcon",
      width: "12",
      height: "12",
      viewBox: "0 0 12 12"
    }, y("path", {
      d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
    })), !showButton && searchText && y("button", {
      className: "uppy-u-reset uppy-ProviderBrowser-searchFilterReset",
      type: "button",
      "aria-label": clearSearchLabel,
      title: clearSearchLabel,
      onClick: handleReset
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      viewBox: "0 0 19 19"
    }, y("path", {
      d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
    }))), showButton && y("button", {
      className: `uppy-u-reset uppy-c-btn uppy-c-btn-primary ${buttonCSSClassName}`,
      type: "submit",
      form: form.id
    }, buttonLabel));
  }

  // tests/_npm/node_modules/@uppy/provider-views/lib/FooterActions.js
  var FooterActions_default = (_ref) => {
    let {
      cancel,
      done,
      i18n,
      selected
    } = _ref;
    return y("div", {
      className: "uppy-ProviderBrowser-footer"
    }, y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
      onClick: done,
      type: "button"
    }, i18n("selectX", {
      smart_count: selected
    })), y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
      onClick: cancel,
      type: "button"
    }, i18n("cancel")));
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/Item/index.js
  var import_classnames4 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/provider-views/lib/Item/components/ItemIcon.js
  function FileIcon() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: 11,
      height: 14.5,
      viewBox: "0 0 44 58"
    }, y("path", {
      d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
    }));
  }
  function FolderIcon() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      style: {
        minWidth: 16,
        marginRight: 3
      },
      viewBox: "0 0 276.157 276.157"
    }, y("path", {
      d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
    }));
  }
  function VideoIcon() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      style: {
        width: 16,
        marginRight: 4
      },
      viewBox: "0 0 58 58"
    }, y("path", {
      d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
    }), y("path", {
      d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
    }));
  }
  var ItemIcon_default = (props) => {
    const {
      itemIconString
    } = props;
    if (itemIconString === null)
      return void 0;
    switch (itemIconString) {
      case "file":
        return y(FileIcon, null);
      case "folder":
        return y(FolderIcon, null);
      case "video":
        return y(VideoIcon, null);
      default: {
        const {
          alt
        } = props;
        return y("img", {
          src: itemIconString,
          alt,
          loading: "lazy",
          width: 16,
          height: 16
        });
      }
    }
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/Item/components/GridLi.js
  var import_classnames3 = __toESM(require_classnames(), 1);
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
      id: id7,
      children
    } = props;
    const checkBoxClassName = (0, import_classnames3.default)("uppy-u-reset", "uppy-ProviderBrowserItem-checkbox", "uppy-ProviderBrowserItem-checkbox--grid", {
      "uppy-ProviderBrowserItem-checkbox--is-checked": isChecked
    });
    return y("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, y("input", {
      type: "checkbox",
      className: checkBoxClassName,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      onMouseDown: recordShiftKeyPress,
      name: "listitem",
      id: id7,
      checked: isChecked,
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }), y("label", {
      htmlFor: id7,
      "aria-label": title,
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
    }, itemIconEl, showTitles && title, children));
  }
  var GridLi_default = GridListItem;

  // tests/_npm/node_modules/@uppy/provider-views/lib/Item/components/ListLi.js
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
      id: id7,
      itemIconEl,
      title,
      handleFolderClick,
      showTitles,
      i18n
    } = props;
    return y("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, !isCheckboxDisabled ? y("input", {
      type: "checkbox",
      className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""}`,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      onMouseDown: recordShiftKeyPress,
      name: "listitem",
      id: id7,
      checked: isChecked,
      "aria-label": type === "file" ? null : i18n("allFilesFromFolderNamed", {
        name: title
      }),
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }) : null, type === "file" ? (
      // label for a checkbox
      y("label", {
        htmlFor: id7,
        className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
      }, y("div", {
        className: "uppy-ProviderBrowserItem-iconWrap"
      }, itemIconEl), showTitles && title)
    ) : (
      // button to open a folder
      y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
        onClick: handleFolderClick,
        "aria-label": i18n("openFolderNamed", {
          name: title
        })
      }, y("div", {
        className: "uppy-ProviderBrowserItem-iconWrap"
      }, itemIconEl), showTitles && y("span", null, title))
    ));
  }
  var ListLi_default = ListItem;

  // tests/_npm/node_modules/@uppy/provider-views/lib/Item/index.js
  function _extends2() {
    _extends2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  var Item_default = (props) => {
    const {
      author,
      getItemIcon,
      isChecked,
      isDisabled,
      viewType
    } = props;
    const itemIconString = getItemIcon();
    const className = (0, import_classnames4.default)("uppy-ProviderBrowserItem", {
      "uppy-ProviderBrowserItem--selected": isChecked
    }, {
      "uppy-ProviderBrowserItem--disabled": isDisabled
    }, {
      "uppy-ProviderBrowserItem--noPreview": itemIconString === "video"
    });
    const itemIconEl = y(ItemIcon_default, {
      itemIconString
    });
    switch (viewType) {
      case "grid":
        return y(
          GridLi_default,
          _extends2({}, props, {
            className,
            itemIconEl
          })
        );
      case "list":
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          y(ListLi_default, _extends2({}, props, {
            className,
            itemIconEl
          }))
        );
      case "unsplash":
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          y(GridLi_default, _extends2({}, props, {
            className,
            itemIconEl
          }), y("a", {
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
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/Browser.js
  var VIRTUAL_SHARED_DIR = "shared-with-me";
  function ListItem2(props) {
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
      f: f4
    } = props;
    if (f4.isFolder) {
      var _isChecked;
      return Item_default({
        columns,
        showTitles,
        viewType,
        i18n,
        id: f4.id,
        title: f4.name,
        getItemIcon: () => f4.icon,
        isChecked: isChecked(f4),
        toggleCheckbox: (event) => toggleCheckbox(event, f4),
        recordShiftKeyPress,
        type: "folder",
        isDisabled: (_isChecked = isChecked(f4)) == null ? void 0 : _isChecked.loading,
        isCheckboxDisabled: f4.id === VIRTUAL_SHARED_DIR,
        handleFolderClick: () => getNextFolder(f4)
      });
    }
    const restrictionError = validateRestrictions(remoteFileObjToLocal(f4), [...uppyFiles, ...currentSelection]);
    return Item_default({
      id: f4.id,
      title: f4.name,
      author: f4.author,
      getItemIcon: () => f4.icon,
      isChecked: isChecked(f4),
      toggleCheckbox: (event) => toggleCheckbox(event, f4),
      recordShiftKeyPress,
      columns,
      showTitles,
      viewType,
      i18n,
      type: "file",
      isDisabled: restrictionError && !isChecked(f4),
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
    const rows = F2(() => [...folders, ...files], [folders, files]);
    return y("div", {
      className: (0, import_classnames5.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${viewType}`)
    }, headerComponent && y("div", {
      className: "uppy-ProviderBrowser-header"
    }, y("div", {
      className: (0, import_classnames5.default)("uppy-ProviderBrowser-headerBar", !showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
    }, headerComponent)), showSearchFilter && y("div", {
      class: "uppy-ProviderBrowser-searchFilter"
    }, y(SearchFilterInput, {
      search,
      searchTerm,
      clearSearch,
      inputLabel: searchInputLabel,
      clearSearchLabel,
      inputClassName: "uppy-ProviderBrowser-searchFilterInput",
      searchOnInput
    })), (() => {
      if (isLoading) {
        return y("div", {
          className: "uppy-Provider-loading"
        }, y("span", null, i18n("loading")));
      }
      if (!folders.length && !files.length) {
        return y("div", {
          className: "uppy-Provider-empty"
        }, noResultsLabel);
      }
      if (loadAllFiles) {
        return y("div", {
          className: "uppy-ProviderBrowser-body"
        }, y("ul", {
          className: "uppy-ProviderBrowser-list"
        }, y(VirtualList_default, {
          data: rows,
          renderRow: (f4) => y(ListItem2, {
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
            f: f4
          }),
          rowHeight: 31
        })));
      }
      return y("div", {
        className: "uppy-ProviderBrowser-body"
      }, y("ul", {
        className: "uppy-ProviderBrowser-list",
        onScroll: handleScroll,
        role: "listbox",
        tabIndex: "-1"
      }, rows.map((f4) => y(ListItem2, {
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
        f: f4
      }))));
    })(), selected > 0 && y(FooterActions_default, {
      selected,
      done,
      cancel,
      i18n
    }));
  }
  var Browser_default = Browser;

  // tests/_npm/node_modules/@uppy/provider-views/lib/Loader.js
  var Loader_default = (_ref) => {
    let {
      i18n,
      loading
    } = _ref;
    return y("div", {
      className: "uppy-Provider-loading"
    }, y("span", null, i18n("loading")), typeof loading === "string" && // todo improve this, see discussion in https://github.com/transloadit/uppy/pull/4399#discussion_r1162564445
    y("span", {
      style: {
        marginTop: ".7em"
      }
    }, loading));
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/CloseWrapper.js
  var CloseWrapper = class extends b {
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
      return $(children)[0];
    }
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/View.js
  var View = class {
    constructor(plugin, opts) {
      this.filterItems = (items) => {
        const state = this.plugin.getPluginState();
        if (!state.filterInput || state.filterInput === "") {
          return items;
        }
        return items.filter((folder) => {
          return folder.name.toLowerCase().indexOf(state.filterInput.toLowerCase()) !== -1;
        });
      };
      this.recordShiftKeyPress = (e4) => {
        this.isShiftKeyPressed = e4.shiftKey;
      };
      this.toggleCheckbox = (e4, file) => {
        e4.stopPropagation();
        e4.preventDefault();
        e4.currentTarget.focus();
        const {
          folders,
          files
        } = this.plugin.getPluginState();
        const items = this.filterItems(folders.concat(files));
        if (this.lastCheckbox && this.isShiftKeyPressed) {
          const {
            currentSelection: currentSelection2
          } = this.plugin.getPluginState();
          const prevIndex = items.indexOf(this.lastCheckbox);
          const currentIndex = items.indexOf(file);
          const newSelection = prevIndex < currentIndex ? items.slice(prevIndex, currentIndex + 1) : items.slice(currentIndex, prevIndex + 1);
          const reducedNewSelection = [];
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
              }, "error", uppy.opts.infoTimeout);
            }
          }
          this.plugin.setPluginState({
            currentSelection: [.../* @__PURE__ */ new Set([...currentSelection2, ...reducedNewSelection])]
          });
          return;
        }
        this.lastCheckbox = file;
        const {
          currentSelection
        } = this.plugin.getPluginState();
        if (this.isChecked(file)) {
          this.plugin.setPluginState({
            currentSelection: currentSelection.filter((item) => item.id !== file.id)
          });
        } else {
          this.plugin.setPluginState({
            currentSelection: currentSelection.concat([file])
          });
        }
      };
      this.isChecked = (file) => {
        const {
          currentSelection
        } = this.plugin.getPluginState();
        return currentSelection.some((item) => item.id === file.id);
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
        filterInput: ""
      });
    }
    cancelPicking() {
      this.clearSelection();
      const dashboard = this.plugin.uppy.getPlugin("Dashboard");
      if (dashboard) {
        dashboard.hideAllPanels();
      }
    }
    handleError(error) {
      var _error$cause;
      const {
        uppy
      } = this.plugin;
      const message = uppy.i18n("companionError");
      uppy.log(error.toString());
      if (error.isAuthError || ((_error$cause = error.cause) == null ? void 0 : _error$cause.name) === "AbortError") {
        return;
      }
      uppy.info({
        message,
        details: error.toString()
      }, "error", 5e3);
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
      Object.defineProperty(tagFile.remote, "requestClient", {
        value: this.provider,
        enumerable: false
      });
      const fileType = getFileType(tagFile);
      if (fileType && isPreviewSupported(fileType)) {
        tagFile.preview = file.thumbnail;
      }
      if (file.author) {
        if (file.author.name != null)
          tagFile.meta.authorName = String(file.author.name);
        if (file.author.url)
          tagFile.meta.authorUrl = file.author.url;
      }
      if (file.relDirPath != null)
        tagFile.meta.relativePath = file.relDirPath ? `${file.relDirPath}/${tagFile.name}` : null;
      if (file.absDirPath != null)
        tagFile.meta.absolutePath = file.absDirPath ? `/${file.absDirPath}/${tagFile.name}` : `/${tagFile.name}`;
      return tagFile;
    }
    setLoading(loading) {
      this.plugin.setPluginState({
        loading
      });
    }
  };

  // tests/_npm/node_modules/@uppy/provider-views/lib/ProviderView/ProviderView.js
  function _classPrivateFieldLooseBase4(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id4 = 0;
  function _classPrivateFieldLooseKey4(name) {
    return "__private_" + id4++ + "_" + name;
  }
  var packageJson4 = {
    "version": "3.7.0"
  };
  function formatBreadcrumbs(breadcrumbs) {
    return breadcrumbs.slice(1).map((directory) => directory.name).join("/");
  }
  function prependPath(path, component) {
    if (!path)
      return component;
    return `${path}/${component}`;
  }
  function defaultPickerIcon() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "30",
      height: "30",
      viewBox: "0 0 30 30"
    }, y("path", {
      d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
    }));
  }
  var _abortController = /* @__PURE__ */ _classPrivateFieldLooseKey4("abortController");
  var _withAbort = /* @__PURE__ */ _classPrivateFieldLooseKey4("withAbort");
  var _list = /* @__PURE__ */ _classPrivateFieldLooseKey4("list");
  var _listFilesAndFolders = /* @__PURE__ */ _classPrivateFieldLooseKey4("listFilesAndFolders");
  var _recursivelyListAllFiles = /* @__PURE__ */ _classPrivateFieldLooseKey4("recursivelyListAllFiles");
  var ProviderView = class _ProviderView extends View {
    /**
     * @param {object} plugin instance of the plugin
     * @param {object} opts
     */
    constructor(plugin, opts) {
      super(plugin, opts);
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
        viewType: "list",
        showTitles: true,
        showFilter: true,
        showBreadcrumbs: true,
        loadAllFiles: false
      };
      this.opts = {
        ...defaultOptions,
        ...opts
      };
      this.filterQuery = this.filterQuery.bind(this);
      this.clearFilter = this.clearFilter.bind(this);
      this.getFolder = this.getFolder.bind(this);
      this.getNextFolder = this.getNextFolder.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuth = this.handleAuth.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.donePicking = this.donePicking.bind(this);
      this.render = this.render.bind(this);
      this.plugin.setPluginState({
        authenticated: false,
        files: [],
        folders: [],
        breadcrumbs: [],
        filterInput: "",
        isSearchVisible: false,
        currentSelection: []
      });
    }
    // eslint-disable-next-line class-methods-use-this
    tearDown() {
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
        await _classPrivateFieldLooseBase4(this, _withAbort)[_withAbort](async (signal) => {
          this.lastCheckbox = void 0;
          let {
            breadcrumbs
          } = this.plugin.getPluginState();
          const index = breadcrumbs.findIndex((dir) => requestPath === dir.requestPath);
          if (index !== -1) {
            breadcrumbs = breadcrumbs.slice(0, index + 1);
          } else {
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
            } = await _classPrivateFieldLooseBase4(this, _listFilesAndFolders)[_listFilesAndFolders]({
              breadcrumbs,
              signal
            });
            files = files.concat(newFiles);
            folders = folders.concat(newFolders);
            this.setLoading(this.plugin.uppy.i18n("loadedXFiles", {
              numFiles: files.length + folders.length
            }));
          } while (this.opts.loadAllFiles && this.nextPagePath);
          this.plugin.setPluginState({
            folders,
            files,
            breadcrumbs,
            filterInput: ""
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
      this.lastCheckbox = void 0;
    }
    /**
     * Removes session token on client side.
     */
    async logout() {
      try {
        await _classPrivateFieldLooseBase4(this, _withAbort)[_withAbort](async (signal) => {
          const res = await this.provider.logout({
            signal
          });
          if (res.ok) {
            if (!res.revoked) {
              const message = this.plugin.uppy.i18n("companionUnauthorizeHint", {
                provider: this.plugin.title,
                url: res.manual_revoke_url
              });
              this.plugin.uppy.info(message, "info", 7e3);
            }
            const newState = {
              authenticated: false,
              files: [],
              folders: [],
              breadcrumbs: [],
              filterInput: ""
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
        filterInput: ""
      });
    }
    async handleAuth() {
      const clientVersion = `@uppy/provider-views=${_ProviderView.VERSION}`;
      try {
        await this.provider.login({
          uppyVersions: clientVersion
        });
        this.plugin.setPluginState({
          authenticated: true
        });
        this.preFirstRender();
      } catch (e4) {
        this.plugin.uppy.log(`login failed: ${e4.message}`);
      }
    }
    async handleScroll(event) {
      if (this.shouldHandleScroll(event) && this.nextPagePath) {
        this.isHandlingScroll = true;
        try {
          await _classPrivateFieldLooseBase4(this, _withAbort)[_withAbort](async (signal) => {
            const {
              files,
              folders,
              breadcrumbs
            } = this.plugin.getPluginState();
            const {
              files: newFiles,
              folders: newFolders
            } = await _classPrivateFieldLooseBase4(this, _listFilesAndFolders)[_listFilesAndFolders]({
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
        await _classPrivateFieldLooseBase4(this, _withAbort)[_withAbort](async (signal) => {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          const messages = [];
          const newFiles = [];
          for (const selectedItem of currentSelection) {
            const {
              requestPath
            } = selectedItem;
            const withRelDirPath = (newItem) => ({
              ...newItem,
              // calculate the file's path relative to the user's selected item's path
              // see https://github.com/transloadit/uppy/pull/4537#issuecomment-1614236655
              relDirPath: newItem.absDirPath.replace(selectedItem.absDirPath, "").replace(/^\//, "")
            });
            if (selectedItem.isFolder) {
              let isEmpty = true;
              let numNewFiles = 0;
              const queue = new dist_default({
                concurrency: 6
              });
              const onFiles = (files) => {
                for (const newFile of files) {
                  const tagFile = this.getTagFile(newFile);
                  const id7 = getSafeFileId(tagFile);
                  if (!this.plugin.uppy.checkIfFileAlreadyExists(id7)) {
                    newFiles.push(withRelDirPath(newFile));
                    numNewFiles++;
                    this.setLoading(this.plugin.uppy.i18n("addedNumFiles", {
                      numFiles: numNewFiles
                    }));
                  }
                  isEmpty = false;
                }
              };
              await _classPrivateFieldLooseBase4(this, _recursivelyListAllFiles)[_recursivelyListAllFiles]({
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
                message = this.plugin.uppy.i18n("emptyFolderAdded");
              } else if (numNewFiles === 0) {
                message = this.plugin.uppy.i18n("folderAlreadyAdded", {
                  folder: selectedItem.name
                });
              } else {
                message = this.plugin.uppy.i18n("folderAdded", {
                  smart_count: numNewFiles,
                  folder: selectedItem.name
                });
              }
              messages.push(message);
            } else {
              newFiles.push(withRelDirPath(selectedItem));
            }
          }
          this.plugin.uppy.log("Adding files from a remote provider");
          this.plugin.uppy.addFiles(newFiles.map((file) => this.getTagFile(file)));
          this.plugin.setPluginState({
            filterInput: ""
          });
          messages.forEach((message) => this.plugin.uppy.info(message));
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
      const hasInput = filterInput !== "";
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
        searchInputLabel: i18n("filter"),
        clearSearchLabel: i18n("resetFilter"),
        noResultsLabel: i18n("noFilesFound"),
        logout: this.logout,
        handleScroll: this.handleScroll,
        done: this.donePicking,
        cancel: this.cancelPicking,
        headerComponent: Header_default(headerProps),
        title: this.plugin.title,
        viewType: targetViewOptions.viewType,
        showTitles: targetViewOptions.showTitles,
        showBreadcrumbs: targetViewOptions.showBreadcrumbs,
        pluginIcon,
        i18n: this.plugin.uppy.i18n,
        uppyFiles: this.plugin.uppy.getFiles(),
        validateRestrictions: function() {
          return _this.plugin.uppy.validateRestrictions(...arguments);
        }
      };
      if (loading) {
        return y(CloseWrapper, {
          onUnmount: this.clearSelection
        }, y(Loader_default, {
          i18n: this.plugin.uppy.i18n,
          loading
        }));
      }
      if (!authenticated) {
        return y(CloseWrapper, {
          onUnmount: this.clearSelection
        }, y(AuthView_default, {
          pluginName: this.plugin.title,
          pluginIcon,
          handleAuth: this.handleAuth,
          i18n: this.plugin.uppy.i18n,
          i18nArray: this.plugin.uppy.i18nArray
        }));
      }
      return y(CloseWrapper, {
        onUnmount: this.clearSelection
      }, y(Browser_default, browserProps));
    }
  };
  async function _withAbort2(op) {
    var _classPrivateFieldLoo;
    (_classPrivateFieldLoo = _classPrivateFieldLooseBase4(this, _abortController)[_abortController]) == null ? void 0 : _classPrivateFieldLoo.abort();
    const abortController = new AbortController();
    _classPrivateFieldLooseBase4(this, _abortController)[_abortController] = abortController;
    const cancelRequest = () => {
      abortController.abort();
      this.clearSelection();
    };
    try {
      this.plugin.uppy.on("dashboard:close-panel", cancelRequest);
      this.plugin.uppy.on("cancel-all", cancelRequest);
      await op(abortController.signal);
    } finally {
      this.plugin.uppy.off("dashboard:close-panel", cancelRequest);
      this.plugin.uppy.off("cancel-all", cancelRequest);
      _classPrivateFieldLooseBase4(this, _abortController)[_abortController] = void 0;
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
      items: items.map((item) => ({
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
    } = await _classPrivateFieldLooseBase4(this, _list)[_list]({
      requestPath: this.nextPagePath,
      absDirPath,
      signal
    });
    this.nextPagePath = nextPagePath;
    const files = [];
    const folders = [];
    items.forEach((item) => {
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
      const res = await _classPrivateFieldLooseBase4(this, _list)[_list]({
        requestPath: curPath,
        absDirPath,
        signal
      });
      curPath = res.nextPagePath;
      const files = res.items.filter((item) => !item.isFolder);
      const folders = res.items.filter((item) => item.isFolder);
      onFiles(files);
      const promises = folders.map(async (folder) => queue.add(async () => _classPrivateFieldLooseBase4(this, _recursivelyListAllFiles)[_recursivelyListAllFiles]({
        requestPath: folder.requestPath,
        absDirPath: prependPath(absDirPath, folder.name),
        relDirPath: prependPath(relDirPath, folder.name),
        queue,
        onFiles,
        signal
      })));
      await Promise.all(promises);
    }
  }
  ProviderView.VERSION = packageJson4.version;

  // tests/_npm/node_modules/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js
  function _classPrivateFieldLooseBase5(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id5 = 0;
  function _classPrivateFieldLooseKey5(name) {
    return "__private_" + id5++ + "_" + name;
  }
  var packageJson5 = {
    "version": "3.7.0"
  };
  var _updateFilesAndInputMode = /* @__PURE__ */ _classPrivateFieldLooseKey5("updateFilesAndInputMode");
  var SearchProviderView = class extends View {
    /**
     * @param {object} plugin instance of the plugin
     * @param {object} opts
     */
    constructor(plugin, opts) {
      super(plugin, opts);
      Object.defineProperty(this, _updateFilesAndInputMode, {
        value: _updateFilesAndInputMode2
      });
      const defaultOptions = {
        viewType: "grid",
        showTitles: false,
        showFilter: false,
        showBreadcrumbs: false
      };
      this.opts = {
        ...defaultOptions,
        ...opts
      };
      this.search = this.search.bind(this);
      this.clearSearch = this.clearSearch.bind(this);
      this.resetPluginState = this.resetPluginState.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.donePicking = this.donePicking.bind(this);
      this.render = this.render.bind(this);
      this.defaultState = {
        isInputMode: true,
        files: [],
        folders: [],
        breadcrumbs: [],
        filterInput: "",
        currentSelection: [],
        searchTerm: null
      };
      this.plugin.setPluginState(this.defaultState);
    }
    // eslint-disable-next-line class-methods-use-this
    tearDown() {
    }
    resetPluginState() {
      this.plugin.setPluginState(this.defaultState);
    }
    async search(query) {
      const {
        searchTerm
      } = this.plugin.getPluginState();
      if (query && query === searchTerm) {
        return;
      }
      this.setLoading(true);
      try {
        const res = await this.provider.search(query);
        _classPrivateFieldLooseBase5(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](res, []);
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
          _classPrivateFieldLooseBase5(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](response, files);
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
      this.plugin.uppy.log("Adding remote search provider files");
      this.plugin.uppy.addFiles(currentSelection.map((file) => this.getTagFile(file)));
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
      const hasInput = filterInput !== "";
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
        searchInputLabel: i18n("search"),
        clearSearchLabel: i18n("resetSearch"),
        noResultsLabel: i18n("noSearchResults"),
        title: this.plugin.title,
        viewType: targetViewOptions.viewType,
        showTitles: targetViewOptions.showTitles,
        showFilter: targetViewOptions.showFilter,
        isLoading: loading,
        showBreadcrumbs: targetViewOptions.showBreadcrumbs,
        pluginIcon: this.plugin.icon,
        i18n,
        uppyFiles: this.plugin.uppy.getFiles(),
        validateRestrictions: function() {
          return _this.plugin.uppy.validateRestrictions(...arguments);
        }
      };
      if (isInputMode) {
        return y(CloseWrapper, {
          onUnmount: this.resetPluginState
        }, y("div", {
          className: "uppy-SearchProvider"
        }, y(SearchFilterInput, {
          search: this.search,
          clearSelection: this.clearSelection,
          inputLabel: i18n("enterTextToSearch"),
          buttonLabel: i18n("searchImages"),
          inputClassName: "uppy-c-textInput uppy-SearchProvider-input",
          buttonCSSClassName: "uppy-SearchProvider-searchButton",
          showButton: true
        })));
      }
      return y(CloseWrapper, {
        onUnmount: this.resetPluginState
      }, y(Browser_default, browserProps));
    }
  };
  function _updateFilesAndInputMode2(res, files) {
    this.nextPageQuery = res.nextPageQuery;
    res.items.forEach((item) => {
      files.push(item);
    });
    this.plugin.setPluginState({
      currentSelection: [],
      isInputMode: false,
      files,
      searchTerm: res.searchedFor
    });
  }
  SearchProviderView.VERSION = packageJson5.version;

  // tests/_npm/node_modules/memoize-one/dist/memoize-one.esm.js
  var safeIsNaN = Number.isNaN || function ponyfill(value) {
    return typeof value === "number" && value !== value;
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
    for (var i4 = 0; i4 < newInputs.length; i4++) {
      if (!isEqual(newInputs[i4], lastInputs[i4])) {
        return false;
      }
    }
    return true;
  }
  function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
      isEqual2 = areInputsEqual;
    }
    var cache = null;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
        return cache.lastResult;
      }
      var lastResult = resultFn.apply(this, newArgs);
      cache = {
        lastResult,
        lastArgs: newArgs,
        lastThis: this
      };
      return lastResult;
    }
    memoized.clear = function clear() {
      cache = null;
    };
    return memoized;
  }

  // tests/_npm/node_modules/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js
  var FOCUSABLE_ELEMENTS_default = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
  function getActiveOverlayEl(dashboardEl, activeOverlayType) {
    if (activeOverlayType) {
      const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
      if (overlayEl)
        return overlayEl;
    }
    return dashboardEl;
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/trapFocus.js
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
  function isFocusInOverlay(activeOverlayEl) {
    return activeOverlayEl.contains(document.activeElement);
  }
  function trapFocus(event, activeOverlayType, dashboardEl) {
    const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
    const focusableNodes = toArray_default(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS_default));
    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
    if (!isFocusInOverlay(activeOverlayEl)) {
      focusOnFirstNode(event, focusableNodes);
    } else if (event.shiftKey && focusedItemIndex === 0) {
      focusOnLastNode(event, focusableNodes);
    } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
      focusOnFirstNode(event, focusableNodes);
    }
  }
  function forInline(event, activeOverlayType, dashboardEl) {
    if (activeOverlayType === null) {
    } else {
      trapFocus(event, activeOverlayType, dashboardEl);
    }
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/createSuperFocus.js
  var import_debounce = __toESM(require_debounce(), 1);
  function createSuperFocus() {
    let lastFocusWasOnSuperFocusableEl = false;
    const superFocus = (dashboardEl, activeOverlayType) => {
      const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
      const isFocusInOverlay2 = overlayEl.contains(document.activeElement);
      if (isFocusInOverlay2 && lastFocusWasOnSuperFocusableEl)
        return;
      const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
      if (isFocusInOverlay2 && !superFocusableEl)
        return;
      if (superFocusableEl) {
        superFocusableEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = true;
      } else {
        const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS_default);
        firstEl == null ? void 0 : firstEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = false;
      }
    };
    return (0, import_debounce.default)(superFocus, 260);
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/Dashboard.js
  var import_classnames12 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/utils/lib/isDragDropSupported.js
  function isDragDropSupported() {
    const div = document.body;
    if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
      return false;
    }
    if (!("FormData" in window)) {
      return false;
    }
    if (!("FileReader" in window)) {
      return false;
    }
    return true;
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/index.js
  var import_classnames6 = __toESM(require_classnames(), 1);
  var import_is_shallow_equal = __toESM(require_is_shallow_equal(), 1);

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/getFileTypeIcon.js
  function iconImage() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("g", {
      fill: "#686DE0",
      fillRule: "evenodd"
    }, y("path", {
      d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
      fillRule: "nonzero"
    }), y("path", {
      d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
      fillRule: "nonzero"
    }), y("circle", {
      cx: "7.5",
      cy: "9.5",
      r: "1.5"
    })));
  }
  function iconAudio() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("path", {
      d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
      fill: "#049BCF",
      fillRule: "nonzero"
    }));
  }
  function iconVideo() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("path", {
      d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
      fill: "#19AF67",
      fillRule: "nonzero"
    }));
  }
  function iconPDF() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("path", {
      d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
      fill: "#E2514A",
      fillRule: "nonzero"
    }));
  }
  function iconArchive() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("path", {
      d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
      fill: "#00C469",
      fillRule: "nonzero"
    }));
  }
  function iconFile() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("g", {
      fill: "#A7AFB7",
      fillRule: "nonzero"
    }, y("path", {
      d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
    }), y("path", {
      d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
    })));
  }
  function iconText() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, y("path", {
      d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
      fill: "#5A5E69",
      fillRule: "nonzero"
    }));
  }
  function getIconByMime(fileType) {
    const defaultChoice = {
      color: "#838999",
      icon: iconFile()
    };
    if (!fileType)
      return defaultChoice;
    const fileTypeGeneral = fileType.split("/")[0];
    const fileTypeSpecific = fileType.split("/")[1];
    if (fileTypeGeneral === "text") {
      return {
        color: "#5a5e69",
        icon: iconText()
      };
    }
    if (fileTypeGeneral === "image") {
      return {
        color: "#686de0",
        icon: iconImage()
      };
    }
    if (fileTypeGeneral === "audio") {
      return {
        color: "#068dbb",
        icon: iconAudio()
      };
    }
    if (fileTypeGeneral === "video") {
      return {
        color: "#19af67",
        icon: iconVideo()
      };
    }
    if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
      return {
        color: "#e25149",
        icon: iconPDF()
      };
    }
    const archiveTypes = ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"];
    if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
      return {
        color: "#00C469",
        icon: iconArchive()
      };
    }
    return defaultChoice;
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FilePreview.js
  function FilePreview(props) {
    const {
      file
    } = props;
    if (file.preview) {
      return y("img", {
        className: "uppy-Dashboard-Item-previewImg",
        alt: file.name,
        src: file.preview
      });
    }
    const {
      color,
      icon
    } = getIconByMime(file.type);
    return y("div", {
      className: "uppy-Dashboard-Item-previewIconWrap"
    }, y("span", {
      className: "uppy-Dashboard-Item-previewIcon",
      style: {
        color
      }
    }, icon), y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-Dashboard-Item-previewIconBg",
      width: "58",
      height: "76",
      viewBox: "0 0 58 76"
    }, y("rect", {
      fill: "#FFF",
      width: "58",
      height: "76",
      rx: "3",
      fillRule: "evenodd"
    })));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
  var metaFieldIdToName = (metaFieldId, metaFields) => {
    const fields = typeof metaFields === "function" ? metaFields() : metaFields;
    const field = fields.filter((f4) => f4.id === metaFieldId);
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
    const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
    return y("div", {
      className: "uppy-Dashboard-Item-errorMessage"
    }, i18n("missingRequiredMetaFields", {
      smart_count: missingRequiredMetaFields.length,
      fields: metaFieldsString
    }), " ", y("button", {
      type: "button",
      class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
      onClick: () => toggleFileCard(true, file.id)
    }, i18n("editFile")));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
  function FilePreviewAndLink(props) {
    const {
      file,
      i18n,
      toggleFileCard,
      metaFields,
      showLinkToFileUploadResult
    } = props;
    const white = "rgba(255, 255, 255, 0.5)";
    const previewBackgroundColor = file.preview ? white : getIconByMime(props.file.type).color;
    return y("div", {
      className: "uppy-Dashboard-Item-previewInnerWrap",
      style: {
        backgroundColor: previewBackgroundColor
      }
    }, showLinkToFileUploadResult && file.uploadURL && y("a", {
      className: "uppy-Dashboard-Item-previewLink",
      href: file.uploadURL,
      rel: "noreferrer noopener",
      target: "_blank",
      "aria-label": file.meta.name
    }, y("span", {
      hidden: true
    }, file.meta.name)), y(FilePreview, {
      file
    }), y(renderMissingMetaFieldsError, {
      file,
      i18n,
      toggleFileCard,
      metaFields
    }));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
  function onPauseResumeCancelRetry(props) {
    if (props.isUploaded)
      return;
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
      return props.i18n("uploadComplete");
    }
    if (props.error) {
      return props.i18n("retryUpload");
    }
    if (props.resumableUploads) {
      if (props.file.isPaused) {
        return props.i18n("resumeUpload");
      }
      return props.i18n("pauseUpload");
    }
    if (props.individualCancellation) {
      return props.i18n("cancelUpload");
    }
    return "";
  }
  function ProgressIndicatorButton(props) {
    return y("div", {
      className: "uppy-Dashboard-Item-progress"
    }, y("button", {
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
    return y("svg", {
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
    const circleLength = 2 * Math.PI * 15;
    return y("g", null, y("circle", {
      className: "uppy-Dashboard-Item-progressIcon--bg",
      r: "15",
      cx: "18",
      cy: "18",
      "stroke-width": "2",
      fill: "none"
    }), y("circle", {
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
    if (!props.file.progress.uploadStarted) {
      return null;
    }
    if (props.isUploaded) {
      return y("div", {
        className: "uppy-Dashboard-Item-progress"
      }, y("div", {
        className: "uppy-Dashboard-Item-progressIndicator"
      }, y(ProgressCircleContainer, null, y("circle", {
        r: "15",
        cx: "18",
        cy: "18",
        fill: "#1bb240"
      }), y("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--check",
        transform: "translate(2, 3)",
        points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
      }))));
    }
    if (props.recoveredState) {
      return void 0;
    }
    if (props.error && !props.hideRetryButton) {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        y(ProgressIndicatorButton, props, y("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
          width: "28",
          height: "31",
          viewBox: "0 0 16 19"
        }, y("path", {
          d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
        }), y("path", {
          d: "M7.9 3H10v2H7.9z"
        }), y("path", {
          d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
        }), y("path", {
          d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
        })))
      );
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        y(ProgressIndicatorButton, props, y(ProgressCircleContainer, null, y(ProgressCircle, {
          progress: props.file.progress.percentage
        }), props.file.isPaused ? y("polygon", {
          className: "uppy-Dashboard-Item-progressIcon--play",
          transform: "translate(3, 3)",
          points: "12 20 12 10 20 15"
        }) : y("g", {
          className: "uppy-Dashboard-Item-progressIcon--pause",
          transform: "translate(14.5, 13)"
        }, y("rect", {
          x: "0",
          y: "0",
          width: "2",
          height: "10",
          rx: "0"
        }), y("rect", {
          x: "5",
          y: "0",
          width: "2",
          height: "10",
          rx: "0"
        }))))
      );
    }
    if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        y(ProgressIndicatorButton, props, y(ProgressCircleContainer, null, y(ProgressCircle, {
          progress: props.file.progress.percentage
        }), y("polygon", {
          className: "cancel",
          transform: "translate(2, 2)",
          points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
        })))
      );
    }
    return y("div", {
      className: "uppy-Dashboard-Item-progress"
    }, y("div", {
      className: "uppy-Dashboard-Item-progressIndicator"
    }, y(ProgressCircleContainer, null, y(ProgressCircle, {
      progress: props.file.progress.percentage
    }))));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  var import_prettier_bytes2 = __toESM(require_prettierBytes2(), 1);

  // tests/_npm/node_modules/@uppy/utils/lib/truncateString.js
  var separator = "...";
  function truncateString(string, maxLength) {
    if (maxLength === 0)
      return "";
    if (string.length <= maxLength)
      return string;
    if (maxLength <= separator.length + 1)
      return `${string.slice(0, maxLength - 1)}\u2026`;
    const charsToShow = maxLength - separator.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return string.slice(0, frontChars) + separator + string.slice(-backChars);
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  var renderFileName = (props) => {
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
      return author ? 20 : 30;
    }
    return y("div", {
      className: "uppy-Dashboard-Item-name",
      title: name
    }, truncateString(name, getMaxNameLength()));
  };
  var renderAuthor = (props) => {
    const {
      author
    } = props.file.meta;
    const {
      providerName
    } = props.file.remote;
    const dot = `\xB7`;
    if (!author) {
      return null;
    }
    return y("div", {
      className: "uppy-Dashboard-Item-author"
    }, y("a", {
      href: `${author.url}?utm_source=Companion&utm_medium=referral`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, truncateString(author.name, 13)), providerName ? y(g, null, ` ${dot} `, providerName, ` ${dot} `) : null);
  };
  var renderFileSize = (props) => props.file.size && y("div", {
    className: "uppy-Dashboard-Item-statusSize"
  }, (0, import_prettier_bytes2.default)(props.file.size));
  var ReSelectButton = (props) => props.file.isGhost && y("span", null, " \u2022 ", y("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
    type: "button",
    onClick: props.toggleAddFilesPanel
  }, props.i18n("reSelect")));
  var ErrorButton = (_ref) => {
    let {
      file,
      onClick
    } = _ref;
    if (file.error) {
      return y("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
        "aria-label": file.error,
        "data-microtip-position": "bottom",
        "data-microtip-size": "medium",
        onClick,
        type: "button"
      }, "?");
    }
    return null;
  };
  function FileInfo(props) {
    const {
      file
    } = props;
    return y("div", {
      className: "uppy-Dashboard-Item-fileInfo",
      "data-uppy-file-source": file.source
    }, y("div", {
      className: "uppy-Dashboard-Item-fileName"
    }, renderFileName(props), y(ErrorButton, {
      file: props.file,
      onClick: () => alert(props.file.error)
      // TODO: move to a custom alert implementation
    })), y("div", {
      className: "uppy-Dashboard-Item-status"
    }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), y(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/copyToClipboard.js
  function copyToClipboard(textToCopy, fallbackString) {
    if (fallbackString === void 0) {
      fallbackString = "Copy the URL below";
    }
    return new Promise((resolve) => {
      const textArea = document.createElement("textarea");
      textArea.setAttribute("style", {
        position: "fixed",
        top: 0,
        left: 0,
        width: "2em",
        height: "2em",
        padding: 0,
        border: "none",
        outline: "none",
        boxShadow: "none",
        background: "transparent"
      });
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      const magicCopyFailed = () => {
        document.body.removeChild(textArea);
        window.prompt(fallbackString, textToCopy);
        resolve();
      };
      try {
        const successful = document.execCommand("copy");
        if (!successful) {
          return magicCopyFailed("copy command unavailable");
        }
        document.body.removeChild(textArea);
        return resolve();
      } catch (err) {
        document.body.removeChild(textArea);
        return magicCopyFailed(err);
      }
    });
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
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
      return y("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
        type: "button",
        "aria-label": i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        title: i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        onClick: () => onClick()
      }, y("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14"
      }, y("g", {
        fillRule: "evenodd"
      }, y("path", {
        d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
        fillRule: "nonzero"
      }), y("rect", {
        x: "1",
        y: "12.293",
        width: "11",
        height: "1",
        rx: ".5"
      }), y("path", {
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
    return y("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
      type: "button",
      "aria-label": i18n("removeFile", {
        file: file.meta.name
      }),
      title: i18n("removeFile", {
        file: file.meta.name
      }),
      onClick: () => onClick()
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, y("path", {
      d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
    }), y("path", {
      fill: "#FFF",
      d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
    })));
  }
  var copyLinkToClipboard = (event, props) => {
    copyToClipboard(props.file.uploadURL, props.i18n("copyLinkToClipboardFallback")).then(() => {
      props.uppy.log("Link copied to clipboard.");
      props.uppy.info(props.i18n("copyLinkToClipboardSuccess"), "info", 3e3);
    }).catch(props.uppy.log).then(() => event.target.focus({
      preventScroll: true
    }));
  };
  function CopyLinkButton(props) {
    const {
      i18n
    } = props;
    return y("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
      type: "button",
      "aria-label": i18n("copyLink"),
      title: i18n("copyLink"),
      onClick: (event) => copyLinkToClipboard(event, props)
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14",
      height: "14",
      viewBox: "0 0 14 12"
    }, y("path", {
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
    return y("div", {
      className: "uppy-Dashboard-Item-actionWrapper"
    }, y(EditButton, {
      i18n,
      file,
      uploadInProgressOrComplete,
      canEditFile,
      metaFields,
      onClick: editAction
    }), showLinkToFileUploadResult && file.uploadURL ? y(CopyLinkButton, {
      file,
      uppy,
      i18n
    }) : null, showRemoveButton ? y(RemoveButton, {
      i18n,
      file,
      uppy,
      onClick: () => props.uppy.removeFile(file.id, "removed-by-user")
    }) : null);
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileItem/index.js
  var FileItem = class extends b {
    componentDidMount() {
      const {
        file
      } = this.props;
      if (!file.preview) {
        this.props.handleRequestThumbnail(file);
      }
    }
    shouldComponentUpdate(nextProps) {
      return !(0, import_is_shallow_equal.default)(this.props, nextProps);
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
      const {
        isGhost
      } = file;
      let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
      if (isUploaded && this.props.showRemoveButtonAfterComplete) {
        showRemoveButton = true;
      }
      const dashboardItemClass = (0, import_classnames6.default)({
        "uppy-Dashboard-Item": true,
        "is-inprogress": uploadInProgress && !this.props.recoveredState,
        "is-processing": isProcessing,
        "is-complete": isUploaded,
        "is-error": !!error,
        "is-resumable": this.props.resumableUploads,
        "is-noIndividualCancellation": !this.props.individualCancellation,
        "is-ghost": isGhost
      });
      return y("div", {
        className: dashboardItemClass,
        id: `uppy_${file.id}`,
        role: this.props.role
      }, y("div", {
        className: "uppy-Dashboard-Item-preview"
      }, y(FilePreviewAndLink, {
        file,
        showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
        i18n: this.props.i18n,
        toggleFileCard: this.props.toggleFileCard,
        metaFields: this.props.metaFields
      }), y(FileProgress, {
        uppy: this.props.uppy,
        file,
        error,
        isUploaded,
        hideRetryButton: this.props.hideRetryButton,
        hideCancelButton: this.props.hideCancelButton,
        hidePauseResumeButton: this.props.hidePauseResumeButton,
        recoveredState: this.props.recoveredState,
        showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
        resumableUploads: this.props.resumableUploads,
        individualCancellation: this.props.individualCancellation,
        i18n: this.props.i18n
      })), y("div", {
        className: "uppy-Dashboard-Item-fileInfoAndButtons"
      }, y(FileInfo, {
        file,
        id: this.props.id,
        acquirers: this.props.acquirers,
        containerWidth: this.props.containerWidth,
        containerHeight: this.props.containerHeight,
        i18n: this.props.i18n,
        toggleAddFilesPanel: this.props.toggleAddFilesPanel,
        toggleFileCard: this.props.toggleFileCard,
        metaFields: this.props.metaFields,
        isSingleFile: this.props.isSingleFile
      }), y(Buttons, {
        file,
        metaFields: this.props.metaFields,
        showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
        showRemoveButton,
        canEditFile: this.props.canEditFile,
        uploadInProgressOrComplete,
        toggleFileCard: this.props.toggleFileCard,
        openFileEditor: this.props.openFileEditor,
        uppy: this.props.uppy,
        i18n: this.props.i18n
      })));
    }
  };

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileList.js
  function chunks(list, size) {
    const chunked = [];
    let currentChunk = [];
    list.forEach((item) => {
      if (currentChunk.length < size) {
        currentChunk.push(item);
      } else {
        chunked.push(currentChunk);
        currentChunk = [item];
      }
    });
    if (currentChunk.length)
      chunked.push(currentChunk);
    return chunked;
  }
  var FileList_default = (_ref) => {
    let {
      id: id7,
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
    const rowHeight = itemsPerRow === 1 ? 71 : 200;
    const rows = F2(() => {
      const sortByGhostComesFirst = (file1, file2) => files[file2].isGhost - files[file1].isGhost;
      const fileIds = Object.keys(files);
      if (recoveredState)
        fileIds.sort(sortByGhostComesFirst);
      return chunks(fileIds, itemsPerRow);
    }, [files, itemsPerRow, recoveredState]);
    const renderRow = (row) => (
      // The `role="presentation` attribute ensures that the list items are properly
      // associated with the `VirtualList` element.
      // We use the first file ID as the key—this should not change across scroll rerenders
      y("div", {
        class: "uppy-Dashboard-filesInner",
        role: "presentation",
        key: row[0]
      }, row.map((fileID) => y(FileItem, {
        key: fileID,
        uppy,
        id: id7,
        error,
        i18n,
        acquirers,
        resumableUploads,
        individualCancellation,
        hideRetryButton,
        hidePauseResumeButton,
        hideCancelButton,
        showLinkToFileUploadResult,
        showRemoveButtonAfterComplete,
        isWide,
        metaFields,
        recoveredState,
        isSingleFile,
        containerWidth,
        containerHeight,
        toggleFileCard,
        handleRequestThumbnail,
        handleCancelThumbnail,
        role: "listitem",
        openFileEditor,
        canEditFile,
        toggleAddFilesPanel,
        file: files[fileID]
      })))
    );
    if (isSingleFile) {
      return y("div", {
        class: "uppy-Dashboard-files"
      }, renderRow(rows[0]));
    }
    return y(VirtualList_default, {
      class: "uppy-Dashboard-files",
      role: "list",
      data: rows,
      renderRow,
      rowHeight
    });
  };

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/AddFiles.js
  var _Symbol$for;
  _Symbol$for = Symbol.for("uppy test: disable unused locale key warning");
  var AddFiles = class extends b {
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
      this.onFileInputChange = (event) => {
        this.props.handleInputChange(event);
        event.target.value = null;
      };
      this.renderHiddenInput = (isFolder, refCallback) => {
        return y("input", {
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
          photo: "image/*",
          video: "video/*"
        };
        const accept = typeToAccept[type];
        return y("input", {
          className: "uppy-Dashboard-input",
          hidden: true,
          "aria-hidden": "true",
          tabIndex: -1,
          type: "file",
          name: `camera-${type}`,
          onChange: this.onFileInputChange,
          capture: nativeCameraFacingMode,
          accept,
          ref: refCallback
        });
      };
      this.renderMyDeviceAcquirer = () => {
        return y("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MyDevice"
        }, y("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerFileInputClick
        }, y("div", {
          className: "uppy-DashboardTab-inner"
        }, y("svg", {
          className: "uppy-DashboardTab-iconMyDevice",
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y("path", {
          d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
          fill: "currentcolor",
          "fill-rule": "evenodd"
        }))), y("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("myDevice"))));
      };
      this.renderPhotoCamera = () => {
        return y("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobilePhotoCamera"
        }, y("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerPhotoCameraInputClick
        }, y("div", {
          className: "uppy-DashboardTab-inner"
        }, y("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y("path", {
          d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
          fill: "#02B383",
          "fill-rule": "nonzero"
        }))), y("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("takePictureBtn"))));
      };
      this.renderVideoCamera = () => {
        return y("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobileVideoCamera"
        }, y("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerVideoCameraInputClick
        }, y("div", {
          className: "uppy-DashboardTab-inner"
        }, y("svg", {
          "aria-hidden": "true",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, y("path", {
          fill: "#FF675E",
          fillRule: "nonzero",
          d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
        }))), y("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("recordVideoBtn"))));
      };
      this.renderBrowseButton = (text, onClickFn) => {
        const numberOfAcquirers = this.props.acquirers.length;
        return y("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
          onClick: onClickFn,
          "data-uppy-super-focusable": numberOfAcquirers === 0
        }, text);
      };
      this.renderDropPasteBrowseTagline = (numberOfAcquirers) => {
        const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
        const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
        const lowerFMSelectionType = this.props.fileManagerSelectionType;
        const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
        return y(
          "div",
          {
            class: "uppy-Dashboard-AddFiles-title"
          },
          // eslint-disable-next-line no-nested-ternary
          this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
            browseFiles,
            browseFolders,
            browse: browseFiles
          }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
            browseFiles,
            browseFolders,
            browse: browseFiles
          })
        );
      };
      this.renderAcquirer = (acquirer) => {
        return y("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": acquirer.id
        }, y("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-cy": acquirer.id,
          "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
          "aria-selected": this.props.activePickerPanel.id === acquirer.id,
          "data-uppy-super-focusable": true,
          onClick: () => this.props.showPanel(acquirer.id)
        }, y("div", {
          className: "uppy-DashboardTab-inner"
        }, acquirer.icon()), y("div", {
          className: "uppy-DashboardTab-name"
        }, acquirer.name)));
      };
      this.renderAcquirers = (acquirers) => {
        const acquirersWithoutLastTwo = [...acquirers];
        const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
        return y(g, null, acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), y("span", {
          role: "presentation",
          style: {
            "white-space": "nowrap"
          }
        }, lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer))));
      };
      this.renderSourcesList = (acquirers, disableLocalFiles) => {
        const {
          showNativePhotoCameraButton,
          showNativeVideoCameraButton
        } = this.props;
        let list = [];
        const myDeviceKey = "myDevice";
        if (!disableLocalFiles) {
          list.push({
            key: myDeviceKey,
            elements: this.renderMyDeviceAcquirer()
          });
          if (showNativePhotoCameraButton)
            list.push({
              key: "nativePhotoCameraButton",
              elements: this.renderPhotoCamera()
            });
          if (showNativeVideoCameraButton)
            list.push({
              key: "nativePhotoCameraButton",
              elements: this.renderVideoCamera()
            });
        }
        list.push(...acquirers.map((acquirer) => ({
          key: acquirer.id,
          elements: this.renderAcquirer(acquirer)
        })));
        const hasOnlyMyDevice = list.length === 1 && list[0].key === myDeviceKey;
        if (hasOnlyMyDevice)
          list = [];
        const listWithoutLastTwo = [...list];
        const lastTwo = listWithoutLastTwo.splice(list.length - 2, list.length);
        const renderList = (l4) => l4.map((_ref) => {
          let {
            key,
            elements
          } = _ref;
          return y(g, {
            key
          }, elements);
        });
        return y(g, null, this.renderDropPasteBrowseTagline(list.length), y("div", {
          className: "uppy-Dashboard-AddFiles-list",
          role: "tablist"
        }, renderList(listWithoutLastTwo), y("span", {
          role: "presentation",
          style: {
            "white-space": "nowrap"
          }
        }, renderList(lastTwo))));
      };
    }
    [_Symbol$for]() {
      this.props.i18nArray("dropPasteBoth");
      this.props.i18nArray("dropPasteFiles");
      this.props.i18nArray("dropPasteFolders");
      this.props.i18nArray("dropPasteImportBoth");
      this.props.i18nArray("dropPasteImportFiles");
      this.props.i18nArray("dropPasteImportFolders");
    }
    renderPoweredByUppy() {
      const {
        i18nArray
      } = this.props;
      const uppyBranding = y("span", null, y("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
        width: "11",
        height: "11",
        viewBox: "0 0 11 11"
      }, y("path", {
        d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
        fillRule: "evenodd"
      })), y("span", {
        className: "uppy-Dashboard-poweredByUppy"
      }, "Uppy"));
      const linkText = i18nArray("poweredBy", {
        uppy: uppyBranding
      });
      return y("a", {
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
      return y("div", {
        className: "uppy-Dashboard-AddFiles"
      }, this.renderHiddenInput(false, (ref) => {
        this.fileInput = ref;
      }), this.renderHiddenInput(true, (ref) => {
        this.folderInput = ref;
      }), showNativePhotoCameraButton && this.renderHiddenCameraInput("photo", nativeCameraFacingMode, (ref) => {
        this.mobilePhotoFileInput = ref;
      }), showNativeVideoCameraButton && this.renderHiddenCameraInput("video", nativeCameraFacingMode, (ref) => {
        this.mobileVideoFileInput = ref;
      }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), y("div", {
        className: "uppy-Dashboard-AddFiles-info"
      }, this.props.note && y("div", {
        className: "uppy-Dashboard-note"
      }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
    }
  };
  var AddFiles_default = AddFiles;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/AddFilesPanel.js
  var import_classnames7 = __toESM(require_classnames(), 1);
  var AddFilesPanel = (props) => {
    return y("div", {
      className: (0, import_classnames7.default)("uppy-Dashboard-AddFilesPanel", props.className),
      "data-uppy-panelType": "AddFiles",
      "aria-hidden": !props.showAddFilesPanel
    }, y("div", {
      className: "uppy-DashboardContent-bar"
    }, y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18n("addingMoreFiles")), y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => props.toggleAddFilesPanel(false)
    }, props.i18n("back"))), y(AddFiles_default, props));
  };
  var AddFilesPanel_default = AddFilesPanel;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
  var import_classnames8 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/dashboard/lib/utils/ignoreEvent.js
  function ignoreEvent(ev) {
    const {
      tagName
    } = ev.target;
    if (tagName === "INPUT" || tagName === "TEXTAREA") {
      ev.stopPropagation();
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
  }
  var ignoreEvent_default = ignoreEvent;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
  function PickerPanelContent(_ref) {
    let {
      activePickerPanel,
      className,
      hideAllPanels,
      i18n,
      state,
      uppy
    } = _ref;
    return y("div", {
      className: (0, import_classnames8.default)("uppy-DashboardContent-panel", className),
      role: "tabpanel",
      "data-uppy-panelType": "PickerPanel",
      id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
      onDragOver: ignoreEvent_default,
      onDragLeave: ignoreEvent_default,
      onDrop: ignoreEvent_default,
      onPaste: ignoreEvent_default
    }, y("div", {
      className: "uppy-DashboardContent-bar"
    }, y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18n("importFrom", {
      name: activePickerPanel.name
    })), y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: hideAllPanels
    }, i18n("cancel"))), y("div", {
      className: "uppy-DashboardContent-panelBody"
    }, uppy.getPlugin(activePickerPanel.id).render(state)));
  }
  var PickerPanelContent_default = PickerPanelContent;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/EditorPanel.js
  var import_classnames9 = __toESM(require_classnames(), 1);
  function EditorPanel(props) {
    const file = props.files[props.fileCardFor];
    const handleCancel = () => {
      props.uppy.emit("file-editor:cancel", file);
      props.hideAllPanels();
    };
    return y("div", {
      className: (0, import_classnames9.default)("uppy-DashboardContent-panel", props.className),
      role: "tabpanel",
      "data-uppy-panelType": "FileEditor",
      id: "uppy-DashboardContent-panel--editor"
    }, y("div", {
      className: "uppy-DashboardContent-bar"
    }, y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18nArray("editing", {
      file: y("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: handleCancel
    }, props.i18n("cancel")), y("button", {
      className: "uppy-DashboardContent-save",
      type: "button",
      onClick: props.saveFileEditor
    }, props.i18n("save"))), y("div", {
      className: "uppy-DashboardContent-panelBody"
    }, props.editors.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })));
  }
  var EditorPanel_default = EditorPanel;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/PickerPanelTopBar.js
  var uploadStates = {
    STATE_ERROR: "error",
    STATE_WAITING: "waiting",
    STATE_PREPROCESSING: "preprocessing",
    STATE_UPLOADING: "uploading",
    STATE_POSTPROCESSING: "postprocessing",
    STATE_COMPLETE: "complete",
    STATE_PAUSED: "paused"
  };
  function getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files) {
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
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return uploadStates.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
        state = uploadStates.STATE_PREPROCESSING;
      }
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
    const uploadingState = getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files);
    switch (uploadingState) {
      case "uploading":
        return i18n("uploadingXFiles", {
          smart_count: inProgressNotPausedFiles.length
        });
      case "preprocessing":
      case "postprocessing":
        return i18n("processingXFiles", {
          smart_count: processingFiles.length
        });
      case "paused":
        return i18n("uploadPaused");
      case "waiting":
        return i18n("xFilesSelected", {
          smart_count: newFiles.length
        });
      case "complete":
        return i18n("uploadComplete");
      case "error":
        return i18n("error");
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
    if (allowNewUpload && maxNumberOfFiles) {
      allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
    }
    return y("div", {
      className: "uppy-DashboardContent-bar"
    }, !isAllComplete && !hideCancelButton ? y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => uppy.cancelAll()
    }, i18n("cancel")) : y("div", null), y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, y(UploadStatus, props)), allowNewUpload ? y("button", {
      className: "uppy-DashboardContent-addMore",
      type: "button",
      "aria-label": i18n("addMoreFiles"),
      title: i18n("addMoreFiles"),
      onClick: () => toggleAddFilesPanel(true)
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15"
    }, y("path", {
      d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
    })), y("span", {
      className: "uppy-DashboardContent-addMoreCaption"
    }, i18n("addMore"))) : y("div", null));
  }
  var PickerPanelTopBar_default = PanelTopBar;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileCard/index.js
  var import_classnames10 = __toESM(require_classnames(), 1);

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileCard/RenderMetaFields.js
  function RenderMetaFields(props) {
    const {
      computedMetaFields,
      requiredMetaFields,
      updateMeta,
      form,
      formState
    } = props;
    const fieldCSSClasses = {
      text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
    };
    return computedMetaFields.map((field) => {
      const id7 = `uppy-Dashboard-FileCard-input-${field.id}`;
      const required = requiredMetaFields.includes(field.id);
      return y("fieldset", {
        key: field.id,
        className: "uppy-Dashboard-FileCard-fieldset"
      }, y("label", {
        className: "uppy-Dashboard-FileCard-label",
        htmlFor: id7
      }, field.name), field.render !== void 0 ? field.render({
        value: formState[field.id],
        onChange: (newVal) => updateMeta(newVal, field.id),
        fieldCSSClasses,
        required,
        form: form.id
      }, y) : y("input", {
        className: fieldCSSClasses.text,
        id: id7,
        form: form.id,
        type: field.type || "text",
        required,
        value: formState[field.id],
        placeholder: field.placeholder,
        onInput: (ev) => updateMeta(ev.target.value, field.id),
        "data-uppy-super-focusable": true
      }));
    });
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/FileCard/index.js
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
      return typeof metaFields === "function" ? metaFields(files[fileCardFor]) : metaFields;
    };
    const file = files[fileCardFor];
    const computedMetaFields = (_getMetaFields = getMetaFields()) != null ? _getMetaFields : [];
    const showEditButton = canEditFile(file);
    const storedMetaData = {};
    computedMetaFields.forEach((field) => {
      var _file$meta$field$id;
      storedMetaData[field.id] = (_file$meta$field$id = file.meta[field.id]) != null ? _file$meta$field$id : "";
    });
    const [formState, setFormState] = h3(storedMetaData);
    const handleSave = T3((ev) => {
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
    const [form] = h3(() => {
      const formEl = document.createElement("form");
      formEl.setAttribute("tabindex", "-1");
      formEl.id = nanoid();
      return formEl;
    });
    p3(() => {
      document.body.appendChild(form);
      form.addEventListener("submit", handleSave);
      return () => {
        form.removeEventListener("submit", handleSave);
        document.body.removeChild(form);
      };
    }, [form, handleSave]);
    return y("div", {
      className: (0, import_classnames10.default)("uppy-Dashboard-FileCard", className),
      "data-uppy-panelType": "FileCard",
      onDragOver: ignoreEvent_default,
      onDragLeave: ignoreEvent_default,
      onDrop: ignoreEvent_default,
      onPaste: ignoreEvent_default
    }, y("div", {
      className: "uppy-DashboardContent-bar"
    }, y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18nArray("editing", {
      file: y("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      form: form.id,
      title: i18n("finishEditingFile"),
      onClick: handleCancel
    }, i18n("cancel"))), y("div", {
      className: "uppy-Dashboard-FileCard-inner"
    }, y("div", {
      className: "uppy-Dashboard-FileCard-preview",
      style: {
        backgroundColor: getIconByMime(file.type).color
      }
    }, y(FilePreview, {
      file
    }), showEditButton && y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
      onClick: (event) => {
        handleSave(event);
        openFileEditor(file);
      }
    }, i18n("editFile"))), y("div", {
      className: "uppy-Dashboard-FileCard-info"
    }, y(RenderMetaFields, {
      computedMetaFields,
      requiredMetaFields,
      updateMeta,
      form,
      formState
    })), y("div", {
      className: "uppy-Dashboard-FileCard-actions"
    }, y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
      type: "submit",
      form: form.id
    }, i18n("saveChanges")), y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
      type: "button",
      onClick: handleCancel,
      form: form.id
    }, i18n("cancel")))));
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/Slide.js
  var import_classnames11 = __toESM(require_classnames(), 1);
  var transitionName = "uppy-transition-slideDownUp";
  var duration = 250;
  var Slide = class extends b {
    constructor(props) {
      super(props);
      this.state = {
        cachedChildren: null,
        className: ""
      };
    }
    // TODO: refactor to stable lifecycle method
    // eslint-disable-next-line
    componentWillUpdate(nextProps) {
      const {
        cachedChildren
      } = this.state;
      const child = $(nextProps.children)[0];
      if (cachedChildren === child)
        return null;
      const patch = {
        cachedChildren: child
      };
      if (child && !cachedChildren) {
        patch.className = `${transitionName}-enter`;
        cancelAnimationFrame(this.animationFrame);
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = void 0;
        this.animationFrame = requestAnimationFrame(() => {
          this.setState({
            className: `${transitionName}-enter ${transitionName}-enter-active`
          });
          this.enterTimeout = setTimeout(() => {
            this.setState({
              className: ""
            });
          }, duration);
        });
      }
      if (cachedChildren && !child && this.leaveTimeout === void 0) {
        patch.cachedChildren = cachedChildren;
        patch.className = `${transitionName}-leave`;
        cancelAnimationFrame(this.animationFrame);
        clearTimeout(this.enterTimeout);
        this.enterTimeout = void 0;
        this.animationFrame = requestAnimationFrame(() => {
          this.setState({
            className: `${transitionName}-leave ${transitionName}-leave-active`
          });
          this.leaveTimeout = setTimeout(() => {
            this.setState({
              cachedChildren: null,
              className: ""
            });
          }, duration);
        });
      }
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
      return E(cachedChildren, {
        className: (0, import_classnames11.default)(className, cachedChildren.props.className)
      });
    }
  };
  var Slide_default = Slide;

  // tests/_npm/node_modules/@uppy/dashboard/lib/components/Dashboard.js
  function _extends3() {
    _extends3 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends3.apply(this, arguments);
  }
  var WIDTH_XL = 900;
  var WIDTH_LG = 700;
  var WIDTH_MD = 576;
  var HEIGHT_MD = 330;
  function Dashboard(props) {
    const isNoFiles = props.totalFileCount === 0;
    const isSingleFile = props.totalFileCount === 1;
    const isSizeMD = props.containerWidth > WIDTH_MD;
    const isSizeHeightMD = props.containerHeight > HEIGHT_MD;
    const dashboardClassName = (0, import_classnames12.default)({
      "uppy-Dashboard": true,
      "uppy-Dashboard--isDisabled": props.disabled,
      "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
      "uppy-Dashboard--isClosing": props.isClosing,
      "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
      "uppy-Dashboard--modal": !props.inline,
      "uppy-size--md": props.containerWidth > WIDTH_MD,
      "uppy-size--lg": props.containerWidth > WIDTH_LG,
      "uppy-size--xl": props.containerWidth > WIDTH_XL,
      "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
      // We might want to enable this in the future
      // 'uppy-size--height-lg': props.containerHeight > HEIGHT_LG,
      // 'uppy-size--height-xl': props.containerHeight > HEIGHT_XL,
      "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
      "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible,
      // Only enable “centered single file” mode when Dashboard is tall enough
      "uppy-Dashboard--singleFile": props.singleFileFullScreen && isSingleFile && isSizeHeightMD
    });
    let itemsPerRow = 1;
    if (props.containerWidth > WIDTH_XL) {
      itemsPerRow = 5;
    } else if (props.containerWidth > WIDTH_LG) {
      itemsPerRow = 4;
    } else if (props.containerWidth > WIDTH_MD) {
      itemsPerRow = 3;
    }
    const showFileList = props.showSelectedFiles && !isNoFiles;
    const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
    const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : null;
    const renderRestoredText = () => {
      if (numberOfGhosts > 0) {
        return props.i18n("recoveredXFiles", {
          smart_count: numberOfGhosts
        });
      }
      return props.i18n("recoveredAllFiles");
    };
    const dashboard = y("div", {
      className: dashboardClassName,
      "data-uppy-theme": props.theme,
      "data-uppy-num-acquirers": props.acquirers.length,
      "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
      "aria-hidden": props.inline ? "false" : props.isHidden,
      "aria-disabled": props.disabled,
      "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"),
      onPaste: props.handlePaste,
      onDragOver: props.handleDragOver,
      onDragLeave: props.handleDragLeave,
      onDrop: props.handleDrop
    }, y("div", {
      "aria-hidden": "true",
      className: "uppy-Dashboard-overlay",
      tabIndex: -1,
      onClick: props.handleClickOutside
    }), y("div", {
      className: "uppy-Dashboard-inner",
      "aria-modal": !props.inline && "true",
      role: !props.inline && "dialog",
      style: {
        width: props.inline && props.width ? props.width : "",
        height: props.inline && props.height ? props.height : ""
      }
    }, !props.inline ? y("button", {
      className: "uppy-u-reset uppy-Dashboard-close",
      type: "button",
      "aria-label": props.i18n("closeModal"),
      title: props.i18n("closeModal"),
      onClick: props.closeModal
    }, y("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, y("div", {
      className: "uppy-Dashboard-innerWrap"
    }, y("div", {
      className: "uppy-Dashboard-dropFilesHereHint"
    }, props.i18n("dropHint")), showFileList && y(PickerPanelTopBar_default, props), numberOfFilesForRecovery && y("div", {
      className: "uppy-Dashboard-serviceMsg"
    }, y("svg", {
      className: "uppy-Dashboard-serviceMsg-icon",
      "aria-hidden": "true",
      focusable: "false",
      width: "21",
      height: "16",
      viewBox: "0 0 24 19"
    }, y("g", {
      transform: "translate(0 -1)",
      fill: "none",
      fillRule: "evenodd"
    }, y("path", {
      d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
      fill: "#FFD300"
    }), y("path", {
      fill: "#000",
      d: "M11 6h2l-.3 8h-1.4z"
    }), y("circle", {
      fill: "#000",
      cx: "12",
      cy: "17",
      r: "1"
    }))), y("strong", {
      className: "uppy-Dashboard-serviceMsg-title"
    }, props.i18n("sessionRestored")), y("div", {
      className: "uppy-Dashboard-serviceMsg-text"
    }, renderRestoredText())), showFileList ? y(FileList_default, {
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
      isSingleFile,
      itemsPerRow
    }) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      y(AddFiles_default, _extends3({}, props, {
        isSizeMD
      }))
    ), y(Slide_default, null, props.showAddFilesPanel ? y(AddFilesPanel_default, _extends3({
      key: "AddFiles"
    }, props, {
      isSizeMD
    })) : null), y(Slide_default, null, props.fileCardFor ? y(FileCard, _extends3({
      key: "FileCard"
    }, props)) : null), y(Slide_default, null, props.activePickerPanel ? y(PickerPanelContent_default, _extends3({
      key: "Picker"
    }, props)) : null), y(Slide_default, null, props.showFileEditor ? y(EditorPanel_default, _extends3({
      key: "Editor"
    }, props)) : null), y("div", {
      className: "uppy-Dashboard-progressindicators"
    }, props.progressindicators.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })))));
    return dashboard;
  }

  // tests/_npm/node_modules/@uppy/dashboard/lib/locale.js
  var locale_default3 = {
    strings: {
      // When `inline: false`, used as the screen reader label for the button that closes the modal.
      closeModal: "Close Modal",
      // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
      addMoreFiles: "Add more files",
      addingMoreFiles: "Adding more files",
      // Used as the header for import panels, e.g., “Import from Google Drive”.
      importFrom: "Import from %{name}",
      // When `inline: false`, used as the screen reader label for the dashboard modal.
      dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
      // When `inline: true`, used as the screen reader label for the dashboard area.
      dashboardTitle: "Uppy Dashboard",
      // Shown in the Informer when a link to a file was copied to the clipboard.
      copyLinkToClipboardSuccess: "Link copied to clipboard.",
      // Used when a link cannot be copied automatically — the user has to select the text from the
      // input element below this string.
      copyLinkToClipboardFallback: "Copy the URL below",
      // Used as the hover title and screen reader label for buttons that copy a file link.
      copyLink: "Copy link",
      back: "Back",
      // Used as the screen reader label for buttons that remove a file.
      removeFile: "Remove file",
      // Used as the screen reader label for buttons that open the metadata editor panel for a file.
      editFile: "Edit file",
      // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
      editing: "Editing %{file}",
      // Shown on the main upload screen when an upload error occurs
      error: "Error",
      // Used as the screen reader label for the button that saves metadata edits and returns to the
      // file list view.
      finishEditingFile: "Finish editing file",
      saveChanges: "Save changes",
      // Used as the label for the tab button that opens the system file selection dialog.
      myDevice: "My Device",
      dropHint: "Drop your files here",
      // Used as the hover text and screen reader label for file progress indicators when
      // they have been fully uploaded.
      uploadComplete: "Upload complete",
      uploadPaused: "Upload paused",
      // Used as the hover text and screen reader label for the buttons to resume paused uploads.
      resumeUpload: "Resume upload",
      // Used as the hover text and screen reader label for the buttons to pause uploads.
      pauseUpload: "Pause upload",
      // Used as the hover text and screen reader label for the buttons to retry failed uploads.
      retryUpload: "Retry upload",
      // Used as the hover text and screen reader label for the buttons to cancel uploads.
      cancelUpload: "Cancel upload",
      // Used in a title, how many files are currently selected
      xFilesSelected: {
        0: "%{smart_count} file selected",
        1: "%{smart_count} files selected"
      },
      uploadingXFiles: {
        0: "Uploading %{smart_count} file",
        1: "Uploading %{smart_count} files"
      },
      processingXFiles: {
        0: "Processing %{smart_count} file",
        1: "Processing %{smart_count} files"
      },
      // The "powered by Uppy" link at the bottom of the Dashboard.
      poweredBy: "Powered by %{uppy}",
      addMore: "Add more",
      editFileWithFilename: "Edit file %{file}",
      save: "Save",
      cancel: "Cancel",
      dropPasteFiles: "Drop files here or %{browseFiles}",
      dropPasteFolders: "Drop files here or %{browseFolders}",
      dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
      dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
      dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
      dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
      importFiles: "Import files from:",
      browseFiles: "browse files",
      browseFolders: "browse folders",
      recoveredXFiles: {
        0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
        1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
      },
      recoveredAllFiles: "We restored all files. You can now resume the upload.",
      sessionRestored: "Session restored",
      reSelect: "Re-select",
      missingRequiredMetaFields: {
        0: "Missing required meta field: %{fields}.",
        1: "Missing required meta fields: %{fields}."
      },
      // Used for native device camera buttons on mobile
      takePictureBtn: "Take Picture",
      recordVideoBtn: "Record Video"
    }
  };

  // tests/_npm/node_modules/@uppy/dashboard/lib/Dashboard.js
  function _classPrivateFieldLooseBase6(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id6 = 0;
  function _classPrivateFieldLooseKey6(name) {
    return "__private_" + id6++ + "_" + name;
  }
  var packageJson6 = {
    "version": "3.7.1"
  };
  var memoize = memoizeOne.default || memoizeOne;
  var TAB_KEY = 9;
  var ESC_KEY = 27;
  function createPromise() {
    const o4 = {};
    o4.promise = new Promise((resolve, reject) => {
      o4.resolve = resolve;
      o4.reject = reject;
    });
    return o4;
  }
  var _disabledNodes = /* @__PURE__ */ _classPrivateFieldLooseKey6("disabledNodes");
  var _generateLargeThumbnailIfSingleFile = /* @__PURE__ */ _classPrivateFieldLooseKey6("generateLargeThumbnailIfSingleFile");
  var _openFileEditorWhenFilesAdded = /* @__PURE__ */ _classPrivateFieldLooseKey6("openFileEditorWhenFilesAdded");
  var _attachRenderFunctionToTarget = /* @__PURE__ */ _classPrivateFieldLooseKey6("attachRenderFunctionToTarget");
  var _isTargetSupported = /* @__PURE__ */ _classPrivateFieldLooseKey6("isTargetSupported");
  var _getAcquirers = /* @__PURE__ */ _classPrivateFieldLooseKey6("getAcquirers");
  var _getProgressIndicators = /* @__PURE__ */ _classPrivateFieldLooseKey6("getProgressIndicators");
  var _getEditors = /* @__PURE__ */ _classPrivateFieldLooseKey6("getEditors");
  var _addSpecifiedPluginsFromOptions = /* @__PURE__ */ _classPrivateFieldLooseKey6("addSpecifiedPluginsFromOptions");
  var _autoDiscoverPlugins = /* @__PURE__ */ _classPrivateFieldLooseKey6("autoDiscoverPlugins");
  var _addSupportedPluginIfNoTarget = /* @__PURE__ */ _classPrivateFieldLooseKey6("addSupportedPluginIfNoTarget");
  var Dashboard2 = class extends UIPlugin_default {
    constructor(uppy, _opts) {
      var _this;
      super(uppy, _opts);
      _this = this;
      Object.defineProperty(this, _disabledNodes, {
        writable: true,
        value: null
      });
      this.removeTarget = (plugin) => {
        const pluginState = this.getPluginState();
        const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
        this.setPluginState({
          targets: newTargets
        });
      };
      this.addTarget = (plugin) => {
        const callerPluginId = plugin.id || plugin.constructor.name;
        const callerPluginName = plugin.title || callerPluginId;
        const callerPluginType = plugin.type;
        if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
          const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
          this.uppy.log(msg, "error");
          return void 0;
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
          return;
        }
        this.setPluginState(update);
        this.uppy.emit("dashboard:close-panel", state.activePickerPanel.id);
      };
      this.showPanel = (id7) => {
        const {
          targets
        } = this.getPluginState();
        const activePickerPanel = targets.filter((target) => {
          return target.type === "acquirer" && target.id === id7;
        })[0];
        this.setPluginState({
          activePickerPanel,
          activeOverlayType: "PickerPanel"
        });
        this.uppy.emit("dashboard:show-panel", id7);
      };
      this.canEditFile = (file) => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase6(this, _getEditors)[_getEditors](targets);
        return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
      };
      this.openFileEditor = (file) => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase6(this, _getEditors)[_getEditors](targets);
        this.setPluginState({
          showFileEditor: true,
          fileCardFor: file.id || null,
          activeOverlayType: "FileEditor"
        });
        editors.forEach((editor) => {
          this.uppy.getPlugin(editor.id).selectFile(file);
        });
      };
      this.saveFileEditor = () => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase6(this, _getEditors)[_getEditors](targets);
        editors.forEach((editor) => {
          this.uppy.getPlugin(editor.id).save();
        });
        this.hideAllPanels();
      };
      this.openModal = () => {
        const {
          promise,
          resolve
        } = createPromise();
        this.savedScrollPosition = window.pageYOffset;
        this.savedActiveElement = document.activeElement;
        if (this.opts.disablePageScrollWhenModalOpen) {
          document.body.classList.add("uppy-Dashboard-isFixed");
        }
        if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
          const handler = () => {
            this.setPluginState({
              isHidden: false
            });
            this.el.removeEventListener("animationend", handler, false);
            resolve();
          };
          this.el.addEventListener("animationend", handler, false);
        } else {
          this.setPluginState({
            isHidden: false
          });
          resolve();
        }
        if (this.opts.browserBackButtonClose) {
          this.updateBrowserHistory();
        }
        document.addEventListener("keydown", this.handleKeyDownInModal);
        this.uppy.emit("dashboard:modal-open");
        return promise;
      };
      this.closeModal = function(opts) {
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
          return void 0;
        }
        const {
          promise,
          resolve
        } = createPromise();
        if (_this.opts.disablePageScrollWhenModalOpen) {
          document.body.classList.remove("uppy-Dashboard-isFixed");
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
            _this.el.removeEventListener("animationend", handler, false);
            resolve();
          };
          _this.el.addEventListener("animationend", handler, false);
        } else {
          _this.setPluginState({
            isHidden: true
          });
          _this.superFocus.cancel();
          _this.savedActiveElement.focus();
          resolve();
        }
        document.removeEventListener("keydown", _this.handleKeyDownInModal);
        if (manualClose) {
          if (_this.opts.browserBackButtonClose) {
            var _history$state;
            if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
              history.back();
            }
          }
        }
        _this.uppy.emit("dashboard:modal-closed");
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
      this.setDarkModeCapability = (isDarkModeOn) => {
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
      this.handleSystemDarkModeChange = (event) => {
        const isDarkModeOnNow = event.matches;
        this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
        this.setDarkModeCapability(isDarkModeOnNow);
      };
      this.toggleFileCard = (show, fileID) => {
        const file = this.uppy.getFile(fileID);
        if (show) {
          this.uppy.emit("dashboard:file-edit-start", file);
        } else {
          this.uppy.emit("dashboard:file-edit-complete", file);
        }
        this.setPluginState({
          fileCardFor: show ? fileID : null,
          activeOverlayType: show ? "FileCard" : null
        });
      };
      this.toggleAddFilesPanel = (show) => {
        this.setPluginState({
          showAddFilesPanel: show,
          activeOverlayType: show ? "AddFiles" : null
        });
      };
      this.addFiles = (files) => {
        const descriptors = files.map((file) => ({
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
      this.startListeningToResize = () => {
        this.resizeObserver = new ResizeObserver((entries) => {
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
        this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
        this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
          const pluginState = this.getPluginState();
          const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
          if (
            // We might want to enable this in the future
            // if ResizeObserver hasn't yet fired,
            !pluginState.areInsidesReadyToBeVisible && !isModalAndClosed
          ) {
            this.uppy.log("[Dashboard] resize event didn\u2019t fire on time: defaulted to mobile layout", "warning");
            this.setPluginState({
              areInsidesReadyToBeVisible: true
            });
          }
        }, 1e3);
      };
      this.stopListeningToResize = () => {
        this.resizeObserver.disconnect();
        clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
      };
      this.recordIfFocusedOnUppyRecently = (event) => {
        if (this.el.contains(event.target)) {
          this.ifFocusedOnUppyRecently = true;
        } else {
          this.ifFocusedOnUppyRecently = false;
          this.superFocus.cancel();
        }
      };
      this.disableInteractiveElements = (disable) => {
        var _classPrivateFieldLoo;
        const NODES_TO_DISABLE = ["a[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", '[role="button"]:not([disabled])'];
        const nodesToDisable = (_classPrivateFieldLoo = _classPrivateFieldLooseBase6(this, _disabledNodes)[_disabledNodes]) != null ? _classPrivateFieldLoo : toArray_default(this.el.querySelectorAll(NODES_TO_DISABLE)).filter((node) => !node.classList.contains("uppy-Dashboard-close"));
        for (const node of nodesToDisable) {
          if (node.tagName === "A") {
            node.setAttribute("aria-disabled", disable);
          } else {
            node.disabled = disable;
          }
        }
        if (disable) {
          _classPrivateFieldLooseBase6(this, _disabledNodes)[_disabledNodes] = nodesToDisable;
        } else {
          _classPrivateFieldLooseBase6(this, _disabledNodes)[_disabledNodes] = null;
        }
        this.dashboardIsDisabled = disable;
      };
      this.updateBrowserHistory = () => {
        var _history$state2;
        if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
          history.pushState({
            // eslint-disable-next-line no-restricted-globals
            ...history.state,
            [this.modalName]: true
          }, "");
        }
        window.addEventListener("popstate", this.handlePopState, false);
      };
      this.handlePopState = (event) => {
        var _event$state;
        if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
          this.closeModal({
            manualClose: false
          });
        }
        if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
          history.back();
        }
      };
      this.handleKeyDownInModal = (event) => {
        if (event.keyCode === ESC_KEY)
          this.requestCloseModal(event);
        if (event.keyCode === TAB_KEY)
          trapFocus(event, this.getPluginState().activeOverlayType, this.el);
      };
      this.handleClickOutside = () => {
        if (this.opts.closeModalOnClickOutside)
          this.requestCloseModal();
      };
      this.handlePaste = (event) => {
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.type === "acquirer") {
            plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
          }
        });
        const files = toArray_default(event.clipboardData.files);
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files pasted");
          this.addFiles(files);
        }
      };
      this.handleInputChange = (event) => {
        event.preventDefault();
        const files = toArray_default(event.target.files);
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files selected through input");
          this.addFiles(files);
        }
      };
      this.handleDragOver = (event) => {
        var _this$opts$onDragOver, _this$opts;
        event.preventDefault();
        event.stopPropagation();
        const canSomePluginHandleRootDrop = () => {
          let somePluginCanHandleRootDrop2 = true;
          this.uppy.iteratePlugins((plugin) => {
            if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
              somePluginCanHandleRootDrop2 = true;
            }
          });
          return somePluginCanHandleRootDrop2;
        };
        const doesEventHaveFiles = () => {
          const {
            types
          } = event.dataTransfer;
          return types.some((type) => type === "Files");
        };
        const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
        const hasFiles = doesEventHaveFiles(event);
        if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
          event.dataTransfer.dropEffect = "none";
          clearTimeout(this.removeDragOverClassTimeout);
          return;
        }
        event.dataTransfer.dropEffect = "copy";
        clearTimeout(this.removeDragOverClassTimeout);
        this.setPluginState({
          isDraggingOver: true
        });
        (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
      };
      this.handleDragLeave = (event) => {
        var _this$opts$onDragLeav, _this$opts2;
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this.removeDragOverClassTimeout);
        this.removeDragOverClassTimeout = setTimeout(() => {
          this.setPluginState({
            isDraggingOver: false
          });
        }, 50);
        (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
      };
      this.handleDrop = async (event) => {
        var _this$opts$onDrop, _this$opts3;
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this.removeDragOverClassTimeout);
        this.setPluginState({
          isDraggingOver: false
        });
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.type === "acquirer") {
            plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
          }
        });
        let executedDropErrorOnce = false;
        const logDropError = (error) => {
          this.uppy.log(error, "error");
          if (!executedDropErrorOnce) {
            this.uppy.info(error.message, "error");
            executedDropErrorOnce = true;
          }
        };
        this.uppy.log("[Dashboard] Processing dropped files");
        const files = await getDroppedFiles(event.dataTransfer, {
          logDropError
        });
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files dropped");
          this.addFiles(files);
        }
        (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
      };
      this.handleRequestThumbnail = (file) => {
        if (!this.opts.waitForThumbnailsBeforeUpload) {
          this.uppy.emit("thumbnail:request", file);
        }
      };
      this.handleCancelThumbnail = (file) => {
        if (!this.opts.waitForThumbnailsBeforeUpload) {
          this.uppy.emit("thumbnail:cancel", file);
        }
      };
      this.handleKeyDownInInline = (event) => {
        if (event.keyCode === TAB_KEY)
          forInline(event, this.getPluginState().activeOverlayType, this.el);
      };
      this.handlePasteOnBody = (event) => {
        const isFocusInOverlay2 = this.el.contains(document.activeElement);
        if (isFocusInOverlay2) {
          this.handlePaste(event);
        }
      };
      this.handleComplete = (_ref) => {
        let {
          failed
        } = _ref;
        if (this.opts.closeAfterFinish && failed.length === 0) {
          this.requestCloseModal();
        }
      };
      this.handleCancelRestore = () => {
        this.uppy.emit("restore-canceled");
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
              preview: void 0
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
        value: (files) => {
          const firstFile = files[0];
          if (this.canEditFile(firstFile)) {
            this.openFileEditor(firstFile);
          }
        }
      });
      this.initEvents = () => {
        if (this.opts.trigger && !this.opts.inline) {
          const showModalTrigger = findAllDOMElements(this.opts.trigger);
          if (showModalTrigger) {
            showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
          } else {
            this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
          }
        }
        this.startListeningToResize();
        document.addEventListener("paste", this.handlePasteOnBody);
        this.uppy.on("plugin-added", _classPrivateFieldLooseBase6(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
        this.uppy.on("plugin-remove", this.removeTarget);
        this.uppy.on("file-added", this.hideAllPanels);
        this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
        this.uppy.on("file-editor:complete", this.hideAllPanels);
        this.uppy.on("complete", this.handleComplete);
        this.uppy.on("files-added", _classPrivateFieldLooseBase6(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        this.uppy.on("file-removed", _classPrivateFieldLooseBase6(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
        document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
        if (this.opts.inline) {
          this.el.addEventListener("keydown", this.handleKeyDownInInline);
        }
        if (this.opts.autoOpenFileEditor) {
          this.uppy.on("files-added", _classPrivateFieldLooseBase6(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
        }
      };
      this.removeEvents = () => {
        const showModalTrigger = findAllDOMElements(this.opts.trigger);
        if (!this.opts.inline && showModalTrigger) {
          showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
        }
        this.stopListeningToResize();
        document.removeEventListener("paste", this.handlePasteOnBody);
        window.removeEventListener("popstate", this.handlePopState, false);
        this.uppy.off("plugin-added", _classPrivateFieldLooseBase6(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
        this.uppy.off("plugin-remove", this.removeTarget);
        this.uppy.off("file-added", this.hideAllPanels);
        this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
        this.uppy.off("file-editor:complete", this.hideAllPanels);
        this.uppy.off("complete", this.handleComplete);
        this.uppy.off("files-added", _classPrivateFieldLooseBase6(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        this.uppy.off("file-removed", _classPrivateFieldLooseBase6(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
        document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
        if (this.opts.inline) {
          this.el.removeEventListener("keydown", this.handleKeyDownInInline);
        }
        if (this.opts.autoOpenFileEditor) {
          this.uppy.off("files-added", _classPrivateFieldLooseBase6(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
        }
      };
      this.superFocusOnEachUpdate = () => {
        const isFocusInUppy = this.el.contains(document.activeElement);
        const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
        const isInformerHidden = this.uppy.getState().info.length === 0;
        const isModal = !this.opts.inline;
        if (
          // If update is connected to showing the Informer - let the screen reader calmly read it.
          isInformerHidden && // If we are in a modal - always superfocus without concern for other elements
          // on the page (user is unlikely to want to interact with the rest of the page)
          (isModal || isFocusInUppy || isFocusNowhere && this.ifFocusedOnUppyRecently)
        ) {
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
        value: (target) => {
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
        value: (target) => {
          const plugin = this.uppy.getPlugin(target.id);
          if (typeof plugin.isSupported !== "function") {
            return true;
          }
          return plugin.isSupported();
        }
      });
      Object.defineProperty(this, _getAcquirers, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "acquirer" && _classPrivateFieldLooseBase6(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase6(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      Object.defineProperty(this, _getProgressIndicators, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "progressindicator").map(_classPrivateFieldLooseBase6(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      Object.defineProperty(this, _getEditors, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "editor").map(_classPrivateFieldLooseBase6(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      this.render = (state) => {
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
        const acquirers = _classPrivateFieldLooseBase6(this, _getAcquirers)[_getAcquirers](pluginState.targets);
        const progressindicators = _classPrivateFieldLooseBase6(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
        const editors = _classPrivateFieldLooseBase6(this, _getEditors)[_getEditors](pluginState.targets);
        let theme;
        if (this.opts.theme === "auto") {
          theme = capabilities.darkMode ? "dark" : "light";
        } else {
          theme = this.opts.theme;
        }
        if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
          this.opts.fileManagerSelectionType = "files";
          console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
        }
        return Dashboard({
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
          plugins.forEach((pluginID) => {
            const plugin = this.uppy.getPlugin(pluginID);
            if (plugin) {
              plugin.mount(this, plugin);
            } else {
              this.uppy.log(`[Uppy] Dashboard could not find plugin '${pluginID}', make sure to uppy.use() the plugins you are specifying`, "warning");
            }
          });
        }
      });
      Object.defineProperty(this, _autoDiscoverPlugins, {
        writable: true,
        value: () => {
          this.uppy.iteratePlugins(_classPrivateFieldLooseBase6(this, _addSupportedPluginIfNoTarget)[_addSupportedPluginIfNoTarget]);
        }
      });
      Object.defineProperty(this, _addSupportedPluginIfNoTarget, {
        writable: true,
        value: (plugin) => {
          var _plugin$opts;
          const typesAllowed = ["acquirer", "editor"];
          if (plugin && !((_plugin$opts = plugin.opts) != null && _plugin$opts.target) && typesAllowed.includes(plugin.type)) {
            const pluginAlreadyAdded = this.getPluginState().targets.some((installedPlugin) => plugin.id === installedPlugin.id);
            if (!pluginAlreadyAdded) {
              plugin.mount(this, plugin);
            }
          }
        }
      });
      this.install = () => {
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
          throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
        }
        const {
          allowMultipleUploads,
          allowMultipleUploadBatches
        } = this.uppy.opts;
        if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
          this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
        }
        const {
          target
        } = this.opts;
        if (target) {
          this.mount(target, this);
        }
        if (!this.opts.disableStatusBar) {
          this.uppy.use(StatusBar2, {
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
        this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
        const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
        this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
        this.setDarkModeCapability(isDarkModeOnFromTheStart);
        if (this.opts.theme === "auto") {
          this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
        }
        _classPrivateFieldLooseBase6(this, _addSpecifiedPluginsFromOptions)[_addSpecifiedPluginsFromOptions]();
        _classPrivateFieldLooseBase6(this, _autoDiscoverPlugins)[_autoDiscoverPlugins]();
        this.initEvents();
      };
      this.uninstall = () => {
        if (!this.opts.disableInformer) {
          const informer = this.uppy.getPlugin(`${this.id}:Informer`);
          if (informer)
            this.uppy.removePlugin(informer);
        }
        if (!this.opts.disableStatusBar) {
          const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
          if (statusBar)
            this.uppy.removePlugin(statusBar);
        }
        if (!this.opts.disableThumbnailGenerator) {
          const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
          if (thumbnail)
            this.uppy.removePlugin(thumbnail);
        }
        const plugins = this.opts.plugins || [];
        plugins.forEach((pluginID) => {
          const plugin = this.uppy.getPlugin(pluginID);
          if (plugin)
            plugin.unmount();
        });
        if (this.opts.theme === "auto") {
          this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
        }
        if (this.opts.disablePageScrollWhenModalOpen) {
          document.body.classList.remove("uppy-Dashboard-isFixed");
        }
        this.unmount();
        this.removeEvents();
      };
      this.id = this.opts.id || "Dashboard";
      this.title = "Dashboard";
      this.type = "orchestrator";
      this.modalName = `uppy-Dashboard-${nanoid()}`;
      this.defaultLocale = locale_default3;
      const defaultOptions = {
        target: "body",
        metaFields: [],
        trigger: null,
        inline: false,
        width: 750,
        height: 550,
        thumbnailWidth: 280,
        thumbnailType: "image/jpeg",
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
        fileManagerSelectionType: "files",
        proudlyDisplayPoweredByUppy: true,
        onRequestCloseModal: () => this.closeModal(),
        showSelectedFiles: true,
        showRemoveButtonAfterComplete: false,
        browserBackButtonClose: false,
        showNativePhotoCameraButton: false,
        showNativeVideoCameraButton: false,
        theme: "light",
        autoOpenFileEditor: false,
        disabled: false,
        disableLocalFiles: false
      };
      this.opts = {
        ...defaultOptions,
        ..._opts
      };
      this.i18nInit();
      this.superFocus = createSuperFocus();
      this.ifFocusedOnUppyRecently = false;
      this.makeDashboardInsidesVisibleAnywayTimeout = null;
      this.removeDragOverClassTimeout = null;
    }
  };
  Dashboard2.VERSION = packageJson6.version;

  // tests/_npm/src/app.js
  console.log(Dashboard2);
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

@uppy/utils/lib/Translator.js:
  (**
   * Takes a string with placeholder variables like `%{smart_count} file selected`
   * and replaces it with values from options `{smart_count: 5}`
   *
   * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
   * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
   *
   * @param phrase that needs interpolation, with placeholders
   * @param options with values that will be used to replace placeholders
   *)
*/
