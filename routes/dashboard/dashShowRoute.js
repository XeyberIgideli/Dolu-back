import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkUpload } from '../../middlewares/Upload.js'
import ShowController from '../../controllers/dashboard/dashShowController.js' 

const router = express.Router()

router.get('/tv-shows/add-new-show',verifyRole,ShowController.getAddNewShowPage) 
router.get('/tv-shows/edit-show/:id',verifyRole,ShowController.getUpdateShowPage) 

router.post(
'/tv-shows/add-show',
verifyRole,
checkUpload('image'), 
ShowController.createShow) 
 
export default router