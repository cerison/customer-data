const mongoose = require("mongoose");
require("./customer.model")
require("./user.model")

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on("connected", () => {
    console.log(process.env.DB_CONNECTED_MESSAGE, process.env.DB_NAME)
})

mongoose.connection.on("disconnected", () => {
    console.log(process.env.DB_DISCONNECTED_MESSAGE)
})

mongoose.connection.on("error", (err) => {
    console.log(process.env.DB_ERROR_MESSAGE, err)
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    })
})