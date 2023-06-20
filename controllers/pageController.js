class get_Pages {
   async getIndexPage(req,res) {
        res.render('index')
    }  
    getAuthPage (req,res) {
        res.render('auth')
    }
    getDashboardPage(req,res) {
        res.render('dashboard/index')
    }
}

let getPages = new get_Pages()

export default getPages