import { Link } from 'react-router-dom'
import { useStore } from '../../hooks/useStore'
import Button from '../Button'
import { FaPlus } from 'react-icons/fa'
const TaskContainerFooter = () => {
	const { user } = useStore()
	return (
		<div className="bg-gray-100 ">
			{user ? (
				<Button
					value={
						<Link
							to={'/tasks/create'}
							className={
								'w-full flex items-center justify-center bg-gray-100  text-neutral-800 p-4 hover:bg-neutral-700 transition-colors duration-300 ease-in-out  hover:text-white '
							}
						>
							{/* <FaPlus size={20} /> */}
							Add task
						</Link>
					}
					className={'w-full flex items-center justify-center p-0  '}
				/>
			) : (
				<p className="w-full p-2  text-xl py-4 text-center  text-neutral-900">
					you need to log in before adding a task
				</p>
			)}
		</div>
	)
}
export default TaskContainerFooter
