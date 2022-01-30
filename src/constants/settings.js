export const TIMING = 200; // Animation timing in ms

export const DEFAULTSTATS = {
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  gamesWon: 0,
  gamesLost: 0,
};

export const DEFAULTSTATE = {
  hiddenWord: '',
  status: 'new',
  showIntro: true,
  showLanguage: false,
  guesses: [],
  currentGuess: '',
  wrongLetters: [],
  isGameLost: false,
  isGameWon: false,
};
