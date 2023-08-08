import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import getDashPages from '../../controllers/dashboard/dashInterfaceController.js'

const router = express.Router()

router.get('/home-sections',verifyRole,getDashPages.getHomeSectionsPage) 


export default router