const error = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Something failed... :(";
  res.status(statusCode).send(errorMessage);
};

export default error;
