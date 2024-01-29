import express from 'express'
import { createUser, deleteUser, loginUser, updateUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/create', createUser)
router.patch('/userID', updateUser)
router.delete('/userID', deleteUser)

export { router as userRouter }
