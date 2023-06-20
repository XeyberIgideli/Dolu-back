class get_DashPages { 
     getDashboardPage(req,res) {
         res.render('dashboard/index')
     } 
 }
 
 let getDashPages = new get_DashPages()
 
 export default getDashPages