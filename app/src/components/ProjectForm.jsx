import { useState } from 'react';
import Button from './Button';

export default function ProjectForm({ onSubmit, onClose, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      pyt_nom: '',
      pyt_desc: '',
      pyt_fec_ini: '',
      pyt_fec_fin: ''
    }
  );
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.pyt_nom.trim()) {
      setError('El nombre del proyecto es requerido');
      return;
    }

    if (new Date(formData.pyt_fec_fin) <= new Date(formData.pyt_fec_ini)) {
      setError('La fecha final debe ser posterior a la inicial');
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{initialData ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="pyt_nom">Nombre del Proyecto *</label>
            <input
              type="text"
              id="pyt_nom"
              name="pyt_nom"
              value={formData.pyt_nom}
              onChange={handleChange}
              placeholder="Ej: Aplicación Web"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pyt_desc">Descripción</label>
            <textarea
              id="pyt_desc"
              name="pyt_desc"
              value={formData.pyt_desc}
              onChange={handleChange}
              placeholder="Describe el proyecto..."
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pyt_fec_ini">Fecha Inicio *</label>
              <input
                type="datetime-local"
                id="pyt_fec_ini"
                name="pyt_fec_ini"
                value={formData.pyt_fec_ini}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pyt_fec_fin">Fecha Fin *</label>
              <input
                type="datetime-local"
                id="pyt_fec_fin"
                name="pyt_fec_fin"
                value={formData.pyt_fec_fin}
                onChange={handleChange}
                required
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
