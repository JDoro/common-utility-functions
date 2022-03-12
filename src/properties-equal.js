import {isEqual, pick} from "lodash";

export function propertiesEqual(obj1, obj2, properties) {
  const newObj1 = pick(obj1, properties);
  const newObj2 = pick(obj2, properties);
  return isEqual(newObj1, newObj2);
}