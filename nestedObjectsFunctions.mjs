export function findAllPathsOfNestedObject(obj, targetKey) {
    let paths = [];

    function search(obj, currentPath) {
        for (let key in obj) {
            if (key === targetKey) {
                paths.push([...currentPath, key].join('.'));
            }
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                search(obj[key], [...currentPath, key]);
            }
        }
    }

    search(obj, []);
    return paths;
}

export function getValueONestedObjectFromPath(obj, path) {
    const keys = path.split('.');

    let current = obj;
    for (let key of keys) {
        if (!current?.hasOwnProperty(key)) {
            return undefined
        }
        // if (current[key] === undefined) {
        //     return undefined; // If the key doesn't exist in the object
        // }
        current = current[key];
    }
    return current;
}