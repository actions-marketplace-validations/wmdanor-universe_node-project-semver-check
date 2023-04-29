export type FlattenablePrimitive =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export interface Flattenable {
  [key: string]: FlattenablePrimitive | Flattenable;
}

//
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type FlattenObject<T, Path extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? FlattenObject<
        T[K],
        Path extends '' ? `${K & string}` : Join<Path, K & string>
      >
    : Path extends ''
    ? { [P in K & string]: T[K] }
    : { [P in Join<Path, K & string>]: T[K] };
}[keyof T];

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Flatten<T> = UnionToIntersection<FlattenObject<T>>;
//

// type A = {
//   prop1: number;
//   prop2: {
//     a: string;
//     b: {
//       x?: boolean;
//     };
//   };
//   prop3: {
//     b: number | null;
//     c: { bruh: string };
//   };
// };

// type B__Expected = {
//   prop1: number;
//   'prop2.a': string;
//   'prop2.b.x': boolean | undefined;
//   'prop3.b': number | null;
//   'prop3.c.bruh': string;
// };

// type B = Flatten<A>;

// type X__Expected = {
//   [key: string]: FlattenablePrimitive;
// };

// type X = Flatten<Flattenable>;

export function flattenObject<T extends Flattenable>(
  obj: T,
  parentKey = '',
): Flatten<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const result: Flatten<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      Object.assign(result, flattenObject(value, newKey));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result[newKey] = value;
    }
  }

  return result;
}
