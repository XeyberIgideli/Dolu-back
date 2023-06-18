import express from 'express'
import getPages from '../controllers/pageController.js'

const router = express.Router()

router.get('/',getPages.getIndexPage) 
router.get('/auth',getPages.getAuthPage)

export default router