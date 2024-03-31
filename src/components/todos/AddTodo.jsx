import { useState } from 'react';
import Button from '../Button';
import InputField from '../InputField';
import style from './AddTodo.module.css';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/slices/todoSlice';

const AddTodo = () => {
	const [addNewTodo, setAddNewTodo] = useState('');
	/**
	 * To update the state, an action must be dispatched to the store using the `dispatch` function.
	 * This triggers the store to call the corresponding reducer function with the current state and the dispatched action.
	 * Just think of the `dispatch` function as `setState`.
	 */
	const dispatch = useDispatch();

	function handleAddTodoSubmit(e) {
		e.preventDefault();

		dispatch(addTodo({ item: addNewTodo }));
		setAddNewTodo('');
	}

	return (
		<form
			className={style.inputFieldWrapper}
			onSubmit={handleAddTodoSubmit}
		>
			<InputField
				type="text"
				className={style.inputField}
				value={addNewTodo}
				onChange={(e) => setAddNewTodo(e.target.value)}
				placeholder="Add New Todo"
			/>
			<div className={style.inputFieldBtnContainer}>
				<Button
					type="submit"
					className={style.inputBtn}
				>
					GO
				</Button>
			</div>
		</form>
	);
};

export default AddTodo;
