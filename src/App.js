import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:3001";

function App() {

	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	const GetTodos = async () => {

		await axios.get(API_BASE + "/todos")
			.then(res => setTodos(res.data))
			.catch(err => console.log(err))
	}

	const CompleteTodo = async id => {
		await axios.put(API_BASE + `/todo/complete/${id}`)
			.then(res => setTodos(todos.map(todo => {
				if(todo._id === res.data._id){
					todo.complete = res.data.complete;
				}
				return todo;
			})))
			.catch(err => console.log(err))
	}

	const DeleteTodo = async id => {
		await axios.delete(API_BASE + `/todo/delete/${id}`)
			.then(res => setTodos(todos.filter(todo => todo._id !== res.data._id)))
			.catch(err => console.log(err))
	}
	
	const AddTodo = async () => {

		newTodo && (
			fetch(API_BASE + "/todo/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					text: newTodo
				})
			})
			.then(res => res.json())
			.then(data => setTodos([...todos, data]))
		)
		
		setPopupActive(false);
		setNewTodo(null)

	}

	/*eslint-disable */
	useEffect(()=> {
		GetTodos();
	},[])
	/*eslint-enable */


	return (
		<div className="App">
            <h1>Welcome, Khaled</h1>
            <h4>Your Tasks</h4>
			<div className="todos">
				{todos.map(todo => (
					<div 
						className={"todo " + (todo.complete ? "completed" : "")} 
						key={todo._id}
					>
						<div className="checkbox" onClick={() => CompleteTodo(todo._id)}></div>
						<div className="text" onClick={() => CompleteTodo(todo._id)}>{todo.text}</div>
						<div className="deleteTodo" onClick={() => DeleteTodo(todo._id)} >x</div>
					</div>
				))}

			</div>
			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{ 	popupActive && (
				<div className='popup'>
					<div className='popupContainer'>
						<div className='closePopup' onClick={() => setPopupActive(false)}>
							❌
						</div> 
						<div className='content'>
							<h3>Add New Todo</h3>
							<input 
								type='text' 
								onChange={(e) => setNewTodo(e.target.value)}
								value={newTodo}
							/>
						</div>
						<button onClick={AddTodo}>Add Todo</button>
					</div>
				</div
			>)}
		</div>
	);
}

export default App;
