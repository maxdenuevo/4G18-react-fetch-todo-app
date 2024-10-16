import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://playground.4geeks.com/todo/user/';
const USER_NAME = 'your_username'; // Replace with your actual username

export function App() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_URL}${USER_NAME}`);
            if (response.ok) {
                const data = await response.json();
                setTodos(data.todos.map(todo => todo.label));
            } else {
                console.error('Failed to fetch todos');
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const syncTodos = async (newTodos) => {
        try {
            const response = await fetch(`${API_URL}${USER_NAME}`, {
                method: 'PUT',
                body: JSON.stringify(newTodos.map(todo => ({ label: todo, done: false }))),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.error('Failed to sync todos');
            }
        } catch (error) {
            console.error('Error syncing todos:', error);
        }
    };

    const addTodo = async (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTodos = [...todos, inputValue.trim()];
            setTodos(newTodos);
            setInputValue("");
            await syncTodos(newTodos);
        }
    };

    const removeTodo = async (taskToRemove) => {
        const newTodos = todos.filter(todo => todo !== taskToRemove);
        setTodos(newTodos);
        await syncTodos(newTodos);
    };

    const clearAllTasks = async () => {
        try {
            const response = await fetch(`${API_URL}${USER_NAME}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTodos([]);
            } else {
                console.error('Failed to clear all tasks');
            }
        } catch (error) {
            console.error('Error clearing all tasks:', error);
        }
    };

    const Todolist = () => {
        if (todos.length > 0) {
            return (
                <div>
                    <ul className="list-group list-group-flush">
                        {todos.map((item, index) => (
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                                key={index}>
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
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="text-muted">
                            {todos.length} item{todos.length !== 1 ? 's' : ''} left
                        </span>
                        <button onClick={clearAllTasks} className="btn btn-danger btn-sm">
                            Clear All Tasks
                        </button>
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
                            onChange={(e) => setInputValue(e.target.value)}
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