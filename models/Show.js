import mongoose from 'mongoose'

const showSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,"Please provide the show's title!"],
        trim:true,
        unique:true
    },
    subTitle: {
        type:String, 
        trim:true, 
    },
    description: {
        type: String,
        required:[true,"Please provide the show's description!"],
        trim: true, 
    },
    duration: {
        type: Number,
        required: [true,"Please provide the show's duration!"],
        trim:true,
    },
    releaseDate: {
        type: Number,
        required: [true,"Please provide the show's release date!"],
        trim:true,
    },
    releaseCountry: {
        type: String,
        required: [true,"Please provide the show's release country!"],
        trim:true,
    },
    rating: {
        type: Number,
        required: [true,"Please provide the show's rating!"],
        trim:true,
    },
    guidance: {
        type: String,
        required: [true,"Please provide the show's guidance!"],
        trim:true,
    },
    production: {
        type: String,
        required: [true,"Please provide the show's guidance!"],
        trim:true,
    }, 
    genres: {
        type: Array,
        required: [true,"Please provide the show's genres!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
        }},
        trim:true,
    },
    director: {
        type: [String],
        required: [true,"Please provide the show's director!"],
        trim:true,
    },
    language: {
        type: String,
        required: [true,"Please provide the show's language!"],
        trim:true,
    },
    portraitImage: {
        type: String,
        trim:true,
    },
    landscapeImage: {
        type: String,
        trim:true,
    },
    trailer: {
        type: String,
        required: [true,"Please provide the show's trailer link!"],
        trim:true,
    },
    mode: {
        type: String,
        required: [true,"Please provide the show's mode!"],
        trim:true,
        enum: ['Featured','Popular', 'None']
    }

})

const Show = mongoose.model('Show',showSchema)

export default Show