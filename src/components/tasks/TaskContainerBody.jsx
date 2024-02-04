import { useState } from 'react'
import TaskTableBody from './TaskTableBody'
import TaskTableHeader from './TaskTableHeader'

const TaskContainerBody = () => {
	return (
		<div className="overflow-x-auto overflow-y-visible max-h-[500px] my-4 bg-gray-100  rounded-md">
			<table className="pb-8 w-full  my-0 align-middle text-dark border border-neutral-200 min-h-96 relative ">
				<TaskTableHeader />
				<TaskTableBody />
			</table>
		</div>
	)
}
export default TaskContainerBody
