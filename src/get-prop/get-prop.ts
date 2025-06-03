export function getProp<T extends Record<string, T | undefined>>(keyPath: string) {
    return function(obj: T | undefined): T | undefined {
        return keyPath
            .split('.')
            .reduce(function(currentObj: T | undefined, key: string) {
                if(!currentObj)  return;
                return currentObj[key];
            }, obj);
    }
}

