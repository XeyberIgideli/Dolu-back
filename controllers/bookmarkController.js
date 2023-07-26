import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import User from "../models/User.js"
import Bookmark from '../models/Bookmark.js'

class bookmarks {
   async createBookmark (req,res,next) { 
        try {
            const bookmark = await Bookmark.create({...req.body,user: req.user.userId})
            const user = await User.findOne({_id: req.user.userId})
            user.bookmarks.push(req.body.name)
            user.save()
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