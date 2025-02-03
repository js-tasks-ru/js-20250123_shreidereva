/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (!arr || !arr.length) {return [];}
  return arr.sort((a, b) => a - b).filter((item, index) => arr.indexOf(item) === index);
}

