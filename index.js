const express = require('express');
const app = express()
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const connectFlash = require('connect-flash')

const MongoUrl = 'mongodb+srv://abouirjan:oOAB1BbYeT9OEhui@cluster0.6ooxof2.mongodb.net/nodejs-base'
mongoose.connect(MongoUrl)

const redirectIfAuth = require('./middleware/redirect')
const validatPostMiddleware = require('./middleware/validatPost');
const authMiddleware = require('./middleware/auth')
const getPostController = require('./controllers/getPost');
const homePageController = require('./controllers/homePage');
const createPostController = require('./controllers/createPost');
const postsNewController = require('./controllers/postsNew');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/userStore');
const loginController = require('./controllers/login');
const loginStoreController = require('./controllers/loginStore');
const logoutController = require('./controllers/logout')

app.use(session({
    secret: 'Bouirjan',
    store: mongoStore.create({ mongoUrl: MongoUrl })
}))
app.use(fileUpload())
app.use(express.static(__dirname + "/public/"));
app.use(expressEdge.engine)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(connectFlash())
app.use('*', (req, res, next) => {
    app.locals.auth = req.session.userId
    next()
})

app.set('views', `${__dirname}/views`)

app.post('/posts/create', authMiddleware, validatPostMiddleware, createPostController)
app.post('/auth/reg', storeUserController)
app.post('/auth/log', loginStoreController)

app.get('/', homePageController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, postsNewController)
app.get('/reg', redirectIfAuth, createUserController)
app.get('/login', redirectIfAuth, loginController)
app.get('/logout', logoutController)

app.use((req, res) => res.render('not_found'))

app.listen(5000, () => console.log('Server Start...'));