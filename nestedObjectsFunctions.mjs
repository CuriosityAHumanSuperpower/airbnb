/**
 * The function search for all "paths" in a nested object that lead to a given key. 
 *
 * @param   obj object of nested key value. Values can be of any type included array. (example: 
 * {
 *  key1 : value1, 
 *  key2 : [value21, value22]
 *  Key3 : [{
 *      key1 : value31, 
 *      key4 : value4
 *      }]
 * })
 * @param   targetKey is a key name to be search in the (example : key1).
 * @returns An array of strings (example : [key1, key3.0.key1])
 */
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

/**
 * Given a nested object and a path , the function returns the value of the path. 
 *
 * @param   obj object of nested key value. Values can be of any type included array. (example: 
 * {
 *  key1 : value1, 
 *  key2 : [value21, value22]
 *  Key3 : [{
 *      key1 : value31, 
 *      key4 : value4
 *      }]
 * })
 * @param   path is a path (example : key3.0.key1) to get the value from.
 * @returns the value can be any type (example : value31)
 */
export function getValueONestedObjectFromPath(obj, path) {
    const keys = path.split('.');

    let current = obj;
    for (let key of keys) {
        if (!current?.hasOwnProperty(key)) {
            return undefined
        }
        current = current[key];
    }
    return current;
}