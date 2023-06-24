import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import getDashPages from '../../controllers/dashboard/dashPageController.js'

const router = express.Router()

router.get('/',verifyRole,getDashPages.getDashboardPage)  
// Movies
router.get('/movies',verifyRole,getDashPages.getDashMoviesPage) 
router.get('/tv-shows',verifyRole,getDashPages.getDashShowsPage) 
// router.get('/tv-shows/add-new-show',verifyRole,getDashPages.getAddNewShowPage) 

// TV Shows



export default router