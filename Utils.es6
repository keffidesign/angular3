export function functionName(fn) {

    return fn.displayName || (fn.displayName = fn.name || ((/^function\s+([\w\$]+)\s*\(/.exec(fn.toString()) || [])[1] || 'C'));
}

export const capitalize = (s) => (s.charAt(0).toUpperCase() + s.slice(1));
