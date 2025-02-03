/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof (size) !== "number") {return string;}
  let counter;
  let prevChar;
  return string.split('').reduce((acc, char) => {
    const compareChar = char === prevChar ? counter++ : counter = 1;
    prevChar = char;
    return counter <= size ? acc + char : acc;
  }, '');
}
