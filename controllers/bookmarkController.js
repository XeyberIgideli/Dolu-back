import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Bookmark from '../models/Bookmark.js'

class bookmarks {
   async createBookmark (req,res,next) { 
        try {
            const bookmark = await Bookmark.create({...req.body})
        } catch(err) {
            next(err)
        }
    }
    async getBookmarkGroup(req,res) {
        const bookmark = await Bookmark.findOne({slug: req.params.slug})
        res.render('bookmark-group', {
            bookmark
        })
    }
}

const Bookmarks = new bookmarks()

export default Bookmarks