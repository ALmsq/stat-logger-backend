import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const PostSchema = new Schema({
    name: {
        type: String
    },

    post: {
        type: String
    },

    like: {
        type: Number,
        default: 0
    },

    dislike: {
        type: Number,
        default: 0
    }
})

