import { Route, Routes } from 'react-router-dom'
import TaskContainer from '../containers/TaskContainer'
import TaskPage from './TaskPage'
import AddTaskForm from '../containers/AddTaskForm'
import UpdateTaskForm from '../containers/UpdateTaskForm'

const HomePage = () => {
	return (
		<div className="h-full  relative">
			<TaskContainer />
			<Routes>
				<Route path="/tasks/:taskID" element={<TaskPage />} />
				<Route path="/tasks/create" element={<AddTaskForm />} />
				<Route path="/tasks/update/:taskID" element={<UpdateTaskForm />} />
			</Routes>
		</div>
	)
}
export default HomePage
