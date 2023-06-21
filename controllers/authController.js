import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { BadRequestError,UnauthenticatedError } from '../utils/Error.js'

async function register (req,res,next) {
    try { 
        const user = await User.create(req.body)
        const token = user.createJWT()
        res.json(token)
    } catch(err) {
        next(err)
    }
}

async function login(req,res,next) {
    try {
        const {username,password} = req.body

        if(!username) {
            res.json('Please provide your username!')
        } else if (!password) {
            res.json('Please provide your password!')
        }

        const user = await User.findOne({username})

        if(!user) {
            throw new UnauthenticatedError('There is not a user like that!')
        }

        const checkedPass = await user.isPasswordCorrect(password)

        if(!checkedPass) {
            throw new BadRequestError('The passwords is not correct!')
        }

        const token = user.createJWT()

        res.json(token)
    } catch (err) {
        next(err)
    }
}

async function logout(req,res) {
    const authHeader = req.headers.authorization
    jwt.sign(authHeader,{expiresIn:1}, (logout) => {
        if(logout) {
            res.send('Logged out!')
        }
    })
}

export {register,login,logout}