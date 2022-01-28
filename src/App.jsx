import './App.css';
import i18n from 'i18next';
import {
  React, Suspense, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import WORDS from './constants/words';
import Grid from './components/grid/Grid';
import { getLastWordAsString, isCharacter, removeEmpty } from './util/helpers';
import Keyboard from './components/keyboard/Keyboard';
import Bar from './components/Header';
import { TIMING } from './constants/settings';
import Notification from './components/Notification';
import useLocalStorage from './util/storage';
import WinModal from './components/modals/WinModal';
import LoseModal from './components/modals/LoseModal';
import HelpModal from './components/modals/HelpModal';

function App() {
  const { t } = useTranslation();
  const [wordList, setWordList] = useState();
  const [isNotWord, setIsNotWord] = useState();
  const [gameState, setGameState] = useLocalStorage('state', {
    hiddenWord: '',
    status: 'new',
    showIntro: true,
    guesses: [],
    currentGuess: '',
    isGameLost: false,
    isGameWon: false,
  });
  const [stats, setStats] = useLocalStorage('stats', {
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
  });

  const getHiddenWord = () => wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

  useEffect(() => {
    setWordList(WORDS[i18n.language]);
  }, [i18n.language]);

  useEffect(() => {
    if (!gameState.isGameWon && !gameState.isGameLost && (gameState.status !== 'in_progress')) {
      setGameState((prev) => ({
        ...prev,
        hiddenWord: getHiddenWord(),
      }));
    }
  }, [wordList, gameState.isGameLost, gameState.isGameWon]);

  useEffect(() => {
    const { guesses, hiddenWord, status } = gameState;

    const latest = getLastWordAsString(guesses);

    // Win conditions.
    if (latest === hiddenWord && status === 'in_progress') {
      setStats((prev) => ({
        ...prev,
        gamesWon: stats.gamesWon + 1,
        guesses: {
          ...prev.guesses,
          [guesses.length]: prev.guesses[guesses.length] + 1,
        },
      }));
      setTimeout(() => {
        setGameState((prev) => ({ ...prev, status: 'end', isGameWon: true }));
      }, TIMING * 100 * 5);
      return;
    }

    // Lose conditions.
    if (guesses.length > 5 && status === 'in_progress') {
      setStats((prev) => ({
        ...prev,
        gamesLost: stats.gamesLost + 1,

      }));
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev, isGameLost: true, status: 'end', gamesLost: gameState.gamesLost + 1,
        }));
      }, TIMING * 100 * 5);
    }
  }, [gameState.guesses]);

  const isWord = () => {
    if (wordList.includes(gameState.currentGuess.toLowerCase())) return true;
    setIsNotWord(true);
    setTimeout(() => {
      setIsNotWord(false);
    }, 1000);
    return false;
  };

  const isRowComplete = () => gameState.currentGuess.length > 4;

  const handleDelete = () => {
    const { currentGuess } = gameState;
    if (currentGuess.length < 0) return;
    setGameState((prev) => ({
      ...prev,
      currentGuess: currentGuess.slice(0, -1),
    }));
  };

  const handleCharacter = (char) => {
    if (isRowComplete() || gameState.isGameLost || gameState.isGameWon) return;
    setGameState((prev) => ({
      ...prev,
      status: 'in_progress',
      currentGuess: gameState.currentGuess + char.toUpperCase(),
    }));
  };

  const handleSubmit = () => {
    // Check if guess is valid.
    if (!isRowComplete() || !isWord()) return;

    // Get letters as array.
    const guessArray = gameState.currentGuess.split('');
    let hiddenWordArray = gameState.hiddenWord.split('');

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
    setGameState((prev) => ({
      ...prev,
      currentGuess: '',
      guesses: [...gameState.guesses, current],
    }));
  };

  const handleKeyPress = (e) => {
    // if (gameState.status === 'end') return;
    // Add character
    if (isCharacter(e)) {
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
    setGameState({
      isGameWon: false,
      isGameLost: false,
      status: 'new',
      guesses: [],
      currentGuess: '',
      hiddenWord: getHiddenWord(),
    });
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang, () => {
      reset();
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col items-center justify-between h-full max-w-[600px] mx-auto my-0">
        <Bar setGameState={setGameState} changeLanguage={changeLanguage} />
        <Grid current={gameState.currentGuess} guesses={gameState.guesses} />
        <div className="relative">
          {isNotWord && <Notification message={t('Word not in list')} />}
        </div>
        <Keyboard
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleCharacter={handleCharacter}
        />
        {gameState.showIntro && (
          <HelpModal
            onClickButton={() => setGameState((prev) => ({ ...prev, showIntro: false }))}
          />
        )}
        {gameState.isGameLost && (
          <LoseModal
            hiddenWord={gameState.hiddenWord}
            stats={stats}
            reset={reset}
          />
        )}
        {gameState.isGameWon && (
          <WinModal
            hiddenWord={gameState.hiddenWord}
            count={gameState.guesses.length}
            stats={stats}
            reset={reset}
          />
        )}
      </div>
    </Suspense>
  );
}

export default App;
