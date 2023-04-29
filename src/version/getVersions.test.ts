import { getVersions } from './getVersions';
import { getVersion } from './getVersion';
import { parseVersions } from './parseVersions';
import { getOctokit } from '@actions/github';
import type { SemVer } from 'semver';

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn().mockReturnValue({
    rest: {
      repos: {
        listCommits: jest
          .fn()
          .mockResolvedValueOnce({ data: [{ sha: 'hsdf9834f' }] }),
      },
    },
  }),
  context: {
    repo: {
      owner: 'test',
      repo: 'test-repo',
    },
    ref: 'test-ref',
  },
}));

jest.mock('./getVersion', () => ({
  getVersion: jest.fn(),
}));

jest.mock('./parseVersions', () => ({
  parseVersions: jest.fn(),
}));

jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  getInput: jest.fn().mockReturnValue('main'),
}));

const getOctokitMock = jest.mocked(getOctokit);
const getVersionMock = jest.mocked(getVersion);
const parseVersionsMock = jest.mocked(parseVersions);

describe('version/getVersions', () => {
  const options = {
    token: 'test-token',
    packageJsonPath: 'test/path',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets and parses versions correctly', async () => {
    const initialVersion = '1.0.0';
    const currentVersion = '1.1.0';
    const mainVersion = '2.0.0';

    getVersionMock
      .mockResolvedValueOnce(initialVersion)
      .mockResolvedValueOnce(currentVersion)
      .mockResolvedValueOnce(mainVersion);

    const parsedVersions = {
      thisBranchInitial: { version: '1.0.0' } as SemVer,
      thisBranchCurrent: { version: '1.1.0' } as SemVer,
      mainBranchCurrent: { version: '2.0.0' } as SemVer,
    };
    parseVersionsMock.mockResolvedValue(parsedVersions);

    const result = await getVersions(options);

    expect(getOctokit).toHaveBeenCalledWith('test-token');
    expect(getVersion).toHaveBeenCalledWith({
      ...options,
      ref: expect.any(String),
    });
    expect(parseVersions).toHaveBeenCalledWith({
      thisBranchInitial: initialVersion,
      thisBranchCurrent: currentVersion,
      mainBranchCurrent: mainVersion,
    });
    expect(result).toEqual(parsedVersions);
  });

  it('throws an error if initial commit SHA cannot be obtained', async () => {
    getOctokitMock.mockReturnValueOnce({
      rest: {
        repos: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          listCommits: jest.fn().mockResolvedValueOnce({ data: [] }),
        },
      },
    });

    await expect(getVersions(options)).rejects.toThrow(
      'Unable to get initial commit sha for this branch',
    );
  });
});
