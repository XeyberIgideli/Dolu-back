import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import User from "../models/User.js"
import Bookmark from '../models/Bookmark.js'
import {uniqueID} from '../utils/Helper.js'


class bookmarks {
   async createBookmark (req,res,next) { 
    const bookmark = await User.findOne({_id: req.user.userId})
    let id = bookmark.bookmarks[0].split('-')[1]
    let bookmarkName = req.body.name + '-' + id
       try {
            if (req.body.name.length === 0) {
                throw new Error("Name can't be empty!")
            }
           const result = await User.updateOne(
                { _id: req.user.userId },
                { $addToSet: { bookmarks: bookmarkName} },
                {new:false, runValidators: true }
            )
            if(result.modifiedCount === 0) {
                res.status(400).json({ message: "The bookmark you try to add is already exist!" })
                return
            }
            res.redirect('back')
        } catch(err) {
            next(err)
        }
    }
    async getBookmarkList(req,res) {
        const bookmarks = await Bookmark.find({slug: req.params.slug}) 
        bookmarks.forEach(async item => {
            const media = await Movie.findOne({title: item.title})
            console.log(media)
        })
        res.render('bookmark-list', {
            bookmarks
        })
    }
    
    async addBookmark(req,res,next) { 
        try {
            let data = req.body
            console.log(data)
            const existingBookmark = await Bookmark.findOne({bookmark: data.info})
            if(existingBookmark) {
              if(existingBookmark.title === data.title) {
                await Bookmark.findByIdAndDelete(existingBookmark.id)
              }
            } else {
                await Bookmark.create({...data, user: req.user.userId}, {new:false,runValidators:true})
            }
            res.sendStatus(200) // For sequential axios post calls
        } catch(err) {
            next(err)
        }
    }
}

const Bookmarks = new bookmarks()

export default Bookmarks