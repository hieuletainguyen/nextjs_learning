'use client';

import { useState } from "react";

export default function TodoList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleDelete = async (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    await fetch(`http://localhost:9000/tasks/${id}`, {
      method: 'DELETE',
    });
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = async (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ));
    const res = await fetch(`http://localhost:9000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: editText}),
    });
    const updatedTask = await res.json();
    console.log(updatedTask);
    setEditingId(null);
  };

  return (
    <div className="todo-container" style={{
      backgroundColor: '#f5f5dc',  // Beige background
      minHeight: '100vh',         // Full viewport height
      padding: '20px'
    }}>
      <ul style={{ 
        listStyle: 'none', 
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {tasks.map((task) => (
          <li key={task.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '10px 0',
            padding: '15px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '16px'
                  }}
                />
                <button 
                  onClick={() => handleSaveEdit(task.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >Save</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, fontSize: '16px' }}>{task.text}</span>
                <button 
                  onClick={() => handleEdit(task)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginRight: '5px'
                  }}
                >Edit</button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 