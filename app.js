import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Routes
import pageRoute from './routes/pageRoute.js'
import homeRoute from './routes/homeRoute.js'
import authRoute from './routes/authRoute.js'

// Dashboard routes
import dashboardAuthRoute from './routes/dashboard/dashAuthRoute.js'
import dashPageRoute from './routes/dashboard/dashPageRoute.js'


import {errorHandlerMiddleware} from './middlewares/Error.js'
import {verifyToken} from './middlewares/Auth.js'

// PORT
const port = 8300

const app = express()

dotenv.config()

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
 
// General routes
app.use('/',pageRoute)
app.use('/auth',authRoute)
app.use('/', homeRoute) // Home pages route handling

// Dashboard routes
app.use('/dashboard', dashPageRoute)

// Admin route
app.use('/admin', dashboardAuthRoute) 

app.use(errorHandlerMiddleware)
app.listen(port)




