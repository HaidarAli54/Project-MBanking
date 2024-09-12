class ResponseHelper {
    constructor(res, statusCode, massage, data = null) {
        res.status(statusCode).json({
            massage,
            data
        })
    }
}

module.exports = ResponseHelper