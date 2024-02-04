import { TaskContainerBody, TaskContainerFooter, TaskContainerHeader } from '../components/tasks'
const TaskContainer = () => {
	return (
		<div className=" h-full  flex items-center justify-center font-sans overflow-hidden">
			<div className=" w-5/6 ">
				<TaskContainerHeader />
				<TaskContainerBody />
				<TaskContainerFooter />
			</div>
		</div>
	)
}
export default TaskContainer
