function withArgs(...args) {
    return function(func) {
        return func(...args);
    }
}