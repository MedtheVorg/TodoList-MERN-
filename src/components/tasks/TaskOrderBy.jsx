import { useStore } from '../../hooks/useStore'
import Label from '../form/Label'
import Select from '../form/Select'

const TaskOrderBy = () => {
	const { setOrderBy } = useStore()

	return (
		<div>
			<Label htmlFor={'orderby'} value={'order by :'} />
			<Select
				name={'orderby'}
				choices={['title', 'priority', 'status', 'deadline']}
				onChange={(event) => {
					setOrderBy(event.target.value)
				}}
			/>
		</div>
	)
}
export default TaskOrderBy
