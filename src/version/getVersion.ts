import { getOctokit, context } from '@actions/github';
import type { GetVersionsOptions } from './getVersions';

export interface GetVersionOptions extends GetVersionsOptions {
  /** The name of the commit/branch/tag. */
  ref: string;
}

export async function getVersion({
  token,
  packageJsonPath,
  ref,
}: GetVersionOptions): Promise<string> {
  const octokit = getOctokit(token);

  const packageJsonContent = await octokit.rest.repos.getContent({
    ...context.repo,
    path: packageJsonPath,
    ref,
  });

  const data = packageJsonContent.data;

  if (!('content' in data)) {
    throw new Error(`Unable to read package.json for ref = "${ref}"`);
  }

  const packageJsonData = Buffer.from(data.content, 'base64').toString();
  const packageJson = JSON.parse(packageJsonData);
  const version = packageJson.version;

  if (!version || typeof version !== 'string') {
    throw new Error(`Unable to get version for ref = "${ref}"`);
  }

  return version;
}
