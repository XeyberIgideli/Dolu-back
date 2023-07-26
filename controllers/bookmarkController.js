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
}

const Bookmarks = new bookmarks()

export default Bookmarks