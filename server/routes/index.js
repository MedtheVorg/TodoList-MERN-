import express from 'express'
import { taskRouter } from './taskRoute.js'
import { userRouter } from './userRoutes.js'

const router = express.Router()

router.use('/api', taskRouter)
router.use('/api/users', userRouter)

export { router as mainRouter }
