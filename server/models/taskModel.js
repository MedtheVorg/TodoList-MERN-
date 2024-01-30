import mongoose, { Schema, model } from 'mongoose'

const taskSchema = new Schema(
	{
		title: String,
		description: String,
		priority: {
			type: String,
			enum: ['critical, urgent, normal, low'],
			default: 'Normal',
		},
		status: {
			type: String,
			enum: ['canceled,in progress,completed'],
			default: 'in progress',
		},
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		deadline: Date,
	},
	{
		timestamps: true,
	},
)

const Task = model('Task', taskSchema)

export { Task }
