const mongoose = require('mongoose')
const Post = require('./models/Post')

mongoose.connect('mongodb+srv://abouirjan:oOAB1BbYeT9OEhui@cluster0.6ooxof2.mongodb.net/test-s')

Post.create({
    title: 'Bouirjon',
    desc: "First disc",
    content: 'First content'
}, (err, post) => { console.log(err, post) })

// oOAB1BbYeT9OEhui