import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'react-bootstrap'; // Importando o Button do react-bootstrap
import 'react-datepicker/dist/react-datepicker.css';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState('');
  const [urgency, setUrgency] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar a exibição do datepicker
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPeriod(task.period);
      setUrgency(task.urgency);
      setDate(new Date(task.date)); // Garantir que a data seja um objeto Date
    } else {
      setTitle('');
      setUrgency(false);
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setPeriod('Manhã');
      } else if (currentHour < 18) {
        setPeriod('Tarde');
      } else {
        setPeriod('Noite');
      }
    }
  }, [task, isOpen]);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: task ? task.id : Date.now(), title, description, period, urgency, date });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{task ? 'Editar Tarefa' : 'Criar Tarefa'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  ref={titleInputRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Período</label>
                <select
                  className="form-select"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
              </div>
              <div className="mb-3 form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={urgency}
                  onChange={(e) => setUrgency(e.target.checked)}
                />
                <label className="form-check-label">Urgência</label>
              </div>
              <div className="mb-3">
                <label className="form-label">Data</label>
                <Button variant="light" onClick={() => setShowDatePicker(!showDatePicker)}>
                  {date.toLocaleDateString('pt-BR')}
                </Button>
                {showDatePicker && (
                  <DatePicker
                    selected={date}
                    onChange={(date) => {
                      setDate(date);
                      setShowDatePicker(false); // Fechar o datepicker após a seleção
                    }}
                    className="form-control mt-2"
                  />
                )}
              </div>
              <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
