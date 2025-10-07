class ResponseHelper {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, error, message = 'Error occurred', statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      error: message,
      details: error.message || error
    });
  }

  static validationError(res, message = 'Validation failed', statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      error: 'Validation Error',
      message
    });
  }

  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message
    });
  }

  static unauthorized(res, message = 'Unauthorized access') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message
    });
  }
}

module.exports = ResponseHelper;
