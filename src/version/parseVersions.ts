import { parse } from 'semver';
import type { ParsedVersions, Versions } from './version.types';

export async function parseVersions(
  versions: Versions,
): Promise<ParsedVersions> {
  const thisBranchInitialVersion = parse(versions.thisBranchInitial);
  const thisBranchCurrentVersion = parse(versions.thisBranchCurrent);
  const mainBranchCurrentVersion = parse(versions.mainBranchCurrent);

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
    mainBranchCurrent: mainBranchCurrentVersion,
  };
}
