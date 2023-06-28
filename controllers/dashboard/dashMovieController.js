import fs from 'fs'
import Movie from '../../models/Movie.js'
import path from 'path'
import {uniqueID} from '../../utils/Helper.js'

class movieController { 
    getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie')
     }
    async getUpdateMoviePage(req,res) {
      const movie = await Movie.findById(req.params.id) 
      res.render('dashboard/edit-movie',{movie})
    }

    async createMovie(req,res,next) {
      try {  
        const uploadDir = 'public/uploads/movie'

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
            uploadPath = globalDirName + '/public/uploads/movie/' + uniqueImageName + imageExt
            arr[file] = uploadPath
        })
        
        const movie = await Movie.create({...req.body,...arr,genres:genresArr,director: directorArr})
        hasError = false

        if(!hasError) {
           for(let file in files) {  
             await files[file].mv(arr[file])
           } 
        }

        res.redirect('../movies')

    } catch(err) {
        next(err)
    }
     }

    async updateMovie(req,res,next) {
      try { 
        let files = req.files
        let updatedFiles = {}

        const movie = await Movie.findOne({title: req.body.title}) 
        if(files) {
           Object.keys(files).forEach(async (file) => {
            let uploadedImage = files[file]
            let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            let uploadPath = '/uploads/movie/' + uniqueImageName + imageExt
            let filePath =  globalDirName + '/public' + uploadPath
            let removePath = globalDirName + '/public' + movie[file]

            fs.unlinkSync(removePath)
            await files[file].mv(filePath)
            
            movie[file] = uploadPath
            await movie.save()

            updatedFiles[file] = files[file]
        })
        }
        await Movie.updateMany(req.body)  
        res.redirect('../movies')
      } catch (err) {
        res.json(err)
      }
    }
}

let MovieController = new movieController()

export default MovieController