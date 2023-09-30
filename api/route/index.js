const express = require("express");
const router = express();
const customerRoute = require("./routes/customer.route")
const userRoute = require("./routes/user.route")
const credentialRoute = require("./routes/credential.route")

router.use("/customers", customerRoute)
router.use("/users", userRoute)
router.use("/login", credentialRoute)

module.exports = router