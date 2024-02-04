import api from '../axiosConfig'

async function createComment(taskID, commentText) {
	try {
		const response = await api.post(
			'/comments/create',
			{ taskID: taskID, text: commentText },
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			},
		)
		return response.data
	} catch (error) {
		return error
	}
}

async function updateComment(payloadUpdate, id) {
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

async function deleteComment(taskId) {
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

export { createComment, updateComment, deleteComment }
