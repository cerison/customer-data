require("dotenv").config()
require("./api/data/db")
const express = require("express");
const app = express();
const path = require("path");
const router = require("./api/route")
const responseMessage = require("./api/controller/http.response");

const logRequest = (req, res, next) => {
    next();
}
const allowCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    next();
}
const returnError = (req, res) => {
    responseMessage.pageNotFoundResponse(res);
}
const redirectError = (req, res) => {
    res.redirect("/error")
}
const printServer = () => {
    console.log(process.env.MSG_SERVER_START, server.address().port)
}

app.use(logRequest)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)))

app.use("/", allowCORS);
app.use("/api", router)
app.get("/error", returnError)
app.use(redirectError)

const server = app.listen(process.env.PORT, printServer)