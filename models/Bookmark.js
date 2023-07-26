import mongoose from "mongoose"

const bookmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your bookmark group name!"],
        trim: true
    },
    bookmarkIcon: {
        type: String,
        required: [true, "Please provide your bookmark group icon!"],
        trim: true
    }
})

const Bookmark = mongoose.model('Bookmarks', bookmarkSchema)

export default Bookmark