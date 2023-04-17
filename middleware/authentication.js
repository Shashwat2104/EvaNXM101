const jwt = require("jsonwebtoken")
const fs = require("fs")
require('dotenv').config()

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).send({ msg: "Please Login Again" })
        }

        const blacklistData = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))

        const IsTokenBlacklisted = blacklistData.find((b_token) => b_token == token)

        if (IsTokenBlacklisted) {
            return res.status(403).send({ msg: "Please Login again" })
        }

        const IsTokenValid = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!IsTokenValid) {
            return res.status(403).send({ msg: "Authentication Failed , Please Login Again" })
        }

        req.body.userId = IsTokenValid.userId;
        req.body.email = IsTokenValid.email;
        req.body.role = IsTokenValid.role;
        next()

    } catch (error) {
        res.send({ error: error.message, msg: "please login" })
    }
}
module.exports = {
    authentication
}