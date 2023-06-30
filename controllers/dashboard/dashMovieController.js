import fs from 'fs'
import Movie from '../../models/Movie.js'
import Show from '../../models/Show.js'
import path from 'path'
import {uniqueID,fileUpdate} from '../../utils/Helper.js'

class movieController { 
    getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie', {pageName:'movies'})
     }
    async getUpdateMoviePage(req,res) {
      const movie = await Movie.findById(req.params.id) 
      res.render('dashboard/edit-movie',{movie,pageName:'movies'})
    }

    async createMovie(req,res,next) {

      try {  
        const uploadDir = 'public/uploads/movie'

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

        var hasError = true

        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null
        let directorArr = req.body.director ? req.body.director.split(',') : null
        Object.keys(files).forEach(file => {
            uploadedImage = files[file]
            imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            uploadPath = '/uploads/movie/' + uniqueImageName + imageExt
            uploadFile = globalDirName + '/public/uploads/movie/' + uniqueImageName + imageExt
            arrUpload[file] = uploadPath
            arrPath[file] = uploadFile
        })
        
        const movie = await Movie.create({...req.body,...arrUpload,genres:genresArr,director: directorArr})
        hasError = false

        if(!hasError) {
           for(let file in files) {  
             await files[file].mv(arrPath[file])
           } 
        }

        res.redirect('../movies')

    } catch(err) {
        next(err)
    }
     }

    async updateMovie(req,res,next) {
      try { 
        const body = req.body
        const genres = req.body['genres[]'] 
        if(req.files) {
          let files = req.files 
          fileUpdate(Movie,'movie',files,body)
        }
        await Movie.updateOne({title: body.title},{...body,genres})  
        res.redirect('../movies')
      } catch (err) {
        res.json(err)
      }
    }
}

let MovieController = new movieController()

export default MovieController