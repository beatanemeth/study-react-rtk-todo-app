import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsFillSaveFill } from 'react-icons/bs';
import { MdDone, MdCancel } from 'react-icons/md';
import style from './Todo.module.css';
import { useEffect, useState } from 'react';
import InputField from '../InputField';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import {
	deleteTodo,
	toggleTodo,
	updateTodo,
} from '../../store/slices/todoSlice';

function Todo({ todo }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTodo, setEditedTodo] = useState('');

	/**
	 *  To update the state, an action must be dispatched to the store using the `dispatch` function.
	 * This triggers the store to call the corresponding reducer function with the current state and the dispatched action.
	 * Just think of the `dispatch` function as `setState`.
	 */
	const dispatch = useDispatch();

	/**
	 *  set editedTodo to the current todo item's text when entering edit mode
	 */
	useEffect(() => {
		if (isEditing) {
			setEditedTodo(todo.item);
		}
	}, [isEditing, todo.item]);

	function handleEditTodoSubmit(e) {
		e.preventDefault();

		dispatch(updateTodo({ id: todo.id, item: editedTodo }));
		setIsEditing(false);
	}

	function handleEditIconClick() {
		// check if the Todo is done, and if so, prevent editing
		if (todo.isDone) {
			return;
		}
		setIsEditing(true);
	}

	function handleDeleteTodo() {
		dispatch(deleteTodo({ id: todo.id }));
	}

	function handleToggleTodo() {
		dispatch(toggleTodo({ id: todo.id }));
	}

	return (
		<>
			{isEditing ? (
				<form
					className={style.singleTodo}
					onSubmit={handleEditTodoSubmit}
				>
					<InputField
						type="text"
						className={style.editTodo}
						value={editedTodo}
						onChange={(e) => setEditedTodo(e.target.value)}
					/>
					<div className={style.iconsWrapper}>
						<Button btnType="submit">
							<span className={style.icon}>
								<BsFillSaveFill />
							</span>
						</Button>

						<span
							className={style.icon}
							onClick={() => setIsEditing(false)}
						>
							<MdCancel />
						</span>
					</div>
				</form>
			) : (
				<div className={style.singleTodo}>
					<span className={todo?.isDone === true && style.todoDone}>
						{todo?.item}
					</span>
					<div className={style.iconsWrapper}>
						<span
							className={style.icon}
							onClick={handleEditIconClick}
						>
							<AiFillEdit />
						</span>
						<span
							className={style.icon}
							onClick={handleDeleteTodo}
						>
							<AiFillDelete />
						</span>
						<span
							className={style.icon}
							onClick={handleToggleTodo}
						>
							<MdDone />
						</span>
					</div>
				</div>
			)}
		</>
	);
}

export default Todo;
