import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low'); // ✅ Added priority state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      priority,           // ✅ Include priority in the task object
      completed: false,
    };

    await onAddTask(newTask);

    // Clear the form
    setTitle('');
    setDescription('');
    setPriority('Low');
  };

  return (
    <div className="bg-pink-100 p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-black-600">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border-b-fuchsia-300 rounded-lg bg-white shadow mb-6"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full p-2  border-b-fuchsia-300 rounded-lg bg-white shadow mb-6"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2  border-b-fuchsia-300 rounded-lg bg-white shadow mb-6"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex justify-center mt-2">
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto"
        >
          Add Task
        </button>
        </div>
      </form>
    </div>
  );
}
