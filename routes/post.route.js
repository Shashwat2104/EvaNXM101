const mongoose = require('mongoose')
const express = require('express');
const { postModel } = require('../model/post.model');
var jwt = require('jsonwebtoken');
const postRoute = express.Router()


postRoute.get("/", async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "ans")
    try {
        if (decoded) {
            let query = {}
            const { min = 1, max = 1000, page, device } = req.query
            if (device) {
                query.device = device
            }

            // query.no_of_comments = { $gte: min, $lte: max }

            const limit = 3
            const skip = (+page - 1) * limit
            const post = await postModel.find({ "userID": decoded.userID }, query).skip(skip).limit(limit)
            res.status(200).send(post)
        }
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRoute.get("/:id", async (req, res) => {
    try {
        let ID = req.params.id
        const post = await postModel.findById({ _id: ID })
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRoute.post("/add", async (req, res) => {

    try {
        let post = new postModel(req.body)
        await post.save()
        res.status(200).send({ msg: "Your Post Has been Added" })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRoute.patch("/update/:id", async (req, res) => {
    try {
        let ID = req.params.id
        await postModel.findByIdAndUpdate({ _id: ID })
        res.status(200).send({ msg: "Your Post Has been Updated" })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRoute.delete("/delete/:id", async (req, res) => {
    try {
        let ID = req.params.id
        await postModel.findByIdAndDelete({ _id: ID })
        res.status(200).send({ msg: "Your Post Has been Deleted" })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})


module.exports = {
    postRoute
}