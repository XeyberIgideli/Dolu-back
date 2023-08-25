import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Episode from "../models/Episode.js"
import InterfaceSetting from "../models/Interface.js" 
import TorrentSearchApi from 'torrent-search-api'
import WebTorrent from "webtorrent"

TorrentSearchApi.enableProvider('1337x')
const client = new WebTorrent()

async function interfaceData () {
   return await InterfaceSetting.find();
}
class home_Pages {    
     async getHomePage(req,res) { 
        const movies = await Movie.find().sort('-createdAt')
        const shows = await Show.find().sort('-createdAt') 
        const user = await User.findOne({_id: req.user.userId})
        const bookmarks = await Bookmark.find({user: user.id}) 

        const allMedia = [...shows,...movies]
        const genres = shows.slice(0,10).map(item => item.genres) 
        let genreSet = [...new Set(genres.flat())] 
         res.render('home',{
            movies,
            shows,
            allMedia,
            user,
            bookmarks,
            genreSet,
            interfaceSettingData: await interfaceData(),
            title:'Home'
         })
     } 
     async getMoviesPage(req,res) {
         const movies = await Movie.find().sort('-createdAt')
         const genres = movies.slice(0,10).map(item => item.genres)
         const user = await User.findOne({_id: req.user.userId})
         const bookmarks = await Bookmark.find({user: user.id}) 
         
         let genreSet = [...new Set(genres.flat())]
         res.render('movies', {
            title:'Movies',
            movies,
            genreSet,
            bookmarks,
            interfaceSettingData: await interfaceData(),
         })
     } 
     async getBookmarksPage(req,res) { 
        let user = await User.findOne({_id: req.user.userId})
         res.render('bookmarks',{
            bookmarks: user.bookmarks,
            interfaceSettingData: await interfaceData(),
            title:'Bookmarks'
         })
     }
     async getWatchPage(req,res) { 

         const media = await Movie.findOne({slug: req.params.slug}) ?? await Show.findOne({slug: req.params.slug})
         const user = await User.findOne({_id: req.user.userId})
         let episodes
         if(media.season){
            episodes = await Episode.find({show:media.id})
         }
         const seasons = [episodes?.map(episode => episode.season)]
         const seasonSet = [...new Set(seasons.flat())] 
         const bookmarks = await Bookmark.find({title: media.title}) 
         res.status(200).render('watch', {
            media,
            user,
            bookmarks,
            episodes,
            seasonSet,
            interfaceSettingData: await interfaceData(),
            title: media.title
         })
     }
     async getEpisodes(req,res) {
      const showData = await Show.findOne({slug: req.params.slug})
      if(showData) {
         const episodes = await Episode.find({show:showData._id})
         res.json(episodes)
      }
     }

     async streamFile(req,res) {
      // const torrents = await TorrentSearchApi.search(req.params.slug, 'Movies', 4);
      // const magnet = await TorrentSearchApi.getMagnet(torrents[0]); 
      const torrentID = 'https://webtorrent.io/torrents/sintel.torrent'
      
      client.add(torrentID,{addUID:true,strategy:'sequential'}, function (torrent) {
         const file = torrent.files.find(function (file) {
         return file.name.endsWith('.mp4')})

         if (!file) {
         res.status(404).send('MKV file not found in the torrent.')
         return
         } 

         res.setHeader('Content-Type', 'video/mp4')


         // Doing this for sending stream data as piece, so preventing memory problems
         // Also for enabling seeking
         
         const range = req.headers.range
         const positions = range.replace(/bytes=/, '').split('-')
         
         const start = parseInt(positions[0],10)
         const end = positions[1] ? parseInt(positions[1], 10) : file.length - 1

         const chunksize = (end - start) + 1

         res.statusCode = 206
         res.setHeader('Content-Range', `bytes ${start}-${end}/${file.length}`)
         res.setHeader('Accept-Ranges', 'bytes')
         res.setHeader('Content-Length', chunksize)

         const fileStream = file.createReadStream({ start, end })

         fileStream.pipe(res) 

         fileStream.on('end', () => {
            res.end() // Close the response when the stream finished
         });
      
         fileStream.on('error', (error) => {
            res.end() // Close the response when error appeared
         });
      
         res.on('close', () => {
            // Destroy stream when browser connection lost
            fileStream.destroy();
         })

         client.on('error', err => {})
      })  
      
     }
 }
 
 let homePages = new home_Pages()
 
 export default homePages