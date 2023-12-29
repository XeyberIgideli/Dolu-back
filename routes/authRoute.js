import express from 'express'
import User from '../models/User.js'
import {isEmailExist,checkForm} from '../middlewares/Auth.js'
import { register,login,logout, refreshToken } from "../controllers/authController.js"
const router = express.Router()

router.post('/register',isEmailExist,checkForm,register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/token/refresh', refreshToken)

export default router
