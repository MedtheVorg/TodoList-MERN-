import express from 'express'
import { createComment, deleteComment, updateComment } from '../controllers/comment.Controller.js'

const router = express.Router()

router.post('/create', createComment)

router.patch('/:commentId', updateComment)
router.delete('/:commentId', deleteComment)

export { router as commentRoute }
