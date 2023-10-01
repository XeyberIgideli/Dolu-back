import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,"Please provide your name!"],
        trim:true,
        unique:true
    },
    email: {
        type: String,
        required:[true,"Please provide your email!"],
        trim: true,
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address!',
        ]
    },
    password: {
        type: String,
        required: [true,"Please provide your password!"],
        trim:true,
    },
    avatar: {
        type: String,
        trim: true,
        // required: [true, 'Please select an avatar!']
    },
    status: {
        type: String,
        enum: ['Active', 'Banned'],
        default: 'Active'
    },
    banExpireDate: {
        type: String,
        trim: true,
    },
    banReason: {
        type: String,
        trim: true,
    },
    bookmarks: [{
        bookmark:{type: String},
        icon: {type: String} 
    }],
    continueList: [{
        mediaTitle: {type:String},
        time: {type: Number},
        timeSeconds: {type: Number},
        duration: {type: Number},
        image: {type: String}
    }]
}) 

// Password hashing
userSchema.pre('save', function (next){
    const user = this
    bcrypt.hash(user.password,10, (err,hash) => {
        user.password = hash
        next()
    })
})

// Creating JWT
userSchema.methods.createJWT = function () {
    return jwt.sign({userId:this.id,username:this.username},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

// Comparing passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    const isEqual = await bcrypt.compare(password,this.password)
    return isEqual
}

const User = mongoose.model('User',userSchema)

export default User