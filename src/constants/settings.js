export const TIMING = 2;

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
  isGameLost: false,
  isGameWon: false,
};
