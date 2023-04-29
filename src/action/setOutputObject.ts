import { setOutput } from '@actions/core';
import { flattenObject } from '../utils/flattenObject';

export function setOutputObject<OutputShape extends Record<string, any>>(
  output: OutputShape,
): void {
  const flattenedOutput = flattenObject(output);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  for (const [key, value] of Object.entries(flattenedOutput)) {
    setOutput(key, value);
  }
}
