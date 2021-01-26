import React, { Component } from 'react';
import axios from 'axios'

class Game extends Component  {

    constructor(props){ 
        super(props) 

        this.state = {
            gameData : [],
        }
    }

    componentDidMount() {
        axios.get(`/api/game`).then(res => {
            console.log(res);
            this.setState({gameData: res.data})
        })
    }

    render() {

        return (
            <div className="App">
                <h1>Hangman Game</h1>
                <h2>Current word: {this.state.gameData.word} and ID: {this.state.gameData._id}</h2>
                <p>Missed guesses: X out of Y</p>
                <p>WORD</p>
                <p>LETTERS</p>
                <button> 
                    TRY AGAIN 
                </button> 
            </div>
        )
    }
}

export default Game