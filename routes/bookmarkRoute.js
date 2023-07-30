import express from 'express'
import Bookmarks from '../controllers/bookmarkController.js'

const router = express.Router()

router.post('/create', Bookmarks.createBookmark)
router.get('/:slug', Bookmarks.getBookmarkGroup)
router.post('/add', Bookmarks.addBookmark)

export default router