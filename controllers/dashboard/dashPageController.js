class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index')
     } 
     getDashMoviesPage(req,res) {
        res.render('dashboard/movies')
     }
     getAddNewMoviePage(req,res) {
        res.render('dashboard/add-new-movie')
     }
     
     getDashShowsPage(req,res) {
        res.render('dashboard/movies')
     }
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show')
     }
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages