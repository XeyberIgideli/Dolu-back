import express from 'express'
import User from '../models/User.js'
import {isEmailExist,checkForm} from '../middlewares/Auth.js'
import { register,login,logout } from "../controllers/authController.js"
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/register',isEmailExist,checkForm,register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/token/refresh', async (req,res) => {
    const accessToken = req.cookies.token
    const refreshToken = req.cookies.refToken

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token not provided' });
    }

    const user = await User.findOne({refreshToken})

    if (!user) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Verify and generate a new access token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
     
      // const newAccessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '15m' });
       const newAccessToken = user.createJWT()
       const newRefreshToken = user.createRefreshToken()
       
       await user.updateOne({refreshToken: newRefreshToken})
        
       res.cookie('accessToken',`Bearer: ${newAccessToken}`, {maxAge: 1000*60*60*24,httpOnly:true,sameSite:'none',secure:true})
       res.cookie('refToken',`${newRefreshToken}`, {maxAge: 1000*60*60*24,httpOnly:true,sameSite:'none',secure:true})
    
       res.redirect('back')

    });

})

export default router
