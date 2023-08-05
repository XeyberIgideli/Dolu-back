import fs from 'fs'
import User from '../../models/User.js'
import Bookmark from '../../models/Bookmark.js'

class userController { 
  // Get pages 
    async getBannedUsersPage(req,res) {
      const page = req.query.page || 1
      const postPerPage = 10
      const totalPost = await User.find().countDocuments()

      const users = await User.find({status: 'Banned'}).sort('-dateCreated').skip((page - 1) * postPerPage).limit(postPerPage) 
      res.render('dashboard/banned-users',{
        users,
        pageName:'users',
        currentPage: page,
        totalPage: Math.ceil(totalPost / postPerPage)})
    }
    
  // Post operations  
   
    async banUser(req,res,next) {
      let update = {}
      for (const key of Object.keys(req.body)){
        if (req.body[key] !== '') {
            update[key] = req.body[key];
        }
    }
    update['status'] = 'Banned'
      try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {$set: update}, {new: true}) 
        res.redirect('back')
      } catch(err) {
        next(err)
      } 
    }

    async deleteUser(req,res,next) {
      try {
        const user = await User.findOne({_id: req.params.id})
        const bookmark = await Bookmark.findOne({user:req.params.id})
        if(bookmark) {
          bookmark.deleteOne()
        }
        user.deleteOne()  
        res.redirect('back')
      } catch(err) {
        next(err)
      }      
    }
}

let UserController = new userController()

export default UserController