const express = require('express')
const fs = require('fs')

const bcrypt = require('bcrypt');
const productRoute = express.Router()
var jwt = require('jsonwebtoken');
const { productModel } = require('../model/product.model');
const { authorization } = require('../middleware/authorization');
require('dotenv').config()

productRoute.get("/all", async (req, res) => {
    try {
        const product = await productModel.find()
        res.send({ product })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

productRoute.post("/allBlogs", authorization(["seller"]), async (req, res) => {
    try {
        const product = new productModel(req.body)
        await product.save()
        res.send({ msg: 'Product Added Successfully' })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

productRoute.post('/delete/:productId', authorization(["seller"]), async (req, res) => {
    try {
        const { productId } = req.params
        const product = await productModel.find({ productId })

        if (product.sellerId == req.body.userId) {
            await productModel.deleteOne({ productId })
            res.send({ msg: "Product Deleted Successfully" })
        } else {
            res.status(403).send({ msg: 'Not Authorized' })
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

module.exports = {
    productRoute
}