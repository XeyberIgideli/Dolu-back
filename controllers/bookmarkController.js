import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import User from "../models/User.js"
import Bookmark from '../models/Bookmark.js'
import InterfaceSetting from "../models/Interface.js" 
import {uniqueID} from '../utils/Helper.js'

async function interfaceData () {
    return await InterfaceSetting.find();
 }

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
        const slug = req.params.slug.split('-').slice(0,-1)
        const bookmarkTitle = slug.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')
        let media = [] 
        for(let i = 0; i < bookmarks.length; i++) {
            const mediaData = await Movie.findOne({title: bookmarks[i].title}) || await Show.findOne({title: bookmarks[i].title}) 
            media.push(mediaData)
        }
        res.render('bookmark-list', {
            media,
            bookmarks,
            bookmarkTitle,
            interfaceSettingData: await interfaceData(),
            title: bookmarkTitle
        })
    }
    
    async addBookmark(req,res,next) { 
        try {
            let data = req.body
            const existingBookmark = await Bookmark.findOne({bookmark: data.info,title:data.title})
            if(existingBookmark) {
                await Bookmark.findByIdAndDelete(existingBookmark.id)
                return
            } 
            const result = await Bookmark.create({title: data.title,bookmark:data.info,user: req.user.userId})
            res.sendStatus(200) // For sequential axios post calls
        } catch(err) {
            next(err)
        }
    }
}

const Bookmarks = new bookmarks()

export default Bookmarks