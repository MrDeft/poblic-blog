const User = require('../models/User');

module.exports = (req, res) => {
    User.create(req.body, async (err, user) => {
        if (err) {
            const registrationError = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('registrationError', registrationError);
            req.flash('data', req.body)

            return res.redirect('/reg')
        }

        res.redirect('/');
    })
}