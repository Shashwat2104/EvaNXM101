const express = require('express');
const mongoose = require('mongoose');
const { connection } = require('./db');
const { authenticate } = require('./middleware/auth.middleware');
const { postRoute } = require('./routes/post.route');
const { userRouter } = require('./routes/user.route');
var cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use(authenticate)
app.use("/post", postRoute)


app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.listen(process.env.port, async () => {

    try {
        await connection
        console.log("server listening on port 4500");
    } catch (error) {
        console.log("DB is Disconnected");
    }
})