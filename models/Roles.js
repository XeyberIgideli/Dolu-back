import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const roleSchema = new mongoose.Schema({
    username: {
       type: String,
       required: [true,"Please provide the username!"],
       unique:true,
       trim:true 
    },
    password: {
        type: String,
        required: [true,"Please provide the password!"],
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin','editor'],
        default: 'admin'
    }
})

// Password hashing
roleSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password,10,(err,hash) => {
        user.password = hash
        next()
    })
})

// Creating JW token
roleSchema.methods.createJWT = function() {
    return jwt.sign({roleId:this.id,username:this.username},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

// Password comparing
roleSchema.methods.isPasswordCorrect = async function (password) {
    const isEqual = await bcrypt.compare(password,this.password)
    return isEqual
}

const Roles = mongoose.model('Roles',roleSchema)

export default Roles