import { useState, useEffect } from 'react';
import Column from './Column';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';
import Button from './Button';

const API_URL = 'http://localhost:3000/api';

export default function Board() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [proyRes, tarRes] = await Promise.all([
        fetch(`${API_URL}/proyectos`),
        fetch(`${API_URL}/tareas`)
      ]);

      if (!proyRes.ok || !tarRes.ok) throw new Error('Error fetching data');

      const proyData = await proyRes.json();
      const tarData = await tarRes.json();

      setProyectos(proyData);
      setTareas(tarData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, nuevoEstado) => {
    e.preventDefault();
    if (!draggedTask) return;

    if (draggedTask.estado === nuevoEstado) {
      setDraggedTask(null);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tareas/${draggedTask.id_tarea}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...draggedTask, estado: nuevoEstado })
      });

      if (!res.ok) throw new Error('Error updating task');

      setTareas(tareas.map(t =>
        t.id_tarea === draggedTask.id_tarea ? { ...t, estado: nuevoEstado } : t
      ));
    } catch (err) {
      console.error(err);
    }

    setDraggedTask(null);
  };

  const agruparTareasPorProyectoYEstado = (estado) => {
    return proyectos.map(proyecto => ({
      project: proyecto,
      tasks: tareas.filter(t => t.id_pyt === parseInt(proyecto.id_pyt) && t.estado === estado)
    }));
  };

  const handleCreateProject = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/proyectos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error creating project');

      const newProject = await res.json();
      setProyectos([...proyectos, newProject]);
      setShowProjectForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error creating task');

      const newTask = await res.json();
      setTareas([...tareas, newTask]);
      setShowTaskForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '32px', textAlign: 'center' }}>Cargando...</div>;
  if (error) return <div style={{ padding: '32px', textAlign: 'center', color: '#dc2626' }}>Error: {error}</div>;

  return (
    <div className="board-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="board-title" style={{ marginBottom: 0 }}>Tablero de Proyectos</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => setShowProjectForm(true)} variant="primary">
            + Crear proyecto
          </Button>
          <Button onClick={() => setShowTaskForm(true)} variant="primary">
            + Crear tarea
          </Button>
        </div>
      </div>
      <div className="board-columns">
        <Column
          title="Pendiente"
          items={agruparTareasPorProyectoYEstado(0)}
          status={0}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <Column
          title="En Proceso"
          items={agruparTareasPorProyectoYEstado(1)}
          status={1}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <Column
          title="Terminado"
          items={agruparTareasPorProyectoYEstado(2)}
          status={2}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>

      {showProjectForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onClose={() => setShowProjectForm(false)}
        />
      )}

      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowTaskForm(false)}
          proyectos={proyectos}
        />
      )}
    </div>
  );
}
