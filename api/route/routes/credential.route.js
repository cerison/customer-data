const express = require("express");
const router = express.Router();
const credentialController = require("../../controller/credential.controller")

router.route("/")
    .post(credentialController.authenticate)

module.exports = router