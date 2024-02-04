import express from 'express'
import { createTask, deleteTask, readAllTasks, readTask, updateTask } from '../controllers/task.Controller.js'
import { authenticateWithJWT } from '../middlewares/authenticateWithJWT.js'

const router = express.Router()

router.get('/tasks', readAllTasks)
router.get('/tasks/:taskID', readTask)
router.post('/tasks', authenticateWithJWT, createTask)
router.patch('/tasks/:taskID', authenticateWithJWT, updateTask)
router.delete('/tasks/:taskID', authenticateWithJWT, deleteTask)

export { router as taskRouter }
