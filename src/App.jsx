import Footer from './components/Footer';
import Header from './components/Header';
import ListTodos from './components/todos/ListTodos';
import AddTodo from './components/todos/AddTodo';
import style from './App.module.css';

function App() {
	return (
		<div>
			<Header />
			<main>
				<section className={style.addTodoSection}>
					<AddTodo />
				</section>
				<section className={style.listTodosSection}>
					<ListTodos />
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default App;
