const mongoose = require("mongoose");
const responseMessage = require("./http.response")

module.exports.getAll = (req, res) => {
    const customerId = req.params.customerId;
    const db = mongoose.model(process.env.CUSTOMER_MODEL)

    db.findById(customerId).select("orders").exec()
        .then((data) => {
            responseMessage.successOkResponse(res, data);
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.getOne = (req, res) => {
    const customerId = req.params.customerId;
    const orderId = req.params.orderId;
    const db = mongoose.model(process.env.CUSTOMER_MODEL);

    db.findById(customerId).select("orders").exec()
        .then((data) => {
            if (!data) {
                responseMessage.fileNotFoundResponse(res)
            }
            else {
                let newData = data.orders.filter((item) => item._id.toString() == orderId)
                responseMessage.successOkResponse(res, newData);
            }
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

const _pushOrder = function (req, res, data) {
    if (req.body) {
        let newData = data.orders;
        newData.push({ items: req.body.items, date: new Date().toLocaleString().split(',')[0]})
        data.orders = newData;

        data.save().
            then((data) => {
                responseMessage.successCreateResponse(res, data)
            })
            .catch((err) => {
                responseMessage.systemErrorResponse(res, err);
            })
    }
    else {
        responseMessage.userErrorResponse(res, process.env.INPUT_ERROR_MESSAGE)
    }
}

const _replaceOrder = function (req, res, data) {
    if (req.body) {
        const orderId = req.params.orderId;
        let newData = data.orders;
        let index = data.orders.findIndex((item) => item._id.toString() == orderId);
        if (index > -1) {
            newData[index].items = req.body.items
        }
        data.orders = newData;

        data.save().
            then((data) => {
                data = data.orders.filter((item) => item._id.toString() == orderId);
                responseMessage.successCreateResponse(res, data)
            })
            .catch((err) => {
                responseMessage.systemErrorResponse(res, err);
            })
    }
    else {
        responseMessage.userErrorResponse(res, process.env.INPUT_ERROR_MESSAGE)
    }
}

const _changeOrder = function (req, res, data) {
    if (req.body) {
        if (req.body.items) {
            const orderId = req.params.orderId;
            let newData = data.orders;
            let index = data.orders.findIndex((item) => item._id.toString() == orderId);
            if (index > -1) {
                newData[index].items = req.body.items
            }
            data.orders = newData;
        }

        data.save().
            then((data) => {
                data = data.orders.filter((item) => item._id.toString() == orderId);
                responseMessage.successCreateResponse(res, data)
            })
            .catch((err) => {
                responseMessage.systemErrorResponse(res, err);
            })
    }
    else {
        responseMessage.userErrorResponse(res, process.env.INPUT_ERROR_MESSAGE)
    }
}

const _deleteOrder = function (req, res, data) {
    if (req.body) {
        const orderId = req.params.orderId;
        let newData = data.orders.filter((item) => item._id.toString() != orderId);
        data.orders = newData;

        data.save().
            then((data) => {
                responseMessage.successCreateResponse(res, data)
            })
            .catch((err) => {
                responseMessage.systemErrorResponse(res, err);
            })
    }
    else {
        responseMessage.userErrorResponse(res, process.env.INPUT_ERROR_MESSAGE)
    }
}

const _getOrderFirst = function (req, res, callUpdater) {
    const customerId = req.params.customerId;
    const db = mongoose.model(process.env.CUSTOMER_MODEL);

    db.findById(customerId).select("orders").exec()
        .then((data) => {
            if (!data) {
                responseMessage.fileNotFoundResponse(res)
            }
            else {
                callUpdater(req, res, data);
            }
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.addOne = (req, res) => {
    _getOrderFirst(req, res, _pushOrder)
}

module.exports.fullUpdate = (req, res) => {
    _getOrderFirst(req, res, _replaceOrder)
}

module.exports.partialUpdate = (req, res) => {
    _getOrderFirst(req, res, _changeOrder)
}

module.exports.deleteOne = (req, res) => {
    _getOrderFirst(req, res, _deleteOrder)
}