import mongoose from 'mongoose'
import { User } from '../models/userModel.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../keys/index.js'
import { Task } from '../models/taskModel.js'
import { Comment } from '../models/commentModel.js'

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
				id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			PRIVATE_KEY,
			{ algorithm: 'RS256', expiresIn: '1d' },
		)

		return res.status(200).json({ success: true, user: user, token: `Bearer ${token}` })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500, error: error.message })
	}
}
async function readUser(req, res, next) {
	try {
		const userID = req.user.id

		const user = await User.findById({ _id: userID })
			.populate(['tasks', 'comments'])
			.select(['username', 'email', 'createdAt', 'updatedAt', '_id'])
			.exec()

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
async function createUser(req, res, next) {
	try {
		// verify client input
		const { username, email, password } = req.body
		if (!username || !email || !password) {
			return res.status(400).json({ success: false, message: 'Missing credentials.' })
		}
		// user already exists
		const existingUser = await User.findOne({ email: email }).exec()
		if (existingUser) {
			// conflict
			return res.status(409).json({ success: false, message: 'a user already exist with this email ' })
		}

		// create a new user
		const newUser = new User({ username: username, email: email, password: password })
		await newUser.save()

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
		if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
			return res.status(400).json({ success: false, message: 'invalid user ID.' })
		}
		const { username, password } = req.body
		if (!username && !password) {
			return res
				.status(400)
				.json({ success: false, message: 'At least one of username or password is required.' })
		}

		//fetch user from dataBase and Update
		const user = await User.findByIdAndUpdate({ _id: userID }, req.body, { new: true }).exec()

		// user does not exist
		if (!user) {
			return res.status(404).json({ success: false, message: 'user not found.' })
		}

		return res.status(200).json({ success: true, updatedUser: user })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}
async function deleteUser(req, res, next) {
	try {
		//verify client input
		const { userID } = req.params
		if (!userID || !mongoose.isValidObjectId(userID)) {
			throw new Error({ message: 'invalid user ID', statusCode: 400 })
		}
		//fetch user from dataBase and Delete
		const user = await User.findById({ _id: userID }).populate('tasks').exec()

		// user does not exist
		if (!user) {
			return res.status(404).json({ success: false, message: 'user not found.' })
		}

		// delete user tasks and their associated comments
		if (user.tasks && user.tasks.length > 0) {
			const tasksIDs = user.tasks.map((task) => task._id)

			// delete task's comments
			await Comment.deleteMany({ task: { $in: tasksIDs } })

			// delete tasks
			await Task.deleteMany({ _id: { $in: tasksIDs } })
		}

		// delete user
		await user.deleteOne()

		return res.status(200).json({ success: true, message: 'user Deleted' })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

async function logWithJwt(req, res) {
	res.status(200).json({ user: req.user })
}

export { loginUser, readUser, createUser, updateUser, deleteUser, logWithJwt }
