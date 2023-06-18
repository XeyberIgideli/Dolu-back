import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../utils/Error.js'

function verifyToken(req,res,next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError('Invalid Authentication!')
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

export {verifyToken}