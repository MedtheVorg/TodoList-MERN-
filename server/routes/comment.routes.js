import express from 'express'
import { createComment, deleteComment, updateComment } from '../controllers/commentController'

const router = express.Router()

router.post('/create', createComment)

router.patch('/:commentId', updateComment)
router.delete('/:commentId', deleteComment)

export { router as commentRoute }
