// Import the 'axios' library
import axios from 'axios'

// Create an Axios instance with a base URL and other configuration options
const api = axios.create({
	baseURL: 'http://localhost:4200',
	timeout: 5000, // Set a timeout for requests (in milliseconds)
	headers: {
		'Content-Type': 'application/json', // Set the content type for requests
		Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Add any required headers, such as authentication tokens
	},
})

// Export the configured Axios instance for reuse in other parts of your application
export default api
