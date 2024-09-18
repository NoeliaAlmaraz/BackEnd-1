function errorHandler(error, req, res, next) {
    const { message, statusCode } = error;
    console.log(error);
    return res.status(statusCode || 500).json({ mensaje: message || "FATAL ERROR" });
}   

export default errorHandler;