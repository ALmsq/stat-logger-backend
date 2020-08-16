import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import routes from './routes/postRoutes'

import session from 'express-session'
import connectMongo from 'connect-mongo'

// import passport from './controllers/authController'
// import auth from './routes/authRoutes'
// const passport = require('./controllers/authController')
// const auth = require('./routes/authRoutes')

const passport = require('passport')
const users = require('./routes/userRoutes')


const MongoStore = connectMongo(session)

const app = express()
const PORT = 4000



//cors setup
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) =>
    res.send(`server running on ${PORT}`)
)
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    console.log(mongoose.connection.readyState)
})

//mongoose connection

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/postsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//bodyparser setup
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())





routes(app)
/////////////////////////////

//session

app.use(
    session({
        secret: 'super secret',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

//passport middleware

app.use(passport.initialize())
app.use(passport.session())

//passport config
require('./config/passport')(passport)

//routes
app.use('/users', users)

// app.use('/api/auth/', auth)

// app.get('/api/auth/', (req, res) =>{
//     res.send('auth')
// })