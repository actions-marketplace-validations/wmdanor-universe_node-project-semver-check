"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapSemVerToOutputVersion", {
    enumerable: true,
    get: ()=>mapSemVerToOutputVersion
});
function mapSemVerToOutputVersion(semVer) {
    return {
        value: semVer.version,
        major: semVer.major,
        minor: semVer.minor,
        patch: semVer.patch,
        build: semVer.build.join('-'),
        prerelease: semVer.prerelease.join('-')
    };
}
