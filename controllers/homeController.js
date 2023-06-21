class home_Pages { 
     getHomePage(req,res) { 
         res.render('home',{
            user:req.user
         })
     } 
     getMoviesPage(req,res) {
         res.render('movies')
     } 
 }
 
 let homePages = new home_Pages()
 
 export default homePages