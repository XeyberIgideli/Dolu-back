import User from '../models/User.js' 
import {uniqueID} from '../utils/Helper.js'
import jwt from 'jsonwebtoken'
import { BadRequestError,UnauthenticatedError } from '../utils/Error.js'

async function register (req,res,next) {
    try { 
        let id = uniqueID('fav', 4)
        let obj = [
            {
                 bookmark: `My Favorites-${id}`,
                 icon: 'bx bx-heart'
            },
            {
                 bookmark: `Liked-${id}`,
                 icon: 'bx bx-like'
             },
            {
                 bookmark: `Later-${id}`,
                 icon: 'bx bx-time'
            }]
        const user = await User.create({...req.body,bookmarks: obj})
        const token = user.createJWT() 
        const refreshToken = user.createRefreshToken()
        res.cookie('accessToken',`Bearer: ${token}`, {maxAge: 1000*60*60*24,httpOnly:true,sameSite:'none',secure:true})
        res.cookie('refToken',`${refreshToken}`, {maxAge: 1000*60*60*24,sameSite: 'none', httpOnly:true,secure:true})
        res.redirect('../home')
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
            throw new BadRequestError('The password is not correct!')
        }

        const token = user.createJWT()  
        const refreshToken = user.createRefreshToken()
        await User.updateOne({username}, {refreshToken})

        res.cookie('accessToken',`Bearer: ${token}`, {maxAge: 1000*60*60*24,sameSite: 'none', httpOnly:true,secure:true})
        res.cookie('refToken',`${refreshToken}`, {maxAge: 1000*60*60*24,sameSite: 'none', httpOnly:true,secure:true})

        res.redirect('../home')
    } catch (err) {
        next(err)
    }
}
async function refreshToken (req,res) {
    {
        const accessToken = req.cookies.token
        const refreshToken = req.cookies.refToken
    
        if (!refreshToken) {
            res.clearCookie('accessToken')
            return res.redirect('../auth')
        }
    
        const user = await User.findOne({refreshToken})
    
        if (!user) {
           res.clearCookie('accessToken')
           return res.redirect('../auth')
        }
    
        // Verify and generate a new access token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                res.clearCookie('accessToken')
                return res.redirect('../auth')
            }
          
           const newAccessToken = user.createJWT()
           const newRefreshToken = user.createRefreshToken()
           
           await user.updateOne({refreshToken: newRefreshToken})
            
           res.cookie('accessToken',`Bearer: ${newAccessToken}`, {maxAge: 1000*60*60*24,httpOnly:true,sameSite:'none',secure:true})
           res.cookie('refToken',`${newRefreshToken}`, {maxAge: 1000*60*60*24,httpOnly:true,sameSite:'none',secure:true})
        
           res.redirect('back')
    
        });
    
    }
}
async function logout(req,res) {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refToken
    const user = await User.updateOne({refreshToken}, {$unset: {refreshToken:null}})
    if(accessToken && refreshToken) {
        res.clearCookie('accessToken')
        res.clearCookie('refToken')
        res.redirect('/auth')
    }
}

export {register,login,logout, refreshToken}