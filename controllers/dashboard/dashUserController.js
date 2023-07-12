import fs from 'fs'
import User from '../../models/User.js'

class userController { 
  // Get pages 
    async getBannedUsersPage(req,res) {
      const users = await User.findOne({status: 'Banned'}) 
      res.render('dashboard/edit-movie',{users,pageName:'users'})
    }
    
  // Post operations  
   
    async deleteUser(req,res,next) {
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

let UserController = new userController()

export default UserController