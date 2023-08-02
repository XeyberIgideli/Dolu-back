import mongoose from "mongoose"
import speakingurl from 'speakingurl' 

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        unique:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookmark: {
        type: String,
    },
    slug: {
        type: String,
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