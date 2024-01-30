import jwt from 'jsonwebtoken'
import { PUBLIC_KEY } from '../keys/index.js'

async function authenticateWithJWT(req, res, next) {
	try {
		// authorization header does not exist
		if (!req.headers.authorization) {
			return res.status(401).json({ message: 'missing authorization header' })
		}

		// extract jwt
		const bearerToken = req.headers.authorization.split(' ')[1]

		// verify token
		const isValid = jwt.verify(bearerToken, PUBLIC_KEY)

		if (isValid) {
			//call next middleware
			next()
		}
	} catch (error) {
		res.status(401).json({ message: error.message })
	}
}

export { authenticateWithJWT }
