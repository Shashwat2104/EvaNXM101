var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);

    if (token) {
        jwt.verify(token, 'ans', (err, decoded) => {
            console.log(decoded, err);
            // res.send(err)
            if (decoded) {
                console.log(decoded.userID);
                req.body.userID = decoded.userID
                next()
            } else {
                res.send({ "msg": "Please Login first" })
            }
        });
    } else {
        res.send({ "msg": "Please Login" })
    }
}

// module.exports = {
//     authenticate
// }
module.exports = {
    authenticate
}