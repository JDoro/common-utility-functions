import { deepEquals, pickProperties } from '../';

export function propertiesEqual<
  K extends string,
  T extends Record<K, T | string | number | undefined | null>,
>(obj1: T, obj2: T, properties: string[]): boolean {
  const newObj1 = pickProperties(obj1, properties);
  const newObj2 = pickProperties(obj2, properties);
  return deepEquals(newObj1, newObj2);
}
