function getProp(keyPath) {
    return function(obj) {
        return keyPath
            .split('.')
            .reduce(function(currentObj, key) {
                if(!currentObj)  return;
                return currentObj[key];
            }, obj);
    }
}