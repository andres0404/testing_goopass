import TaskCard from './TaskCard';

export default function ProjectCard({ project, tasks, onDragStart }) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h3 className="font-bold text-gray-900 mb-3">{project.pyt_nom}</h3>
      <p className="text-xs text-gray-600 mb-4">{project.pyt_desc}</p>
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id_tarea} task={task} onDragStart={onDragStart} />
          ))
        ) : (
          <p className="text-xs text-gray-400 italic">Sin tareas</p>
        )}
      </div>
    </div>
  );
}
