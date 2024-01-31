import express from 'express'
import { createUser, deleteUser, loginUser, readUser, updateUser } from '../controllers/user.Controller.js'
import { authenticateWithJWT } from '../middlewares/authenticateWithJWT.js'

const router = express.Router()

router.get('/profile', authenticateWithJWT, readUser)
router.post('/login', loginUser)
router.post('/create', createUser)
router.patch('/:userID', authenticateWithJWT, updateUser)
router.delete('/:userID', authenticateWithJWT, deleteUser)

export { router as userRouter }
