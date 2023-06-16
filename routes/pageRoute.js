import express from 'express'
import getPages from '../controllers/pageController.js'

const router = express.Router()

router.get('/',getPages.getIndexPage)
router.get('/home',getPages.getHomePage)

export default router