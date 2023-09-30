const express = require("express");
const router = express.Router();
const userController = require("../../controller/user.controller")
const credentialController = require("../../controller/credential.controller")

router.route("/")
    .get(userController.getAll)
    .post(userController.addOne)

router.route("/:userId")
    .delete(credentialController.verify, userController.deleteOne)

module.exports = router