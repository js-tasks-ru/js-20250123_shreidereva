/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const sortMethod = [...arr].sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }));
  switch (param) {
    case "asc":
      return sortMethod;
    case "desc":
      return sortMethod.reverse();
    default: break;
  }
}
