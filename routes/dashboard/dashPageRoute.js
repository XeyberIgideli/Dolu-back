import express from 'express'
import getDashPages from '../../controllers/dashboard/dashPageController.js'

const router = express.Router()

router.get('/', getDashPages.getDashboardPage) 

export default router