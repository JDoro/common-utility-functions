function unary(fn) {
  return function(a) {
    return fn(a);
  };
}