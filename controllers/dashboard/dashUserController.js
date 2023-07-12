import fs from 'fs'
import User from '../../models/User.js'

class userController { 
  // Get pages 
    async getBannedUsersPage(req,res) {
      const page = req.query.page || 1
      const postPerPage = 10
      const totalPost = await User.find().countDocuments()

      const users = await User.find({status: 'Banned'}).sort('-dateCreated').skip((page - 1) * postPerPage).limit(postPerPage) 
      console.log(users)
      res.render('dashboard/banned-users',{
        users,
        pageName:'users',
        currentPage: page,
        totalPage: Math.ceil(totalPost / postPerPage)})
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