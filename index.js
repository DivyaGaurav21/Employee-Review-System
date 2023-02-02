const express = require('express');
const port = 7000;
const app = express();

app.get('/', (req, res) => {
    res.send("Divya Gaurav")
})

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server ${err}`)
    }
    console.log(`Yeah :) Express server is Running on port: ${port}`)
})