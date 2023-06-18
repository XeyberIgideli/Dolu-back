import User from '../models/User.js'
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
        const {username,password,email} = req.body

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

export {register,login}