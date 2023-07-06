import fs from 'fs'
import Show from '../../models/Show.js'
import Episode from '../../models/Episode.js'
import {uniqueID,fileUpdateMI,fileUploadSI} from '../../utils/Helper.js'

class showController { 
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show',{pageName:'shows'})
     }
     
     async getAddNewEpisodePage(req,res) {
      const show = await Show.findOne({_id:req.params.id}) 
      res.render('dashboard/add-new-episode',{pageName:'shows', showData:show})
   }

    async getUpdateShowPage(req,res) {
      const show = await Show.findById(req.params.id) 
      res.render('dashboard/edit-show',{show,pageName:'shows'})
    }

    async createShow(req,res,next) {
      try {    
        const uploadDir = 'public/uploads/show'

        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,{recursive:true})
        }

        const files = req.files 
        let arrPath = {}
        let arrUpload = {}
        let uniqueImageName
        let uploadedImage
        let imageExt
        let uploadPath
        let uploadFile

        let hasError = true

        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null
        let directorArr = req.body.director ? req.body.director.split(',') : null
        
        Object.keys(files).forEach(file => {
            uploadedImage = files[file]
            imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            uploadPath = '/uploads/show/' + uniqueImageName + imageExt
            uploadFile = globalDirName + '/public/uploads/show/' + uniqueImageName + imageExt
            arrUpload[file] = uploadPath
            arrPath[file] = uploadFile
        })
        const show = await Show.create({...req.body,...arrUpload,genres:genresArr,director: directorArr})
        hasError = false

        if(!hasError) {
           for(let file in files) {  
             await files[file].mv(arrPath[file])
           } 
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

        if(req.files) {
          let files = req.files 
          fileUpdateMI(Show,'show',files,body)
        }
        await Show.updateOne({title: body.title},{...body,genres,trailer},{ runValidators: true })  
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

          const showFolderName = await Show.findOne({_id: body.showID})

          const uploadDir = `public/uploads/show/${showFolderName.title}`

          if(!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir,{recursive:true})
          }

          if(file) {
            uploadedFile = await fileUploadSI('show',file,showFolderName.title)
          }

          // const episode = await Episode.create({...body,show:body.showID,thumbnail:uploadedFile}) 

        } catch(err) {
          next(err)
        }
     }
}

let ShowController = new showController()

export default ShowController