import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,"Please provide the media's title!"],
        trim:true,
        unique:true
    },
    subTitle: {
        type:String, 
        trim:true, 
    },
    description: {
        type: String,
        required:[true,"Please provide the media's description!"],
        trim: true, 
    },
    duration: {
        type: Number,
        required: [true,"Please provide the media's duration!"],
        trim:true,
    },
    releaseDate: {
        type: Number,
        required: [true,"Please provide the media's release date!"],
        trim:true,
    },
    releaseCountry: {
        type: String,
        required: [true,"Please provide the media's release country!"],
        trim:true,
    },
    rating: {
        type: Number,
        required: [true,"Please provide the media's rating!"],
        trim:true,
    },
    guidance: {
        type: String,
        required: [true,"Please provide the media's guidance!"],
        trim:true,
    },
    production: {
        type: String,
        required: [true,"Please provide the media's guidance!"],
        trim:true,
    },
    mediaType: {
        type: String,
        required: [true,"Please provide the media's type!"],
        trim:true,
        enum: ['Movie','Documentary','Animation']
    },
    genres: {
        type: [String],
        required: [true,"Please provide the media's genres!"],
        trim:true,
    },
    director: {
        type: [String],
        required: [true,"Please provide the media's director!"],
        trim:true,
    },
    mediaLanguage: {
        type: String,
        required: [true,"Please provide the media's language!"],
        trim:true,
    },
    portraitImage: {
        type: String,
        required: [true,"Please provide the media's portrait image!"],
        trim:true,
    },
    landscapeImage: {
        type: String,
        required: [true,"Please provide the media's landscape image!"],
        trim:true,
    },
    trailer: {
        type: String,
        required: [true,"Please provide the media's trailer link!"],
        trim:true,
    }
})

const Movie = mongoose.model('Movie',movieSchema)

export default Movie