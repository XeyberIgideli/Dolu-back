import mongoose from "mongoose"
import speakingurl from 'speakingurl' 

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookmark: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
})

bookmarkSchema.pre('validate', function (next) {
    this.slug = speakingurl(this.title, {
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