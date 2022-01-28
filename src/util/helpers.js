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
    result.push(i);
  }
  return result;
}

export function getLastWordAsString(array) {
  const lastItem = array.at(-1);
  if (!lastItem?.length) return false;
  const letters = lastItem.map((item) => item.letter);
  return letters.join('');
}

export function isCharacter(e) {
  return e.code.substr(0, 3) === 'Key';
}

export function createQueryString(data) {
  return Object.keys(data).map((key) => {
    let val = data[key];
    if (val !== null && typeof val === 'object') val = createQueryString(val);
    return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`;
  }).join('&');
}

export function getOnlyLetters(guesses) {
  guesses.map((row) => row.map((letter) => letter.letter));
}
