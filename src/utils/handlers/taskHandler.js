import api from '../axiosConfig'

async function createTask(title, description, priority, status, deadline) {
	const taskData = {
		title: title,
		description: description,
		priority: priority,
		status: status,
		deadline: deadline,
	}

	try {
		const response = await api.post('/tasks', taskData)
		console.log('Task created successfully:', response.data)
		return response.data
	} catch (error) {
		console.error('Error creating task:', error)
		throw error
	}
}

async function getAlltasks() {
	try {
		const response = await api.get('/tasks')
		return response.data
	} catch (error) {
		console.error('Error reading task:', error)
		throw error
	}
}

export async function getTaskById(taskId) {
	try {
		const response = await api.get(`/tasks/${taskId}`)
		return response.data
	} catch (error) {
		console.error('Error reading by ID task:', error)
		throw error
	}
}

export async function updateTask(payloadUpdate, id) {
	try {
		const response = await api.patch(`/tasks/${id}`, payloadUpdate)
		return response.data
	} catch (error) {
		console.error('Error updating task:', error)
		throw error
	}
}

export async function deleteTask(taskId) {
	try {
		const response = await api.delete(`/tasks/${taskId}`)
		return response.data
	} catch (error) {
		console.error('Error delete')

		throw error
	}
}
