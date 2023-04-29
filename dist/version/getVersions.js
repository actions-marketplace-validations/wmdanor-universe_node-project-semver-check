"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getVersions", {
    enumerable: true,
    get: ()=>getVersions
});
const _core = require("@actions/core");
const _github = require("@actions/github");
const _getVersion = require("./getVersion");
const _parseVersions = require("./parseVersions");
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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function getVersions(options) {
    return _getVersions.apply(this, arguments);
}
function _getVersions() {
    _getVersions = _asyncToGenerator(function*(options) {
        var _commits_data_;
        const octokit = (0, _github.getOctokit)(options.token);
        const currentRef = _github.context.ref;
        const commits = yield octokit.rest.repos.listCommits(_objectSpreadProps(_objectSpread({}, _github.context.repo), {
            sha: currentRef
        }));
        // Get the first commit SHA (the initial commit on the branch)
        const initialCommitSha = (_commits_data_ = commits.data[commits.data.length - 1]) === null || _commits_data_ === void 0 ? void 0 : _commits_data_.sha;
        if (!initialCommitSha) {
            throw new Error(`Unable to get initial commit sha for this branch`);
        }
        const versions = {
            thisBranchInitial: yield (0, _getVersion.getVersion)(_objectSpreadProps(_objectSpread({}, options), {
                ref: initialCommitSha
            })),
            thisBranchCurrent: yield (0, _getVersion.getVersion)(_objectSpreadProps(_objectSpread({}, options), {
                ref: currentRef
            })),
            mainBranchCurrent: yield (0, _getVersion.getVersion)(_objectSpreadProps(_objectSpread({}, options), {
                ref: (0, _core.getInput)('main-branch-name')
            }))
        };
        (0, _core.debug)(`versions: ${JSON.stringify(versions, null, 2)}`);
        return (0, _parseVersions.parseVersions)(versions);
    });
    return _getVersions.apply(this, arguments);
}
