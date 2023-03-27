require('dotenv').config()
const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.mongoURL)


module.exports = {
    connection
}

// "name":"ak",
// "gender":"male",
// "age":54,
// "city":"pune",
// "email":"ak@gmail.com",
// "password":"1234"
