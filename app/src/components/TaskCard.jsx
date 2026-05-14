export default function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      <h4 className="font-semibold text-sm text-gray-800">{task.ta_nom}</h4>
      <p className="text-xs text-gray-600 mt-1">{task.ta_desc}</p>
    </div>
  );
}
