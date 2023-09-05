import express from 'express'
import homePages from '../controllers/homeController.js' 
import fs from 'fs'
const router = express.Router()

router.get('/home',homePages.getHomePage)
router.get('/movies',homePages.getMoviesPage)
router.get('/bookmarks',homePages.getBookmarksPage)
router.get('/stream/:slug',homePages.streamFile)
router.get('/watch/:slug',homePages.getWatchPage)
router.get('/watch/getEpisodes/:slug',homePages.getEpisodes)
router.get('/testvideo', (req,res) => {
    let range = req.headers.range
    if(!range) {
       range = 'bytes=0-'
    }
    const ChunkSize = 10**6
    const videoPath = 'video.mp4'
    const videoSize = fs.statSync(videoPath).size
    const start = Number(range.replace(/\D/g,""))
    const end = Math.min(start + ChunkSize, videoSize - 1) 
    const contentLength = end - start + 1

    res.statusCode = 206
    res.setHeader('Content-Range', `bytes ${start}-${end}/${videoSize}`)
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('Content-Length', contentLength)

    const videoStream = fs.createReadStream(videoPath, {start,end})

    videoStream.pipe(res)
})
export default router