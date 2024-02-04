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
		const response = await api.post('/tasks', taskData, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
		return response.data
	} catch (error) {
		return error
	}
}

async function getAllTasks() {
	try {
		const response = await api.get('/tasks')
		return response.data
	} catch (error) {
		console.error('Error reading task:', error)
	}
}

async function getTaskById(taskId) {
	try {
		const response = await api.get(`/tasks/${taskId}`)
		return response
	} catch (error) {
		return error
	}
}

async function updateTask(payloadUpdate, id) {
	try {
		const response = await api.patch(`/tasks/${id}`, payloadUpdate, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
		return response.data
	} catch (error) {
		return error
	}
}

async function deleteTask(taskId) {
	try {
		const response = await api.delete(`/tasks/${taskId}`, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
		return response.data
	} catch (error) {
		console.error('Error delete')
		console.error(error)
	}
}

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
