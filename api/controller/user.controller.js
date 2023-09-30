const mongoose = require("mongoose");
const responseMessage = require("./http.response");
const bcrypt = require("bcrypt")

module.exports.getAll = (req, res) => {
    const db = mongoose.model(process.env.USER_MODEL)
    db.find().exec()
        .then((data) => {
            responseMessage.successOkResponse(res, data);
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.addOne = (req, res) => {
    const db = mongoose.model(process.env.USER_MODEL)
    if (req.body && req.body.name && req.body.username && req.body.password) {
        let newData = req.body

        const generateHash = function (password, salt) {
            return bcrypt.hash(password, salt)
        }

        const createUser = function (user, hashedPassword) {
            user.password = hashedPassword
            return db.create(user)
        }

        bcrypt.genSalt(parseInt(process.env.DEFAULT_SALT_ROUNDS))
            .then(salt => generateHash(newData.password, salt))
            .then(hashedPassword => createUser(newData, hashedPassword))
            .then(savedUser => responseMessage.successCreateResponse(res, savedUser))
            .catch(err => responseMessage.systemErrorResponse(res, err))
    }
    else {
        responseMessage.userErrorResponse(res, process.env.INPUT_ERROR_MESSAGE)
    }
}

module.exports.deleteOne = (req, res) => {
    const userId = req.params.userId;
    const db = mongoose.model(process.env.USER_MODEL);

    db.findByIdAndDelete(userId).exec()
        .then((data) => {
            if (!data) {
                responseMessage.fileNotFoundResponse(res)
            }
            else {
                responseMessage.successNoContentResponse(res, data)
            }
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}