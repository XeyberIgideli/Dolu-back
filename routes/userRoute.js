import express from "express"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

const router = express.Router()

router.get('/userData', async (req,res) => {
    if(req.user) {
        let {username, email, password} = await User.findOne({_id:req.user.userId})
        password = password.substr(0,13)
        res.json({username,email,password})
    }
})
router.post('/updateUserData', async (req,res) => {
    try {
        if(req.body['password']) {
            let password = req.body['password']
           const hash = await bcrypt.hash(password,10) 
           req.body['password'] = hash
        } 
        const update = await User.updateOne({_id: req.user.userId}, req.body)
    } catch(err) {
        res.json(err)
    }
})
export default router