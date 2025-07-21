const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: {
      code: 500,
      status: false,
      message: 'Server Error',
    },
  });
};

module.exports = { errorHandler };
