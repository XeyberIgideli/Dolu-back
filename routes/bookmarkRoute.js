import express from 'express'
import Bookmarks from '../controllers/bookmarkController.js'

const router = express.Router()

router.get('/bookmarks/create', Bookmarks.createBookmark)

export default router