import { useRef } from 'react'
import Button from '../components/Button'
import DeadLineCalender from '../components/form/DeadLineCalender'
import Input from '../components/form/Input'
import Select from '../components/form/Select'
import TextArea from '../components/form/TextArea'
import { useStore } from '../hooks/useStore'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { createTask } from '../utils/handlers/taskHandler'
import { motion } from 'framer-motion'

const AddTaskForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { setTasks } = useStore()
	const title = useRef(null)
	const description = useRef(null)
	const priority = useRef(null)
	const status = useRef(null)
	const deadLine = useRef(null)

	async function addTask(event) {
		try {
			setIsLoading(true)
			event.preventDefault()

			const serverResponse = await createTask(
				title.current.value,
				description.current.value,
				priority.current.value,
				status.current.value,
				deadLine.current.value,
			)
			if (serverResponse && serverResponse.success) {
				setTasks((prev) => [...prev, serverResponse.task])
				toast('Task created successfully')
				navigate('/')
			} else {
				toast.error(serverResponse.response.data.message)
			}
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<motion.div
			className="absolute top-0 left-0 bottom-0 right-0 w-full h-full	 bg-black/40 flex  justify-center items-center"
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
			<form className="md:w-[50%] bg-white shadow-lg  p-8 text-xl flex flex-col gap-y-4" onSubmit={addTask}>
				<Input placeholder={'Title'} isDisabled={isLoading} reference={title} />
				<TextArea isDisabled={isLoading} reference={description} />
				<Select
					placeholder="select a priority"
					choices={['critical', 'urgent', 'normal', 'low']}
					className={'cursor-pointer'}
					isDisabled={isLoading}
					reference={priority}
				/>
				<Select
					placeholder="select a status"
					choices={['canceled', 'in progress', 'completed']}
					className={'cursor-pointer'}
					isDisabled={isLoading}
					reference={status}
				/>
				<DeadLineCalender className={'cursor-pointer'} isDisabled={isLoading} reference={deadLine} />
				<div className="flex justify-between gap-x-8">
					<Button type="submit" value={isLoading ? <Spinner /> : 'add task'} isDisabled={isLoading} />
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
		</motion.div>
	)
}
export default AddTaskForm
