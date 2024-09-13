const responseHelper = (error, message, data = null) => {
    return {
        error: error,
        message: message,
        data: data
    }
}

module.exports = responseHelper