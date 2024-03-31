import { useSelector } from 'react-redux';
import Todo from './Todo';
import FilterButtons from '../FilterButtons';

function ListTodos() {
	/**
	 * useSelector hook can directly talk to the store.
	 * It can selectively ask the store that 'I need this and this info'.
	 * It is looking for the function and as a parameter we get access to the entire store.
	 */
	const todos = useSelector((store) => store.todos);
	const filter = useSelector((state) => state.filter);

	const filteredTodos = () => {
		switch (filter) {
			case 'ALL':
				return todos;
			case 'ACTIVE':
				return todos.filter((todo) => !todo.isDone);
			case 'COMPLETED':
				return todos.filter((todo) => todo.isDone);
			default:
				return todos;
		}
	};

	const filteredTodosList = filteredTodos();

	return (
		<>
			<h2>Todo List</h2>
			<FilterButtons />
			{filteredTodosList.map((todo) => {
				return (
					<Todo
						key={todo.id}
						todo={todo}
					/>
				);
			})}
		</>
	);
}

export default ListTodos;
