import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";
import * as api from "./components/getAllTodos";
import './page.css';

export default async function Home() {
  const tasks = await api.getAllTodos();

  return (
    <main className="container">
      <div className="header-section">
        <h1 className="title">
          ✨ Task Master ✨
        </h1>
        <p className="subtitle">
          Organize your day, achieve your goals
        </p>
        <div className="card">
          <AddTask todo={tasks}/>
        </div>
      </div>
      <div className="todo-list-section">
        <div className="card">
          <TodoList initialTasks={tasks} />
        </div>
      </div>
    </main>
  );
}