

const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true, enum: ["Laptop", "Tablet", "Mobile"] },
    no_of_comments: { type: Number, required: true },
    userID: String
})

const postModel = mongoose.model("mongo", postSchema)

module.exports = {
    postModel
}