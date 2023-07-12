import express from 'express' 
import UserController from '../../controllers/dashboard/dashUserController.js'

const router = express.Router()

router.get('/users/banned-users',verifyRole,UserController.getBannedUsersPage) 


export default router