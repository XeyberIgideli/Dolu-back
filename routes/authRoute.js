import express from 'express'
import {isEmailExist,checkForm} from '../middlewares/Auth.js'
import { register,login,logout } from "../controllers/authController.js"

const router = express.Router()

router.post('/register',isEmailExist,checkForm,register)
router.post('/login',login)
router.put('/logout',logout)

export default router
