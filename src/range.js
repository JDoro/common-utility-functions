export function range (min, max) {
  const length = max - min;
  return [...Array.of(length).keys()].map(i => i + min);
}
