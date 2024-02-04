import TaskOrderBy from './TaskOrderBy'
import TaskSearchBar from './TaskSearchBar'
const TaskContainerHeader = () => {
	return (
		<div className="p-4  flex justify-between items-center flex-wrap   bg-gray-100 ">
			<TaskSearchBar />
			<TaskOrderBy />
		</div>
	)
}
export default TaskContainerHeader
