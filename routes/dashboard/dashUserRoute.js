import express from 'express' 
import UserController from '../../controllers/dashboard/dashUserController.js'

const router = express.Router()

router.get('/users/banned-users',UserController.getBannedUsersPage) 
router.post('/users/ban-user/:id',UserController.banUser) 
router.get('/users/delete-user/:id',UserController.deleteUser) 


export default router