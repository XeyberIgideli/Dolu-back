import Movie from "../../models/Movie.js"
import Show from "../../models/Show.js"

class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index')
     } 
     async getDashMoviesPage(req,res) {
         const movies = await Movie.find()
        res.render('dashboard/movies', {
        movies
        })
     }
     
    async getDashShowsPage(req,res) {
      const shows = await Show.find()

      res.render('dashboard/tv-shows', {shows})
     }
     getAddNewShowPage(req,res) {
        res.render('dashboard/add-new-show')
     }
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages