import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'webjsontoken'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,"Please provide your name!"],
        trim:true
    },
    email: {
        type: String,
        required:[true,"Please provide your email!"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address!',
        ]
    },
    password: {
        type: String,
        required: [true,"Please provide your password!"],
        trim:true,
    }
})

const User = mongoose.model('User',userSchema)

export default User