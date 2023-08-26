import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Episode from "../models/Episode.js"
import InterfaceSetting from "../models/Interface.js" 
import TorrentSearchApi from 'torrent-search-api'
import WebTorrent from "webtorrent"
import {Transform} from 'stream'

TorrentSearchApi.enableProvider('1337x')
const client = new WebTorrent()
client.torrentsAdded = []

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

    streamFile(req,res) {
         // const torrents = await TorrentSearchApi.search('Titanic 1997', 'Movies', 7);
         // const torrentFiltered = torrents.filter(torrent => torrent.seeds > 3 && torrent.size < '1.3 GB' )
         // const magnet = await TorrentSearchApi.getMagnet(torrentFiltered[0]); 

         const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
         
         client.get(torrentId).then(result => {
            if(result) {
               result.destroy()
               addTorrent()
            } else {
               addTorrent()
            }
         }) 

         function addTorrent() {
            client.add(torrentId,{private:true,destroyStoreOnDestroy:true}, function ontorrent (torrent) {
               const subtitleLang = req.query.subtitle 
      
               let file = torrent.files.find(function (file) {
                  return file.name.endsWith('.mp4')
               })
               
               const subtitle = torrent.files.find(file => {
                  return file.name.endsWith('.srt')
               })
      
               if (!subtitle) {
                  res.status(404).send('SRT file not found in the torrent.')
                  return
               } 
      
               if (!file) {
                  res.status(404).send('MEDIA file not found in the torrent.')
                  return
               } 
      
               let start = 0
               let end = 0
               
               if(subtitleLang) {
                  res.setHeader('Content-Type', 'text/plain')
                  file = subtitle
               } else {
                  res.setHeader('Content-Type', 'video/mp4')
                  // ****
                  // Doing this for sending stream data as piece, so preventing memory problems
                  // Also for enabling seeking
                  const range = req.headers.range
                  const positions = range.replace(/bytes=/, '').split('-')
                  
                  start = parseInt(positions[0],10)
                  end = positions[1] ? parseInt(positions[1], 10) : file.length - 1
                  const chunksize = (end - start) + 1
      
                  res.statusCode = 206
                  res.setHeader('Content-Range', `bytes ${start}-${end}/${file.length}`)
                  res.setHeader('Accept-Ranges', 'bytes')
                  res.setHeader('Content-Length', chunksize)
                  // ****
      
               }
      
               const fileStream = file.createReadStream({start,end})
      
               // a Transform stream to intercept errors
               const errorHandler = new Transform({
                  transform(chunk, encoding, callback) {
                        // Pass the chunk as-is to the output, but catch errors
                        try {
                           callback(null, chunk); 
                           
                        } catch (error) {
                           console.error(error);
                           res.end();
                        }
                  }
               });
      
               fileStream.pipe(errorHandler).pipe(res,{end:true}) 
      
               fileStream.on('end', () => {
                     res.end();
               });
               
               res.on('close', () => {
                  // Destroy stream when browser connection lost
                  fileStream.destroy();
               }) 
               
         })  
         }
         
         client.on('error' , (err) => {
            console.log(err)
         })

      }
   }
 
 let homePages = new home_Pages()
 
 export default homePages