import express from 'express'
import { commentRoute } from './comment.routes.js'
import { taskRouter } from './task.Routes.js'
import { userRouter } from './user.Routes.js'

const router = express.Router()

router.use('/api/comments', commentRoute)
router.use('/api', taskRouter)
router.use('/api/users', userRouter)

export { router as mainRouter }
