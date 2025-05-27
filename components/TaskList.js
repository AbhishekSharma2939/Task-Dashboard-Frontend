import { useState } from 'react';

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async () => {
    if (!editingTask.title.trim()) return;
    await onUpdateTask(editingTask);
    setEditingTask(null);
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-50 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {editingTask && editingTask._id === task._id ? (
            <div className="flex-1">
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
              ></textarea>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => onUpdateTask({ ...task, completed: !task.completed })}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleEdit(task)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}