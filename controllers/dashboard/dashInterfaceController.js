import Movie from "../../models/Movie.js"
import Show from "../../models/Show.js"
import User from "../../models/User.js"

class userInterface {  
    async getHomeSectionsPage(req,res) {
      res.render('dashboard/home-sections', {pageName: 'userInterface'})
     }
 }
 
 let UserInterface = new userInterface()
 
 export default UserInterface