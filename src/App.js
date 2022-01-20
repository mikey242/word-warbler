import './App.css';
import { Grid } from './components/Grid';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super()

    this.state = {
      result: '',
      hiddenWord: 'HELLO',
      guesses: [],
      current: []
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.createEventListeners()
  }

  createEventListeners() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress(e) {
    // Add character
    if(e.code.substr(0,3) === "Key" && this.state.current.length < 5) {
      this.setState({
        current: [
          ...this.state.current,
          {letter: e.key.toUpperCase()}
        ]
      })
    }

    // Delete character
    if(e.key === "Backspace" && this.state.current.length > 0) {
      this.setState({
        current: this.state.current.slice(0, -1)
      })
    }

    // Submit entry
    if(e.key === "Enter") {
      // Bail if not all letters filled in
      if(this.state.current.length < 5) return
      this.checkGuess()
    }
  }

  /**
   * Finds index of correct letters.
   *
   * @param {array} guess Word entered as a guess.
   * @param {array} hiddenWord The hidden word.
   * @return {array} array of indexs of correct letters.
   */
  findCorrect(guess, hiddenWord) {
    let current = [...this.state.current]

    // Check exact matches.
    guess.forEach((letter, i) => {
      if(hiddenWord[i] === letter) {
        current[i].correct = 2
        hiddenWord[i] = null
        guess[i] = null
      }
    })

    // Clean empty values.
    hiddenWord = this.removeEmpty(hiddenWord)

    // Check remaining letters for presence.
    guess.forEach((letter,i ) => {
      if(letter === null) return
      let index = hiddenWord.indexOf(letter)
      if(index >= 0) {
        current[i].correct = 1
        hiddenWord[index] = null
      } else {
        current[i].correct = 0
      }
    })

    // Save result to state.
    this.setState({
      guesses: [...this.state.guesses, current],
      current: []
    })
  }

  /**
   * Removes empty elements from array.
   *
   * @param {array} array Array to be cleaned.
   * @return {array} new arra.
   */
  removeEmpty(array) {
    let result = []
    for(let i of array) {
      i && result.push(i)
    }
    return result
  }

  checkGuess() {
    // Get guess letters as array
    let guess = this.state.current.map(a => a.letter)
    let hiddenWord = this.state.hiddenWord.split("")

    this.findCorrect(guess, hiddenWord)
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
  
      </div>
    );
  }
}

export default App;
