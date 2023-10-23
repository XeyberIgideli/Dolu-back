import express from 'express'
import homePages from '../controllers/homeController.js'  
import {verifyToken} from '../middlewares/Auth.js'
import { torrentSearch } from '../utils/torrent.js'

const router = express.Router() 

router.get('/home',verifyToken,homePages.getHomePage)
router.get('/movies',verifyToken,homePages.getMoviesPage)
router.get('/bookmarks',verifyToken,homePages.getBookmarksPage)
router.get('/stream/:slug',verifyToken,homePages.streamFile)
router.get('/watch/:slug',verifyToken,homePages.getWatchPage)
router.get('/watch/getEpisodes/:slug',verifyToken,homePages.getEpisodes) 
router.post('/watch/addContinueList',verifyToken,homePages.addContinueList)
router.get('/search', torrentSearch)

export default router