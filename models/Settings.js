import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema({
    siteTitle: {
        type: String,
        required: [true, "Please provide your site title!"],
        trim: true
    },
    siteDescription: {
        type: String,
        required: [true, "Please provide your site title!"],
        trim: true
    },
    siteKeywords: {
        type: Array,
        required: [true, "Please provide your site title!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
            }, 
        },
        trim: true
    }
})

const Settings = mongoose.model('Settings', settingsSchema)

export default settingsSchema