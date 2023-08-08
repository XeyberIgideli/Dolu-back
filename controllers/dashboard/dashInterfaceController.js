import InterfaceSetting from "../../models/Interface.js" 

class userInterface {  
    async getHomeSectionsPage(req,res) {
      const interfaceSetting = await InterfaceSetting.find()
      const interfacedata = interfaceSetting[0].homeSections
      res.render('dashboard/home-sections', {pageName: 'userInterface',interfacedata})
     }
     async updateHomeSections(req,res) {
        const update = await InterfaceSetting.updateMany({homeSections: req.body}) 
        res.redirect('back')
     }
 }
 
 let UserInterface = new userInterface()
 
 export default UserInterface