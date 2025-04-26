import {pickProperties} from "./some-properties";
import {deepEquals} from "./deep-equals";

export function propertiesEqual(obj1, obj2, properties) {
  const newObj1 = pickProperties(obj1, properties);
  const newObj2 = pickProperties(obj2, properties);
  return deepEquals(newObj1, newObj2);
}
