/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');
  return (obj) => {
    return keys.reduce((acc, key) => acc && Object.hasOwn(acc, key) ? acc[key] : undefined, obj);
  };
}
