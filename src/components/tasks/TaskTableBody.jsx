/* eslint-disable react/jsx-key */
import { useEffect } from 'react'
import { getAllTasks } from '../../utils/handlers/taskHandler'
import Deadline from '../tableRow/Deadline'
import Owner from '../tableRow/Owner'
import Priority from '../tableRow/Priority'
import Status from '../tableRow/Status'
import Title from '../tableRow/Title'
import TaskTableRow from './TaskTableRow'
import { useStore } from '../../hooks/useStore'
import Actions from '../tableRow/Actions'
import lodash from 'lodash'
const TaskTableBody = () => {
	const { tasks, setTasks, searchTerm, orderBy } = useStore()

	useEffect(() => {
		getAllTasks().then((data) => {
			setTasks(data.tasks)
		})
	}, [])

	const orderedTasks = lodash.orderBy(
		tasks.filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase())),
		orderBy,
		'desc',
	)
	return (
		<tbody className=" text-gray-600 relavite">
			{orderedTasks.length >= 1 &&
				orderedTasks.map((task) => {
					const { _id, title, priority, status, deadline, author } = task
					return (
						<TaskTableRow
							key={task._id}
							task={task}
							cells={[
								<Title text={title} />,
								<Owner name={author.username} authorID={author._id} />,
								<Priority value={priority} />,
								<Status value={status} />,
								<Deadline date={deadline} />,
								<Actions taskID={_id} authorID={author._id} />,
							]}
						/>
					)
				})}
			{orderedTasks.length === 0 && (
				<div className="absolute left-0 top-0 right-0 bottom-0  w-full h-full flex items-center justify-center">
					<p className="text-2xl font-semibold">no match for &lt; ${searchTerm} &gt;</p>
				</div>
			)}
		</tbody>
	)
}
export default TaskTableBody
