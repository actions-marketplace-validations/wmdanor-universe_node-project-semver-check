import type { SemVer } from 'semver';

export interface Versions {
  thisBranchInitial: string;
  thisBranchCurrent: string;
  mainBranchCurrent: string;
}

export type ParsedVersions = Record<keyof Versions, SemVer>;
