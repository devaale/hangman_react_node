import React, { Component } from 'react';
import axios from 'axios'

class Game extends Component  {

    constructor(props){ 
        super(props) 

        this.state = {
            gameData : [],
            guessedLetters : [],
            mistakesMade: 0
        }
    }

    componentDidMount() {
        axios.get(`/api/game`).then(res => {
            console.log(res);
            this.setState({gameData: res.data})
        })
    }

    handleCheckLetter = e => {
        let letter = e.target.value;
        axios.get(`/api/game/${this.state.gameData._id}/${letter}`).then(res => {
            this.setState({
                mistakesMade: res.data.mistakesMade,
                guessedLetters: res.data.guessedLetters,
            })
        })
    }

    displayWord() {
        return String(this.state.gameData.word).split("").map(letter => (this.state.guessedLetters.includes(letter.toLowerCase()) ? letter : " _ "));
    }

    generateLetterButtons() {
        var alphabet = ""
        for(var i=9;++i<36;) alphabet+=i.toString(36)

        return alphabet.split("").map(letter => (
            <button key={letter} value={letter} onClick={this.handleCheckLetter}>
                {letter}
            </button>
        ));
    }

    render() {
        let gameLetterButtons = this.generateLetterButtons();

        return (
            <div className="App">
                <h1>Hangman Game</h1>
                <h2>Current word: {this.state.gameData.word} and ID: {this.state.gameData._id}</h2>
                <p>Missed guesses: {this.state.mistakesMade} out of {this.state.gameData.maxMistakes} </p>
                <p> {this.displayWord()} </p>
                <p>{gameLetterButtons}</p>
                <button>
                    TRY AGAIN 
                </button> 
            </div>
        )
    }
}

export default Game