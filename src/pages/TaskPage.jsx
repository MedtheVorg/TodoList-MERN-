import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTaskById } from '../utils/handlers/taskHandler'
import { toast } from 'react-toastify'
import BoringAvatar from '../components/BoringAvatar'
import { motion } from 'framer-motion'
import CommentsContainer from '../containers/CommentsContainer'
import { twMerge } from 'tailwind-merge'
const TaskPage = () => {
	const { taskID } = useParams()
	const [task, setTask] = useState({})
	const navigate = useNavigate()
	useEffect(() => {
		getTaskById(taskID).then((response) => {
			if (response instanceof Error) {
				toast.error(response.message)
				navigate('/')
			} else if (response.success == false) {
				toast.error(response.message)
			} else {
				setTask(response.data.task)
			}
		})
	}, [])
	return (
		<motion.div
			className="absolute bg-black/20 top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center"
			initial={{
				opacity: 0,
				y: 10,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 10,
			}}
			transition={{ type: 'spring', stiffness: 100 }}
		>
			<div className="bg-white w-[80%] h-[80%]  p-6 grid  gap-y-4 overflow-auto rounded-md ">
				{/* task details */}
				<div className="grid grid-cols-3  gap-x-10">
					{/* content */}
					<div className="col-span-2">
						<h1 className="text-5xl">{task?.title}</h1>
						<p className="mt-6 text-balance leading-8 text-slate-600 pl-2">{task?.description}</p>
					</div>
					{/* stats */}
					<div className="col-span-1 border-l-2 pl-8">
						<ul className="text-2xl">
							<li>
								<p>Status :</p>
								<p
									className={twMerge(
										'py-1 px-3 rounded-full uppercase font-semibold  text-center',
										task.status === 'canceled' && 'bg-red-200 text-red-600 ',
										task.status === 'in progress' && 'bg-yellow-200 text-yellow-600 ',
										task.status === 'completed' && 'bg-green-200 text-green-600 ',
									)}
								>
									{task?.status}
								</p>
							</li>
							<li className="my-6">
								<p>Priority :</p>
								<p className="text-white bg-[#EF5350] text-center mt-2 font-semibold capitalize py-2 rounded-full	">
									{task?.priority}
								</p>
							</li>
							<li>
								<p>Author :</p>
								<div className="flex p-2 pl-0 gap-x-6">
									<BoringAvatar authorName={task?.author?.username} authorID={task?.author?._id} />
									<p>{task?.author?.username}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				{/* comments */}
				<div className=" bg-[#F7F8F9] mt-8">
					<CommentsContainer taskID={taskID} />
				</div>
			</div>
		</motion.div>
	)
}
export default TaskPage
