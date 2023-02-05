const User = require('../models/user')
const Review = require('../models/review')

module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('login', {
        title: "Login || ERS"
    });
}
module.exports.register = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('register', {
        title: "SignUp || ERS"
    });
}


//----------------Controller for Creating new User----------------//
module.exports.createUser = async (req, res) => {
    // console.log(req.body);
    try {
        if (req.body.password != req.body.password2) {
            console.log("password did not match");
            return res.redirect('/users/register');
        } 
        //______________first find the user in DB ________________//
        let user = await User.findOne({ email: req.body.emai });

        // ____________if user is not present in db_______________//
        if (user) {
            console.log("user already exist");
            return res.redirect('/users/register');
        } else {
        //_________if user is not present then create user________//
            await User.create({
                name: req.body.name,
                email: req.body.email,
                isAdmin: false,
                password: req.body.password
            })
            console.log('User created successfully');
            return res.redirect('/users/login');
        }
        //______________If try Block create Error_______________//
    } catch (error) {
        console.log(`error while creating User ${error}`);
        return res.redirect('register')
    }
}

// -----------------Creating Session of User--------------------//
module.exports.createSession = function (req, res) {
    // console.log(req.body);
    return res.redirect('/');
}


// --------------controller for logout user-------------------//
module.exports.destroySession = (req, res , done) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    console.log('Logeed Out');
    return res.redirect('/users/login');
}


module.exports.home = (req, res) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        console.log("not logged in");
        return res.redirect('/users/login');
    }

    // try {
    //     let user = await User.findById(req.user.id);
    // }

    res.render('home', {
        title: "Home || ERS"
    })
}
