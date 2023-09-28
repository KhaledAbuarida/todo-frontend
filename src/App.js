import { useState, useEffect } from 'react'

const API_BASE = "http://localhost:3001";

function App() {

	const [todos, setTodos] = useState([]);
	// const [popupActive, setPopupActive] = useState(false);
	// const [newTodo, setNewTodo] = useState("");

	const GetTodos = () => {
		fetch(API_BASE + "/todos")
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch(err => console.log(err))
	}

	useEffect(()=> {
		GetTodos()
		console.log(todos)
	},[])

	


	return (
		<div className="App">
            <h1>Welcome, Khaled</h1>
            <h4>Your Tasks</h4>
			<div className="todos">
				{todos.map(todo => (
					<div className={"todo " + (todo.complete ? "completed" : "")} key={todo._id}>
						<div className="checkbox"></div>
						<div className="text">{todo.text}</div>
						<div className="deleteTodo">x</div>
					</div>
				))}
				
			</div>
		</div>
	);
}

export default App;
