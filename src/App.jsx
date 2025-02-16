import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TaskTable from './components/TaskTable';
import TaskModal from './components/TaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // Estado para tarefas concluídas
  const [completedCount, setCompletedCount] = useState(0);
  const [newTask, setNewTask] = useState('');
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.filter(task => {
      if (task.id === id) {
        setCompletedTasks([...completedTasks, { ...task, completed: true }]); // Adiciona à lista de concluídas
        setCompletedCount(completedCount + 1);
        return false; // Remove da lista de pendentes
      }
      return true; // Mantém as outras tarefas
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setCompletedCount(updatedTasks.filter(task => task.completed).length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({ title: newTask, date: selectedDate });
    }
  };

  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const saveTask = (task) => {
    if (currentTask) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      addTask(task);
    }
    setCurrentTask(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control me-2"
          />
          <button className="btn btn-primary" onClick={() => openModal()}>Adicionar Tarefa</button>
        </div>
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={saveTask} task={currentTask} />
        <Dashboard tasks={tasks} completedCount={completedCount} animate={animate} />
        <TaskTable tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} editTask={openModal} />
        
        {/* Nova tabela para tarefas concluídas */}
        <div className="card mt-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">Tarefas Concluídas</h5>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-start">Título</th>
                  <th scope="col" className="text-start">Período</th>
                  <th scope="col" className="text-start">Urgência</th>
                  <th scope="col" className="text-start">Data</th>
                  <th scope="col" className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map(task => (
                  <tr key={task.id} className="table-success">
                    <td className="text-decoration-line-through text-start">{task.title}</td>
                    <td className="text-start">{task.period}</td>
                    <td className="text-start">
                      {task.urgency && <span className="badge bg-danger">Urgente</span>}
                    </td>
                    <td className="text-start">{task.date.toLocaleDateString('pt-BR')}</td>
                    <td className="text-end">
                      <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
