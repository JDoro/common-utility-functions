export function wrapSlice<T>(arr: T[], startIndex: number, endIndex: number): T[] {
  const result: T[] = [];
  for (let x = startIndex; x < endIndex + 1; x++) {
    const normalizedIndex = x % arr.length;
    if (normalizedIndex < 0) {
      result.push(arr[arr.length + normalizedIndex]);
    } else {
      result.push(arr[normalizedIndex]);
    }
  }
  return result;
}
