const AppError = require('../utils/AppError');

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      msg: error.message,
    });
  }
  return res.status(500).send(error.message);
};

module.exports = errorHandler;
