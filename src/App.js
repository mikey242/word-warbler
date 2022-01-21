import './App.css';
import { WORDS } from './constants/words';
import { Grid } from './components/Grid';
import { Component } from 'react';
import { removeEmpty } from './util/helpers';
import { Button } from './components/Button';

class App extends Component {

  constructor(props) {
    super()

    this.state = {
      isGameWon: false,
      isGameLost: false,
      guesses: [],
      hiddenWord: this.getHiddenWord(),
      current: ""
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    this.createEventListeners()
  }

  createEventListeners() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  getHiddenWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
  }

  isValidGuess() {
    return WORDS.includes(this.state.current.toLowerCase())
  }

  handleKeyPress(e) {
    // Add character
    if(e.code.substr(0,3) === "Key") {
      this.handleCharacter(e.key)
    }

    // Delete character
    if(e.key === "Backspace") {
      this.handleDelete()
    }

    // Submit entry
    if(e.key === "Enter") {
      this.handleSubmit()
    }
  }

  handleDelete() {
    if(this.state.current.length < 0) return
    this.setState({
      current: this.state.current.slice(0, -1)
    })
  }

  handleSubmit() {
    if(this.state.current.length < 5) return
    this.checkGuess()
  }

  handleCharacter(char) {
    if(this.state.current.length > 4 || this.state.isGameLost || this.state.isGameWon) return
    this.setState({
      current: this.state.current + char.toUpperCase()
    })
  }

  checkGuess() {
    // Check if guess is a valid word
    if (!this.isValidGuess()) return

    // Get guess letters as array
    let guess = this.state.current.split("")
    let hiddenWord = this.state.hiddenWord.split("")

    let current = []

    // Check exact matches.
    guess.forEach((letter, i) => {
      current[i] = {}
      current[i].letter = letter
      if(hiddenWord[i] === letter) {
        current[i].status = 2
        hiddenWord[i] = null
        guess[i] = null
      }
    })

    // Check if answer is correct
    if(this.isCorrect()) {
      this.setState({
        guesses: [...this.state.guesses, current],
        isGameWon: true,
        current: ""
      })
      return
    }

    // Clean empty values.
    hiddenWord = removeEmpty(hiddenWord)

    // Check remaining letters for presence.
    guess.forEach((letter,i ) => {
      if(letter === null) return
      let index = hiddenWord.indexOf(letter)
      if(index >= 0) {
        current[i].status = 1
        hiddenWord[index] = null
      } else {
        current[i].status = 0
      }
    })

    // Save result to state.
    this.setState({
      guesses: [...this.state.guesses, current],
      current: ""
    })

    if(this.state.guesses.length === 6) {
      this.setState({
        isGameLost: true
      })
    }
  }

  isCorrect() {
    return this.state.current === this.state.hiddenWord
  }

  reset() {
    this.setState({
      isGameWon: false,
      isGameLost: false,
      hiddenWord: this.getHiddenWord(),
      guesses: [],
      current: ""
    })
  }

  render() {
    return (
      <div className='container max-w-md mx-auto px-5 text-center'>
        <h1 className="text-3xl font-bold underline my-5">
          Word Game
        </h1>
  
        <Grid
          current={this.state.current}
          guesses={this.state.guesses}
        />
        <br/>
        {this.state.isGameWon &&
          <p>You win!</p>
        }
        {this.state.isGameLost &&
          <p>You lose! The hidden word was: <strong>{this.state.hiddenWord}</strong></p>
        }
        {(this.state.isGameWon || this.state.isGameLost) &&
          <div className='mt-3'>
            <Button label="Play again" onClick={this.reset}/>
          </div>
        }
  
      </div>
    );
  }
}

export default App;
