import Movie from "../models/Movie.js"
import Show from "../models/Show.js"
class home_Pages { 
     async getHomePage(req,res) { 
        const movies = await Movie.find()
        const shows = await Show.find()
         res.render('home',{
            movies,
            shows
         })
     } 
     getMoviesPage(req,res) {
         res.render('movies')
     } 
     async getWatchPage(req,res) {
        res.render('watch')
     }
 }
 
 let homePages = new home_Pages()
 
 export default homePages