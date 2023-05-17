//@modules:
var $$nested_directory$commonExports = (function (exports) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var r = 7;
    var a = 66;
    function Ads(arg) { }
    function asd() { }
    function f() { }
    var Asde = /** @class */ (function () {
        function Asde() {
        }
        return Asde;
    }());
    console.log('......');
    exports = { months: months, a: a, Ads: Ads, f: f, Asde: Asde };
    return exports;
})({});
var $$utilExports = (function (exports) {
    function loclog() {
        console.log('loclog');
    }
    exports = { loclog: loclog };
    return exports;
})({});
//@index.ts: 
var months = $$nested_directory$commonExports.months, Ads = $$nested_directory$commonExports.Ads;
; // TODO check with require and with added some comment below (rourcemaps tests breaks down)
var loclog = $$utilExports.loclog;
;
var a = months;
loclog();
//@ts-expect-error
console.log(fff);
var c = 754;
// var c = 754;
console.log(a);
