import express from 'express'
import homePages from '../controllers/homeController.js'
import { verifyToken } from '../middlewares/Auth.js'

const router = express.Router()

router.get('/home',homePages.getHomePage)
router.get('/movies',homePages.getMoviesPage)

export default router