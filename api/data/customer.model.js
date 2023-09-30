const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    items: [itemSchema],
    date: {
        type: Date,
        "default": new Date().toLocaleString().split(',')[0]
    }
})

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orders: [orderSchema]
})

mongoose.model(process.env.CUSTOMER_MODEL, customerSchema, process.env.CL_NAME)