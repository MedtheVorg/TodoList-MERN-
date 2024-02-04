import api from '../axiosConfig'

async function createUser(username, email, password) {
	try {
		const response = await api.post('/users/create', { username, email, password })

		return response.data
	} catch (error) {
		return error.response.data
	}
}

async function logInUser(email, password) {
	try {
		const response = await api.post('/users/login', { email, password })

		return response.data
	} catch (error) {
		return error
	}
}

async function logInWithJwt() {
	if (localStorage.getItem('token')) {
		const response = await api.get('/users/logwithjwt', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		})
		return response
	}
}
export { createUser, logInUser, logInWithJwt }
