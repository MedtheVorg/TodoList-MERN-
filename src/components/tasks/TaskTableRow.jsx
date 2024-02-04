import { twMerge } from 'tailwind-merge'

const TaskTableRow = ({ cells = [], task }) => {
	const [title, owner, priority, status, deadline, details] = cells
	return (
		<>
			<tr
				className={twMerge(
					'border-b border-gray-200 hover:bg-gray-300 transition-all',
					task.status === 'completed' && 'line-through opacity-50',
				)}
			>
				<td className="py-3  px-6 text-left whitespace-nowrap">{title}</td>
				<td className="py-3  px-6 text-center">{owner}</td>
				<td className="py-3  px-6 text-center">{priority}</td>
				<td className="py-3  px-6 text-center">{status}</td>
				<td className="py-3  px-6 text-center">{deadline}</td>
				<td className="py-3  px-6 text-center flex items-center justify-center ">{details}</td>
			</tr>
		</>
	)
}
export default TaskTableRow
