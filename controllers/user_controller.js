const User = require('../models/user')
const Review = require('../models/review')

module.exports.home = (req, res) => {
    res.send("Controller")
}

module.exports.login = (req, res) => {
    res.render('login')
}
module.exports.register = (req, res) => {
    res.render('register')
}
module.exports.createUser = async (req, res) => {
    console.log(req.body);
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
            return res.redirect('/users/login');
        }

    } catch (error) {
        console.log(`error while creating User ${error}`);
        return res.redirect('register')
    }
}

