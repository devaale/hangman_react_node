const express = require('express')

const app = express()

const initialData = []
const words_array = ["Wolf", "Lion", "Cat", "Dog", "Dinosaur", "Eagle", "Dolphin", "Shark"]
const maxMistakes = 10
var lastId = 0;

var getRandomWord = function() {
    return words_array[Math.floor(Math.random() * words_array.length)]
}

var countCorrectLetters = function(guessedLetters, word) {
    var sum = 0;
    guessedLetters.forEach(letter => sum += (word.toLowerCase().match(new RegExp(letter, "g")) || []).length);
    return sum
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
        gameOver: false,
        gameWon: false }

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
        let correctLetters = countCorrectLetters(gameFound.guessedLetters, gameFound.word)
        console.log("RAIDES ATSPETOS")
        console.log(correctLetters)
        console.log("TURIMAS DYDIS:")
        console.log(gameFound.word.length)
        gameFound.gameWon = correctLetters >= gameFound.word.length
        console.log("ZAIDIMAS LAIMETAS ?")
        console.log(gameFound.gameWon)
    }
    res.json({
        mistakesMade: gameFound.mistakesMade,
        guessedLetters: gameFound.guessedLetters,
        gameOver: gameFound.gameOver,
        gameWon: gameFound.gameWon
    })
})

app.listen(5000, console.log("SERVER RUNNING ON port 5000"))