import fs from 'fs'
import Movie from '../../models/Movie.js'
import Show from '../../models/Show.js'
import path from 'path'
import {uniqueID,fileUpdate,fileUploadMI} from '../../utils/Helper.js'

class movieController { 
  // Get pages
    getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie', {pageName:'movies'})
     }
    async getUpdateMoviePage(req,res) {
      const movie = await Movie.findById(req.params.id) 
      res.render('dashboard/edit-movie',{movie,pageName:'movies'})
    }
    
  // Post operations  
    async createMovie(req,res,next) {

      try {  
        const uploadDir = 'public/uploads/movie'
        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,{recursive:true})
        }
        const files = req.files
        const uploading = fileUploadMI('movie',files)

        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null

        let directorArr = req.body.director ? req.body.director.split(',') : null
 
        
        const movie = await Movie.create({...req.body,...uploading.arrUpload,genres:genresArr,director: directorArr})

        for(let file in files) {  
          await files[file].mv(uploading.arrPath[file])
        } 

        res.redirect('../movies')

    } catch(err) {
        next(err)
    }
     }

    async updateMovie(req,res,next) {
      try { 
        const body = req.body
        const genres = req.body['genres[]'] ? req.body['genres[]'] : null
        const embed = req.body.embed ? req.body.embed : null
        let updatingFile
        if(req.files) {
          let files = req.files 
          updatingFile = await fileUpdate(Movie,'movie',files,body)
        }
        const movie = new Movie()
        await Movie.updateOne({_id: body.movieID},{...body,...updatingFile,genres,embed},{ runValidators: true })  
        // movie.sluglar(req.body.title)
        res.redirect('../movies')
      } catch (err) {
        next(err)
      }
    }
    
    async deleteMovie(req,res,next) {
      const movie = await Movie.findOne({_id: req.params.id})
      const path = globalDirName + '/public'
      const arr = [movie.landscapeImage,movie.portraitImage]  
      try {
       await movie.deleteOne()  
       arr.forEach(item => {
         fs.unlinkSync(path + item)
       })  
       res.redirect('back')
      } catch(err) {
       next(err)
      } 
    }
}

let MovieController = new movieController()

export default MovieController