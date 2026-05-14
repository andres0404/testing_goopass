import ProjectCard from './ProjectCard';

export default function Column({ title, items, status, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
      className="bg-gray-100 rounded-lg p-4 min-h-screen flex-1 border-2 border-dashed border-gray-300"
    >
      <h2 className="font-bold text-lg text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
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
          <p className="text-gray-400 text-center py-8">Vacío</p>
        )}
      </div>
    </div>
  );
}
