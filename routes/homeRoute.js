import express from 'express'
import homePages from '../controllers/homeController.js'
const router = express.Router()

router.get('/home',homePages.getHomePage)
router.get('/movies',homePages.getMoviesPage)
router.get('/bookmarks',homePages.getBookmarksPage)
router.get('/stream/:slug',homePages.streamFile)
router.get('/watch/:slug',homePages.getWatchPage)
router.get('/watch/getEpisodes/:slug',homePages.getEpisodes)

export default router