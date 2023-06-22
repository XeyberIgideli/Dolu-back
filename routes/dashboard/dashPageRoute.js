import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import getDashPages from '../../controllers/dashboard/dashPageController.js'

const router = express.Router()

router.get('/',verifyRole,getDashPages.getDashboardPage) 
router.get('/movies',verifyRole,getDashPages.getDashMoviesPage)

export default router