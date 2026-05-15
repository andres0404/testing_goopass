import ProjectCard from './ProjectCard';

export default function Column({ title, items, status, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
      className="column"
    >
      <h2 className="column-title">{title}</h2>
      <div className="column-items">
        {items.length > 0 ? (
          items.map(({ project, tasks }) => (
            <ProjectCard
              key={project.id_pyt}
              project={project}
              tasks={tasks}
              onDragStart={onDragStart}
            />
          ))
        ) : (
          <p className="column-empty">Vacío</p>
        )}
      </div>
    </div>
  );
}
