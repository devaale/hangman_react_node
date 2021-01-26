import React, { Component } from 'react';
import axios from 'axios'
import './Game.css';

class Game extends Component  {

    constructor(props){ 
        super(props) 

        this.state = {
            gameData : [],
            guessedLetters : [],
            mistakesMade: 0,
            gameOver: false,
            gameWon: false,
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
                gameOver: res.data.gameOver,
                gameWon: res.data.gameWon,
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
            <button key={letter} value={letter} onClick={this.handleCheckLetter} disabled={this.state.guessedLetters.includes(letter.toLowerCase())} className="btn-letter">
                {letter}
            </button>
        ));
    }

    handleTryAgain = () => { 
        axios.get(`/api/game`).then(res => {
            this.setState({
                gameData: res.data,
                guessedLetters: [],
                mistakesMade: 0,
                gameOver: false,
                gameWon: false,
            })
        })
    }

    render() {
        let gameLetterButtons = this.generateLetterButtons();

        if (this.state.gameOver) {
            gameLetterButtons = "YOU LOST, WORD TO GUESS WAS: " + this.state.gameData.word 
        }

        if (this.state.gameWon) {
            gameLetterButtons = "YOU WON"
        }

        return (
            <div className="App">
                <h1 className="heading-primary">Hangman Game</h1>
                <p className="guess-info">Missed guesses: {this.state.mistakesMade} out of {this.state.gameData.maxMistakes} </p>
                <p className="word"> {this.displayWord()} </p>
                <p className={(this.state.gameOver || this.state.gameWon) ? "ending game-over" : "end game-won"}> {gameLetterButtons} </p>
                <button className="btn-try" onClick={this.handleTryAgain} hidden={(this.state.gameOver || this.state.gameWon) ? false : true}>
                    TRY AGAIN 
                </button> 
            </div>
        )
    }
}

export default Game