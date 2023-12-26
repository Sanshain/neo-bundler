"use strict";
(() => {
  // node_modules/outvariant/lib/index.mjs
  var POSITIONALS_EXP = /(%?)(%([sdijo]))/g;
  function serializePositional(positional, flag) {
    switch (flag) {
      case "s":
        return positional;
      case "d":
      case "i":
        return Number(positional);
      case "j":
        return JSON.stringify(positional);
      case "o": {
        if (typeof positional === "string") {
          return positional;
        }
        const json = JSON.stringify(positional);
        if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
          return positional;
        }
        return json;
      }
    }
  }
  function format(message3, ...positionals) {
    if (positionals.length === 0) {
      return message3;
    }
    let positionalIndex = 0;
    let formattedMessage = message3.replace(
      POSITIONALS_EXP,
      (match2, isEscaped, _, flag) => {
        const positional = positionals[positionalIndex];
        const value = serializePositional(positional, flag);
        if (!isEscaped) {
          positionalIndex++;
          return value;
        }
        return match2;
      }
    );
    if (positionalIndex < positionals.length) {
      formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
    }
    formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
    return formattedMessage;
  }
  var STACK_FRAMES_TO_IGNORE = 2;
  function cleanErrorStack(error2) {
    if (!error2.stack) {
      return;
    }
    const nextStack = error2.stack.split("\n");
    nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
    error2.stack = nextStack.join("\n");
  }
  var InvariantError = class extends Error {
    constructor(message3, ...positionals) {
      super(message3);
      this.message = message3;
      this.name = "Invariant Violation";
      this.message = format(message3, ...positionals);
      cleanErrorStack(this);
    }
  };
  var invariant = (predicate, message3, ...positionals) => {
    if (!predicate) {
      throw new InvariantError(message3, ...positionals);
    }
  };
  invariant.as = (ErrorConstructor, predicate, message3, ...positionals) => {
    if (!predicate) {
      const formatMessage2 = positionals.length === 0 ? message3 : format(message3, positionals);
      let error2;
      try {
        error2 = Reflect.construct(ErrorConstructor, [formatMessage2]);
      } catch (err) {
        error2 = ErrorConstructor(formatMessage2);
      }
      throw error2;
    }
  };

  // node_modules/msw/lib/core/utils/internal/devUtils.mjs
  var LIBRARY_PREFIX = "[MSW]";
  function formatMessage(message3, ...positionals) {
    const interpolatedMessage = format(message3, ...positionals);
    return `${LIBRARY_PREFIX} ${interpolatedMessage}`;
  }
  function warn(message3, ...positionals) {
    console.warn(formatMessage(message3, ...positionals));
  }
  function error(message3, ...positionals) {
    console.error(formatMessage(message3, ...positionals));
  }
  var devUtils = {
    formatMessage,
    warn,
    error
  };

  // node_modules/msw/lib/core/utils/internal/checkGlobals.mjs
  function checkGlobals() {
    invariant(
      typeof URL !== "undefined",
      devUtils.formatMessage(
        `Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`
      )
    );
  }

  // node_modules/strict-event-emitter/lib/index.mjs
  var MemoryLeakError = class extends Error {
    constructor(emitter, type, count) {
      super(
        `Possible EventEmitter memory leak detected. ${count} ${type.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`
      );
      this.emitter = emitter;
      this.type = type;
      this.count = count;
      this.name = "MaxListenersExceededWarning";
    }
  };
  var _Emitter = class {
    static listenerCount(emitter, eventName) {
      return emitter.listenerCount(eventName);
    }
    constructor() {
      this.events = /* @__PURE__ */ new Map();
      this.maxListeners = _Emitter.defaultMaxListeners;
      this.hasWarnedAboutPotentialMemoryLeak = false;
    }
    _emitInternalEvent(internalEventName, eventName, listener) {
      this.emit(
        internalEventName,
        ...[eventName, listener]
      );
    }
    _getListeners(eventName) {
      return Array.prototype.concat.apply([], this.events.get(eventName)) || [];
    }
    _removeListener(listeners, listener) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      return [];
    }
    _wrapOnceListener(eventName, listener) {
      const onceListener = (...data) => {
        this.removeListener(eventName, onceListener);
        return listener.apply(this, data);
      };
      Object.defineProperty(onceListener, "name", { value: listener.name });
      return onceListener;
    }
    setMaxListeners(maxListeners) {
      this.maxListeners = maxListeners;
      return this;
    }
    /**
     * Returns the current max listener value for the `Emitter` which is
     * either set by `emitter.setMaxListeners(n)` or defaults to
     * `Emitter.defaultMaxListeners`.
     */
    getMaxListeners() {
      return this.maxListeners;
    }
    /**
     * Returns an array listing the events for which the emitter has registered listeners.
     * The values in the array will be strings or Symbols.
     */
    eventNames() {
      return Array.from(this.events.keys());
    }
    /**
     * Synchronously calls each of the listeners registered for the event named `eventName`,
     * in the order they were registered, passing the supplied arguments to each.
     * Returns `true` if the event has listeners, `false` otherwise.
     *
     * @example
     * const emitter = new Emitter<{ hello: [string] }>()
     * emitter.emit('hello', 'John')
     */
    emit(eventName, ...data) {
      const listeners = this._getListeners(eventName);
      listeners.forEach((listener) => {
        listener.apply(this, data);
      });
      return listeners.length > 0;
    }
    addListener(eventName, listener) {
      this._emitInternalEvent("newListener", eventName, listener);
      const nextListeners = this._getListeners(eventName).concat(listener);
      this.events.set(eventName, nextListeners);
      if (this.maxListeners > 0 && this.listenerCount(eventName) > this.maxListeners && !this.hasWarnedAboutPotentialMemoryLeak) {
        this.hasWarnedAboutPotentialMemoryLeak = true;
        const memoryLeakWarning = new MemoryLeakError(
          this,
          eventName,
          this.listenerCount(eventName)
        );
        console.warn(memoryLeakWarning);
      }
      return this;
    }
    on(eventName, listener) {
      return this.addListener(eventName, listener);
    }
    once(eventName, listener) {
      return this.addListener(
        eventName,
        this._wrapOnceListener(eventName, listener)
      );
    }
    prependListener(eventName, listener) {
      const listeners = this._getListeners(eventName);
      if (listeners.length > 0) {
        const nextListeners = [listener].concat(listeners);
        this.events.set(eventName, nextListeners);
      } else {
        this.events.set(eventName, listeners.concat(listener));
      }
      return this;
    }
    prependOnceListener(eventName, listener) {
      return this.prependListener(
        eventName,
        this._wrapOnceListener(eventName, listener)
      );
    }
    removeListener(eventName, listener) {
      const listeners = this._getListeners(eventName);
      if (listeners.length > 0) {
        this._removeListener(listeners, listener);
        this.events.set(eventName, listeners);
        this._emitInternalEvent("removeListener", eventName, listener);
      }
      return this;
    }
    /**
     * Alias for `emitter.removeListener()`.
     *
     * @example
     * emitter.off('hello', listener)
     */
    off(eventName, listener) {
      return this.removeListener(eventName, listener);
    }
    removeAllListeners(eventName) {
      if (eventName) {
        this.events.delete(eventName);
      } else {
        this.events.clear();
      }
      return this;
    }
    /**
     * Returns a copy of the array of listeners for the event named `eventName`.
     */
    listeners(eventName) {
      return Array.from(this._getListeners(eventName));
    }
    /**
     * Returns the number of listeners listening to the event named `eventName`.
     */
    listenerCount(eventName) {
      return this._getListeners(eventName).length;
    }
    rawListeners(eventName) {
      return this.listeners(eventName);
    }
  };
  var Emitter = _Emitter;
  Emitter.defaultMaxListeners = 10;

  // node_modules/msw/lib/core/utils/internal/getCallFrame.mjs
  var SOURCE_FRAME = /[\/\\]msw[\/\\]src[\/\\](.+)/;
  var BUILD_FRAME = /(node_modules)?[\/\\]lib[\/\\](core|browser|node|native|iife)[\/\\]|^[^\/\\]*$/;
  function getCallFrame(error2) {
    const stack = error2.stack;
    if (!stack) {
      return;
    }
    const frames = stack.split("\n").slice(1);
    const declarationFrame = frames.find((frame) => {
      return !(SOURCE_FRAME.test(frame) || BUILD_FRAME.test(frame));
    });
    if (!declarationFrame) {
      return;
    }
    const declarationPath = declarationFrame.replace(/\s*at [^()]*\(([^)]+)\)/, "$1").replace(/^@/, "");
    return declarationPath;
  }

  // node_modules/msw/lib/core/utils/internal/isIterable.mjs
  function isIterable(fn) {
    if (!fn) {
      return false;
    }
    return typeof fn[Symbol.iterator] == "function";
  }

  // node_modules/msw/lib/core/handlers/RequestHandler.mjs
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a2, prop, b[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var RequestHandler = class {
    constructor(args) {
      this.resolver = args.resolver;
      this.options = args.options;
      const callFrame = getCallFrame(new Error());
      this.info = __spreadProps(__spreadValues({}, args.info), {
        callFrame
      });
      this.isUsed = false;
    }
    /**
     * Parse the intercepted request to extract additional information from it.
     * Parsed result is then exposed to other methods of this request handler.
     */
    parse(_args) {
      return __async(this, null, function* () {
        return {};
      });
    }
    /**
     * Test if this handler matches the given request.
     *
     * This method is not used internally but is exposed
     * as a convenience method for consumers writing custom
     * handlers.
     */
    test(args) {
      return __async(this, null, function* () {
        const parsedResult = yield this.parse({
          request: args.request,
          resolutionContext: args.resolutionContext
        });
        return this.predicate({
          request: args.request,
          parsedResult,
          resolutionContext: args.resolutionContext
        });
      });
    }
    extendResolverArgs(_args) {
      return {};
    }
    /**
     * Execute this request handler and produce a mocked response
     * using the given resolver function.
     */
    run(args) {
      return __async(this, null, function* () {
        var _a, _b;
        if (this.isUsed && ((_a = this.options) == null ? void 0 : _a.once)) {
          return null;
        }
        const mainRequestRef = args.request.clone();
        const parsedResult = yield this.parse({
          request: args.request,
          resolutionContext: args.resolutionContext
        });
        const shouldInterceptRequest = this.predicate({
          request: args.request,
          parsedResult,
          resolutionContext: args.resolutionContext
        });
        if (!shouldInterceptRequest) {
          return null;
        }
        if (this.isUsed && ((_b = this.options) == null ? void 0 : _b.once)) {
          return null;
        }
        this.isUsed = true;
        const executeResolver = this.wrapResolver(this.resolver);
        const resolverExtras = this.extendResolverArgs({
          request: args.request,
          parsedResult
        });
        const mockedResponse = yield executeResolver(__spreadProps(__spreadValues({}, resolverExtras), {
          request: args.request
        }));
        const executionResult = this.createExecutionResult({
          // Pass the cloned request to the result so that logging
          // and other consumers could read its body once more.
          request: mainRequestRef,
          response: mockedResponse,
          parsedResult
        });
        return executionResult;
      });
    }
    wrapResolver(resolver) {
      return (info) => __async(this, null, function* () {
        const result = this.resolverGenerator || (yield resolver(info));
        if (isIterable(result)) {
          this.isUsed = false;
          const { value, done } = result[Symbol.iterator]().next();
          const nextResponse = yield value;
          if (done) {
            this.isUsed = true;
          }
          if (!nextResponse && done) {
            invariant(
              this.resolverGeneratorResult,
              "Failed to returned a previously stored generator response: the value is not a valid Response."
            );
            return this.resolverGeneratorResult.clone();
          }
          if (!this.resolverGenerator) {
            this.resolverGenerator = result;
          }
          if (nextResponse) {
            this.resolverGeneratorResult = nextResponse == null ? void 0 : nextResponse.clone();
          }
          return nextResponse;
        }
        return result;
      });
    }
    createExecutionResult(args) {
      return {
        handler: this,
        request: args.request,
        response: args.response,
        parsedResult: args.parsedResult
      };
    }
  };

  // node_modules/msw/lib/core/utils/internal/isStringEqual.mjs
  function isStringEqual(actual, expected) {
    return actual.toLowerCase() === expected.toLowerCase();
  }

  // node_modules/msw/lib/core/utils/logging/getStatusCodeColor.mjs
  function getStatusCodeColor(status) {
    if (status < 300) {
      return "#69AB32";
    }
    if (status < 400) {
      return "#F0BB4B";
    }
    return "#E95F5D";
  }

  // node_modules/msw/lib/core/utils/logging/getTimestamp.mjs
  function getTimestamp() {
    const now = /* @__PURE__ */ new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()].map(String).map((chunk) => chunk.slice(0, 2)).map((chunk) => chunk.padStart(2, "0")).join(":");
  }

  // node_modules/msw/lib/core/utils/logging/serializeRequest.mjs
  var __async2 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  function serializeRequest(request) {
    return __async2(this, null, function* () {
      const requestClone = request.clone();
      const requestText = yield requestClone.text();
      return {
        url: new URL(request.url),
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        body: requestText
      };
    });
  }

  // node_modules/@bundled-es-modules/statuses/index-esm.js
  var __create = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_codes = __commonJS({
    "node_modules/statuses/codes.json"(exports, module) {
      module.exports = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "103": "Early Hints",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Payload Too Large",
        "414": "URI Too Long",
        "415": "Unsupported Media Type",
        "416": "Range Not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a Teapot",
        "421": "Misdirected Request",
        "422": "Unprocessable Entity",
        "423": "Locked",
        "424": "Failed Dependency",
        "425": "Too Early",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "431": "Request Header Fields Too Large",
        "451": "Unavailable For Legal Reasons",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout",
        "505": "HTTP Version Not Supported",
        "506": "Variant Also Negotiates",
        "507": "Insufficient Storage",
        "508": "Loop Detected",
        "509": "Bandwidth Limit Exceeded",
        "510": "Not Extended",
        "511": "Network Authentication Required"
      };
    }
  });
  var require_statuses = __commonJS({
    "node_modules/statuses/index.js"(exports, module) {
      "use strict";
      var codes = require_codes();
      module.exports = status2;
      status2.message = codes;
      status2.code = createMessageToStatusCodeMap(codes);
      status2.codes = createStatusCodeList(codes);
      status2.redirect = {
        300: true,
        301: true,
        302: true,
        303: true,
        305: true,
        307: true,
        308: true
      };
      status2.empty = {
        204: true,
        205: true,
        304: true
      };
      status2.retry = {
        502: true,
        503: true,
        504: true
      };
      function createMessageToStatusCodeMap(codes2) {
        var map = {};
        Object.keys(codes2).forEach(function forEachCode(code) {
          var message3 = codes2[code];
          var status3 = Number(code);
          map[message3.toLowerCase()] = status3;
        });
        return map;
      }
      function createStatusCodeList(codes2) {
        return Object.keys(codes2).map(function mapCode(code) {
          return Number(code);
        });
      }
      function getStatusCode(message3) {
        var msg = message3.toLowerCase();
        if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) {
          throw new Error('invalid status message: "' + message3 + '"');
        }
        return status2.code[msg];
      }
      function getStatusMessage(code) {
        if (!Object.prototype.hasOwnProperty.call(status2.message, code)) {
          throw new Error("invalid status code: " + code);
        }
        return status2.message[code];
      }
      function status2(code) {
        if (typeof code === "number") {
          return getStatusMessage(code);
        }
        if (typeof code !== "string") {
          throw new TypeError("code must be a number or string");
        }
        var n = parseInt(code, 10);
        if (!isNaN(n)) {
          return getStatusMessage(n);
        }
        return getStatusCode(code);
      }
    }
  });
  var import_statuses = __toESM(require_statuses(), 1);
  var source_default = import_statuses.default;

  // node_modules/msw/lib/core/utils/logging/serializeResponse.mjs
  var __async3 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var { message } = source_default;
  function serializeResponse(response) {
    return __async3(this, null, function* () {
      const responseClone = response.clone();
      const responseText = yield responseClone.text();
      const responseStatus = responseClone.status || 200;
      const responseStatusText = responseClone.statusText || message[responseStatus] || "OK";
      return {
        status: responseStatus,
        statusText: responseStatusText,
        headers: Object.fromEntries(responseClone.headers.entries()),
        body: responseText
      };
    });
  }

  // node_modules/path-to-regexp/dist.es2015/index.js
  function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
      var char = str[i];
      if (char === "*" || char === "+" || char === "?") {
        tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
        continue;
      }
      if (char === "\\") {
        tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
        continue;
      }
      if (char === "{") {
        tokens.push({ type: "OPEN", index: i, value: str[i++] });
        continue;
      }
      if (char === "}") {
        tokens.push({ type: "CLOSE", index: i, value: str[i++] });
        continue;
      }
      if (char === ":") {
        var name = "";
        var j = i + 1;
        while (j < str.length) {
          var code = str.charCodeAt(j);
          if (
            // `0-9`
            code >= 48 && code <= 57 || // `A-Z`
            code >= 65 && code <= 90 || // `a-z`
            code >= 97 && code <= 122 || // `_`
            code === 95
          ) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name)
          throw new TypeError("Missing parameter name at ".concat(i));
        tokens.push({ type: "NAME", index: i, value: name });
        i = j;
        continue;
      }
      if (char === "(") {
        var count = 1;
        var pattern = "";
        var j = i + 1;
        if (str[j] === "?") {
          throw new TypeError('Pattern cannot start with "?" at '.concat(j));
        }
        while (j < str.length) {
          if (str[j] === "\\") {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ")") {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === "(") {
            count++;
            if (str[j + 1] !== "?") {
              throw new TypeError("Capturing groups are not allowed at ".concat(j));
            }
          }
          pattern += str[j++];
        }
        if (count)
          throw new TypeError("Unbalanced pattern at ".concat(i));
        if (!pattern)
          throw new TypeError("Missing pattern at ".concat(i));
        tokens.push({ type: "PATTERN", index: i, value: pattern });
        i = j;
        continue;
      }
      tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
  }
  function parse(str, options) {
    if (options === void 0) {
      options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function(type) {
      if (i < tokens.length && tokens[i].type === type)
        return tokens[i++].value;
    };
    var mustConsume = function(type) {
      var value2 = tryConsume(type);
      if (value2 !== void 0)
        return value2;
      var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
      throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function() {
      var result2 = "";
      var value2;
      while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
        result2 += value2;
      }
      return result2;
    };
    while (i < tokens.length) {
      var char = tryConsume("CHAR");
      var name = tryConsume("NAME");
      var pattern = tryConsume("PATTERN");
      if (name || pattern) {
        var prefix = char || "";
        if (prefixes.indexOf(prefix) === -1) {
          path += prefix;
          prefix = "";
        }
        if (path) {
          result.push(path);
          path = "";
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: "",
          pattern: pattern || defaultPattern,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      var value = char || tryConsume("ESCAPED_CHAR");
      if (value) {
        path += value;
        continue;
      }
      if (path) {
        result.push(path);
        path = "";
      }
      var open = tryConsume("OPEN");
      if (open) {
        var prefix = consumeText();
        var name_1 = tryConsume("NAME") || "";
        var pattern_1 = tryConsume("PATTERN") || "";
        var suffix = consumeText();
        mustConsume("CLOSE");
        result.push({
          name: name_1 || (pattern_1 ? key++ : ""),
          pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
          prefix,
          suffix,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      mustConsume("END");
    }
    return result;
  }
  function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
  }
  function regexpToFunction(re, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.decode, decode = _a === void 0 ? function(x) {
      return x;
    } : _a;
    return function(pathname) {
      var m = re.exec(pathname);
      if (!m)
        return false;
      var path = m[0], index = m.index;
      var params = /* @__PURE__ */ Object.create(null);
      var _loop_1 = function(i2) {
        if (m[i2] === void 0)
          return "continue";
        var key = keys[i2 - 1];
        if (key.modifier === "*" || key.modifier === "+") {
          params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
            return decode(value, key);
          });
        } else {
          params[key.name] = decode(m[i2], key);
        }
      };
      for (var i = 1; i < m.length; i++) {
        _loop_1(i);
      }
      return { path, index, params };
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys) {
    if (!keys)
      return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
      keys.push({
        // Use parenthesized substring match if available, index otherwise
        name: execResult[1] || index++,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      });
      execResult = groupsRegex.exec(path.source);
    }
    return path;
  }
  function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function(path) {
      return pathToRegexp(path, keys, options).source;
    });
    return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
  }
  function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
      return x;
    } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
    var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
    var delimiterRe = "[".concat(escapeString(delimiter), "]");
    var route = start ? "^" : "";
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      if (typeof token === "string") {
        route += escapeString(encode(token));
      } else {
        var prefix = escapeString(encode(token.prefix));
        var suffix = escapeString(encode(token.suffix));
        if (token.pattern) {
          if (keys)
            keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === "+" || token.modifier === "*") {
              var mod = token.modifier === "*" ? "?" : "";
              route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
            } else {
              route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
            }
          } else {
            if (token.modifier === "+" || token.modifier === "*") {
              route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
            } else {
              route += "(".concat(token.pattern, ")").concat(token.modifier);
            }
          }
        } else {
          route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
        }
      }
    }
    if (end) {
      if (!strict)
        route += "".concat(delimiterRe, "?");
      route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
      }
      if (!isEndDelimited) {
        route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
      }
    }
    return new RegExp(route, flags(options));
  }
  function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
      return regexpToRegexp(path, keys);
    if (Array.isArray(path))
      return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
  }

  // node_modules/@mswjs/interceptors/lib/browser/chunk-3YG2666Q.mjs
  var encoder = new TextEncoder();

  // node_modules/is-node-process/lib/index.mjs
  function isNodeProcess() {
    if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      return true;
    }
    if (typeof process !== "undefined") {
      const type = process.type;
      if (type === "renderer" || type === "worker") {
        return false;
      }
      return !!(process.versions && process.versions.node);
    }
    return false;
  }

  // node_modules/@open-draft/logger/lib/index.mjs
  var __defProp3 = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp3(target, name, { get: all[name], enumerable: true });
  };
  var colors_exports = {};
  __export(colors_exports, {
    blue: () => blue,
    gray: () => gray,
    green: () => green,
    red: () => red,
    yellow: () => yellow
  });
  function yellow(text) {
    return `\x1B[33m${text}\x1B[0m`;
  }
  function blue(text) {
    return `\x1B[34m${text}\x1B[0m`;
  }
  function gray(text) {
    return `\x1B[90m${text}\x1B[0m`;
  }
  function red(text) {
    return `\x1B[31m${text}\x1B[0m`;
  }
  function green(text) {
    return `\x1B[32m${text}\x1B[0m`;
  }
  var IS_NODE = isNodeProcess();

  // node_modules/@mswjs/interceptors/lib/browser/chunk-S72SKXXQ.mjs
  var IS_PATCHED_MODULE = Symbol("isPatchedModule");

  // node_modules/@mswjs/interceptors/lib/browser/index.mjs
  function getCleanUrl(url, isAbsolute = true) {
    return [isAbsolute && url.origin, url.pathname].filter(Boolean).join("");
  }

  // node_modules/msw/lib/core/utils/url/cleanUrl.mjs
  var REDUNDANT_CHARACTERS_EXP = /[\?|#].*$/g;
  function getSearchParams(path) {
    return new URL(`/${path}`, "http://localhost").searchParams;
  }
  function cleanUrl(path) {
    return path.replace(REDUNDANT_CHARACTERS_EXP, "");
  }

  // node_modules/msw/lib/core/utils/url/isAbsoluteUrl.mjs
  function isAbsoluteUrl(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  }

  // node_modules/msw/lib/core/utils/url/getAbsoluteUrl.mjs
  function getAbsoluteUrl(path, baseUrl) {
    if (isAbsoluteUrl(path)) {
      return path;
    }
    if (path.startsWith("*")) {
      return path;
    }
    const origin = baseUrl || typeof document !== "undefined" && document.baseURI;
    return origin ? (
      // Encode and decode the path to preserve escaped characters.
      decodeURI(new URL(encodeURI(path), origin).href)
    ) : path;
  }

  // node_modules/msw/lib/core/utils/matching/normalizePath.mjs
  function normalizePath(path, baseUrl) {
    if (path instanceof RegExp) {
      return path;
    }
    const maybeAbsoluteUrl = getAbsoluteUrl(path, baseUrl);
    return cleanUrl(maybeAbsoluteUrl);
  }

  // node_modules/msw/lib/core/utils/matching/matchRequestUrl.mjs
  function coercePath(path) {
    return path.replace(
      /([:a-zA-Z_-]*)(\*{1,2})+/g,
      (_, parameterName, wildcard) => {
        const expression = "(.*)";
        if (!parameterName) {
          return expression;
        }
        return parameterName.startsWith(":") ? `${parameterName}${wildcard}` : `${parameterName}${expression}`;
      }
    ).replace(/([^\/])(:)(?=\d+)/, "$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/, "$1\\$2");
  }
  function matchRequestUrl(url, path, baseUrl) {
    const normalizedPath = normalizePath(path, baseUrl);
    const cleanPath = typeof normalizedPath === "string" ? coercePath(normalizedPath) : normalizedPath;
    const cleanUrl2 = getCleanUrl(url);
    const result = match(cleanPath, { decode: decodeURIComponent })(cleanUrl2);
    const params = result && result.params || {};
    return {
      matches: result !== false,
      params
    };
  }

  // node_modules/msw/lib/core/utils/request/getPublicUrlFromRequest.mjs
  function getPublicUrlFromRequest(request) {
    if (typeof location === "undefined") {
      return request.url;
    }
    const url = new URL(request.url);
    return url.origin === location.origin ? url.pathname : url.origin + url.pathname;
  }

  // node_modules/@bundled-es-modules/cookie/index-esm.js
  var __create2 = Object.create;
  var __defProp4 = Object.defineProperty;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp3 = Object.prototype.hasOwnProperty;
  var __commonJS2 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps2 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp3.call(to, key) && key !== except)
          __defProp4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp4(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_cookie = __commonJS2({
    "node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse2;
      exports.serialize = serialize;
      var __toString = Object.prototype.toString;
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse2(str, options) {
        if (typeof str !== "string") {
          throw new TypeError("argument str must be a string");
        }
        var obj = {};
        var opt = options || {};
        var dec = opt.decode || decode;
        var index = 0;
        while (index < str.length) {
          var eqIdx = str.indexOf("=", index);
          if (eqIdx === -1) {
            break;
          }
          var endIdx = str.indexOf(";", index);
          if (endIdx === -1) {
            endIdx = str.length;
          } else if (endIdx < eqIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
          }
          var key = str.slice(index, eqIdx).trim();
          if (void 0 === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            if (val.charCodeAt(0) === 34) {
              val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
          }
          index = endIdx + 1;
        }
        return obj;
      }
      function serialize(name, val, options) {
        var opt = options || {};
        var enc = opt.encode || encode;
        if (typeof enc !== "function") {
          throw new TypeError("option encode is invalid");
        }
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError("argument name is invalid");
        }
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError("argument val is invalid");
        }
        var str = name + "=" + value;
        if (null != opt.maxAge) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
          }
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
          }
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
          }
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          var expires = opt.expires;
          if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError("option expires is invalid");
          }
          str += "; Expires=" + expires.toUTCString();
        }
        if (opt.httpOnly) {
          str += "; HttpOnly";
        }
        if (opt.secure) {
          str += "; Secure";
        }
        if (opt.priority) {
          var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
          switch (priority) {
            case "low":
              str += "; Priority=Low";
              break;
            case "medium":
              str += "; Priority=Medium";
              break;
            case "high":
              str += "; Priority=High";
              break;
            default:
              throw new TypeError("option priority is invalid");
          }
        }
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case true:
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return str;
      }
      function decode(str) {
        return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
      }
      function encode(val) {
        return encodeURIComponent(val);
      }
      function isDate(val) {
        return __toString.call(val) === "[object Date]" || val instanceof Date;
      }
      function tryDecode(str, decode2) {
        try {
          return decode2(str);
        } catch (e) {
          return str;
        }
      }
    }
  });
  var import_cookie = __toESM2(require_cookie(), 1);
  var source_default2 = import_cookie.default;

  // node_modules/@mswjs/cookies/lib/index.mjs
  var __create3 = Object.create;
  var __defProp5 = Object.defineProperty;
  var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames3 = Object.getOwnPropertyNames;
  var __getProtoOf3 = Object.getPrototypeOf;
  var __hasOwnProp4 = Object.prototype.hasOwnProperty;
  var __commonJS3 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps3 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames3(from))
        if (!__hasOwnProp4.call(to, key) && key !== except)
          __defProp5(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(
    isNodeMode || !mod || !mod.__esModule ? __defProp5(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_set_cookie = __commonJS3({
    "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
      "use strict";
      var defaultParseOptions = {
        decodeValues: true,
        map: false,
        silent: false
      };
      function isNonEmptyString(str) {
        return typeof str === "string" && !!str.trim();
      }
      function parseString(setCookieValue, options) {
        var parts = setCookieValue.split(";").filter(isNonEmptyString);
        var nameValuePairStr = parts.shift();
        var parsed = parseNameValuePair(nameValuePairStr);
        var name = parsed.name;
        var value = parsed.value;
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        try {
          value = options.decodeValues ? decodeURIComponent(value) : value;
        } catch (e) {
          console.error(
            "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
            e
          );
        }
        var cookie = {
          name,
          value
        };
        parts.forEach(function(part) {
          var sides = part.split("=");
          var key = sides.shift().trimLeft().toLowerCase();
          var value2 = sides.join("=");
          if (key === "expires") {
            cookie.expires = new Date(value2);
          } else if (key === "max-age") {
            cookie.maxAge = parseInt(value2, 10);
          } else if (key === "secure") {
            cookie.secure = true;
          } else if (key === "httponly") {
            cookie.httpOnly = true;
          } else if (key === "samesite") {
            cookie.sameSite = value2;
          } else {
            cookie[key] = value2;
          }
        });
        return cookie;
      }
      function parseNameValuePair(nameValuePairStr) {
        var name = "";
        var value = "";
        var nameValueArr = nameValuePairStr.split("=");
        if (nameValueArr.length > 1) {
          name = nameValueArr.shift();
          value = nameValueArr.join("=");
        } else {
          value = nameValuePairStr;
        }
        return { name, value };
      }
      function parse2(input, options) {
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        if (!input) {
          if (!options.map) {
            return [];
          } else {
            return {};
          }
        }
        if (input.headers) {
          if (typeof input.headers.getSetCookie === "function") {
            input = input.headers.getSetCookie();
          } else if (input.headers["set-cookie"]) {
            input = input.headers["set-cookie"];
          } else {
            var sch = input.headers[Object.keys(input.headers).find(function(key) {
              return key.toLowerCase() === "set-cookie";
            })];
            if (!sch && input.headers.cookie && !options.silent) {
              console.warn(
                "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
              );
            }
            input = sch;
          }
        }
        if (!Array.isArray(input)) {
          input = [input];
        }
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        if (!options.map) {
          return input.filter(isNonEmptyString).map(function(str) {
            return parseString(str, options);
          });
        } else {
          var cookies = {};
          return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
            var cookie = parseString(str, options);
            cookies2[cookie.name] = cookie;
            return cookies2;
          }, cookies);
        }
      }
      function splitCookiesString(cookiesString) {
        if (Array.isArray(cookiesString)) {
          return cookiesString;
        }
        if (typeof cookiesString !== "string") {
          return [];
        }
        var cookiesStrings = [];
        var pos = 0;
        var start;
        var ch;
        var lastComma;
        var nextStart;
        var cookiesSeparatorFound;
        function skipWhitespace() {
          while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
            pos += 1;
          }
          return pos < cookiesString.length;
        }
        function notSpecialChar() {
          ch = cookiesString.charAt(pos);
          return ch !== "=" && ch !== ";" && ch !== ",";
        }
        while (pos < cookiesString.length) {
          start = pos;
          cookiesSeparatorFound = false;
          while (skipWhitespace()) {
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
              lastComma = pos;
              pos += 1;
              skipWhitespace();
              nextStart = pos;
              while (pos < cookiesString.length && notSpecialChar()) {
                pos += 1;
              }
              if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                cookiesSeparatorFound = true;
                pos = nextStart;
                cookiesStrings.push(cookiesString.substring(start, lastComma));
                start = pos;
              } else {
                pos = lastComma + 1;
              }
            } else {
              pos += 1;
            }
          }
          if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
          }
        }
        return cookiesStrings;
      }
      module.exports = parse2;
      module.exports.parse = parse2;
      module.exports.parseString = parseString;
      module.exports.splitCookiesString = splitCookiesString;
    }
  });
  var import_set_cookie_parser = __toESM3(require_set_cookie());
  var PERSISTENCY_KEY = "MSW_COOKIE_STORE";
  function supportsLocalStorage() {
    try {
      if (localStorage == null) {
        return false;
      }
      const testKey = PERSISTENCY_KEY + "_test";
      localStorage.setItem(testKey, "test");
      localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error2) {
      return false;
    }
  }
  function isPropertyAccessible(object, method) {
    try {
      object[method];
      return true;
    } catch {
      return false;
    }
  }
  var CookieStore = class {
    constructor() {
      this.store = /* @__PURE__ */ new Map();
    }
    add(request, response) {
      if (isPropertyAccessible(request, "credentials") && request.credentials === "omit") {
        return;
      }
      const requestUrl = new URL(request.url);
      const responseCookies = response.headers.get("set-cookie");
      if (!responseCookies) {
        return;
      }
      const now = Date.now();
      const parsedResponseCookies = (0, import_set_cookie_parser.parse)(responseCookies).map(
        ({ maxAge, ...cookie }) => ({
          ...cookie,
          expires: maxAge === void 0 ? cookie.expires : new Date(now + maxAge * 1e3),
          maxAge
        })
      );
      const prevCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
      parsedResponseCookies.forEach((cookie) => {
        this.store.set(requestUrl.origin, prevCookies.set(cookie.name, cookie));
      });
    }
    get(request) {
      this.deleteExpiredCookies();
      const requestUrl = new URL(request.url);
      const originCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
      if (!isPropertyAccessible(request, "credentials")) {
        return originCookies;
      }
      switch (request.credentials) {
        case "include": {
          if (typeof document === "undefined") {
            return originCookies;
          }
          const documentCookies = (0, import_set_cookie_parser.parse)(document.cookie);
          documentCookies.forEach((cookie) => {
            originCookies.set(cookie.name, cookie);
          });
          return originCookies;
        }
        case "same-origin": {
          return originCookies;
        }
        default:
          return /* @__PURE__ */ new Map();
      }
    }
    getAll() {
      this.deleteExpiredCookies();
      return this.store;
    }
    deleteAll(request) {
      const requestUrl = new URL(request.url);
      this.store.delete(requestUrl.origin);
    }
    clear() {
      this.store.clear();
    }
    hydrate() {
      if (!supportsLocalStorage()) {
        return;
      }
      const persistedCookies = localStorage.getItem(PERSISTENCY_KEY);
      if (!persistedCookies) {
        return;
      }
      try {
        const parsedCookies = JSON.parse(persistedCookies);
        parsedCookies.forEach(([origin, cookies]) => {
          this.store.set(
            origin,
            new Map(
              cookies.map(([token, { expires, ...cookie }]) => [
                token,
                expires === void 0 ? cookie : { ...cookie, expires: new Date(expires) }
              ])
            )
          );
        });
      } catch (error2) {
        console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${PERSISTENCY_KEY}").

Stored value:
${localStorage.getItem(PERSISTENCY_KEY)}

Thrown exception:
${error2}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`);
        localStorage.removeItem(PERSISTENCY_KEY);
      }
    }
    persist() {
      if (!supportsLocalStorage()) {
        return;
      }
      const serializedCookies = Array.from(this.store.entries()).map(
        ([origin, cookies]) => {
          return [origin, Array.from(cookies.entries())];
        }
      );
      localStorage.setItem(PERSISTENCY_KEY, JSON.stringify(serializedCookies));
    }
    deleteExpiredCookies() {
      const now = Date.now();
      this.store.forEach((originCookies, origin) => {
        originCookies.forEach(({ expires, name }) => {
          if (expires !== void 0 && expires.getTime() <= now) {
            originCookies.delete(name);
          }
        });
        if (originCookies.size === 0) {
          this.store.delete(origin);
        }
      });
    }
  };
  var store = new CookieStore();

  // node_modules/msw/lib/core/utils/request/getRequestCookies.mjs
  var __defProp6 = Object.defineProperty;
  var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
  var __hasOwnProp5 = Object.prototype.hasOwnProperty;
  var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues2 = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp5.call(b, prop))
        __defNormalProp2(a2, prop, b[prop]);
    if (__getOwnPropSymbols2)
      for (var prop of __getOwnPropSymbols2(b)) {
        if (__propIsEnum2.call(b, prop))
          __defNormalProp2(a2, prop, b[prop]);
      }
    return a2;
  };
  function getAllDocumentCookies() {
    return source_default2.parse(document.cookie);
  }
  function getRequestCookies(request) {
    if (typeof document === "undefined" || typeof location === "undefined") {
      return {};
    }
    switch (request.credentials) {
      case "same-origin": {
        const url = new URL(request.url);
        return location.origin === url.origin ? getAllDocumentCookies() : {};
      }
      case "include": {
        return getAllDocumentCookies();
      }
      default: {
        return {};
      }
    }
  }
  function getAllRequestCookies(request) {
    var _a;
    const requestCookiesString = request.headers.get("cookie");
    const cookiesFromHeaders = requestCookiesString ? source_default2.parse(requestCookiesString) : {};
    store.hydrate();
    const cookiesFromStore = Array.from((_a = store.get(request)) == null ? void 0 : _a.entries()).reduce((cookies, [name, { value }]) => {
      return Object.assign(cookies, { [name.trim()]: value });
    }, {});
    const cookiesFromDocument = getRequestCookies(request);
    const forwardedCookies = __spreadValues2(__spreadValues2({}, cookiesFromDocument), cookiesFromStore);
    for (const [name, value] of Object.entries(forwardedCookies)) {
      request.headers.append("cookie", source_default2.serialize(name, value));
    }
    return __spreadValues2(__spreadValues2({}, forwardedCookies), cookiesFromHeaders);
  }

  // node_modules/msw/lib/core/handlers/HttpHandler.mjs
  var __async4 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
    HttpMethods2["HEAD"] = "HEAD";
    HttpMethods2["GET"] = "GET";
    HttpMethods2["POST"] = "POST";
    HttpMethods2["PUT"] = "PUT";
    HttpMethods2["PATCH"] = "PATCH";
    HttpMethods2["OPTIONS"] = "OPTIONS";
    HttpMethods2["DELETE"] = "DELETE";
    return HttpMethods2;
  })(HttpMethods || {});
  var HttpHandler = class extends RequestHandler {
    constructor(method, path, resolver, options) {
      super({
        info: {
          header: `${method} ${path}`,
          path,
          method
        },
        resolver,
        options
      });
      this.checkRedundantQueryParameters();
    }
    checkRedundantQueryParameters() {
      const { method, path } = this.info;
      if (path instanceof RegExp) {
        return;
      }
      const url = cleanUrl(path);
      if (url === path) {
        return;
      }
      const searchParams = getSearchParams(path);
      const queryParams = [];
      searchParams.forEach((_, paramName) => {
        queryParams.push(paramName);
      });
      devUtils.warn(
        `Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`
      );
    }
    parse(args) {
      return __async4(this, null, function* () {
        var _a;
        const url = new URL(args.request.url);
        const match2 = matchRequestUrl(
          url,
          this.info.path,
          (_a = args.resolutionContext) == null ? void 0 : _a.baseUrl
        );
        const cookies = getAllRequestCookies(args.request);
        return {
          match: match2,
          cookies
        };
      });
    }
    predicate(args) {
      const hasMatchingMethod = this.matchMethod(args.request.method);
      const hasMatchingUrl = args.parsedResult.match.matches;
      return hasMatchingMethod && hasMatchingUrl;
    }
    matchMethod(actualMethod) {
      return this.info.method instanceof RegExp ? this.info.method.test(actualMethod) : isStringEqual(this.info.method, actualMethod);
    }
    extendResolverArgs(args) {
      var _a;
      return {
        params: ((_a = args.parsedResult.match) == null ? void 0 : _a.params) || {},
        cookies: args.parsedResult.cookies
      };
    }
    log(args) {
      return __async4(this, null, function* () {
        const publicUrl = getPublicUrlFromRequest(args.request);
        const loggedRequest = yield serializeRequest(args.request);
        const loggedResponse = yield serializeResponse(args.response);
        const statusColor = getStatusCodeColor(loggedResponse.status);
        console.groupCollapsed(
          devUtils.formatMessage(
            `${getTimestamp()} ${args.request.method} ${publicUrl} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`
          ),
          `color:${statusColor}`,
          "color:inherit"
        );
        console.log("Request", loggedRequest);
        console.log("Handler:", this);
        console.log("Response", loggedResponse);
        console.groupEnd();
      });
    }
  };

  // node_modules/msw/lib/core/http.mjs
  function createHttpHandler(method) {
    return (path, resolver, options = {}) => {
      return new HttpHandler(method, path, resolver, options);
    };
  }
  var http = {
    all: createHttpHandler(/.+/),
    head: createHttpHandler(HttpMethods.HEAD),
    get: createHttpHandler(HttpMethods.GET),
    post: createHttpHandler(HttpMethods.POST),
    put: createHttpHandler(HttpMethods.PUT),
    delete: createHttpHandler(HttpMethods.DELETE),
    patch: createHttpHandler(HttpMethods.PATCH),
    options: createHttpHandler(HttpMethods.OPTIONS)
  };

  // node_modules/msw/lib/core/utils/HttpResponse/decorators.mjs
  var __defProp7 = Object.defineProperty;
  var __defProps2 = Object.defineProperties;
  var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
  var __hasOwnProp6 = Object.prototype.hasOwnProperty;
  var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues3 = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp6.call(b, prop))
        __defNormalProp3(a2, prop, b[prop]);
    if (__getOwnPropSymbols3)
      for (var prop of __getOwnPropSymbols3(b)) {
        if (__propIsEnum3.call(b, prop))
          __defNormalProp3(a2, prop, b[prop]);
      }
    return a2;
  };
  var __spreadProps2 = (a2, b) => __defProps2(a2, __getOwnPropDescs2(b));
  var { message: message2 } = source_default;
  function normalizeResponseInit(init = {}) {
    const status = (init == null ? void 0 : init.status) || 200;
    const statusText = (init == null ? void 0 : init.statusText) || message2[status] || "";
    const headers = new Headers(init == null ? void 0 : init.headers);
    return __spreadProps2(__spreadValues3({}, init), {
      headers,
      status,
      statusText
    });
  }
  function decorateResponse(response, init) {
    var _a;
    if (init.type) {
      Object.defineProperty(response, "type", {
        value: init.type,
        enumerable: true,
        writable: false
      });
    }
    if (typeof document !== "undefined") {
      const responseCookies = ((_a = init.headers.get("Set-Cookie")) == null ? void 0 : _a.split(",")) || [];
      for (const cookieString of responseCookies) {
        document.cookie = cookieString;
      }
    }
    return response;
  }

  // node_modules/msw/lib/core/HttpResponse.mjs
  var HttpResponse = class _HttpResponse extends Response {
    constructor(body, init) {
      const responseInit = normalizeResponseInit(init);
      super(body, responseInit);
      decorateResponse(this, responseInit);
    }
    /**
     * Create a `Response` with a `Content-Type: "text/plain"` body.
     * @example
     * HttpResponse.text('hello world')
     * HttpResponse.text('Error', { status: 500 })
     */
    static text(body, init) {
      const responseInit = normalizeResponseInit(init);
      if (!responseInit.headers.has("Content-Type")) {
        responseInit.headers.set("Content-Type", "text/plain");
      }
      return new _HttpResponse(body, responseInit);
    }
    /**
     * Create a `Response` with a `Content-Type: "application/json"` body.
     * @example
     * HttpResponse.json({ firstName: 'John' })
     * HttpResponse.json({ error: 'Not Authorized' }, { status: 401 })
     */
    static json(body, init) {
      const responseInit = normalizeResponseInit(init);
      if (!responseInit.headers.has("Content-Type")) {
        responseInit.headers.set("Content-Type", "application/json");
      }
      return new _HttpResponse(
        JSON.stringify(body),
        responseInit
      );
    }
    /**
     * Create a `Response` with a `Content-Type: "application/xml"` body.
     * @example
     * HttpResponse.xml(`<user name="John" />`)
     * HttpResponse.xml(`<article id="abc-123" />`, { status: 201 })
     */
    static xml(body, init) {
      const responseInit = normalizeResponseInit(init);
      if (!responseInit.headers.has("Content-Type")) {
        responseInit.headers.set("Content-Type", "text/xml");
      }
      return new _HttpResponse(body, responseInit);
    }
    /**
     * Create a `Response` with an `ArrayBuffer` body.
     * @example
     * const buffer = new ArrayBuffer(3)
     * const view = new Uint8Array(buffer)
     * view.set([1, 2, 3])
     *
     * HttpResponse.arrayBuffer(buffer)
     */
    static arrayBuffer(body, init) {
      const responseInit = normalizeResponseInit(init);
      if (body) {
        responseInit.headers.set("Content-Length", body.byteLength.toString());
      }
      return new _HttpResponse(body, responseInit);
    }
    /**
     * Create a `Response` with a `FormData` body.
     * @example
     * const data = new FormData()
     * data.set('name', 'Alice')
     *
     * HttpResponse.formData(data)
     */
    static formData(body, init) {
      return new _HttpResponse(body, normalizeResponseInit(init));
    }
  };

  // node_modules/msw/lib/core/index.mjs
  checkGlobals();

  // src/routes.js
  var routes_default = a = 15;

  // src/app.js
  console.log(http);
  console.log(HttpResponse);
  console.log(routes_default);
})();
/*! Bundled license information:

@bundled-es-modules/statuses/index-esm.js:
  (*! Bundled license information:
  
  statuses/index.js:
    (*!
     * statuses
     * Copyright(c) 2014 Jonathan Ong
     * Copyright(c) 2016 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)

@bundled-es-modules/cookie/index-esm.js:
  (*! Bundled license information:
  
  cookie/index.js:
    (*!
     * cookie
     * Copyright(c) 2012-2014 Roman Shtylman
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)
*/
