import Bookmark from "../models/Bookmark.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
import Episode from "../models/Episode.js"
import InterfaceSetting from "../models/Interface.js" 

import fs from 'fs' 
import fluentFfmpeg from "fluent-ffmpeg" 
import { spawn } from "child_process"
import Storage from 'memory-chunk-store'
import { torrentSearch } from "../utils/torrent.js"
import WebTorrent from "webtorrent"
import {Transform} from 'stream' 


fluentFfmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
fluentFfmpeg.setFfprobePath(process.env.FFPROBE_PATH);

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
      const title = req.params.slug
      let torrentId = await torrentSearch(title,0)

      client.on('error' , (err) => {
         console.log(err)
      })
      
      let destroyed = false

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
            const subtitleLang = req.query.subtitle  
            let file = torrent.files.find(function (file) {
               return file.name.endsWith('.mp4') || file.name.endsWith('.mkv')
            })
            // const subtitle = torrent.files.find(file => {
            //    return file.name.endsWith('.srt')
            // })
   
            // if (!subtitle) {
            //    res.status(404).send('SRT file not found in the torrent.')
            //    return
            // } 
   
            if (!file) {
               torrentId = await torrentSearch(title,i++) 
               checkTorrent()
               return
            } 
   
            let start = 0
            let end = 0
            
            if(subtitleLang) {
               res.setHeader('Content-Type', 'text/plain')
               // file = subtitle
            } else {
               res.setHeader("Content-Type","video/webm")
               
               // ****
               // Doing this for sending stream data as piece, so preventing memory problems
               // Also for enabling seeking
               let range = req.headers.range
               if(!range) {
                  range = 'bytes=0-'
               }
               const positions = range.replace(/bytes=/, '').split('-')
               
               start = parseInt(positions[0],10)
               end = positions[1] ? parseInt(positions[1], 10) : file.length - 1
               const chunksize = (end - start) + 1

               res.statusCode = 206
               res.setHeader('Content-Range', `bytes ${start}-${end}/${file.length}`)
               res.setHeader('Accept-Ranges', 'bytes')
               res.setHeader('Cache-Control', 'no-store')
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
                        res.end();
                     }
               }
            });  
            // var stream = file.createReadStream({ start,end });
            // fluentFfmpeg(stream)
            //   .format('matroska')
            //   .videoCodec('libx264')
            //   .audioCodec('libmp3lame')
            //   .on('start', console.log)
            //   .on('error', console.error)
            //   .pipe(res); 
            fileStream.pipe(errorHandler).pipe(res, { end: true });

            fileStream.on('end', () => {
                  res.end();
            });  
            fileStream.on('error', err => {
               console.log(err)
            })
            res.on('close', () => {
               // Destroy stream when browser connection lost 
               fileStream.destroy(); 
               // console.log('Closed')
            }) 
            
      })  
      }
      


     }
 }
 
 let homePages = new home_Pages()
 
 export default homePages