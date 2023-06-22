class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index')
     } 
     getDashMoviesPage(req,res) {
        res.render('dashboard/movies')
     }
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages