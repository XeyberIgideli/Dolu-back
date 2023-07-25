import express from 'express'
import homePages from '../controllers/homeController.js'
import { verifyToken } from '../middlewares/Auth.js'

const router = express.Router()

router.get('/home',verifyToken,homePages.getHomePage)
router.get('/movies',verifyToken,homePages.getMoviesPage)
router.get('/bookmarks',verifyToken,homePages.getBookmarksPage)
router.get('/watch/:slug',verifyToken,homePages.getWatchPage)

export default router