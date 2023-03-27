const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const { userModel } = require('../model/user.model');
var jwt = require('jsonwebtoken');



userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, city, age } = req.body
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            if (err) res.send({ "msg": "Something went wrong" })
            else {
                const user = new userModel({ name, email, gender, city, age, password: hash })
                await user.save()
                res.send({ msg: "User Register successfully" })
            }
        });

    } catch (error) {
        res.status(400).send({ msg: "Registration Failed", error: error.message })
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                // result == true
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'ans');
                    res.send({ msg: "Login Successful", "token": token })
                } else {
                    res.send({ msg: "wrong password or id" })
                }
            });
        } else {
            res.send({ msg: "Login Failed" })
        }
    } catch (error) {
        res.status(400).send({ msg: "Login Failed", error: error.message })
    }
})

module.exports = {
    userRouter
}