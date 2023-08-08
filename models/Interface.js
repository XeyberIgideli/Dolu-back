import mongoose from 'mongoose'

const interfaceSettingSchema = new mongoose.Schema({
    homeSections: {
        showsByCategoriesSection:{type:String},
        featuredMoviesSection:{type:String},
        bookmarksSection:{type:String},
        topThreeOfDaySection:{type:String}
    },
    favicon: {
        type: String,
    },
    logo: {
        type: String
    }

})

const InterfaceSetting = mongoose.model('interfaceSetting',interfaceSettingSchema)

export default InterfaceSetting