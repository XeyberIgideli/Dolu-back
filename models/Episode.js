import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,"Please provide the episode's title!"],
        trim:true, 
    },
    episode: {
        type:Number,
        required:[true,"Please provide the episode's episode!"],
        trim:true, 
    },
    season: {
        type:Number,
        required:[true,"Please provide the episode's season!"],
        trim:true, 
    },
    thumbnail: {
        type:String,
        required:[true,"Please provide the episode's thumbnail!"],
        trim:true, 
    },
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
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
    }

})

const Episode = mongoose.model('Episode',episodeSchema)

export default Episode