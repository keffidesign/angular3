export function functionName(fn) {

    return fn.displayName || (fn.displayName = fn.name || ((/^function\s+([\w\$]+)\s*\(/.exec(fn.toString()) || [])[1] || 'C'));
}

// "abc" => "Abc"
export const capitalize = (s) => (s.charAt(0).toUpperCase() + s.slice(1));

// "a-bc-de" => "aBcDe"
export const properify = (s) => (s.split('-').map((c,i)=>(i?capitalize(c):c)).join(''));

// "ABcDe" => "a-bc-de"
export const dashify = (s) => (s.charAt(0)+s.slice(1).replace(/[A-Z]/, (s)=>`-${s}`)).toLowerCase();

export const EMPTY_STR = {'':1, '0':1, 'false':1, 'null':1, 'undefined':1};

export function getter(key) {

    let value = this[key];

    if (value === undefined) {

        const keys = key.split('.');

        if (keys.length > 1) {
            let rr = this[keys.shift()];
            if (rr) {
                for (let k of keys) {
                    value = rr[k];
                    if (!value) {
                        break;
                    }
                    rr = value;
                }
            }
        }
    }

    return value;
}
export function getStatic(t, key) {
    while (t) {
        let r = t.constructor[key];
        if (r) {
            return r;
        }
        t = t.__proto__;
    }
    return null;
}