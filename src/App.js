import "./App.css";
import { WORDS } from "./constants/words.en";
import { Grid } from "./components/grid/Grid";
import { useEffect, useState } from "react";
import { removeEmpty } from "./util/helpers";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/Modal";
import { Bar } from "./components/Bar";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isNotWord, setIsNotWord] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [hiddenWord, setHiddenWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    setHiddenWord(getHiddenWord());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  useEffect(() => {
    const latest = guesses
      .at(-1)
      ?.map((item) => {
        return item.letter;
      })
      .join("");
    if (latest === hiddenWord) {
      return setTimeout(() => {
        setIsGameWon(true);
      }, 1000);
    }

    if (guesses.length > 5) {
      return setTimeout(() => {
        setIsGameLost(true);
      }, 1000);
    }
  }, [guesses, hiddenWord]);

  const getHiddenWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  };

  const isWord = () => {
    if (WORDS.includes(currentGuess.toLowerCase())) return true;
    setIsNotWord(true);
    return false;
  };

  const rowComplete = () => {
    return currentGuess.length > 4;
  };

  const handleKeyPress = (e) => {
    // Add character
    if (e.code.substr(0, 3) === "Key") {
      handleCharacter(e.key);
    }

    // Delete character
    if (e.key === "Backspace") {
      handleDelete();
    }

    // Submit entry
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleDelete = () => {
    if (currentGuess.length < 0) return;
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleCharacter = (char) => {
    if (rowComplete() || isGameLost || isGameWon) return;
    setCurrentGuess(currentGuess + char.toUpperCase());
  };

  const handleSubmit = () => {
    // Check if guess is valid.
    if (!rowComplete() || !isWord()) return;

    // Get letters as array.
    let guessArray = currentGuess.split("");
    let hiddenWordArray = hiddenWord.split("");

    // Clear current guess.
    setCurrentGuess("");

    // Check exact matches.
    let current = [];
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
      let index = hiddenWordArray.indexOf(letter);
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

  const reset = () => {
    setIsGameWon(false);
    setIsGameLost(false);
    setHiddenWord(getHiddenWord());
    setGuesses([]);
    setCurrentGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-[600px] mx-auto my-0">
      <Bar />
      <Grid current={currentGuess} guesses={guesses} />
      <Keyboard
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCharacter={handleCharacter}
      />
      {isNotWord && (
        <Modal
          header={t("Not a word")}
          body={
            <p>
              <strong>"{currentGuess}" </strong>
              <span>{t("is not a word!")}</span>
            </p>
          }
          buttonLabel={t("OK")}
          onClickButton={() => setIsNotWord(false)}
        />
      )}
      {isGameLost && (
        <Modal
          header={t("Game over")}
          body={
            <p>
              <span>{t("The hidden word was: ")}</span>
              <strong>{hiddenWord}</strong>
            </p>
          }
          buttonLabel={t("Try again")}
          onClickButton={reset}
        />
      )}
      {isGameWon && (
        <Modal
          header={t("You win!")}
          body={
            <p>
              <span>{t("The hidden word was: ")}</span><strong>{hiddenWord}</strong><br/>
              <span>{t("Number of tries: ")}</span>
              {guesses.length}
            </p>
          }
          buttonLabel={t("New game")}
          onClickButton={reset}
        />
      )}
    </div>
  );
}

export default App;
