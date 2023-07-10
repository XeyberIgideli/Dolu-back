import fs from 'fs'
import Show from '../../models/Show.js'
import Episode from '../../models/Episode.js'
import {uniqueID,fileUpdate,fileUploadSI,fileUploadMI} from '../../utils/Helper.js'

class showController { 
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show',{pageName:'shows'})
     }

    async getEpisodesPage(req,res) {
      const showID = req.params.id
      const page = req.query.page || 1
      const postPerPage = 10
      const totalPost = await Episode.find().countDocuments()

      const show = await Show.findOne({_id:req.params.id})
      const episode = await Episode.find({show:req.params.id}).populate('show').skip((page - 1) * postPerPage).limit(postPerPage)
      res.render('dashboard/episodes',{
        pageName:'shows',
        showTitle: show.title,
        showID,
        episodeData:episode,
        currentPage: page,
        totalPage: Math.ceil(totalPost / postPerPage)
        })
     }
     
    async getAddNewEpisodePage(req,res) {
      const show = await Show.findOne({_id:req.params.id}) 
      res.render('dashboard/add-new-episode',{pageName:'shows', showData:show})
     }

    async getEditEpisodePage(req,res) {
      const episode = await Episode.findOne({_id:req.params.id}).populate('show') 
      res.render('dashboard/edit-episode',{pageName:'shows', episodeData:episode})
     }

    async getUpdateShowPage(req,res) {
      const show = await Show.findById(req.params.id) 
      res.render('dashboard/edit-show',{show,pageName:'shows'})
    }

    async deleteShow(req,res,next) {
       const episode = await Episode.findOne({show: req.params.id})
       const show = await Show.findOne({_id: req.params.id})
       const path = globalDirName + '/public'
       const arr = [show.landscapeImage,show.portraitImage]  
       if(episode) {
        arr.push(episode.thumbnail)
       }
       try {
        await episode?.deleteOne()
        await show.deleteOne()  
        arr.forEach(item => {
          fs.unlinkSync(path + item)
        })  
        res.redirect('tv-shows')
       } catch(err) {
        next(err)
       } 
     }

    async createShow(req,res,next) {
      try {    
        const uploadDir = 'public/uploads/show'

        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,{recursive:true})
        }

        const files = req.files 
        const uploading = fileUploadMI('show',files)

        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null
        let directorArr = req.body.director ? req.body.director.split(',') : null

        const show = await Show.create({...req.body,...uploading.arrUpload,genres:genresArr,director: directorArr})
        
        for(let file in files) {
          await files[file].mv(uploading.arrPath[file])
        }

        res.redirect('../tv-shows')

    } catch(err) {
        next(err)
    }
     }

    async updateShow (req,res,next) {
      try { 
        const body = req.body
        const genres = req.body['genres[]'] ? req.body['genres[]'] : null
        const trailer = req.body.trailer ? req.body.trailer : null 
        let updatingFile
        if(req.files) {
          let files = req.files 
          updatingFile = await fileUpdate(Show,'show',files,body)
        }
        await Show.updateOne({_id: body.showID},{...body,...updatingFile,genres,trailer},{ runValidators: true })  
        res.redirect('../tv-shows')
      } catch (err) {
        next(err)
      }

     }

    async createEpisode(req,res,next) {
        try {
          let uploadedFile
          const body = req.body 
          const file = req.files?.thumbnail  
          const show = await Show.findOne({_id: body.showID})

          const uploadDir = `public/uploads/show/${show.title}`

          if(!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir,{recursive:true})
          }

          if(file) {
            uploadedFile = await fileUploadSI('show',file,show.title)
          }

          const episode = await Episode.create({...body,show:body.showID,thumbnail:uploadedFile}) 

          res.redirect(`../episodes/${body.showID}`)

        } catch(err) {
          next(err)
        }
     }

    async deleteEpisode(req,res,next) {
      const episode = await Episode.findOne({_id: req.params.id})
      const path = globalDirName + '/public'
      try {
       fs.unlinkSync(path + episode.thumbnail) 
       await episode.deleteOne()
       res.redirect('back')
      } catch(err) {
       next(err)
      } 
    }
    async updateEpisode(req,res,next) {
      try { 
        const body = req.body
        const embed = req.body.embed ? req.body.embed : null
        const show = await Show.findOne({_id: body.showID})
        let updatingFile
        if(req.files) {
          let files = req.files
          updatingFile = await fileUpdate(Episode,`show/${show.title}`,files,body)
        }
        await Episode.updateOne({_id: body.episodeID},{...body,...updatingFile,embed},{ runValidators: true })  
        res.redirect(`../${body.showID}`)
      } catch (err) {
        next(err)
      }
    }
}

let ShowController = new showController()

export default ShowController