import { Comment } from '../models/commentModel.js'
import mongoose from 'mongoose'
import { User } from '../models/userModel.js'

async function createComment(req, res, next) {
	try {
		// Extract necessary data from the request
		const { task, text } = req.body

		// Validate if required data is present
		if (!text || !task) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		if (!isObjectId(task)) {
			return res.status(400).json({ error: 'Task must be an objectID' })
		}

		// Create a new comment
		const newComment = new Comment({
			text,
			task: toObjectId(task),
			author: toObjectId(req.user.id),
		})

		// Save the comment to the database
		await newComment.save()
		const user = await User.findById(req.user.id).exec()
		user.comments.push(toObjectId(newComment.id))

		await user.save()

		// Respond with the created comment

		res.status(201).json({ success: true, createdComment: newComment })
	} catch (error) {
		// Handle errors
		next(error)
	}
}

async function updateComment(req, res, next) {
	try {
		// Extract necessary data from the request
		const { text } = req.body
		const { commentId } = req.params

		// Validate if required data is present
		if (!text) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		if (!mongoose.Types.ObjectId.isValid(commentId)) {
			return res.status(400).json({ error: 'Invalid commentId' })
		}

		// Find the comment by ID
		const existingComment = await Comment.findByIdAndUpdate(commentId, { text: text }).exec()

		// Check if the comment exists
		if (!existingComment) {
			return res.status(404).json({ success: false, error: 'Comment not found' })
		}

		// Respond with the updated comment
		res.status(200).json({ success: true, updatedComment: existingComment })
	} catch (error) {
		// Handle errors
		console.error('Error updating comment:', error)
		next(error)
	}
}

async function deleteComment(req, res, next) {
	try {
		// Extract necessary data from the request
		const { commentId } = req.params

		// Validate if required data is present
		if (!commentId) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		if (!mongoose.Types.ObjectId.isValid(commentId)) {
			return res.status(400).json({ error: 'Invalid commentId' })
		}

		// Find the comment by ID
		const existingComment = await Comment.findByIdAndDelete(commentId).exec()

		if (!existingComment) {
			return res.status(404).json({ success: false, error: 'Comment not found' })
		}

		// Respond with a success message
		res.status(200).json({ success: true, message: 'Comment deleted successfully' })
	} catch (error) {
		// Handle errors
		console.error('Error deleting comment:', error)
		next(error)
	}
}

function isObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id)
}

function toObjectId(id) {
	return new mongoose.Types.ObjectId(id)
}

export { createComment, updateComment, deleteComment }
