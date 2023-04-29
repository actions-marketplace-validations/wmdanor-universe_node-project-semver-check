import { mapSemVerToOutputVersion } from './mapSemVerToOutputVersion';
import type { SemVer } from 'semver';

describe('version/mapSemVerToOutputVersion', () => {
  it('maps a SemVer object to an OutputVersion object correctly', () => {
    const semVer = {
      version: '1.2.3',
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ['beta', 1],
      build: ['build', '1'],
    } as unknown as SemVer;

    const output = mapSemVerToOutputVersion(semVer);

    expect(output).toEqual({
      value: '1.2.3',
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: 'beta-1',
      build: 'build-1',
    });
  });
});
