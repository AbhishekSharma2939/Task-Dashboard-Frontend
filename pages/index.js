import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
//usernme-bhatraabhi11
// psswrd-bhatraabhi1122

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    // setTasks(data);
    if (Array.isArray(data)) {
    setTasks(data);
  } else {
    setTasks([]); // fallback in case it's not an array
    console.error("Expected an array but got:", data);
  }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  // Update task
  const updateTask = async (task) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task._id !== id));
  };

   // Filter and sort logic
  const filteredTasks = tasks
    .filter((task) =>
      priorityFilter === 'All' ? true : task.priority === priorityFilter
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
    });

return (
    <div className="bg-white-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-green-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black-600">
          Task Management Dashboard
        </h1> 
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />

        {/* Filters */}
        <div className="flex justify-between mt-6 mb-6">
          <select
            className="p-2 border-b-fuchsia-300 rounded-lg bg-white shadow mb-6"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            className="p-2  border-b-fuchsia-300 rounded-lg bg-white shadow mb-6"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );

}