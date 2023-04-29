export interface OutputVersion {
  // Text value of version. Example: "3.5.13"
  value: string;
  major: number;
  minor: number;
  patch: number;
  build: string;
  prerelease: string;
}

export interface Output {
  thisBranchInitialVersion: OutputVersion;
  thisBranchCurrentVersion: OutputVersion;
  mainBranchCurrentVersion: OutputVersion;
  hasChanged: boolean;
  isValid: boolean;
}
