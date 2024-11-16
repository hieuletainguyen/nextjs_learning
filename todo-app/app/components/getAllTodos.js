export const getAllTodos = async () => {
    const res = await fetch('http://localhost:9000/tasks', {cache: 'no-store'});
    const todos = await res.json();
    return todos;
};
