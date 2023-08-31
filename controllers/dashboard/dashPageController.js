import Movie from "../../models/Movie.js"
import Show from "../../models/Show.js"
import User from "../../models/User.js"
import {paginateResult} from '../../utils/Helper.js'

class get_DashPages { 
    getDashboardPage(req,res) {
         res.render('dashboard/index',{pageName: 'index'})
     } 
    async getDashMoviesPage(req,res) {
      const result = await paginateResult(req.query.page,Movie,10)

        res.render('dashboard/movies', {
        movies: result[0],
        pageName: 'movies',
        ...result[1]
        })
     }
     
    async getDashShowsPage(req,res) {
      const result = await paginateResult(req.query.page,Show,10)

      res.render('dashboard/tv-shows', {
        shows: result[0],
        pageName: 'shows',
        ...result[1]
    })
     } 

    async getDashUsersPage(req,res) {
      const result = await paginateResult(req.query.page,User,10)

      res.render('dashboard/users', {
        users: result[0],
        pageName: 'users',
        ...result[1]
    })
     }  
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages