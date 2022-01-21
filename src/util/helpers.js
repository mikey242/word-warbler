/**
* Removes empty elements from array.
*
* @param {array} array Array to be cleaned.
* @return {array} new arra.
*/
export function removeEmpty(array) {
 let result = []
 for(let i of array) {
   i && result.push(i)
 }
 return result
}