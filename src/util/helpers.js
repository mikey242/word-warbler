/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/**
* Removes empty elements from array.
*
* @param {array} array Array to be cleaned.
* @return {array} new arra.
*/
export function removeEmpty(array) {
  const result = [];
  for (const i of array) {
    // eslint-disable-next-line no-unused-expressions
    i && result.push(i);
  }
  return result;
}
