import { debug, getInput, setFailed } from '@actions/core';
import type { Output } from './output.types';
import { setOutputObject } from './setOutputObject';
import { eq, gt } from 'semver';
import { getVersions } from '../version/getVersions';
import { mapSemVerToOutputVersion } from '../version/mapSemVerToOutputVersion';

export async function run(): Promise<void> {
  try {
    const token = getInput('token');
    const packageJsonPath = getInput('package-json-path');
    const versions = await getVersions({
      token,
      packageJsonPath,
    });

    debug(`parsed versions: ${JSON.stringify(versions, null, 2)}`);

    const output: Output = {
      thisBranchInitialVersion: mapSemVerToOutputVersion(
        versions.thisBranchInitial,
      ),
      thisBranchCurrentVersion: mapSemVerToOutputVersion(
        versions.thisBranchCurrent,
      ),
      mainBranchCurrentVersion: mapSemVerToOutputVersion(
        versions.mainBranchCurrent,
      ),
      hasChanged: !eq(versions.thisBranchCurrent, versions.thisBranchInitial),
      isValid:
        gt(versions.thisBranchCurrent, versions.thisBranchInitial) &&
        gt(versions.thisBranchCurrent, versions.mainBranchCurrent),
    };

    debug(`output object: ${JSON.stringify(output, null, 2)}`);

    setOutputObject(output);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error);
    } else {
      setFailed(JSON.stringify(error));
    }
  }
}

if (require.main === module) {
  run();
}
