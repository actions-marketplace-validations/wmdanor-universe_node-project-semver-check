import { setOutput } from '@actions/core';
import { setOutputObject } from './setOutputObject';
import { flattenObject } from '../utils/flattenObject';

jest.mock('@actions/core', () => ({
  setOutput: jest.fn(),
}));

jest.mock('../utils/flattenObject', () => ({
  flattenObject: jest.fn(),
}));

const flattenObjectMock = jest.mocked(flattenObject);

describe('action/setOutputObject', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set outputs for a flat object', () => {
    const output = {
      key1: 'value1',
      key2: 42,
      key3: true,
    };

    flattenObjectMock.mockReturnValueOnce(output);

    setOutputObject(output);

    expect(setOutput).toHaveBeenCalledWith('key1', 'value1');
    expect(setOutput).toHaveBeenCalledWith('key2', 42);
    expect(setOutput).toHaveBeenCalledWith('key3', true);
  });

  it('should set outputs for a nested object', () => {
    const output = {
      key1: {
        nestedKey1: 'value1',
        nestedKey2: {
          deeplyNestedKey: 'value2',
        },
      },
      key2: 42,
    };

    flattenObjectMock.mockReturnValueOnce({
      'key1.nestedKey1': 'value1',
      'key1.nestedKey2.deeplyNestedKey': 'value2',
      key2: 42,
    });

    setOutputObject(output);

    expect(setOutput).toHaveBeenCalledWith('key1.nestedKey1', 'value1');
    expect(setOutput).toHaveBeenCalledWith(
      'key1.nestedKey2.deeplyNestedKey',
      'value2',
    );
    expect(setOutput).toHaveBeenCalledWith('key2', 42);
  });

  it('should set outputs for an empty object', () => {
    const output = {};

    flattenObjectMock.mockReturnValueOnce(output);

    setOutputObject(output);

    expect(setOutput).not.toHaveBeenCalled();
  });
});
