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
		deadline: Date,
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	},
)

const Task = model('Task', taskSchema)

export { Task }
