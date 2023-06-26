import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
    episode: {
        type:Number,
        required:[true,"Please provide the show's episode!"],
        trim:true, 
    },
    season: {
        type:Number,
        required:[true,"Please provide the show's season!"],
        trim:true, 
    },
    thumbnail: {
        type:String,
        required:[true,"Please provide the show's thumbnail!"],
        trim:true, 
    },
    embed: {
        type:String,
        required:[true,"Please provide the show's embed link!"],
        trim:true,
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
    }

})

const Episode = mongoose.model('Episode',episodeSchema)

export default Episode