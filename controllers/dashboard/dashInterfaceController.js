import InterfaceSetting from "../../models/Interface.js" 
import fs from 'fs'

class userInterface {  
    async getHomeSectionsPage(req,res) {
      const interfaceSetting = await InterfaceSetting.find()
      const interfacedata = interfaceSetting[0].homeSections
      res.render('dashboard/home-sections', {pageName: 'userInterface',interfacedata,roleData: req.role})
     }
    async getLogoFaviconPage(req,res) {
      const interfaceSetting = await InterfaceSetting.find() 
      res.render('dashboard/logo-favicon', {pageName: 'userInterface',data:interfaceSetting,roleData: req.role})
     }
     async updateHomeSections(req,res) {
        const update = await InterfaceSetting.updateMany({homeSections: req.body}) 
        res.redirect('back')
     }
     async updateLogoFavicon(req,res) {
       let obj = {}
       const buffers = Object.keys(req.files).map(item => obj[item] = req.files[item].data.toString('base64'))
       const update = await InterfaceSetting.updateMany({logo: obj.logo, favicon: obj.favicon}) 


        res.redirect('back')
     }
 }
 
 let UserInterface = new userInterface()
 
 export default UserInterface