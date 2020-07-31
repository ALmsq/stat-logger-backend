import mongoose from 'mongoose'
const bcrypt = require('bcryptjs')
// const User = require('../models/Users')
import { UserSchema } from '../models/users'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = mongoose.model('users', UserSchema)

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user)
    })
})

passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) =>{
        //match user
        User.findOne({ username: username })
        .then(user => {
            //create new user
            if(!user) {
                const newUser = new User({ username, password })
                //hash password before saving in database
                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        newUser.password = hash
                        newUser.save()
                        .then(user => {
                            return done(null, user)
                        })
                        .catch(err => {
                            return done(null, false, { message: err })
                        })
                    })
                })
                //return other user
            }   else {
                //match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err

                    if(isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Wrong password'})
                    }
                })
            }
        })
        .catch(err => {
            return done(null, false, { message: err })
        })
        
    })
)

module.exports = passport