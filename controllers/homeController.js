class home_Pages { 
     getHomePage(req,res) {
         res.render('home')
     } 
 }
 
 let homePages = new home_Pages()
 
 export default homePages