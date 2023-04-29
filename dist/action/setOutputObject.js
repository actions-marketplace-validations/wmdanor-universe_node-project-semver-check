"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setOutputObject", {
    enumerable: true,
    get: ()=>setOutputObject
});
const _core = require("@actions/core");
const _flattenObject = require("../utils/flattenObject");
function setOutputObject(output) {
    const flattenedOutput = (0, _flattenObject.flattenObject)(output);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    for (const [key, value] of Object.entries(flattenedOutput)){
        (0, _core.setOutput)(key, value);
    }
}
