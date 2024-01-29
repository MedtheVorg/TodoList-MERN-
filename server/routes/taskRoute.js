import express from 'express'

import {
	createTask,
	deleteAllTasks,
	deleteTask,
	readAllTasks,
	readTask,
	updateTask,
} from '../controllers/taskController.js'

const router = express.Router()

router.get('/tasks', readAllTasks)
router.get('/tasks/:taskID', readTask)
router.post('/tasks', createTask)
router.patch('/tasks/:taskID', updateTask)
router.delete('/tasks/taskID', deleteTask)
router.delete('/tasks', deleteAllTasks)

export { router as taskRouter }
