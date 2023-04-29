"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseVersions", {
    enumerable: true,
    get: ()=>parseVersions
});
const _semver = require("semver");
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
function parseVersions(versions) {
    return _parseVersions.apply(this, arguments);
}
function _parseVersions() {
    _parseVersions = _asyncToGenerator(function*(versions) {
        const thisBranchInitialVersion = (0, _semver.parse)(versions.thisBranchInitial);
        const thisBranchCurrentVersion = (0, _semver.parse)(versions.thisBranchCurrent);
        const mainBranchCurrentVersion = (0, _semver.parse)(versions.mainBranchCurrent);
        if (!thisBranchInitialVersion) {
            throw new Error('Error parsing this branch initial version');
        }
        if (!thisBranchCurrentVersion) {
            throw new Error('Error parsing this branch current version');
        }
        if (!mainBranchCurrentVersion) {
            throw new Error('Error parsing main branch current version');
        }
        return {
            thisBranchInitial: thisBranchInitialVersion,
            thisBranchCurrent: thisBranchCurrentVersion,
            mainBranchCurrent: mainBranchCurrentVersion
        };
    });
    return _parseVersions.apply(this, arguments);
}
