const Post = require('../models/User')

module.exports = (req, res, next) => {
    Post.findById(req.session.userId, (err, user) => {
        if (err || !user) return res.redirect('/login');
        next()
    })
}