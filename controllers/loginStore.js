const User = require("../models/User")

module.exports = (req, res) => {
    const { password, email } = req.body
    User.findOne({ email }, (error, user) => {
        if (user) {
            if (user.password === password) {
                req.session.userId = user._id
                res.redirect('/')
            }
            else {
                res.redirect('/login')
            }
        } else {
            return res.redirect('/login')
        }
    })
}