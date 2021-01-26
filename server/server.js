const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

app.listen(5000, console.log("SERVER RUNNING ON port 5000"))