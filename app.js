import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import cors from 'cors'
import helmet from 'helmet'
import { RateLimiterMemory } from "rate-limiter-flexible"
import crypto from 'crypto'

// Path
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes
import pageRoute from './routes/pageRoute.js'
import homeRoute from './routes/homeRoute.js'
import authRoute from './routes/authRoute.js'
import bookmarkRoute from './routes/bookmarkRoute.js'
import subtitleApi from './routes/subtitleApi.js'
import userRoute from './routes/userRoute.js'

// Dashboard routes
import dashboardAuthRoute from './routes/dashboard/dashAuthRoute.js'
import dashPageRoute from './routes/dashboard/dashPageRoute.js'
import dashMovieRoute from './routes/dashboard/dashMovieRoute.js'
import dashShowRoute from './routes/dashboard/dashShowRoute.js'
import dashUserRoute from './routes/dashboard/dashUserRoute.js'
import dashInterfaceRoute from './routes/dashboard/dashInterfaceRoute.js'

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
app.use(express.json({limit: '300kb'})) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload())

app.use(express.static('public')) 

// Express cookie session
app.set('trust proxy', 1)
app.use(session({
    secret:'cpa901sX',   
    resave: false,
    saveUninitialized: true,  
    cookie: {
        secure:true,
        httpOnly: true,
        maxAge: Date().now + (60 * 1000 * 30) 
    }
}));

// Connect Flash Messages
app.use(flash())
app.use((req,res,next) => {
    res.locals.flashMessages = req.flash()
    next()
})

// Security
const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip) // Track requests based on IP address
    .then(() => {
     next(); // Request within the rate limit, proceed to the next middleware
    })
    .catch(() => {
     res.status(429).send('Too Many Requests'); // Request exceeded the rate limit
    });
}

app.disable("x-powered-by");
app.use(rateLimiterMiddleware)
app.use(cors({
    origin: 'https://localhost:8300',
	credentials: true, 
})) 
app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
    next();
});

// app.use(
//     helmet({
//       contentSecurityPolicy: {
//         directives: {
//           "img-src": ["'self'", "https: data:"],
//           "scriptSrc": ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
//         },
//       },
//       xFrameOptions:true
//     }),
//   );

// Dashboard routes
app.use('/dashboard', [dashPageRoute,dashMovieRoute,dashShowRoute,dashUserRoute,dashInterfaceRoute])

// Admin route
app.use('/admin', dashboardAuthRoute) 
// General routes
app.use('/',pageRoute,subtitleApi) // Index,auth,admin pages route handling
app.use('/auth',authRoute)

app.use(verifyToken)

app.use('/', homeRoute) // Home pages route handling
app.use('/user', userRoute)
app.use('/bookmarks', bookmarkRoute)


app.use(notFound)
app.use(errorHandlerMiddleware)
app.listen(port)




