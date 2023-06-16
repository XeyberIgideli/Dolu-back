import express from 'express'
import mongoose from 'mongoose'

// Routes
import pageRoute from './routes/pageRoute.js'

// PORT
const port = 8300

const app = express()

// DB
mongoose.connect('mongodb://127.0.0.1:27017/dolu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')

// Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
 
// Routes
app.use('/',pageRoute)

app.listen(port)




