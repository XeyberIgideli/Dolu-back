import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import User from "../models/User.js"
import Bookmark from '../models/Bookmark.js'

class bookmarks {
   async createBookmark (req,res,next) { 
       try {
            if (req.body.name.length === 0) {
                throw new Error("Name can't be empty!")
            }
            await User.findOneAndUpdate(
                { _id: req.user.userId },
                { $push: { bookmarks: req.body.name } },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: "Bookmark created successfully." })
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
    
    async addBookmark(req,res,next) {
        try {
            let data = req.body
            console.log(data)
            // const existingBookmark = await Bookmark.findOne({bookmark: data.info});
            // if(!existingBookmark) {
            //     const bookmark = await Bookmark.create({title: data.title,bookmark:data.info, user: req.user.userId})
            // } 
            // const deleting = await Bookmark.deleteOne({ _id: existingBookmark._id });
        } catch(err) {
            next(err)
        }
    }
}

const Bookmarks = new bookmarks()

export default Bookmarks