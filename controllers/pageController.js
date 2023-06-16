class get_Pages {
   async getIndexPage(req,res) {
        res.render('index')
    } 
    getHomePage(req,res) {
        res.render('home')
    }
}

let getPages = new get_Pages()

export default getPages