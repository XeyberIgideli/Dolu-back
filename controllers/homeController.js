import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Episode from "../models/Episode.js"
import InterfaceSetting from "../models/Interface.js" 

class home_Pages { 
     async getHomePage(req,res) { 
        const movies = await Movie.find().sort('-createdAt')
        const shows = await Show.find().sort('-createdAt') 
        const user = await User.findOne({_id: req.user.userId})
        const bookmarks = await Bookmark.find({user: user.id}) 
        const interfaceSettingData = await InterfaceSetting.find()

        const allMedia = [shows,movies]
        const genres = shows.slice(0,10).map(item => item.genres)
        let genreSet = [...new Set(genres.flat())] 
         res.render('home',{
            movies,
            shows,
            allMedia,
            user,
            bookmarks,
            genreSet,
            interfaceSettingData
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
         const user = await User.findOne({_id: req.user.userId})
         let episodes
         if(media.season){
            episodes = await Episode.find({show:media.id})
         }
         const seasons = episodes.map(episode => [...new Set([episode.season])]).flat()
         const bookmarks = await Bookmark.find({title: media.title})
         res.status(200).render('watch', {
            media,
            user,
            bookmarks,
            episodes,
            seasons
         })
     }
 }
 
 let homePages = new home_Pages()
 
 export default homePages