import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import UserInterface from '../../controllers/dashboard/dashInterfaceController.js'

const router = express.Router()

router.get('/home-sections',verifyRole,UserInterface.getHomeSectionsPage) 
router.post('/home-sections/saveSections', verifyRole, UserInterface.updateHomeSections)

export default router