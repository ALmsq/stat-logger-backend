import mongoose from 'mongoose'

// const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
})

export const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        third_party_auth: [ThirdPartyProviderSchema],
        date: {
            type: Date,
            default: Date.now
        }
        
    },
    { strict: false }
)

// module.exports = User = mongoose.model("users", UserSchema)