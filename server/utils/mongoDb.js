import { connect } from 'mongoose'
import process from 'process'

async function connectToMongoDB() {
	try {
		//connect to remote mongoDB
		const { connection } = await connect(process.env.VITE_MONGODB_URL)

		// connected
		if (connection.readyState == 1) {
			return {
				isConnected: true,
				dataBaseName: connection.name,
			}
		} else {
			return {
				isConnected: false,
			}
		}
	} catch (error) {
		return {
			isConnected: false,
			errorMessage: error.message,
		}
	}
}

connectToMongoDB()
export default connectToMongoDB
