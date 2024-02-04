import { useStore } from '../../hooks/useStore'
import Input from '../form/Input'
import Label from '../form/Label'

const TaskSearchBar = () => {
	const { searchTerm, setSearchTerm } = useStore()

	return (
		<div>
			<Label htmlFor={'search'} value={'search :'} />
			<Input
				className={'p-2  border-2 border-gray-200 focus:outline-double'}
				type={'search'}
				value={searchTerm}
				onChange={function updateSearchTerm(e) {
					setSearchTerm(e.target.value)
				}}
				placeholder={'search by title'}
			/>
		</div>
	)
}
export default TaskSearchBar
