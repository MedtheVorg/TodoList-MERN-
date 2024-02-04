import mongoose from 'mongoose'
import { Task } from '../models/taskModel.js'
import { Comment } from '../models/commentModel.js'
import { User } from '../models/userModel.js'

async function readAllTasks(req, res, next) {
	try {
		// fetch tasks from dataBase
		const tasks = await Task.find()
			.populate('author', '-password')
			.populate({ path: 'comments', populate: { path: 'author', select: '-password' } })
			.exec()

		// return a successful response
		res.status(200).json({ tasksCount: tasks.length, tasks: tasks })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

async function readTask(req, res, next) {
	try {
		// verify client input
		const { taskID } = req.params
		if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
			return res.status(400).json({ success: false, message: 'invalid  taskID.' })
		}

		// fetch task
		const task = await Task.findById({ _id: taskID })
			.populate(['comments', { path: 'author', select: 'username' }])
			.exec()

		if (!task) {
			return res.status(404).json({ success: false, message: 'task not found.' })
		}

		res.status(200).json({ success: true, task: task })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

async function createTask(req, res, next) {
	try {
		// verify client input
		const { title, description, priority, status, deadline } = req.body
		if (!title || !description || !priority || !status || !deadline) {
			return res.status(400).json({ success: false, message: 'Required fields are Missing', bd: req.body })
		}

		// create new task
		const task = new Task({
			title: title,
			description: description,
			priority: priority,
			status: status,
			deadline: deadline,
			author: req.user.id,
		})

		await task.save()

		// append new task to its author (user)
		const author = await User.findById({ _id: req.user.id }).populate('tasks').exec()
		// here we assume that the user does exist based on the validated token
		author.tasks.push(new mongoose.Types.ObjectId(task.id))
		await author.save()

		res.status(201).json({ success: true, task: task, authorName: author.username, taskID: task._id })
	} catch (error) {
		// call the errorHandler middleware
		console.log(error.message)
		next({ message: 'internal server error', statusCode: 500 })
	}
}

async function updateTask(req, res, next) {
	try {
		// verify client input
		const { taskID } = req.params
		if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
			return res.status(400).json({ success: false, message: 'invalid task ID.' })
		}
		const { title, description, priority, status, deadline } = req.body
		if (!title && !description && !priority && !status && !deadline) {
			return res.status(400).json({ success: false, message: 'at least one task field is required' })
		}

		// fetch and update task
		const updatedTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true }).exec()

		// task not found
		if (!updatedTask) {
			return res.status(404).json({ success: false, message: 'task not found.' })
		}

		// task updated successfully
		res.status(200).json({ success: true, updatedTask: updatedTask })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

async function deleteTask(req, res, next) {
	try {
		const { taskID } = req.params
		if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
			return res.status(400).json({ success: false, message: 'invalid task ID.' })
		}

		// fetch and delete task
		const taskToDelete = await Task.findById({ _id: taskID }).exec()

		// task not found
		if (!taskToDelete) {
			return res.status(404).json({ success: false, message: 'task not found.' })
		}

		// delete all task's comments
		if (taskToDelete.comments && taskToDelete.comments.length > 0) {
			await Comment.deleteMany({ _id: { $in: taskToDelete.comments } })
		}

		// delete the document
		await taskToDelete.deleteOne()

		// task deleted successfully
		res.status(200).json({ success: true, message: 'Task deleted.' })
	} catch (error) {
		// call the errorHandler middleware
		next({ message: 'internal server error', statusCode: 500 })
	}
}

export { readAllTasks, createTask, deleteTask, readTask, updateTask }
