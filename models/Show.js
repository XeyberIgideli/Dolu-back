import mongoose from 'mongoose'
import speakingurl from 'speakingurl'

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
        type: String,
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
        type: [String],
        required: [true,"Please provide the show's production data!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
            }, 
        },
        trim:true,
    }, 
    season: {
        type: String,
        required: [true,"Please provide the show's season!"],
        trim:true,
    }, 
    genres: {
        type: [String],
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
    // trailer: {
    //     type: [String],
    //     required: [true,"Please provide the show's trailer link!"],
    //     validate: {
    //         validator: function(array) {
    //           return array.every((v) => typeof v === 'string');
    //         }, 
    //     },
    //     trim:true,
    // },
    embed: {
        type: [String],
        required: [true,"Please provide the show's embed/server links!"],
        validate: {
            validator: function(array) {
              return array.every((v) => typeof v === 'string');
            }, 
        },
        trim:true,
    },
    mode: {
        type: String,
        required: [true,"Please provide the show's mode!"],
        trim:true,
        enum: ['Featured','Popular', 'None']
    },
    bookmark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookmark'
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
    },
    slug: {
        type: String,
        unique: true
    },
},{timestamps:true})

showSchema.pre('validate', function (next) {
    this.slug = speakingurl(this.title+'-show', {
        maintainCase: false,
        separator: '-',
        custom: {
          '+': '-plus'
        }
    })
    next()
})

showSchema.pre('updateOne', function (next) {
    const updatedFields = this.getUpdate();
    console.log(updatedFields)
    if (updatedFields.title) {
        updatedFields.slug = speakingurl(updatedFields.title+'-show', {
            maintainCase: false,
            separator: '-',
            custom: {
                '+': '-plus'
            }
        });
    }
    
    next();
});

const Show = mongoose.model('Show',showSchema)

export default Show