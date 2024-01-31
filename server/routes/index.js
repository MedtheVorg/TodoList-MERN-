import express from 'express'
import { taskRouter } from './taskRoute.js'
import { userRouter } from './userRoutes.js'
import { commentRoute } from './comment.routes.js'

const router = express.Router()

router.use('/api/comments', commentRoute)
router.use('/api', taskRouter)
router.use('/api/users', userRouter)

export { router as mainRouter }
