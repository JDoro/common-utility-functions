export function filterStringArray(array: string[], filter: string): string[] {
  return array.filter((item) => item.includes(filter));
}
