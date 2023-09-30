const express = require("express");
const router = express.Router();
const customerController = require("../../controller/customer.controller")
const orderController = require("../../controller/order.controller")
const credentialController = require("../../controller/credential.controller")

router.route("/")
    .get(customerController.getAll)
    .post(credentialController.verify, customerController.addOne)

router.route("/count")
    .post(customerController.getCount)

router.route("/:customerId")
    .get(customerController.getOne)
    .put(credentialController.verify, customerController.fullUpdate)
    .patch(credentialController.verify, customerController.partialUpdate)
    .delete(credentialController.verify, customerController.deleteOne)

router.route("/:customerId/orders")
    .get(orderController.getAll)
    .post(credentialController.verify, orderController.addOne)

router.route("/:customerId/orders/:orderId")
    .get(orderController.getOne)
    .put(credentialController.verify, orderController.fullUpdate)
    .patch(credentialController.verify, orderController.partialUpdate)
    .delete(credentialController.verify, orderController.deleteOne)

module.exports = router