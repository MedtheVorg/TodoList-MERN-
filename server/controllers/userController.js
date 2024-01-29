import mongoose from 'mongoose'
import { User } from '../models/userModel.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../keys/index.js'

async function loginUser(req, res, next) {
	try {
		//verify client input
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ success: false, message: 'Missing credentials.' })
		}
		//fetch user from dataBase
		const user = await User.findOne({ email: email }).exec()

		// user does not exist
		if (!user) {
			return res.status(404).json({ success: false, message: 'user not found.' })
		}

		// compare passwords
		const storedPassword = user.password
		const isIdentical = await compare(password, storedPassword)

		if (!isIdentical) {
			//unAuthorized
			return res.status(401).json({ success: false, message: 'Invalid credentials.' })
		}

		// generate JWT
		const token = jwt.sign(
			{
				username: user.username,
				email: user.email,
				tasks: user.tasks,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			PRIVATE_KEY,
			{ algorithm: 'RS256', expiresIn: '1d' },
		)

		return res.status(200).json({ success: true, user: user, token: `Bearer ${token}` })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}
async function createUser(req, res, next) {
	try {
		// verify client input
		const { username, email, password } = req.body

		// user already exists
		const existingUser = await User.findOne({ email: email }).exec()
		if (existingUser) {
			// conflict
			return res.status(409).json({ success: false, message: 'a user already exist with this email ' })
		}

		// create a new user
		const newUser = (await User.create({ username: username, email: email, password: password })).save({
			timestamps: true,
		})

		res.status(201).json({ success: true, createdUser: newUser })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}
async function updateUser(req, res, next) {
	try {
		//verify client input
		const { userID } = req.params
		if (!userID || mongoose.isValidObjectId(userID)) {
			throw new Error({ message: 'invalid user ID', statusCode: 400 })
		}
		//fetch user from dataBase and Update
		const user = await User.findByIdAndUpdate({ _id: userID }, req.body).exec()

		// user does not exist
		if (!user) {
			return res.status(404).json({ success: false, message: 'user not found.' })
		}

		return res.status(200).json({ success: true, user: user })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}
async function deleteUser(req, res, next) {
	try {
		//verify client input
		const { userID } = req.params
		if (!userID || mongoose.isValidObjectId(userID)) {
			throw new Error({ message: 'invalid user ID', statusCode: 400 })
		}
		//fetch user from dataBase and Delete
		const user = await User.findByIdAndDelete({ _id: userID }).exec()

		// user does not exist
		if (!user) {
			return res.status(404).json({ success: false, message: 'user not found.' })
		}

		return res.status(200).json({ success: true, message: 'user Deleted' })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

export { loginUser, createUser, updateUser, deleteUser }
