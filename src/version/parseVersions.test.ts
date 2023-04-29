import { parseVersions } from './parseVersions';
import { type SemVer, parse } from 'semver';

jest.mock('semver', () => ({
  parse: jest.fn(),
}));

const parseMock = jest.mocked(parse);

describe('version/parseVersions', () => {
  const versions = {
    thisBranchInitial: '1.2.3',
    thisBranchCurrent: '1.3.0',
    mainBranchCurrent: '2.0.0',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('parses versions correctly', async () => {
    parseMock
      .mockReturnValueOnce({ version: '1.2.3' } as SemVer)
      .mockReturnValueOnce({ version: '1.3.0' } as SemVer)
      .mockReturnValueOnce({ version: '2.0.0' } as SemVer);

    const parsed = await parseVersions(versions);

    expect(parsed.thisBranchInitial?.version).toBe('1.2.3');
    expect(parsed.thisBranchCurrent?.version).toBe('1.3.0');
    expect(parsed.mainBranchCurrent?.version).toBe('2.0.0');
  });

  it('throws an error if this branch initial version is invalid', async () => {
    parseMock
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({ version: '1.3.0' } as SemVer)
      .mockReturnValueOnce({ version: '2.0.0' } as SemVer);

    const invalidVersions = { ...versions, thisBranchInitial: 'invalid' };

    await expect(parseVersions(invalidVersions)).rejects.toThrow(
      'Error parsing this branch initial version',
    );
  });

  it('throws an error if this branch current version is invalid', async () => {
    parseMock
      .mockReturnValueOnce({ version: '1.2.3' } as SemVer)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({ version: '2.0.0' } as SemVer);

    await expect(parseVersions(versions)).rejects.toThrow(
      'Error parsing this branch current version',
    );
  });

  it('throws an error if main branch current version is invalid', async () => {
    parseMock
      .mockReturnValueOnce({ version: '1.2.3' } as SemVer)
      .mockReturnValueOnce({ version: '1.3.0' } as SemVer)
      .mockReturnValueOnce(null);

    await expect(parseVersions(versions)).rejects.toThrow(
      'Error parsing main branch current version',
    );
  });
});
