class get_Pages {
   async getIndexPage(req,res) {
        res.render('index')
    }  
    getAuthPage (req,res) {
        res.render('auth')
    } 
    getAdminLoginPage(req,res) {
        res.render('dashboard/login')
    }
}

let getPages = new get_Pages()

export default getPages