import { config as loadLocalVariables } from 'dotenv'
loadLocalVariables()
import process from 'process'
import express from 'express'
import connectToMongoDB from './utils/mongoDb.js'
import { taskRouter } from './routes/taskRoute.js'
import morgan from 'morgan'

const app = express()

initializeServer()

async function initializeServer() {
	const { isConnected, dataBaseName, errorMessage } = await connectToMongoDB()

	if (!isConnected) {
		console.error('could not connect to MongoDB')
		console.error(errorMessage)
		process.exit()
	}

	startServer(dataBaseName)
}

function startServer(dataBaseName) {
	// middlewares
	app.use(express.json())
	app.use(morgan('dev'))

	//healthCheck
	app.get('/api', (req, res) => {
		res.json({ message: 'server is up and running' })
	})

	//routes
	app.use('/api', taskRouter)

	//
	// server listener
	app.listen(process.env.PORT, () => {
		console.log(`connected successfully to ${dataBaseName} database.`)
		console.log(`server running on http://localhost:${process.env.PORT}`)
	})
}
