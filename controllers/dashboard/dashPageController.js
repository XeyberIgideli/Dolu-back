import Movie from "../../models/Movie.js"
import Show from "../../models/Show.js"

class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index',{pageName: 'index'})
     } 
     async getDashMoviesPage(req,res) {
         const movies = await Movie.find()
        res.render('dashboard/movies', {
        movies,
        pageName: 'movies'
        })
     }
     
    async getDashShowsPage(req,res) {
      const shows = await Show.find()

      res.render('dashboard/tv-shows', {shows,pageName: 'shows'})
     } 
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages