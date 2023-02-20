// importing passport library //
const passport = require('passport');
// LocalStradegy of passport //
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    (email, password, done) => {
        // find a user and establish the identity 
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log('error in finding user-->passport');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('invalid username/password->');
                return done(null, false);
            }
            return done(null, user);
        })
    }
))

// serializing the user to decide whick key is kept in the cookies 
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// deserializing the user from the key int the cookies 
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('error in finding user-->passport');
            return done(err);
        }
        return done(null, user);
    })
})

//check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is sign-in , then pass on the request to the next function(controller action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not sign-in
    return res.redirect('/users/register');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // req .uesr contains the current signin user from the session cookie 
        // and we are sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;