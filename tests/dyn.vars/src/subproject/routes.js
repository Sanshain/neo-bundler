//@ts-check

function _func(params) {
    return params.length
}

export function func() {
    return _func(arguments);
}

export default function() {
    return []
}
