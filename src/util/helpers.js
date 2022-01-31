import i18n from 'i18next';

export function removeEmpty(array) {
  return array.filter((item) => item !== null && typeof item !== 'undefined');
}

export function getLastWord(array) {
  const lastItem = array.at(-1);
  if (!lastItem?.length) return false;
  return lastItem.map((item) => item.letter);
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

export function getLanguageName(code) {
  const { t } = i18n;
  switch (code) {
    case 'en':
      return t('English');
    case 'nl':
      return t('Dutch');
    default:
      return t('Unknown');
  }
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function getOnlyLetters(guesses) {
  guesses.map((row) => row.map((letter) => letter.letter));
}

export function getWrongLetters(guess, word) {
  return guess.flatMap((entry) => {
    if (!word.includes(entry)) {
      return entry;
    }
    return [];
  });
}
