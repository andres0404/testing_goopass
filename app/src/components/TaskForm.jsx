import { useState } from 'react';
import Button from './Button';

export default function TaskForm({ onSubmit, onClose, initialData = null, proyectos = [] }) {
  const [formData, setFormData] = useState(
    initialData || {
      id_pyt: '',
      ta_nom: '',
      ta_desc: '',
      prioridad: 1,
      estado: 0,
      tar_fec_ini: '',
      tar_fec_fin: ''
    }
  );
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prioridad' || name === 'estado' || name === 'id_pyt' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_pyt) {
      setError('Selecciona un proyecto');
      return;
    }

    if (!formData.ta_nom.trim()) {
      setError('El título de la tarea es requerido');
      return;
    }

    if (formData.tar_fec_fin && new Date(formData.tar_fec_fin) <= new Date(formData.tar_fec_ini)) {
      setError('La fecha final debe ser posterior a la inicial');
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{initialData ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="id_pyt">Proyecto *</label>
            <select
              id="id_pyt"
              name="id_pyt"
              value={formData.id_pyt}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un proyecto</option>
              {proyectos.map(p => (
                <option key={p.id_pyt} value={p.id_pyt}>
                  {p.pyt_nom}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ta_nom">Título de la Tarea *</label>
            <input
              type="text"
              id="ta_nom"
              name="ta_nom"
              value={formData.ta_nom}
              onChange={handleChange}
              placeholder="Ej: Implementar login"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ta_desc">Descripción</label>
            <textarea
              id="ta_desc"
              name="ta_desc"
              value={formData.ta_desc}
              onChange={handleChange}
              placeholder="Describe la tarea..."
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prioridad">Prioridad *</label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                required
              >
                <option value={0}>Baja</option>
                <option value={1}>Media</option>
                <option value={2}>Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value={0}>Pendiente</option>
                <option value={1}>En Proceso</option>
                <option value={2}>Terminado</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tar_fec_ini">Fecha Inicio</label>
              <input
                type="datetime-local"
                id="tar_fec_ini"
                name="tar_fec_ini"
                value={formData.tar_fec_ini}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tar_fec_fin">Fecha Fin</label>
              <input
                type="datetime-local"
                id="tar_fec_fin"
                name="tar_fec_fin"
                value={formData.tar_fec_fin}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
