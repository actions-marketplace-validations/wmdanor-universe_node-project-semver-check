import { type Flatten, type Flattenable, flattenObject } from './flattenObject';

type TestCase = [Flattenable, Flatten<Flattenable>];

describe('flattenObject', () => {
  const testCases: TestCase[] = [
    [
      {
        prop1: 'v1',
        prop2: {
          name: 'str',
        },
      },
      {
        prop1: 'v1',
        'prop2.name': 'str',
      },
    ],
    [
      {
        prop1: {
          subProp1: 'v1',
          subProp2: {
            name: 'str',
          },
        },
        prop2: 'v2',
      },
      {
        'prop1.subProp1': 'v1',
        'prop1.subProp2.name': 'str',
        prop2: 'v2',
      },
    ],
    [
      {
        prop1: {
          subProp1: 'v1',
          subProp2: {
            subSubProp1: {
              name: 'str',
            },
          },
        },
      },
      {
        'prop1.subProp1': 'v1',
        'prop1.subProp2.subSubProp1.name': 'str',
      },
    ],
  ];

  it.each(testCases)(
    'should flatten the provided object: %s -> %s',
    (input, expected) => {
      const result = flattenObject(input);

      expect(result).toEqual(expected);
    },
  );
});
