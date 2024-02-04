import express from 'express'
import request from 'supertest'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
import { taskRouter } from '../routes/task.Routes'

const app = express()

app.use(express.json())
app.use('/api', taskRouter)

beforeAll(async () => {
	await mongoose.connect(process.env.VITE_MONGODB_URL)
})

afterAll(async () => {
	await mongoose.disconnect()
})

describe('Integration tests for the tasks API', () => {
	const bearerToken =
		'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmMwMTBmZTc0Y2RiNjliY2Y5YzcyYSIsInVzZXJuYW1lIjoic2FtIG9uZWlsIiwiZW1haWwiOiJzYW1AZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wMVQyMDozNzozNS41NjVaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0wNFQxMzowNzowMy41MDRaIiwiaWF0IjoxNzA3MDU4OTM3LCJleHAiOjE3MDcxNDUzMzd9.zD1Oi-3f1n1Vt0WXw_2CkEnbTZqtPOBpKgUbOdWvnGEmrvauziM7vdS1ein3u1SIj34JODN67Pc57H6zvL3l2aZS5Z5hLKQ0EUH3ApAR_kv9E2H4i2VpzEhn97QrjIrvyYZVrvXVRG02o1DJQCXr7X4bkqstCRwtnxAW_vY0U5tRnYfL323ib9e0SpPLWNImlG9HQafV3ZeLDeUmq50OiZEqFLscDTekNsYdtl3ImBEl12yauqMQJ_MzOmkzN3CH8g2EseM9ma39ljxerBR-JY44gi-_HZkjiC4Va0UZATqlafEUzDY3Up894W38gtKZz_isSitoxCFpvBxDBbg60g'
	let taskID = ''

	it('GET /api/tasks - success - get all tasks', async () => {
		const { body, statusCode } = await request(app).get('/api/tasks')

		expect(statusCode).toBe(200)
		expect(body).toEqual(
			expect.objectContaining({
				tasksCount: expect.any(Number),
				tasks: expect.any(Array),
			}),
		)
	})
	it('POST /api/tasks - success - create a task', async () => {
		const requestBodyExample = {
			title: 'write integration tests',
			description:
				'write tests for the task controller , readAllTasks, readTask, createTask,updateTask and delete task',
			priority: 'urgent',
			status: 'in progress',
			deadline: new Date(),
		}
		const { body, statusCode } = await request(app)
			.post('/api/tasks')
			.set('Authorization', bearerToken)
			.send(requestBodyExample)

		expect(statusCode).toBe(201)
		expect(body).toEqual(
			expect.objectContaining({
				success: true,
				task: expect.any(Object),
				authorName: expect.any(String),
				taskID: expect.any(String),
			}),
		)
		taskID = body.taskID
	})

	it('GET /api/tasks/:taskID - success - get task by ID', async () => {
		const { body, statusCode } = await request(app).get(`/api/tasks/${taskID}`)
		expect(statusCode).toBe(200)
		expect(body).toEqual(
			expect.objectContaining({
				success: true,
				task: expect.any(Object),
			}),
		)
	})

	it('PATCH /api/tasks/:taskID - success - update a task by ID', async () => {
		const { body, statusCode } = await request(app)
			.patch(`/api/tasks/${taskID}`)
			.send({ title: 'updating intergration tests task' })
			.set('Authorization', bearerToken)

		expect(statusCode).toBe(200)
		expect(body).toEqual(
			expect.objectContaining({
				success: true,
				updatedTask: expect.any(Object),
			}),
		)
	})

	it('DELETE /api/tasks/:taskID - success - delete a task by ID', async () => {
		const { body, statusCode } = await request(app).delete(`/api/tasks/${taskID}`).set('Authorization', bearerToken)

		expect(statusCode).toBe(200)
		expect(body).toEqual(
			expect.objectContaining({
				success: true,
				message: 'Task deleted.',
			}),
		)
	})
})
