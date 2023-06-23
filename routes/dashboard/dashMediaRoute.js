import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import MediaController from '../../controllers/dashboard/dashMediaController.js'

const router = express.Router()

router.post('/movies/add-movie',verifyRole,MediaController.createMedia) 



export default router