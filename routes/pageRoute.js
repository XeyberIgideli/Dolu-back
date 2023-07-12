import express from 'express'
import getPages from '../controllers/pageController.js'
import { userRedirect,adminRedirect } from '../middlewares/Auth.js'

const router = express.Router()

router.get('/',userRedirect,getPages.getIndexPage) 
router.get('/auth',userRedirect,getPages.getAuthPage)

// Admin login page
router.get('/admin',adminRedirect,getPages.getAdminLoginPage)

export default router