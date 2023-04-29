"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "run", {
    enumerable: true,
    get: ()=>run
});
const _core = require("@actions/core");
const _setOutputObject = require("./setOutputObject");
const _semver = require("semver");
const _getVersions = require("../version/getVersions");
const _mapSemVerToOutputVersion = require("../version/mapSemVerToOutputVersion");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function run() {
    return _run.apply(this, arguments);
}
function _run() {
    _run = _asyncToGenerator(function*() {
        try {
            const token = (0, _core.getInput)('token');
            const packageJsonPath = (0, _core.getInput)('package-json-path');
            const versions = yield (0, _getVersions.getVersions)({
                token,
                packageJsonPath
            });
            (0, _core.debug)(`parsed versions: ${JSON.stringify(versions, null, 2)}`);
            const output = {
                thisBranchInitialVersion: (0, _mapSemVerToOutputVersion.mapSemVerToOutputVersion)(versions.thisBranchInitial),
                thisBranchCurrentVersion: (0, _mapSemVerToOutputVersion.mapSemVerToOutputVersion)(versions.thisBranchCurrent),
                mainBranchCurrentVersion: (0, _mapSemVerToOutputVersion.mapSemVerToOutputVersion)(versions.mainBranchCurrent),
                hasChanged: !(0, _semver.eq)(versions.thisBranchCurrent, versions.thisBranchInitial),
                isValid: (0, _semver.gt)(versions.thisBranchCurrent, versions.thisBranchInitial) && (0, _semver.gt)(versions.thisBranchCurrent, versions.mainBranchCurrent)
            };
            (0, _core.debug)(`output object: ${JSON.stringify(output, null, 2)}`);
            (0, _setOutputObject.setOutputObject)(output);
        } catch (error) {
            if (error instanceof Error) {
                (0, _core.setFailed)(error);
            } else {
                (0, _core.setFailed)(JSON.stringify(error));
            }
        }
    });
    return _run.apply(this, arguments);
}
if (require.main === module) {
    run();
}
