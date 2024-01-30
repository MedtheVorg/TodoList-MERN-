import mongoose, { Schema, model } from 'mongoose'

const CommentSchema = new Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	task: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	},
	text: String,
	timeStamp: Date,
})

const Comment = model('Comment', CommentSchema)

export { Comment }
