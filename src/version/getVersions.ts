import { debug, getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { getVersion } from './getVersion';
import type { ParsedVersions } from './version.types';
import { parseVersions } from './parseVersions';

export interface GetVersionsOptions {
  /** ${{ secrets.GITHUB_TOKEN }} */
  token: string;
  /** Path to package.json file. */
  packageJsonPath: string;
}

export async function getVersions(
  options: GetVersionsOptions,
): Promise<ParsedVersions> {
  const octokit = getOctokit(options.token);
  const currentRef = context.ref;

  const commits = await octokit.rest.repos.listCommits({
    ...context.repo,
    sha: currentRef,
  });

  // Get the first commit SHA (the initial commit on the branch)
  const initialCommitSha = commits.data[commits.data.length - 1]?.sha;

  if (!initialCommitSha) {
    throw new Error(`Unable to get initial commit sha for this branch`);
  }

  const versions = {
    thisBranchInitial: await getVersion({
      ...options,
      ref: initialCommitSha,
    }),
    thisBranchCurrent: await getVersion({
      ...options,
      ref: currentRef,
    }),
    mainBranchCurrent: await getVersion({
      ...options,
      ref: getInput('main-branch-name'),
    }),
  };

  debug(`versions: ${JSON.stringify(versions, null, 2)}`);

  return parseVersions(versions);
}
