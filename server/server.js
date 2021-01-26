const express = require('express')

const app = express()

const initialData = []
const words_array = ["Wolf", "Lion", "Cat", "Dog", "Dinosaur", "Eagle", "Dolphin", "Shark"]
const maxMistakes = 10
var lastId = 0;

var getRandomWord = function() {
    return words_array[Math.floor(Math.random() * words_array.length)]
}

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

app.get('/api/game', (req, res) => {
    var newGame = {
        _id: lastId++,
        word: getRandomWord(),
        mistakesMade: 0,
        maxMistakes: maxMistakes,
        guessedLetters: [],
        gameOver: false }

    initialData.push(newGame)
    res.json(newGame)
})

app.get('/api/game/:id/:letter', (req, res) => {
    const gameId = parseInt(req.params.id)
    const guessedLetter = req.params.letter
    const gameFound = initialData.find(u => u._id === gameId);

    if (gameFound) {
        gameFound.guessedLetters.push(guessedLetter)
        gameFound.mistakesMade = gameFound.mistakesMade + (gameFound.word.includes(guessedLetter) ? 0 : 1)
        gameFound.gameOver = gameFound.mistakesMade >= maxMistakes
    }
    console.log(initialData)
    res.json({mistakesMade: gameFound.mistakesMade, guessedLetters: gameFound.guessedLetters, gameOver: gameFound.gameOver})
})

app.listen(5000, console.log("SERVER RUNNING ON port 5000"))