import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import routes from './routes/postRoutes'

const app = express()
const PORT = 4000

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
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//cors setup
app.use(cors())

routes(app)
