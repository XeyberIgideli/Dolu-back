import fs from 'fs'
import Show from '../../models/Show.js'
import {uniqueID,fileUpdate} from '../../utils/Helper.js'

class showController { 
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show',{pageName:'shows'})
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
        let arr = {}
        let uniqueImageName
        let uploadedImage
        let imageExt
        let uploadPath

        var hasError = true

        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null
        let directorArr = req.body.director ? req.body.director.split(',') : null
        
        Object.keys(files).forEach(file => {
            uploadedImage = files[file]
            imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            uploadPath = globalDirName + '/public/uploads/show/' + uniqueImageName + imageExt
            arr[file] = uploadPath
        })
        const show = await Show.create({...req.body,...arr,genres:genresArr,director: directorArr})
        hasError = false


        if(!hasError) {
           for(let file in files) {  
             await files[file].mv(arr[file])
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
        const genres = req.body['genres[]'] 
        if(req.files) {
          let files = req.files 
          fileUpdate(Show,'show',files,body)
        }
        await Show.updateOne({title: body.title},{...body,genres})  
        res.redirect('../tv-shows')
      } catch (err) {
        res.json(err)
      }

     }
}

let ShowController = new showController()

export default ShowController