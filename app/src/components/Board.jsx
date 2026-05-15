import { useState, useEffect } from 'react';
import Column from './Column';

const API_URL = 'http://localhost:3000/api';

export default function Board() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
      tasks: tareas.filter(t => t.id_pyt === proyecto.id_pyt && t.estado === estado)
    }));
  };

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tablero de Proyectos</h1>
      <div className="flex gap-6">
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
    </div>
  );
}
