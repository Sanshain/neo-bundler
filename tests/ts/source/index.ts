
import { months, Ads } from "./nested_directory/common";        // TODO check with require and with added some comment below (rourcemaps tests breaks down)
import { loclog } from "./util";

type A = number | string

var a = months;

loclog()

//@ts-expect-error
console.log(fff);

var c: A = 754;
// var c = 754;

console.log(a);
