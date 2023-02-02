module.exports.home = (req, res) => {
    res.send("Controller")
}

module.exports.login = (req, res) => {
    res.render('../views/login.ejs')
}

