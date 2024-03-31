import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import filterSlice from './slices/filterSlice';

/**
 * Store is a single source of truth that holds the entire state tree of your application.
 */
export const store = configureStore({
	/**
	 * A reducer object
	 * What we add to a reducer object, i.e. our store, will be available to the entire app through the Provider.
	 */
	reducer: {
		todos: todoReducer,
		filter: filterSlice,
		// we can have other reducers
	},
});

/**
 * To see what state exists in the store
 */
const startingState = store.getState();
console.log(startingState);
// easier to read
console.log(JSON.stringify(startingState));

/**
 * to interact with the store manually, e.g. for debugging purposes
 */
store.dispatch({
	type: 'todos/addTodo',
	payload: { item: 'Todo 4' },
});

const finalState = store.getState();
console.log(finalState);
