
module.exports.successOkResponse = function (res, data) {
    res.status(parseInt(process.env.GET_STATUS_CODE)).json(data)
}

module.exports.successCreateResponse = function (res, data) {
    res.status(parseInt(process.env.POST_STATUS_CODE)).json(data)
}

module.exports.successNoContentResponse = function (res, data) {
    res.status(parseInt(process.env.GET_STATUS_CODE)).json(data)
}

module.exports.systemErrorResponse = function (res, data) {
    res.status(parseInt(process.env.SYSTEM_ERROR_CODE)).json({ message: data })
}

module.exports.userErrorResponse = function (res, data) {
    res.status(parseInt(process.env.USER_ERROR_CODE)).json({ message: data })
}

module.exports.fileNotFoundResponse = function (res) {
    res.status(parseInt(process.env.FILE_NOT_FOUND_CODE)).json({ message: process.env.ID_NOT_FOUND_MESSAGE })
}

module.exports.pageNotFoundResponse = function (res) {
    res.status(parseInt(process.env.FILE_NOT_FOUND_CODE)).json({ message: process.env.PAGE_NOT_FOUND_MESSAGE })
}

module.exports.queryStringResponse = function (res) {
    res.status(parseInt(process.env.USER_ERROR_CODE)).json({ message: process.env.QUERY_ERROR_MESSAGE })
}

module.exports.maximumLimitError = function (res, data) {
    res.status(parseInt(process.env.USER_ERROR_CODE)).json({ message: data })
}

module.exports.invalidUserResponse = function (res, data) {
    res.status(parseInt(process.env.USER_ERROR_CODE)).json({ message: data })
}