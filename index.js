const express = require('express');
const port = 3000;
const app = express();

// _______cookie-parser middleware to handle cookies________//
const cookieParser = require('cookie-parser');

//___________________layout of ejs_________________________//
const expressLayouts = require('express-ejs-layouts');

// ________________DataBase Configuration___________________//
const db = require('./config/mongoose');


//__________used for session cookie_________________________//
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// store user authentication because when server restart no need to login again
const MongoStore = require('connect-mongo');

const bodyParser = require('body-parser');
//_______________for getting form data_____________________//
// app.use(express.urlencoded());
// parse application/form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

//________________ for static files________________________//
app.use(express.static('./assets'));

//________________Setup for View(EJS) templet_______________//
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cookieParser());

// _____________________using express layout________________//
app.use(expressLayouts);

//___to render css and script in deciplined manner in DOM__//
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "ERS",
    // change secret during before deployment in production 
    secret: 'ERS_test',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://divyagaurav:divyagaurav@cluster1.rj5rnxe.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))


// ________________________use passport___________________________________//
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// ________________router root setup____________________________________//
app.use('/', require('./routes/index'));


// _________________listing on port_____________________________________//
app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server ${err}`);
    }
    console.log(`Yeah :) Express server is Running on port: ${port}`);
})