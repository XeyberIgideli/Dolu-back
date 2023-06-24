import fs from 'fs'
import Movie from '../../models/Movie.js'
import {uniqueID} from '../../utils/Helper.js'

class movieController { 
    getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie')
     }

    async createMovie(req,res) {
      
      try {  
        const uploadDir = 'public/uploads/movie'

        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,{recursive:true})
        }
        const files = req.files
        let arr = {}

        for(let file in files) {
            let uploadedImage = req.files[file]
            let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            let uploadPath = globalDirName + '/public/uploads/movie/' + uniqueImageName + imageExt

            await uploadedImage.mv(uploadPath); // Dosya yükleme işleminin tamamlanmasını bekleyin

            arr[file] = uploadPath
        }
    const movie = await Movie.create({
              ...req.body,
              ...arr,
            });
        res.json(req.body)
    } catch(err) {
        res.json(err)
    }
  }
}

let MovieController = new movieController()

export default MovieController