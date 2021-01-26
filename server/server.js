const express = require('express')

const app = express()

const initialData = []
const words_array = ["Wolf", "Lion", "Cat", "Dog", "Dinosaur", "Eagle", "Dolphin", "Shark"]
var lastId = 0;

var getRandomWord = function() {
    return words_array[Math.floor(Math.random() * words_array.length)]
}

app.get('/api/game', (req, res) => {
    var newGame = { _id: lastId++, word: getRandomWord() }
    initialData.push(newGame)
    console.log(initialData);
    res.json(newGame)
})

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

app.listen(5000, console.log("SERVER RUNNING ON port 5000"))