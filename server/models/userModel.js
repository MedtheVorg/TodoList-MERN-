import { Schema, model } from 'mongoose'
import { genSalt, hash } from 'bcrypt'

const userSchema = new Schema({
	username: String,
	email: { type: String, unique: true },
	password: String,
	tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

//user hooks
userSchema.pre('save', async function hashPassword(next) {
	// if the password was modified or is new
	if (this.isModified('password') || this.isNew) {
		// generate salt rounds
		const salt = await genSalt(12)
		// hash the password
		const hashedPassword = await hash(this.password, salt)
		this.password = hashedPassword
	}
	// call the next middleware
	next()
})
const User = model('User', userSchema)

export { User }
