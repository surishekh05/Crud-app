import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import API from "../utils/api";
import { toast } from "react-toastify"; 


export default function Tasks({ query }) {
  const [tasks, setTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    if (form.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    await API.post("/tasks", form);
    toast.success("Task created successfully");
    setForm({ title: "", description: "" });
    loadTasks();
  };

  const updateTask = async (task) => {
    const title = prompt("New title", task.title);
    if (!title) return;

    await API.put(`/tasks/${task._id}`, { title });
    toast.success("Task updated successfully!");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    toast.success("Task deleted successfully!");
    loadTasks();
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) &&
    (statusFilter ? t.status === statusFilter : true)
  );

  return (
    <>

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Tasks</h1>

        {/* CREATE FORM */}
        <form className="bg-white p-6 rounded-xl shadow mb-6 border" onSubmit={createTask}>
          <h3 className="font-bold text-lg mb-4 text-gray-700">Create Task</h3>

          <input
            className="w-full p-3 mb-3 border rounded-lg text-center placeholder:text-center"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="w-full p-3 mb-3 border rounded-lg text-center placeholder:text-center"
            placeholder="Description (Optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Create
          </button>
        </form>

        {/* STATUS FILTER */}
        <div className="mb-4">
          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => updateTask(task)}
              onDelete={() => deleteTask(task._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
