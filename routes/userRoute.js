import express from "express"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

const router = express.Router()

router.get('/userData', async (req,res) => {
    const referer = req.headers['referer'];  
    if (referer && req.user) {
        let {username, email, password, continueList} = await User.findOne({_id:req.user.userId})
        password = password.substr(0,13) 
        res.json({username,email,password,continueList})
    } else {
        res.status(403).send('Forbidden');
    }
    
})
router.post('/updateUserData', async (req,res) => {
    const referer = req.headers['referer']; 
    try {
        if(referer) {
            if(req.body['password']) {
                let password = req.body['password']
               const hash = await bcrypt.hash(password,10) 
               req.body['password'] = hash
            } 
            const update = await User.updateOne({_id: req.user.userId}, req.body)
        } else {
            res.status(403).send('Forbidden operation!');
        }
    } catch(err) {
        res.json(err)
    }
})
export default router