import mongoose from "mongoose"
import speakingurl from 'speakingurl' 

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        unique:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:false
    },
    bookmark: {
        type: String,
        unique:false
    },
    slug: {
        type: String,
        unique:false
    },
})

bookmarkSchema.pre('validate', function (next) {
    this.slug = speakingurl(this.bookmark, {
        maintainCase: false,
        separator: '-',
        custom: {
          '+': '-plus'
        }
    })
    next()
})


const Bookmark = mongoose.model('Bookmarks', bookmarkSchema)

export default Bookmark