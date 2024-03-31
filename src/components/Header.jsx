import { useSelector } from 'react-redux';
import style from './Header.module.css';

function Header() {
	/**
	 * useSelector hook can directly talk to the store.
	 * It can selectively ask the store that 'I need this and this info'.
	 * It is looking for the function and as a parameter we get access to the entire store.
	 */
	const todos = useSelector((store) => store.todos);

	const totalTodos = todos.length;
	const activeTodos = todos.filter((item) => !item.isDone).length;

	return (
		<header>
			<img
				src="./public/todo-list-logo.png"
				alt="todo-list"
				width={115}
			/>
			{/* <h1>Todo List</h1> */}
			<div className={style.todosCountContainer}>
				<p>
					Total Todo Items:
					<span className={style.todosCountTotal}>#{totalTodos}</span>
				</p>
				<p>
					Active Todo Items:
					<span className={style.todosCountTotal}>#{activeTodos}</span>
				</p>
			</div>
		</header>
	);
}

export default Header;
