export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow-md border">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="mt-1 text-sm text-indigo-600">{task.status}</p>

      <div className="mt-3 flex gap-2">
        <button className="bg-yellow-500 px-3 py-1 cursor-pointer rounded text-white" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-red-500 px-3 py-1 rounded cursor-pointer text-white" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
