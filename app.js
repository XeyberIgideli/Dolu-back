import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import session from 'express-session'
import flash from 'connect-flash'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

// Path
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes
import pageRoute from './routes/pageRoute.js'
import homeRoute from './routes/homeRoute.js'
import authRoute from './routes/authRoute.js'

// Dashboard routes
import dashboardAuthRoute from './routes/dashboard/dashAuthRoute.js'
import dashPageRoute from './routes/dashboard/dashPageRoute.js'
import dashMovieRoute from './routes/dashboard/dashMovieRoute.js'
import dashShowRoute from './routes/dashboard/dashShowRoute.js'
import dashUserRoute from './routes/dashboard/dashUserRoute.js'

// Middleware routes
import {errorHandlerMiddleware,notFound} from './middlewares/Error.js'
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

// Globals
global.globalDirName = null
global.globalOriginalUrl = null

app.use('*', (req,res,next) => {
    globalDirName = __dirname
    globalOriginalUrl = req.originalUrl
    next()
})

// Middlewares
app.use(express.json()) 
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())

app.use(express.static('public')) 

// Connect Flash Messages
app.set('trust proxy', 1)
app.use(session({
    secret:'bookworm',   
    resave: false,
    saveUninitialized: true,  
    cookie: {maxAge: Date().now + (60 * 1000 * 30) }
}));

app.use(flash())
app.use((req,res,next) => {
    res.locals.flashMessages = req.flash()
    next()
})

// Security
app.use(cors({
    origin: 'http://localhost:8300',
	credentials: true
}))

// General routes
app.use('/',pageRoute)
app.use('/auth',authRoute)
app.use('/', homeRoute) // Home pages route handling

// Dashboard routes
app.use('/dashboard', [dashPageRoute,dashMovieRoute,dashShowRoute,dashUserRoute])

// Admin route
app.use('/admin', dashboardAuthRoute) 

app.use(notFound)
app.use(errorHandlerMiddleware)
app.listen(port)




