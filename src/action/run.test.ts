import { getInput, setFailed } from '@actions/core';
import { run } from './run';
import { getVersions } from '../version/getVersions';
import { setOutputObject } from './setOutputObject';
import type { Output } from './output.types';

jest.mock('@actions/core');
jest.mock('../version/getVersions');
jest.mock('./setOutputObject');

const getInputMock = jest.mocked(getInput);
const setFailedMock = jest.mocked(setFailed);
const getVersionsMock = jest.mocked(getVersions);
const setOutputObjectMock = jest.mocked(setOutputObject);

describe('action/run', () => {
  it.todo('should do something'); // TODO
});
