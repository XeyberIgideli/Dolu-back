import Movie from "../../models/Movie.js"
import Show from "../../models/Show.js"

class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index',{pageName: 'index'})
     } 
     async getDashMoviesPage(req,res) {
        const page = req.query.page || 1
        const postPerPage = 10
        const totalPost = await Movie.find().countDocuments()
  
        const movies = await Movie.find().sort('-dateCreated').skip((page - 1) * postPerPage).limit(postPerPage)

        res.render('dashboard/movies', {
        movies,
        pageName: 'movies',
        currentPage: page,
        totalPage: Math.ceil(totalPost / postPerPage)
        })
     }
     
    async getDashShowsPage(req,res) {
      const page = req.query.page || 1
      const postPerPage = 10
      const totalPost = await Show.find().countDocuments()


      const shows = await Show.find().sort('-dateCreated').skip((page - 1) * postPerPage).limit(postPerPage)

      res.render('dashboard/tv-shows', {
        shows,
        pageName: 'shows',
        currentPage: page,
        totalPage: Math.ceil(totalPost / postPerPage)
    })
     } 
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages