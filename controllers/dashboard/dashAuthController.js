import Roles from '../../models/Roles.js'
import jwt from 'jsonwebtoken'
import { BadRequestError,UnauthenticatedError } from '../../utils/Error.js'

async function register(req,res) {
    const role = await Roles.create(req.body)
}

async function login(req,res,next) {
    try {
        const {username,password} = req.body

        const role = await Roles.findOne({username})

        if(!role) {
            throw new UnauthenticatedError('There is not an admin like that!')
        }

        const checkedPass = await role.isPasswordCorrect(password)

        if(!checkedPass) {
            throw new BadRequestError('The password is not correct!')
        }

        const token = role.createJWT() 

        res.cookie('adToken',`Bearer: ${token}`, {maxAge: 1000*60*60*24,httpOnly:true,secure:true})
        res.redirect('../dashboard')
    } catch (err) {
        next(err)
    }
}

async function logout(req,res) {
    
    const authHeader = req.cookies.adToken
    if(authHeader) {
        res.clearCookie('adToken')
        res.redirect('/admin')
    }
}

export {login,logout,register}