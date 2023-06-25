import fs from 'fs'
import Movie from '../../models/Movie.js'
import {uniqueID} from '../../utils/Helper.js'

class movieController { 
    getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie')
     }

    async createMovie(req,res,next) {
      
      try {  
        const uploadDir = 'public/uploads/movie'

        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,{recursive:true})
        }
        const files = req.files
        let arr = {}
        var hasError = true
        let genresArr = req.body['genres[]'] ? req.body['genres[]'].split(',') : null
        let directorArr = req.body.director ? req.body.director.split(',') : null

        const movie = await Movie.create({...req.body,...arr,genres:genresArr,director: directorArr})
        hasError = false
        
        for(let file in files) {
                let uploadedImage = req.files[file]
                let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
                let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
                let uploadPath = globalDirName + '/public/uploads/movie/' + uniqueImageName + imageExt
                
                arr[file] = uploadPath
                if(!hasError) {
                    await uploadedImage.mv(uploadPath)
                }
        } 

    } catch(err) {
        next(err)
    }
  }
}

let MovieController = new movieController()

export default MovieController