function errorHandler(err, req, res, next) {
	if (err && err.statusCode) {
		res.status(err.statusCode).json({ error: err.message })
	} else {
		console.error(err.stack)
		res.status(500).json({
			error: 'Internal Server Error',
			stack: process.env.NODE_ENV === 'development' ? err.stack : {},
		})
	}
}

export { errorHandler }
