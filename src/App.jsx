import './App.css';
import i18n from 'i18next';
import {
  React, Suspense, useEffect, useState, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import WORDS from './constants/words';
import Grid from './components/grid/Grid';
import {
  getLanguageName,
  getLastWord, getWrongLetters, isCharacter, onlyUnique,
} from './util/helpers';
import Keyboard from './components/keyboard/Keyboard';
import { DEFAULTSTATE, DEFAULTSTATS, TIMING } from './constants/settings';
import Notification from './components/Notification';
import useLocalStorage from './util/storage';
import WinModal from './components/modals/WinModal';
import LoseModal from './components/modals/LoseModal';
import HelpModal from './components/modals/HelpModal';
import LanguageModal from './components/modals/LanguageModal';
import Header from './components/Header';

function App() {
  const { t } = useTranslation();
  const [wordList, setWordList] = useState();
  const [showLanguage, setShowLanguage] = useState(false);
  const [notification, setNotification] = useState();
  const [rowError, setRowError] = useState(false);
  const [gameState, setGameState] = useLocalStorage('state', DEFAULTSTATE);
  const [stats, setStats] = useLocalStorage('stats', DEFAULTSTATS);
  const notificationTimer = useRef();
  const getHiddenWord = () => {
    const list = wordList.hidden;
    return list[Math.floor(Math.random() * list.length)].toUpperCase();
  };

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
    if (!guesses.length) return;
    setGameState((prev) => ({ ...prev, status: 'checking' }));
    let state = {};
    const latest = getLastWord(guesses);
    const wrongLetters = getWrongLetters(latest, hiddenWord);

    // Win conditions.
    if (latest.join('') === hiddenWord && status === 'in_progress') {
      state = { status: 'end', isGameWon: true };
      setStats((prev) => ({
        ...prev,
        gamesWon: stats.gamesWon + 1,
        guesses: {
          ...prev.guesses,
          [guesses.length]: prev.guesses[guesses.length] + 1,
        },
      }));
    } else if (guesses.length > 5 && status === 'in_progress') {
      state = { isGameLost: true, status: 'end', gamesLost: gameState.gamesLost + 1 };
      setStats((prev) => ({
        ...prev,
        gamesLost: stats.gamesLost + 1,
      }));
    }

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        ...state,
        wrongLetters: wrongLetters.concat(prev.wrongLetters).filter(onlyUnique),
      }));
    }, TIMING * 5);
  }, [gameState.guesses]);

  const newNotification = (message, cb = null) => {
    clearTimeout(notificationTimer.current);
    setNotification(message);
    notificationTimer.current = setTimeout(() => {
      setNotification('');
      if (cb && typeof cb === 'function') {
        cb();
      }
    }, 1000);
  };

  const isWord = () => {
    const { guessable, hidden } = wordList;
    const current = gameState.currentGuess.toLowerCase();
    if (guessable.includes(current) || hidden.includes(current)) return true;
    newNotification(t('Word not in list'), () => setRowError(false));
    setRowError(true);
    return false;
  };

  const isRowComplete = () => {
    if (gameState.currentGuess.length > 4) return true;
    newNotification(t('Not enough letters'), () => setRowError(false));
    setRowError(true);
    return false;
  };

  const handleDelete = () => {
    const { currentGuess } = gameState;
    if (currentGuess.length < 0) return;
    setGameState((prev) => ({
      ...prev,
      currentGuess: currentGuess.slice(0, -1),
    }));
  };

  const handleCharacter = (char) => {
    const { currentGuess } = gameState;
    if (currentGuess.length > 4) return;
    setGameState((prev) => ({
      ...prev,
      status: 'in_progress',
      currentGuess: currentGuess + char.toUpperCase(),
    }));
  };

  const handleSubmit = () => {
    // Check if guess is valid.
    if (!isRowComplete() || !isWord()) return;

    // Get letters as array.
    const guessArray = gameState.currentGuess.split('');
    const hiddenWordArray = gameState.hiddenWord.split('');

    // Check exact matches.
    const current = guessArray.flatMap((letter, i) => {
      let status = 0;
      if (hiddenWordArray[i] === letter) {
        status = 2;
        hiddenWordArray[i] = null;
        guessArray[i] = null;
      }
      return { letter, status };
    });

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
    const { isGameLost, isGameWon, status } = gameState;
    if (isGameLost || isGameWon || status === 'checking') return;
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
    setGameState((prev) => ({
      ...prev,
      isGameWon: false,
      isGameLost: false,
      status: 'new',
      guesses: [],
      wrongLetters: [],
      currentGuess: '',
    }));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang, () => {
      newNotification(t('languageChanged', { lang: getLanguageName(lang) }));
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
        <Header
          setGameState={setGameState}
          setShowLanguage={setShowLanguage}
        />
        <Grid rowError={rowError} current={gameState.currentGuess} guesses={gameState.guesses} />
        <Notification isShown={!!notification} message={notification ?? ''} />
        <Keyboard
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleCharacter={handleCharacter}
          wrongLetters={gameState.wrongLetters}
        />
        <HelpModal
          isOpen={gameState.showIntro}
          handleClose={() => setGameState((prev) => ({ ...prev, showIntro: false }))}
        />
        <LoseModal
          isOpen={gameState.isGameLost}
          hiddenWord={gameState.hiddenWord}
          stats={stats}
          handleClose={reset}
        />
        <WinModal
          isOpen={gameState.isGameWon}
          hiddenWord={gameState.hiddenWord}
          count={gameState.guesses.length}
          stats={stats}
          handleClose={reset}
        />
        <LanguageModal
          isOpen={showLanguage}
          changeLanguage={changeLanguage}
          handleClose={() => setShowLanguage(false)}
        />

      </div>
    </Suspense>
  );
}

export default App;
