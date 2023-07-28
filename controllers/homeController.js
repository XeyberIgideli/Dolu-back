import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
class home_Pages { 
     async getHomePage(req,res) { 
        const movies = await Movie.find()
        const shows = await Show.find()
         res.render('home',{
            movies,
            shows
         })
     } 
     getMoviesPage(req,res) {
         res.render('movies')
     } 
     async getBookmarksPage(req,res) {
        //  const bookmarksOrigin = await Bookmark.find({user: null}) 
        //  const bookmarksUser = await Bookmark.find({user: req.user.userId}) 
        //  let bookmarks = Object.assign(bookmarksOrigin,bookmarksUser)
        let user = await User.findOne({_id: req.user.userId})
         res.render('bookmarks',{
            bookmarks: user.bookmarks
         })
     }
     async getWatchPage(req,res) {
         const media = await Movie.findOne({slug: req.params.slug}) ?? await Show.findOne({slug: req.params.slug})
         res.render('watch', {
            media
         })
     }
 }
 
 let homePages = new home_Pages()
 
 export default homePages