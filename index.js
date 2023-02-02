const express = require('express');
const port = 7000;
const app = express();


const db = require('./config/mongoose');






app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server ${err}`);
    }
    console.log(`Yeah :) Express server is Running on port: ${port}`);
})