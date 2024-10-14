import React, { useState } from 'react';
import './App.css';

let todos = ["Make the bed", "Wash my hands", "Eat", "Walk the dog"];

export function App() {
	const [inputValue, setInputValue] = useState("");
	const [addToArray, setAddToArray] = useState(todos);

	const addTodo = e => {
		if (e.key === "Enter") {
			if (inputValue !== "") {
				const todosNew = addToArray.concat(inputValue);
				setAddToArray(todosNew);
				setInputValue("");
			} else alert("Insert a task");
		}
	};
	const removeTodo = task => {
		const removeItem = addToArray.filter(item => item !== task);
		setAddToArray(removeItem);
	};
	const Todolist = () => {
		if (addToArray.length > 0) {
			return (
				<div>
					<ul className="list-group list-group-flush">
						{addToArray.map(item => (
							<li
								className="list-group-item d-flex justify-content-between align-items-center"
								key={item}>
								{item}
								<button
									onClick={() => removeTodo(item)}
									className="btn btn-link p-0">
									<i className="bi bi-x-lg"></i>
								</button>
							</li>
						))}
					</ul>
					<hr className="solid" />
					<div className="float-left text-muted mt-2">
						{addToArray.length} item{addToArray.length !== 1 ? 's' : ''} left
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<p>No tasks, add a task</p>
				</div>
			);
		}
	};
	return (
		<div className="container text-center mt-5 justify-content-center">
			<h1>todos</h1>
			<div className="card cardtodos mx-auto">
				<div className="card-body">
					<div className="input-group mb-3 input-group-lg">
						<input
							type="text"
							className="form-control"
							placeholder="What do you need?"
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							onKeyUp={addTodo}
						/>
					</div>
					<Todolist />
				</div>
			</div>
		</div>
	);
}

export default App;