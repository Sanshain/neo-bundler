//@ts-check

export class Cls{
    
}

function _func(params) {
    return params.length
}

export function func() {
    return _func(arguments);
}

function createArray(length) {
    return Array(length)
}

export default function () {
    return createArray(0);
}