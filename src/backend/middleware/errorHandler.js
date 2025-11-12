/* This code snippet is exporting a default function that handles errors. When
an error occurs, this function takes in the error object `err`, the request object `_req`, and the
response object `res`. */
export default (err, _req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // eslint-disable-next-line no-undef
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
