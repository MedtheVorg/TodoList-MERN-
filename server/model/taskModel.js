import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
	title: String,
	description: String,
	Priority: {
		type: String,
		enum: ['Critical, Urgent, Normal, Low'],
		default: Normal,
	},
	status: {
		type: String,
		enum: ['canceled,in progress,completed'],
	},
	deadline: Date,
	createdAt: Date,
})

const taskModel = model('Task', taskSchema)
