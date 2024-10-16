import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://playground.4geeks.com/todo/';
const USER_NAME = 'alesanchezr'; 

export function App() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_URL}users/${USER_NAME}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.todos)) {
                    setTodos(data.todos);
                } else {
                    setTodos([]);
                }
            } else {
                console.error('Failed to fetch todos');
                setTodos([]);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        }
    };

    const createTodo = async (todo) => {
        try {
            const response = await fetch(`${API_URL}todos/${USER_NAME}`, {
                method: 'POST',
                body: JSON.stringify({ label: todo, done: false }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodos([...todos, data]);
            } else {
                console.error('Failed to create todo');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`${API_URL}todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setTodos(todos.filter(todo => todo.id !== todoId));
            } else {
                console.error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            createTodo(inputValue.trim());
            setInputValue("");
        }
    };

    const TodoList = () => {
        if (todos.length === 0) {
            return <p>No tasks, add a task</p>;
        }

        return (
            <div>
                <ul className="list-group list-group-flush">
                    {todos.map((todo, index) => (
                        <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={todo.id}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            {todo.label}
                            {hoverIndex === index && (
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="btn btn-link p-0"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                <hr className="solid" />
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="text-muted">
                        {todos.length} item{todos.length !== 1 ? 's' : ''} left
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="container text-center mt-5 justify-content-center">
            <h1 className="display-2 text-danger text-opacity-25">todos</h1>
            <div className="card cardtodos mx-auto">
                <div className="card-body">
                    <div className="input-group mb-3 input-group-lg">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="What do you need to do?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <TodoList />
                </div>
            </div>
        </div>
    );
}

export default App;