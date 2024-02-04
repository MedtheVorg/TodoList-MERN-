const TaskTableHeader = () => {
	return (
		<thead className=" sticky top-0 align-bottom uppercase border-neutral-700 bg-neutral-800 text-neutral-50 ">
			<tr className="bg-gray-200 text-gray-600 uppercase  leading-normal">
				<th className="py-3 px-6 text-left">Title</th>
				<th className="py-3 px-6 text-left">Owner</th>
				<th className="py-3 px-6 text-center">Priority</th>
				<th className="py-3 px-6 text-center">Status</th>
				<th className="py-3 px-6 text-center">Deadline</th>
				<th className="py-3 px-6 text-center">Actions</th>
			</tr>
		</thead>
	)
}
export default TaskTableHeader
