import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { UnauthenticatedError } from '../utils/Error.js'

// Verifying token for admin login
function verifyRole(req,res,next) {
    const authHeader = req.cookies.adToken
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.redirect('/admin')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.role = {roleId:payload.roleId,username: payload.username,role:'admin'}
        next()
    } catch(err) {
        throw new UnauthenticatedError('You are not authorized to perform this action!')
    }
}

// Verifying token for user login
function verifyToken(req,res,next) {
    const authHeader = req.cookies.accessToken 
   
    if(!authHeader || !authHeader.startsWith("Bearer")) {
       return res.redirect('../auth')
    }

    const accessToken = authHeader.split(' ')[1] 

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET) 
        req.user = {userId:payload.userId,username: payload.username} 
        next()
    } catch(err) {
        if(err.name === "TokenExpiredError") {
            res.redirect('../auth/token/refresh')
         }
        // throw new UnauthenticatedError('Invalid Authentication!',err)
    }
}

function adminRedirect(req,res,next) {
    const authHeader = req.cookies.adToken 
    if(authHeader) {
       res.redirect('dashboard')
    } else {
       next()
    }
}

function userRedirect(req,res,next) {
    const accessToken = req.cookies.accessToken 
    if(accessToken) {
       res.redirect('home')
    } else {
       next()
    }
}

async function isEmailExist(req,res,next) {
    const email = await User.find({email:req.body.email})
    if(email.length > 0) {
        res.json('Email already in use!')
    } else {
        next()
    }
}

async function checkForm(req,res,next) {
    if(!req.body.username) {
        req.flash('error', 'Please provide your username!')
        res.redirect('../auth')
    } else if(!req.body.email) {
        req.flash('error', 'Please provide your email address!')
        res.redirect('../auth')
    } else if(!req.body.password) {
        req.flash('error', 'Please provide a password!')
        res.redirect('../auth')
    } else {
        next()
    }
}
   

export {verifyToken,verifyRole,isEmailExist,checkForm,userRedirect,adminRedirect}