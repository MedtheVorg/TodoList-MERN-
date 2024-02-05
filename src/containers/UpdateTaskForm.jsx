import { useEffect, useRef } from 'react'
import Button from '../components/Button'
import DeadLineCalender from '../components/form/DeadLineCalender'
import Input from '../components/form/Input'
import Select from '../components/form/Select'
import TextArea from '../components/form/TextArea'
import { useStore } from '../hooks/useStore'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAllTasks, getTaskById, updateTask } from '../utils/handlers/taskHandler'
import { motion } from 'framer-motion'

const UpdateTaskForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { updatedTask, setUpdatedTask, setTasks } = useStore()
	const navigate = useNavigate()
	const { taskID } = useParams()
	async function updateTaskFormHandler(event) {
		try {
			setIsLoading(true)
			event.preventDefault()

			console.log('task : ', updatedTask)
			const response = await updateTask(updatedTask, taskID)
			if (response instanceof Error) {
				toast.error(response.message)
			} else {
				getAllTasks().then((data) => {
					setTasks(data.tasks)
					toast.success('Task updated.')
					navigate('/')
				})
			}
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		//fetch task data
		async function fetchTaskData() {
			const response = await getTaskById(taskID)
			if (response instanceof Error) {
				toast.error('an unexpected error has ocurred while fetching the task ')
				console.error('error : ', response)
			} else {
				setUpdatedTask({
					title: response.data.task.title,
					description: response.data.task.description,
					priority: response.data.task.priority,
					status: response.data.task.status,
					deadline: response.data.task.deadline.split('T')[0],
				})
			}
		}

		fetchTaskData()
	}, [])

	return (
		<motion.div
			className="absolute top-0 left-0 right-0 bottom-0 w-full  bg-black/40 flex  justify-center"
			initial={{
				opacity: 0,
				y: 10,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			transition={{ type: 'spring', stiffness: 100 }}
		>
			<div className=" h-auto flex  justify-center items-center w-full 	">
				<form
					className="bg-white shadow-lg  p-8 text-xl flex flex-col gap-y-4 w-2/5 rounded-md overflow-hidden "
					onSubmit={updateTaskFormHandler}
				>
					<Input
						placeholder={'Title'}
						isDisabled={isLoading}
						value={updatedTask.title}
						onChange={(event) =>
							setUpdatedTask((prev) => ({ ...prev, [event.target.name]: event.target.value }))
						}
						name={'title'}
					/>
					<TextArea
						isDisabled={isLoading}
						value={updatedTask.description}
						onChange={(event) =>
							setUpdatedTask((prev) => ({ ...prev, [event.target.name]: event.target.value }))
						}
						name={'description'}
					/>
					<Select
						placeholder="select a priority"
						choices={['critical', 'urgent', 'normal', 'low']}
						className={'cursor-pointer'}
						isDisabled={isLoading}
						value={updatedTask.priority}
						onChange={(event) =>
							setUpdatedTask((prev) => ({ ...prev, [event.target.name]: event.target.value }))
						}
						name={'priority'}
					/>
					<Select
						placeholder="select a status"
						choices={['canceled', 'in progress', 'completed']}
						className={'cursor-pointer'}
						isDisabled={isLoading}
						value={updatedTask.status}
						onChange={(event) =>
							setUpdatedTask((prev) => ({ ...prev, [event.target.name]: event.target.value }))
						}
						name={'status'}
					/>
					<DeadLineCalender
						className={'cursor-pointer'}
						isDisabled={isLoading}
						value={updatedTask.deadLine}
						onChange={(event) =>
							setUpdatedTask((prev) => ({ ...prev, [event.target.name]: event.target.value }))
						}
						name={'deadline'}
					/>
					<div className="flex justify-between gap-x-8">
						<Button type="submit" value={isLoading ? <Spinner /> : 'Save'} isDisabled={isLoading} />
						<Button
							className={'p-0'}
							value={
								<Link to={-1} className={' bg-red-500 p-4 h-full flex items-center justify-center   '}>
									Cancel
								</Link>
							}
							isDisabled={isLoading}
						/>
					</div>
				</form>
			</div>
		</motion.div>
	)
}
export default UpdateTaskForm
