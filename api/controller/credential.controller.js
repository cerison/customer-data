const mongoose = require("mongoose");
const responseMessage = require("./http.response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

module.exports.authenticate = (req, res) => {
    const loginData = req.body

    const db = mongoose.model(process.env.USER_MODEL)

    const isUserExist = function (result) {
        return new Promise((resolve, reject) => {
            if (result) {
                resolve(result)
            }
            else {
                reject(process.env.INVALID_LOGIN_MESSAGE)
            }
        })
    }

    const comparePassword = function (password, user) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password)
                .then(passwordMatch => resolve({ match: passwordMatch, name: user.name }))
                .catch(err => reject(err))
        })
    }

    const isPasswordExist = function (result) {
        return new Promise((resolve, reject) => {
            if (result.match) {
                resolve(result.name)
            }
            else {
                reject(process.env.INVALID_LOGIN_MESSAGE)
            }
        })
    }

    const generateToken = function (name) {
        const expireTime = parseInt(process.env.JWT_EXPIRE_TIME);
        const sign = util.promisify(jwt.sign)
        return new Promise(resolve => {
            sign({ name: name }, process.env.JWT_SECRET_KEY, { expiresIn: expireTime })
                .then(token => resolve({ token: token }))
        })
    }

    db.findOne({ username: loginData.username })
        .then(user => isUserExist(user))
        .then((user) => comparePassword(loginData.password, user))
        .then(comparedResult => isPasswordExist(comparedResult))
        .then(name => generateToken(name))
        .then(response => responseMessage.successCreateResponse(res, response))
        .catch((err) => responseMessage.invalidUserResponse(res, err))
}

module.exports.verify = function (req, res, next) {
    const headerExist = req.headers.authorization;
    if (headerExist) {
        const token = headerExist.split(" ")[1];
        const tokenVerify = util.promisify(jwt.verify);
        tokenVerify(token, process.env.JWT_SECRET_KEY)
            .then(() => next())
            .catch(() => responseMessage.invalidUserResponse(res, process.env.INVALID_LOGIN_MESSAGE))
    } else {
        responseMessage.invalidUserResponse(res, process.env.INVALID_LOGIN_MESSAGE)
    }
}