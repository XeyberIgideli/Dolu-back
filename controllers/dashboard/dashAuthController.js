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
            throw new UnauthenticatedError('There is not a user like that!')
        }

        const checkedPass = await role.isPasswordCorrect(password)

        if(!checkedPass) {
            throw new BadRequestError('The password is not correct!')
        }

        const token = role.createJWT()


        res.json({token,msg:'You are logged in!'})
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

export {login,logout,register}