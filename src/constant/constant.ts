export function constant<T>(x: T): () => T {
  return function() {
    return x;
  };
}

