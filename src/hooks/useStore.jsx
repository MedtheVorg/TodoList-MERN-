import { createContext, useContext, useState } from 'react'

// store context where our react app state will be stored
const StoreContext = createContext({})

// custom hook to get the context value
export const useStore = () => {
	return useContext(StoreContext)
}

export const StoreProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [tasks, setTasks] = useState([])
	const [updatedTask, setUpdatedTask] = useState({
		title: '',
		description: '',
		priority: '',
		status: '',
		deadLine: '',
	})
	const [searchTerm, setSearchTerm] = useState('')
	const [orderBy, setOrderBy] = useState('deadline')

	return (
		<StoreContext.Provider
			value={{
				user,
				setUser,
				tasks,
				setTasks,
				updatedTask,
				setUpdatedTask,
				searchTerm,
				setSearchTerm,
				orderBy,
				setOrderBy,
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}
