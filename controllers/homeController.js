import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Episode from "../models/Episode.js"
import InterfaceSetting from "../models/Interface.js" 
import {NotFoundError} from '../utils/Error.js'
import fs from 'fs'  
import Storage from 'memory-chunk-store'
import { torrentSearch } from "../utils/torrent.js"
import WebTorrent from "webtorrent"
import {Transform} from 'stream' 

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

      try {
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
      } catch(err) {
         throw new NotFoundError('There is not a media like that!')
      }
        
     }

     async getEpisodes(req,res) {
      const showData = await Show.findOne({slug: req.params.slug})
      if(showData) {
         const episodes = await Episode.find({show:showData._id})
         res.json(episodes)
      }
     }

     async streamFile(req,res) {
         const title = req.params.slug
         let torrentId =  await torrentSearch(title,0)

         client.on('error' , (err) => {
            console.log(err)
         })
         
         let destroyed = false
         // Check for torrent existing
         function checkTorrent() {
            client.get(torrentId).then(result => {
               if(result) { 
                  result.destroy({destroyStoreOnDestroy:true}, () => {
                     destroyed = !destroyed
                  })
                  addTorrent()
               } else {
                  addTorrent()
               }
            }) 
         }

         checkTorrent()

         function addTorrent() {
            let i = 1
            client.add(torrentId,{destroyStoreOnDestroy:true,store: Storage}, async function ontorrent (torrent) {
               let file = torrent.files.find(function (file) {
                  return file.name.endsWith('.mp4') || file.name.endsWith('.mkv')
               })   
               if (!file || file.name.endsWith('.avi')) {
                  torrentId = await torrentSearch(title,i++)  
                  checkTorrent()
                  return
               } 
               res.setHeader("Content-Type","video/webm")
               
               // ****
               // Doing this for sending stream data as piece, so preventing memory problems
               // Also for enabling seeking
               let range = req.headers.range
               if(!range) {
                  range = 'bytes=0-'
               }
               const positions = range.replace(/bytes=/, '').split('-')

               const start = parseInt(positions[0],10)
               const end = positions[1] ? parseInt(positions[1], 10) : file.length - 1
               const chunksize = (end - start) + 1

               res.statusCode = 206
               res.setHeader('Content-Range', `bytes ${start}-${end}/${file.length}`)
               res.setHeader('Accept-Ranges', 'bytes')
               res.setHeader('Cache-Control', 'no-store')
               res.setHeader('Content-Length', chunksize)
               // ****  
               const fileStream = file.createReadStream({start,end})  
               // a Transform stream to intercept errors
               const errorHandler = new Transform({
                  transform(chunk, encoding, callback) {
                        // Pass the chunk as-is to the output, but catch errors
                        try {
                              callback(null, chunk); 
                        } catch (error) {
                           res.end();
                        }
                  }
               });  
               
               fileStream.pipe(errorHandler).pipe(res,{end:true});

               fileStream.on('end', () => {
                     res.end()
               });   
               res.on('close', () => {
                  // Destroy stream when browser connection lost 
                  fileStream.destroy(); 
               }) 
               
         })  
         }
         
     }

     async addContinueList(req,res) {  
      const {time,duration,mediaTitle,image,timeSeconds} = req.body
      try {
         const existData = await User.findOne({_id: req.user.userId})  
         const checkMediaTitle = existData.continueList.find(item => item.mediaTitle === mediaTitle);
         if(checkMediaTitle) {
            await User.updateOne({"continueList.mediaTitle": mediaTitle}, {$set: {
               "continueList.$.time": time,
               "continueList.$.mediaTitle": mediaTitle,
               "continueList.$.timeSeconds": timeSeconds,
               "continueList.$.image": image,
               "continueList.$.duration": duration,
             }})
         } else {
            await User.updateOne({_id: req.user.userId}, {$addToSet: {continueList:{mediaTitle,time,timeSeconds,image,duration}}}, {new:true,runValidators: true})
         } 

      } catch(err) {
         console.log(err)
      }
     }

 }
 
 let homePages = new home_Pages()
 
 export default homePages