import mongoose, { mongo } from 'mongoose'
import { PostSchema } from '../models/postModel'

const Post = mongoose.model('Post', PostSchema)



export const addNewPost = (req, res) => {
    let newPost = new Post(req.body)

    newPost.save((err, Post) =>{
        if(err){
            res.send(err)
        }
        res.json(Post)
    })
}

export const getPost = (req, res) => {
    
    Post.find({},(err, Post) => {
        if(err){
            res.send(err)
        }
        res.json(Post)
    })
}

export const getPostById = (req, res) => {
    
    Post.findById(req.params.PostId,(err, Post) =>{
        if(err){
            res.send(err)
        }
        res.json(Post)
    })
}

export const updatePost = (req, res) => {
    
    Post.findOneAndUpdate({ _id: req.params.PostId}, req.body, {new: true}, (err, Post) => {
        if(err){
            res.send(err)
        }
        res.json(Post)
    })
}

export const deletePost = (req, res) => {
    
    Post.deleteOne({ _id: req.params.PostId }, (err, Post) =>{
        if(err){
            res.send(err)
        }
        res.json({ message: 'Successfully deleted post'})
    })
}


