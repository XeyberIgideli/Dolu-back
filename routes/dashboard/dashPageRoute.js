import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import getDashPages from '../../controllers/dashboard/dashPageController.js'

const router = express.Router()

router.get('/',verifyRole,getDashPages.getDashboardPage)  
// Movies
router.get('/movies',verifyRole,getDashPages.getDashMoviesPage) 
router.get('/movies/add-new-movie',verifyRole,getDashPages.getAddNewMoviePage) 

// TV Shows



export default router