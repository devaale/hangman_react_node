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

    handleClick = () => { 
        axios.get(`/api/game/${this.state.gameData._id}/${'L'}`).then(res => {
            this.setState({
                mistakesMade: res.data.mistakesMade,
                guessedLetters: res.data.guessedLetters,
            })
        })
    }

    render() {

        return (
            <div className="App">
                <h1>Hangman Game</h1>
                <h2>Current word: {this.state.gameData.word} and ID: {this.state.gameData._id}</h2>
                <p>Missed guesses: {this.state.mistakesMade} out of {this.state.gameData.maxMistakes} </p>
                <p> { this.state.gameData.word } </p>
                <p>LETTERS</p>
                <button onClick={this.handleClick}>
                    TRY AGAIN 
                </button> 
            </div>
        )
    }
}

export default Game