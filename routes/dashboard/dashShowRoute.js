import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkImageUpload } from '../../middlewares/Upload.js'
import ShowController from '../../controllers/dashboard/dashShowController.js' 

const router = express.Router()

router.get('/tv-shows/add-new-show',verifyRole,ShowController.getAddNewShowPage) 
router.post(
'/tv-shows/add-show',
verifyRole,
checkImageUpload('image'), 
ShowController.createShow) 
 
export default router