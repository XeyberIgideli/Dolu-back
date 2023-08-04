import mongoose from 'mongoose'
import speakingurl from 'speakingurl'

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
        type: String,
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
        type: [String],
        required: [true,"Please provide the media's production data!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
            }, 
        },
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
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
        }},
        trim:true,
    },
    director: {
        type: [String],
        required: [true,"Please provide the media's director!"],
        trim:true,
    },
    language: {
        type: String,
        required: [true,"Please provide the media's language!"],
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
    // trailer: {
    //     type: [String],
    //     required: [true,"Please provide the media's trailer link!"],
    //     validate: {
    //         validator: function(array) {
    //           return array.every((v) => typeof v === 'string');
    //         }, 
    //     },
    //     trim:true,
    // },
    embed: {
        type: Array,
        required: [true,"Please provide the media's embed link!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
            }, 
        },
        trim:true
    },
    slug: {
        type: String,
        unique: true
    },
    bookmark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookmarks'
    },
    mode: {
        type: String,
        required: [true,"Please provide the media's mode!"],
        trim:true,
        enum: ['Featured','Popular', 'None']
    }
})

movieSchema.pre('validate', function (next) {
    this.slug = speakingurl(this.title, {
        maintainCase: false,
        separator: '-',
        custom: {
          '+': '-plus'
        }
    })
    next()
})

const Movie = mongoose.model('Movie',movieSchema)

export default Movie