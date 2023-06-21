import express from 'express'
import getPages from '../controllers/pageController.js'
import { userRedirect } from '../middlewares/Auth.js'

const router = express.Router()

router.get('/',userRedirect,getPages.getIndexPage) 
router.get('/auth',userRedirect,getPages.getAuthPage)

// Admin login page
router.get('/admin',getPages.getAdminLoginPage)

export default router