import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkUpload } from '../../middlewares/Upload.js'
import UserInterface from '../../controllers/dashboard/dashInterfaceController.js'

const router = express.Router()

router.get('/home-sections',verifyRole,UserInterface.getHomeSectionsPage) 
router.post('/home-sections/saveSections', verifyRole, UserInterface.updateHomeSections)

router.get('/logo-favicon', verifyRole, UserInterface.getLogoFaviconPage)
router.post('/logo-favicon/saveLogoFavicon',checkUpload('image'), verifyRole, UserInterface.updateLogoFavicon)

export default router