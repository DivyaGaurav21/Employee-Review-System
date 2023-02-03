const express = require('express');
const port = 7000;
const app = express();

// ________________DataBase Configuration___________________//
const db = require('./config/mongoose');

//________________Setup for View(EJS) templet_______________//
app.set('view engine', 'ejs');
app.set('views', './views');

//___________________layout of ejs_________________________//
const expressLayouts = require('express-ejs-layouts');

//___to render css and script in deciplined manner in DOM__//
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//________________ for static files________________________//
app.use(express.static('./assets'));
app.use(expressLayouts);


//_______________for getting form data_____________________//
// app.use(express.urlencoded());
const bodyParser = require('body-parser');

// parse application/form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server ${err}`);
    }
    console.log(`Yeah :) Express server is Running on port: ${port}`);
})