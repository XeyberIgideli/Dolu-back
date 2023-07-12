import fs from 'fs'
import User from '../../models/User.js'

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
      try {
        const user = await User.findOne({_id: req.params.id})
        user.status = 'Banned'
        user.banReason = req.body.banReason
        user.banExpireDate = req.body.banExpireDate
        user.save()
        res.redirect('back')
      } catch(err) {
        next(err)
      } 
    }
}

let UserController = new userController()

export default UserController