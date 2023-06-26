import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkImageUpload } from '../../middlewares/Upload.js'
import MovieController from '../../controllers/dashboard/dashMovieController.js' 

const router = express.Router()

router.get('/movies/add-new-movie',verifyRole,MovieController.getAddNewMoviePage) 
router.post(
'/movies/add-movie',
verifyRole,
checkImageUpload('image'), 
MovieController.createMovie) 
 
export default router