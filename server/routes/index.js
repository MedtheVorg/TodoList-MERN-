import express from 'express'
import { taskRouter } from './taskRoute'
import { userRouter } from './userRoutes'

const router = express.Router()

router.use('/api', taskRouter)
router.use('/api/users', userRouter)

export { router as mainRouter }
