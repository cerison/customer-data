const mongoose = require("mongoose");
const responseMessage = require("./http.response");

module.exports.getAll = (req, res) => {
    const db = mongoose.model(process.env.CUSTOMER_MODEL)
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

    let query = {}

    if (req.query && req.query.name) {
        const startDate = new Date(req.query.name);
        const endDate = new Date(startDate.getTime() + parseInt(process.env.ONE_DAY));
        query = { orders: { $elemMatch: { date: { $gte: startDate, $lt: endDate } } } };
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        responseMessage.queryStringResponse(res);
        return;
    }

    if (count > maxCount) {
        responseMessage.maximumLimitError(res, process.env.MAX_LIMIT_ERROR + maxCount);
        return;
    }

    db.find(query).skip(offset).limit(count).exec()
        .then((data) => {
            responseMessage.successOkResponse(res, data);
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.getCount = (req, res) => {
    const db = mongoose.model(process.env.CUSTOMER_MODEL)
    let query = {}

    if (req.body && req.body.name) {
        const startDate = new Date(req.body.name);
        const endDate = new Date(startDate.getTime() + parseInt(process.env.ONE_DAY));
        query = { orders: { $elemMatch: { date: { $gte: startDate, $lt: endDate } } } };
    }

    db.find(query).count().exec()
        .then((data) => {
            responseMessage.successOkResponse(res, data);
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.getOne = (req, res) => {
    const customerId = req.params.customerId;

    const db = mongoose.model(process.env.CUSTOMER_MODEL);

    db.findById(customerId).exec()
        .then((data) => {
            if (!data) {
                responseMessage.fileNotFoundResponse(res)
            } else {
                responseMessage.successOkResponse(res, data);
            }
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.addOne = (req, res) => {
    if (req.body) {
        let newData = req.body

        const db = mongoose.model(process.env.CUSTOMER_MODEL);
        db.create(newData)
            .then((data) => {
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

const _fullUpdateCustomer = function (req, res, data) {
    if (req.body) {
        data.name = req.body.name;
        data.email = req.body.email;
        data.orders = req.body.orders;

        if (req.body.orders) {
            data.orders = []
            for (let i = 0; i < req.body.orders.length; i++) {
                let item = [];
                for (let j = 0; j < req.body.orders[i].items.length; j++) {
                    item.push({ id: req.body.orders[i].items[j].id, name: req.body.orders[i].items[j].name })
                }
                data.orders.push({ "items": item, "date": new Date().toLocaleString().split(',')[0] })
            }
        }
        data.save()
            .then((data) => {
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

const _partialUpdateCustomer = function (req, res, data) {
    if (req.body) {
        if (req.body.name) {
            data.name = req.body.name;
        }
        if (req.body.email) {
            data.email = req.body.email;
        }

        if (req.body.orders) {
            data.orders = []
            for (let i = 0; i < req.body.orders.length; i++) {
                let item = [];
                for (let j = 0; j < req.body.orders[i].items.length; j++) {
                    item.push({ id: req.body.orders[i].items[j].id, name: req.body.orders[i].items[j].name })
                }
                data.orders.push({ "items": item, "date": new Date().toLocaleString().split(',')[0] })
            }
        }
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

const _callUpdateFunction = function (req, res, updateCustomer) {
    const customerId = req.params.customerId;
    const db = mongoose.model(process.env.CUSTOMER_MODEL);

    db.findById(customerId).exec()
        .then((data) => {
            if (!data) {
                responseMessage.fileNotFoundResponse(res)
            }
            else {
                updateCustomer(req, res, data)
            }
        })
        .catch((err) => {
            responseMessage.systemErrorResponse(res, err);
        })
}

module.exports.fullUpdate = (req, res) => {
    _callUpdateFunction(req, res, _fullUpdateCustomer)
}

module.exports.partialUpdate = (req, res) => {
    _callUpdateFunction(req, res, _partialUpdateCustomer)
}

module.exports.deleteOne = (req, res) => {
    const customerId = req.params.customerId;
    const db = mongoose.model(process.env.CUSTOMER_MODEL);

    db.findByIdAndDelete(customerId).exec()
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