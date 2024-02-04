import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useStore } from '../../hooks/useStore'
import { Link } from 'react-router-dom'
import { deleteTask, getAllTasks } from '../../utils/handlers/taskHandler'

const Actions = ({ taskID, authorID }) => {
	console.log(taskID, authorID)
	const { user, setTasks } = useStore()
	return (
		<div className="w-fit flex item-center justify-between ">
			{/* details */}
			<div className=" flex item-center justify-center ">
				<Link to={`/tasks/${taskID}`} className="inline-block p-4 ">
					<div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					</div>
				</Link>
			</div>

			{authorID === user?._id && (
				<>
					{/* update */}
					<div className=" flex item-center justify-center ">
						<Link to={`/tasks/update/${taskID}`} className="inline-block p-4 ">
							<div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
							</div>
						</Link>
					</div>
					{/* delete */}
					<div className=" flex item-center justify-center ">
						<Link
							to={`/`}
							className="inline-block p-4 "
							onClick={async () => {
								await deleteTask(taskID)
								getAllTasks().then((data) => {
									setTasks(data.tasks)
								})
							}}
						>
							<div className="w-6 mr-2 transform hover:text-red-400 hover:scale-110">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</div>
						</Link>
					</div>
				</>
			)}
		</div>
	)
}
export default Actions
