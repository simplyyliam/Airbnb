export default (err, _req, res) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: { message, stack: import.meta.env.NODE_ENV === 'production' ? undefined : err.stack }
  });
};
