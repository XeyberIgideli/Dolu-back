import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import SliderController from '../../controllers/dashboard/dashSliderController.js'

const router = express.Router()

router.get('/sliders/add-new-slider',verifyRole,SliderController.addNewSlider) 


export default router