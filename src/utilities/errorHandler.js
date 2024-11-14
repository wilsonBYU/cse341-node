const globalErrorHandler = async (err, req, res, next) => {
  console.log(`Error ${JSON.stringify(err)}`)
  res.status(err.code || 500).json({error: err.message || "There was an internal error!"})
}

module.exports = globalErrorHandler