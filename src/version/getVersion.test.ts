import { getVersion } from './getVersion';
import { getOctokit, context } from '@actions/github';

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
  context: {
    repo: {
      owner: 'test',
      repo: 'test-repo',
    },
  },
}));

describe('version/getVersion', () => {
  const options = {
    token: 'test-token',
    packageJsonPath: 'test/path',
    ref: 'test-ref',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets the version correctly', async () => {
    const version = '1.2.3';
    const packageJsonData = JSON.stringify({ version });
    const packageJsonContent = {
      data: {
        content: Buffer.from(packageJsonData).toString('base64'),
      },
    };

    (getOctokit as jest.Mock).mockReturnValueOnce({
      rest: {
        repos: {
          getContent: jest.fn().mockResolvedValueOnce(packageJsonContent),
        },
      },
    });

    const result = await getVersion(options);

    expect(getOctokit).toHaveBeenCalledWith('test-token');
    expect(context.repo).toEqual({
      owner: 'test',
      repo: 'test-repo',
    });
    expect(result).toBe(version);
  });

  it('throws an error if the version cannot be obtained', async () => {
    const packageJsonData = JSON.stringify({});
    const packageJsonContent = {
      data: {
        content: Buffer.from(packageJsonData).toString('base64'),
      },
    };

    (getOctokit as jest.Mock).mockReturnValueOnce({
      rest: {
        repos: {
          getContent: jest.fn().mockResolvedValueOnce(packageJsonContent),
        },
      },
    });

    await expect(getVersion(options)).rejects.toThrow(
      'Unable to get version for ref = "test-ref"',
    );
  });

  it('throws an error if package.json cannot be read', async () => {
    const packageJsonContent = {
      data: {
        foo: 'bar',
      },
    };

    (getOctokit as jest.Mock).mockReturnValueOnce({
      rest: {
        repos: {
          getContent: jest.fn().mockResolvedValueOnce(packageJsonContent),
        },
      },
    });

    await expect(getVersion(options)).rejects.toThrow(
      'Unable to read package.json for ref = "test-ref"',
    );
  });
});
