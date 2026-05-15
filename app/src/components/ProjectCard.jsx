import TaskCard from './TaskCard';

export default function ProjectCard({ project, tasks, onDragStart }) {
  return (
    <div className="project-card">
      <h3 className="project-card-title">{project.pyt_nom}</h3>
      <p className="project-card-desc">{project.pyt_desc}</p>
      <div className="project-card-tasks">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id_tarea} task={task} onDragStart={onDragStart} />
          ))
        ) : (
          <p className="project-card-empty">Sin tareas</p>
        )}
      </div>
    </div>
  );
}
