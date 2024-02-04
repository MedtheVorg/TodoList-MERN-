import express from 'express'
import { createComment, deleteComment, updateComment } from '../controllers/comment.Controller.js'
import { authenticateWithJWT } from '../middlewares/authenticateWithJWT.js'

const router = express.Router()

router.post('/create', authenticateWithJWT, createComment)

router.patch('/:commentId', authenticateWithJWT, updateComment)
router.delete('/:commentId', authenticateWithJWT, deleteComment)

export { router as commentRoute }
