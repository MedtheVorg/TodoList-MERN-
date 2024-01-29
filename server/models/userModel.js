import { Schema, model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'

const userSchema = new Schema({
	username: String,
	email: { type: String, unique: true },
	password: String,
	tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const User = model('User', userSchema)

//user hooks
userSchema.pre('save', function hashPassword(next) {
	// if the password was
	if (this.isModified('password') || this.isNew) {
		// generate salt rounds
		const salt = genSaltSync(12)
		// hash the password
		const hashedPassword = hashSync(this.password, salt)
		this.password = hashedPassword
	}
	// call the next middleware
	next()
})

export { User }
