import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import MovieController from '../../controllers/dashboard/dashMovieController.js' 

const router = express.Router()

router.get('/movies/add-new-movie',verifyRole,MovieController.getAddNewMoviePage) 
router.post('/movies/add-movie',verifyRole, MovieController.createMovie) 
 
export default router