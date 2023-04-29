import type { OutputVersion } from '../action/output.types';
import type { SemVer } from 'semver';

export function mapSemVerToOutputVersion(semVer: SemVer): OutputVersion {
  return {
    value: semVer.version,
    major: semVer.major,
    minor: semVer.minor,
    patch: semVer.patch,
    build: semVer.build.join('-'),
    prerelease: semVer.prerelease.join('-'),
  };
}
