import mongoose from "mongoose"
import speakingurl from 'speakingurl' 

const bookmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your bookmark group name!"],
        trim: true,
        unique: true
    },
    bookmarkIcon: {
        type: String,
        required: [true, "Please provide your bookmark group icon!"],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

bookmarkSchema.pre('validate', function (next) {
    this.slug = speakingurl(this.name, {
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