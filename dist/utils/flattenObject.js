"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flattenObject", {
    enumerable: true,
    get: ()=>flattenObject
});
function flattenObject(obj, parentKey = '') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = {};
    for (const [key, value] of Object.entries(obj)){
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === 'object') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            Object.assign(result, flattenObject(value, newKey));
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            result[newKey] = value;
        }
    }
    return result;
}
