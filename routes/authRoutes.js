const express = require('express')
const router = express.Router()
const passport = require('passport')
import mongoose from 'mongoose'
import { UserSchema } from '../models/Users'
import connectEnsureLogin from 'connect-ensure-login'
import cors from 'cors'

router.use(cors())


const User = mongoose.model('users', UserSchema)

router.post('/register_login', (req, res, next) =>{
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err })
        }
        if(!user) {
            return res.status(400).json({ errors: 'No user found' })
        }
        req.logIn(user, function(err) {
            if(err) {
                return res.status(400).json({ errors: err })
            }
            return res.status(200).json({ success: `logged in ${user.id}`})
        })
    })(req, res, next)
})
router.post('/logout', function(req, res){
    req.logout()
    req.session.destroy((err) => {
        res.clearCookie('connect.sid')
        res.send('logged out')
    })
})

router.get('/user', (req, res) => {
    res.send({user: req.user})
    console.log(req.session)
});

router.get('/test', (req, res) =>{
    res.send({yo: 'yo'})
})


// export const getPost = (req, res) => {
    
//     Post.find({},(err, Post) => {
//         if(err){
//             res.send(err)
//         }
//         res.json(Post)
//     })
// }

// router.get('/user', (req, res, next) =>{
//     User.find({}, (err, User) =>{
//         if(err){
//             res.send(err)
//         }
//         res.json(User)
//     })
// })

// router.get('/users', 
//     passport.authenticate('local', {session: false}),
//     function(req, res) {
//         res.json({ id: req.user.id, username: req.user.username })
//     })

// router.get('/users', (req, res, next) => {
    
//     res.json({ user: req.session.passport.user })
    
// })

// router.get('/users', (req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if(err){
//             res.send(err)
//         }
//         if(!user){
//             res.send(res.status(400).json({ message: 'no user found' }))
//             console.log(JSON.stringify(res.user))
//         }
//         res.json({ id: req.user.id, username: req.user.username })

        
//     })(req, res, next)
// })


module.exports = router