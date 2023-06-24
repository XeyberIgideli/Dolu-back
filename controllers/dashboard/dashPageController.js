class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index')
     } 
     getDashMoviesPage(req,res) {
        res.render('dashboard/movies')
     }
     
     getDashShowsPage(req,res) {
        res.render('dashboard/tv-shows')
     }
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show')
     }
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages