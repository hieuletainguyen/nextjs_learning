'use client';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './AddTask.css';

export default function AddTask({todo}) {
    const [task, setTask] = useState('');

    const inputChange = (e) => {
        setTask(e.target.value);
    };

    const inputSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {id: uuidv4(), text: task};
        await fetch('http://localhost:9000/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTodo),
        });
        setTask('');
    };

    return (
        <div className="add-task-container">
            <input 
                type="text" 
                value={task} 
                onChange={inputChange} 
                placeholder="Enter a task"
                className="task-input"
            />
            <button 
                type="submit" 
                onClick={inputSubmit}
                className="add-button"
            >
                Add task
            </button>
        </div>
    );
};