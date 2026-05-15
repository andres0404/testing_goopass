export default function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="task-card"
    >
      <h4 className="task-card-title">{task.ta_nom}</h4>
      <p className="task-card-desc">{task.ta_desc}</p>
    </div>
  );
}
