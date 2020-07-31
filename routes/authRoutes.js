const express = require('express')
const router = express.Router()
const passport = require('passport')

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

// export const getPost = (req, res) => {
    
//     Post.find({},(err, Post) => {
//         if(err){
//             res.send(err)
//         }
//         res.json(Post)
//     })
// }

// router.get('/users', 
//     passport.authenticate('local', {session: false}),
//     function(req, res) {
//         res.json({ id: req.user.id, username: req.user.username })
//     })

// router.get('/users', (req, res, next) => {
    
//     res.json({ user: req.session.passport.user })
    
// })

router.get('/users', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err){
            res.send(err)
        }
        if(!user){
            res.send(res.status(400).json({ message: 'no user found' }))
        }
        res.json({ id: req.user.id, username: req.user.username })
        console.log(user)
    })(req, res, next)
})


module.exports = router