import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkUpload,updateUploadCheck } from '../../middlewares/Upload.js'
import MovieController from '../../controllers/dashboard/dashMovieController.js' 

const router = express.Router()

router.get('/movies/add-new-movie',verifyRole,MovieController.getAddNewMoviePage) 
router.get('/movies/edit-movie/:id',verifyRole,MovieController.getUpdateMoviePage) 

router.post(
    '/movies/add-movie',
    verifyRole,
    checkUpload('image'), 
    MovieController.createMovie) 

router.post(
    '/movies/movie-editted',
    verifyRole,
    updateUploadCheck, 
    MovieController.updateMovie) 
 
export default router