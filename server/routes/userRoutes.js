import express from 'express'
import { createUser, deleteUser, loginUser, updateUser } from '../controllers/userController.js'
import { authenticateWithJWT } from '../middlewares/authenticateWithJWT.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/create', createUser)
router.patch('/:userID', authenticateWithJWT, updateUser)
router.delete('/:userID', authenticateWithJWT, deleteUser)

export { router as userRouter }
