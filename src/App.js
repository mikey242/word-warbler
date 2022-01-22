import "./App.css";
import { WORDS } from "./constants/words";
import { Grid } from "./components/grid/Grid";
import { Component } from "react";
import { removeEmpty } from "./util/helpers";
import { Button } from "./components/Button";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Modal } from "./components/Modal";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      isGameWon: false,
      isGameLost: false,
      isNotWord: false,
      guesses: [],
      hiddenWord: this.getHiddenWord(),
      current: "",
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.reset = this.reset.bind(this);
    this.clearIncorrect = this.clearIncorrect.bind(this);
  }

  componentDidMount() {
    this.createEventListeners();
    console.log(this.state.hiddenWord);
  }

  createEventListeners() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  getHiddenWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  }

  isValidGuess() {
    if (WORDS.includes(this.state.current.toLowerCase())) return true;
    this.setState({
      isNotWord: true,
    });
    return false;
  }

  handleKeyPress(e) {
    // Add character
    if (e.code.substr(0, 3) === "Key") {
      this.handleCharacter(e.key);
    }

    // Delete character
    if (e.key === "Backspace") {
      this.handleDelete();
    }

    // Submit entry
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleDelete() {
    if (this.state.current.length < 0) return;
    this.setState({
      current: this.state.current.slice(0, -1),
    });
  }

  handleSubmit() {
    if (this.state.current.length < 5) return;
    this.checkGuess();
  }

  handleCharacter(char) {
    if (
      this.state.current.length > 4 ||
      this.state.isGameLost ||
      this.state.isGameWon
    )
      return;
    this.setState({
      current: this.state.current + char.toUpperCase(),
    });
  }

  checkGuess() {
    // Check if guess is a valid word.
    if (!this.isValidGuess()) return;

    // Get letters as array.
    let guess = this.state.current.split("");
    let hiddenWord = this.state.hiddenWord.split("");

    // Check exact matches.
    let current = [];
    guess.forEach((letter, i) => {
      current[i] = {};
      current[i].letter = letter;
      if (hiddenWord[i] === letter) {
        current[i].status = 2;
        hiddenWord[i] = null;
        guess[i] = null;
      }
    });

    // Check if answer is correct.
    if (this.isCorrect()) {
      return this.setState({
        guesses: [...this.state.guesses, current],
        isGameWon: true,
        current: "",
      });
    }

    // Clean empty values.
    hiddenWord = removeEmpty(hiddenWord);

    // Check remaining letters for presence.
    guess.forEach((letter, i) => {
      if (letter === null) return;
      let index = hiddenWord.indexOf(letter);
      if (index >= 0) {
        current[i].status = 1;
        hiddenWord[index] = null;
      } else {
        current[i].status = 0;
      }
    });

    // Save result to state.
    this.setState(
      {
        guesses: [...this.state.guesses, current],
        current: "",
      },
      () => {
        if (this.state.guesses.length > 5) {
          this.setState({
            isGameLost: true,
          });
        }
      }
    );
  }

  clearIncorrect() {
    this.setState({ isNotWord: false });
  }

  isCorrect() {
    return this.state.current === this.state.hiddenWord;
  }

  reset() {
    this.setState({
      isGameWon: false,
      isGameLost: false,
      hiddenWord: this.getHiddenWord(),
      guesses: [],
      current: "",
    });
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-between h-full">
        <h1 className="text-3xl font-bold underline my-5">Word Game</h1>
        <Grid current={this.state.current} guesses={this.state.guesses} />
        <Keyboard
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleCharacter={this.handleCharacter}
        />
        {this.state.isNotWord && (
          <Modal
            header="Not a word"
            body={
              <>
                <strong>"{this.state.current}"</strong>
                <span> is not a word!</span>
              </>
            }
            buttonLabel={"OK"}
            onClickButton={this.clearIncorrect}
          />
        )}

        {this.state.isGameLost && (
          <Modal
            header="Game over"
            body={
              <>
                <span>The hidden word was: </span>
                <strong>{this.state.hiddenWord}</strong>
              </>
            }
            buttonLabel={"Try again"}
            onClickButton={this.reset}
          />
        )}
        {this.state.isGameWon && (
          <Modal
            header="You Win!"
            body={
              <>
                <span>Number of tries: </span>
                {this.state.guesses.length}
              </>
            }
            buttonLabel={"Play again"}
            onClickButton={this.reset}
          />
        )}
      </div>
    );
  }
}

export default App;
