const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, process.env.NAME_ERROR]
    },
    username: {
        type: String,
        unique: true,
        required: [true, process.env.USERNAME_ERROR]
    },
    password: {
        type: String,
        required: [true, process.env.PASSWORD_ERROR]
    }
});

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USR_NAME)