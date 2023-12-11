(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/nested_folder/util1.js
  var a2, b, c;
  var init_util1 = __esm({
    "src/nested_folder/util1.js"() {
      a2 = 1;
      b = 1;
      c = 8;
    }
  });

  // src/nested_folder/indexUtil.js
  var indexUtil_exports = {};
  __export(indexUtil_exports, {
    B: () => B,
    default: () => indexUtil_default
  });
  var a3, indexUtil_default, B;
  var init_indexUtil = __esm({
    "src/nested_folder/indexUtil.js"() {
      init_util1();
      a3 = 150;
      indexUtil_default = a3;
      B = b;
    }
  });

  // src/routes.js
  var routes_default = a = 15;

  // src/app.js
  console.log(routes_default);
  Promise.resolve().then(() => (init_indexUtil(), indexUtil_exports)).then((exp) => {
    console.log(exp.default);
  });
})();
