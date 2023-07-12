import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { UnauthenticatedError } from '../utils/Error.js'

function verifyRole(req,res,next) {
    const authHeader = req.cookies.adToken
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.redirect('/admin')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.role = {roleId:payload.roleId,username: payload.username,admin:true}
        next()
    } catch(err) {
        throw new UnauthenticatedError('You are not authorized to perform this action!')
    }
}

function verifyToken(req,res,next) {
    const authHeader = req.cookies.token 
    if(!authHeader || !authHeader.startsWith("Bearer")) {
       return res.redirect('auth')
    }

    const token = authHeader.split(' ')[1] 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId,username: payload.username}
        next()
    } catch(err) {
        throw new UnauthenticatedError('Invalid Authentication!')
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
    const authHeader = req.cookies.token 
    if(authHeader) {
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