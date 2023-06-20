import express from 'express'
import getPages from '../controllers/pageController.js'

const router = express.Router()

router.get('/',getPages.getIndexPage) 
router.get('/auth',getPages.getAuthPage)

// Admin login page
router.get('/admin',getPages.getAdminLoginPage)

export default router