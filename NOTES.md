# Redux

Three principles of [Redux](https://redux.js.org/introduction/getting-started):

1. **Single source of truth**  
   The state of your whole application is stored as a tree of plain objects and arrays within a single store. (How much you put in the store is up to you - not all data needs to live there.)
2. **State is read-only**  
   The only way to change the state tree is by dispatching an action. The rest of the app is not allowed to modify the state tree directly.  
   An action is a plain JavaScript object, describing in the minimal way what changed in the application. Whether it is initiated by a network request or by user interaction, any data that gets into the Redux application gets there by actions.
3. **Changes are made with pure functions**  
   All state updates are performed by pure functions called reducers, which are  
   `(state, action) => newState`
   The reducer function takes the state of the whole application and the action being dispatched and returns the next state of the whole application.

#### STATE

App's state is described as a **plain object**:

```javascript
[
	{
		id: 1,
		isDone: false,
		item: 'Todo 1',
	},
	{
		id: 2,
		isDone: false,
		item: 'Todo 2',
	},
	{
		id: 3,
		isDone: true,
		item: 'Todo 3',
	},
];
```

#### ACTION

To change something in the state, you need to dispatch an action.

An **action object** is always going to have a **type** property that is a string. That string in particular is going to be what tells the reducer what kind of state update it needs to make.

And if we ever need to communicate some data to the reducer, such as whatever a user just typed into the text input, then we are gonna communicate that data on the **payload** property of this action object.

An action is a plain JavaScript object that describes what happened:

```javaScript
{
    type: ADD_TODO,
    payload: {
      id: Date.now().toString(),
			item: "Buy fruits",
			isDone: false,
    }
}

{
    type: UPDATE_TODO,
    payload: {
        id: updatedTodo.id,
        data: updatedTodo
    }
}

{
    type: DELETE_TODO,
    payload: todoId
}

{
    type: TOGGLE_TODO,
    payload: todoId
}
```

Note that to create actions, we use action creators. **Action creators** are functions that create and return action objects.

```javaScript
function addTodo (newTodo){
  return {
    type: ADD_TODO,
    payload: {
			id: Date.now().toString(),
			item: newTodo,
			isDone: false,
    }
  }
}

function updateTodo (updatedTodo){
  return {
    type: UPDATE_TODO,
    payload: {
        id: updatedTodo.id,
        data: updatedTodo
    }
  }
}

function deleteTodo (todoId){
  return{
    type: DELETE_TODO,
    payload: {
      id: todoId
    }
  }
}

function toggleTodo (todoId){
  return{
    type: TOGGLE_TODO,
    payload: {
      id: todoId
    }
  }
}
```

#### REDUCER

Finally, to tie state and actions together, we write a function called a reducer. It’s just a function that takes state and action as arguments, and returns the next state of the app:

```javaScript
const todoReducer = (state, action) => {
	switch (action.type) {
		case ADD_TODO:
			return [...state, action.payload];
		case UPDATE_TODO:
			return state.map((todo) =>
				todo.id === action.payload.id
					? { ...todo, ...action.payload.data }
					: todo
			);
		case DELETE_TODO:
			return state.filter((todo) => todo.id !== action.payload);
		case TOGGLE_TODO:
			return state.map((todo) =>
				todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
			);
		default:
			return state;
	}
};
```

**Reducers need to update data immutably, by making copies of state and modifying the copies before returning them, rather than directly modifying inputs.**

#### STORE

The Store binds together the three principles of Redux:

- It combines together the different reducers.
- It holds the current application's state object.
- It lets you dispatch actions. When you create it, you need to specify the reducer that tells how the state is updated with actions.

```javaScript
import { createStore, combineReducers } from "redux";

import todoReducer from "./";

const rootReducer = combineReducers({
  todos: todoReducer,
  // we can have other reducers
});

const store = createStore(rootReducer, preloadedState);
```

The store has three important methods:

1. **getState()**  
   It retrieves the current state of the Redux store.
2. **dispatch()**  
   It lets you dispatch actions to change the state of your application.
3. **subscribe()**  
   It lets you register a callback that the Redux store will call any time an action has been dispatched, so that you can update the UI of your application. It will reflect the current application state.

#### PROVIDER

To connect the Redux store to the ToDo application, we need to use the Provider component from the react-redux library.

#### CONNECT REDUX WITH REACT

---

## How Redux Toolkit simplifies all the above listed?

Prior to [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started), you'd typically write that reducer with a switch statement and manual updates. You'd also probably have hand-written action creators and action type constants along with it - see above.

Redux Toolkit starts with two key APIs that simplify the most common things you do in every Redux app:

- `configureStore` sets up a well-configured Redux store with a single function call, including combining reducers, adding the thunk middleware, and setting up the Redux DevTools integration. It also is easier to configure than createStore, because it takes named options parameters.
- `createSlice` lets you write **reducers** that use the **Immer library** to enable writing **immutable updates** using **"mutating" JS syntax** like state.value = 123, with no spreads needed. It also automatically generates a**ction creator functions** for each reducer, and generates **action type strings** internally based on your reducer's names. Finally, it works great with **TypeScript**.

[index.js](./src/store/index.js)  
[todoSlice.js](./src/store/slices/todoSlice.js)  
[filterSlic.js](./src/store/slices/filterSlice.js)  
provide the store, i.e. the state, to the whole app - [main.jsx](./src/main.jsx)

---

## Additional resources

[blog presentation](https://blog.isquaredsoftware.com/presentations/react-redux-ts-intro-2020-12/#/72)

---

## App Snapshots

- action objects

![Todo App - A - action objects](/appSnapshots/Selection_334-action-objects.png)
