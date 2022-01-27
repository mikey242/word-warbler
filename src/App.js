import "./App.css";
import i18n from "i18next";
import { WORDS } from "./constants/words";
import { Grid } from "./components/grid/Grid";
import { useEffect, useState } from "react";
import { removeEmpty } from "./util/helpers";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/Modal";
import { Bar } from "./components/Bar";
import { useTranslation } from "react-i18next";
import { TIMING } from "./constants/settings";
import { Notification } from "./components/Notification";

function App() {
  const { t } = useTranslation();
  const [wordList, setWordList] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isNotWord, setIsNotWord] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [hiddenWord, setHiddenWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [stats, setStats] = useState(
    JSON.parse(localStorage.getItem("stats")) ?? {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    }
  );

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      setWordList(WORDS[lng.substring(0, 2)]);
    });
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  useEffect(() => {
    if (wordList.length && !isGameWon && !isGameLost) {
      const word =
        wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
      setHiddenWord(word);
      console.log(word, i18n.language);
    }
  }, [wordList, isGameLost, isGameWon]);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const latest = guesses
      .at(-1)
      ?.map((item) => {
        return item.letter;
      })
      .join("");
    if (latest === hiddenWord) {
      setStats((prev) => ({
        ...prev,
        [guesses.length]: prev[guesses.length]++,
      }));

      return setTimeout(() => {
        setIsGameWon(true);
      }, TIMING * 100 * 5);
    }

    if (guesses.length > 5) {
      return setTimeout(() => {
        setIsGameLost(true);
      }, TIMING * 100 * 5);
    }
  }, [guesses, hiddenWord]);

  const isWord = () => {
    if (wordList.includes(currentGuess.toLowerCase())) return true;
    setIsNotWord(true);
    setTimeout(() => {
      setIsNotWord(false);
    }, 1000);
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
    setGuesses([]);
    setCurrentGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-w-[600px] mx-auto my-0">
      <Bar reset={reset} />
      <Grid current={currentGuess} guesses={guesses} />
      <div className="relative">
        {isNotWord && <Notification message={t("Word not in list")} />}
      </div>
      <Keyboard
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCharacter={handleCharacter}
      />
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
            <>
              <p>
                <span>{t("The hidden word was: ")}</span>
                <strong>{hiddenWord}</strong>
              </p>
              <p>
                <span>{t("Number of tries: ")}</span>
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
                          (value /
                            Object.values(stats).reduce((a, b) => a + b)) *
                            100 +
                          "%",
                      }}
                      className="h-full bg-green-500 dark:bg-purple-600 mr-auto"
                    ></div>
                    <div className="ml-2 text-xs">{value}</div>
                  </div>
                ))}
              </div>
            </>
          }
          buttonLabel={t("New game")}
          onClickButton={reset}
        />
      )}
    </div>
  );
}

export default App;
