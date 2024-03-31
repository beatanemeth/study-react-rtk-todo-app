import { createSlice } from '@reduxjs/toolkit';
import { todoList } from '../../initialTodoData';

/**
 * There are three important things to need to understand about SLICES:
 * 1. defines some INITIAL STATE
 * 2. combines 'mini-reducers' into a big reducer
 * 3. creates a set of 'ACTION CREATE' functions
 */
export const todoSlice = createSlice({
	name: 'todos',
	initialState: todoList,
	reducers: {
		/**
		 * The reducer function takes the STATE of the whole app and the ACTION being dispatched and
		 * returns the next state of the whole app.
		 */
		addTodo: (state, action) => {
			const { item } = action.payload;
			state.push({
				id: Date.now().toString(),
				item,
				isDone: false,
			});
		},
		updateTodo: (state, action) => {
			const { id, item, isDone } = action.payload;
			return state.map((todo) =>
				todo.id === id ? { id, item, isDone } : todo
			);
		},
		deleteTodo: (state, action) => {
			const { id } = action.payload;
			return state.filter((todo) => todo.id !== id);
		},
		toggleTodo: (state, action) => {
			const { id } = action.payload;
			const todo = state.find((todo) => todo.id === id);
			todo.isDone = !todo.isDone;
		},
	},
});

/**
 * When we create a reducer function then createSlice automatically generates an action create function with the same name.
 * When we export our actions we are actually exporting this action create function that is automatically created.
 */
export const { addTodo, updateTodo, deleteTodo, toggleTodo } =
	todoSlice.actions;

/**
 * We export the full reducer, because the store will need it.
 */
export default todoSlice.reducer;

console.log(todoSlice.actions.addTodo());
