import './App.css';
import i18n from 'i18next';
import {
  React, Suspense, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import WORDS from './constants/words';
import Grid from './components/grid/Grid';
import { removeEmpty } from './util/helpers';
import Keyboard from './components/keyboard/Keyboard';
import Modal from './components/Modal';
import Bar from './components/Bar';
import { TIMING } from './constants/settings';
import Notification from './components/Notification';
import useLocalStorage from './util/storage';

function App() {
  const { t } = useTranslation();
  const [wordList, setWordList] = useState();
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isNotWord, setIsNotWord] = useState();
  const [gameState, setGameState] = useLocalStorage('state', 'new');
  const [showIntro, setShowIntro] = useLocalStorage('intro', true);
  const [guesses, setGuesses] = useLocalStorage('guesses', []);
  const [hiddenWord, setHiddenWord] = useLocalStorage('hidden', '');
  const [currentGuess, setCurrentGuess] = useLocalStorage('current', '');
  const [stats, setStats] = useLocalStorage('stats', {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const getHiddenWord = () => wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

  useEffect(() => {
    setWordList(WORDS[i18n.language]);
  }, [i18n.language]);

  useEffect(() => {
    if (!isGameWon && !isGameLost && (gameState !== 'in_progress')) {
      setHiddenWord(getHiddenWord);
    }
  }, [wordList, isGameLost, isGameWon]);

  useEffect(() => {
    const latest = guesses
      .at(-1)
      ?.map((item) => item.letter)
      .join('');
    if (latest === hiddenWord) {
      setStats((prev) => ({
        ...prev,
        [guesses.length]: prev[guesses.length] + 1,
      }));
      setGameState('win');
      setTimeout(() => {
        setIsGameWon(true);
      }, TIMING * 100 * 5);
    }

    if (guesses.length > 5) {
      setTimeout(() => {
        setIsGameLost(true);
      }, TIMING * 100 * 5);
    }
    // return clearTimeout(timer);
  }, [guesses, hiddenWord]);

  const isWord = () => {
    if (wordList.includes(currentGuess.toLowerCase())) return true;
    setIsNotWord(true);
    setTimeout(() => {
      setIsNotWord(false);
    }, 1000);
    return false;
  };

  const isRowComplete = () => currentGuess.length > 4;

  const handleDelete = () => {
    if (currentGuess.length < 0) return;
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleCharacter = (char) => {
    if (isRowComplete() || isGameLost || isGameWon) return;
    setGameState('in_progress');
    setCurrentGuess(currentGuess + char.toUpperCase());
  };

  const handleSubmit = () => {
    // Check if guess is valid.
    if (!isRowComplete() || !isWord()) return;

    // Get letters as array.
    const guessArray = currentGuess.split('');
    let hiddenWordArray = hiddenWord.split('');

    // Clear current guess.
    setCurrentGuess('');

    // Check exact matches.
    const current = [];
    guessArray.forEach((letter, i) => {
      current[i] = {};
      current[i].letter = letter;
      if (hiddenWordArray[i] === letter) {
        current[i].status = 2;
        hiddenWordArray[i] = null;
        guessArray[i] = null;
      }
    });

    // Clean empty values.
    hiddenWordArray = removeEmpty(hiddenWordArray);

    // Check remaining letters for presence.
    guessArray.forEach((letter, i) => {
      if (letter === null) return;
      const index = hiddenWordArray.indexOf(letter);
      if (index >= 0) {
        current[i].status = 1;
        hiddenWordArray[index] = null;
      } else {
        current[i].status = 0;
      }
    });

    // Save result to state.
    setGuesses([...guesses, current]);
  };

  const handleKeyPress = (e) => {
    // Add character
    if (e.code.substr(0, 3) === 'Key') {
      handleCharacter(e.key);
    }

    // Delete character
    if (e.key === 'Backspace') {
      handleDelete();
    }

    // Submit entry
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const reset = () => {
    setIsGameWon(false);
    setIsGameLost(false);
    setGameState('new');
    setGuesses([]);
    setCurrentGuess('');
    setHiddenWord(getHiddenWord());
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    reset();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col items-center justify-between h-full max-w-[600px] mx-auto my-0">
        <Bar setShowIntro={setShowIntro} changeLanguage={changeLanguage} />
        <Grid current={currentGuess} guesses={guesses} />
        <div className="relative">
          {isNotWord && <Notification message={t('Word not in list')} />}
        </div>
        <Keyboard
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleCharacter={handleCharacter}
        />
        {showIntro && (
        <Modal
          header={t('How to play')}
          body={(
            <>
              <p>
                {t('Your goal is to guess the 5 letter hidden word.')}
              </p>
              <p>
                {t("You have a total of 6 tries to do this. After each guess the letters will turn either 'gray', 'orange' or 'green'.")}
              </p>
              <br />
              <ul className="ml-5 list-disc">
                <li>{t('Gray - letter is not in secret word')}</li>
                <li>{t('Orange - letter IS in secret word but in another position')}</li>
                <li>{t('Green - letter is in correct position')}</li>
              </ul>
            </>
          )}
          buttonLabel={t('Got it!')}
          onClickButton={() => setShowIntro(false)}
        />
        )}
        {isGameLost && (
        <Modal
          header={t('Game over')}
          body={(
            <p>
              <span>{t('The hidden word was: ')}</span>
              <strong>{hiddenWord}</strong>
            </p>
          )}
          buttonLabel={t('Try again')}
          onClickButton={reset}
        />
        )}
        {isGameWon && (
        <Modal
          header={t('You win!')}
          body={(
            <>
              <p>
                <span>{t('The hidden word was: ')}</span>
                <strong>{hiddenWord}</strong>
              </p>
              <p>
                <span>{t('Number of tries: ')}</span>
                {guesses.length}
              </p>
              <div className="mt-5">
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex h-3 mb-3 font-mono items-center"
                  >
                    <div className="mr-2 font-bold">{key}</div>
                    <div
                      style={{
                        flexBasis:
                          `${(value
                            / Object.values(stats).reduce((a, b) => a + b))
                            * 100
                          }%`,
                      }}
                      className="h-full bg-green-500 dark:bg-purple-600 mr-auto"
                    />
                    <div className="ml-2 text-xs">{value}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          buttonLabel={t('New game')}
          onClickButton={reset}
        />
        )}
      </div>
    </Suspense>
  );
}

export default App;
