import React from 'react';
import { Dropdown } from 'react-bootstrap'; // Importando o Dropdown do react-bootstrap

const TaskTable = ({ tasks, toggleTaskCompletion, deleteTask, editTask }) => {
  return (
    <div className="card mt-4">
      <div className="card-header bg-light">
        <h5 className="mb-0">Lista de Tarefas</h5>
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
            {tasks.map(task => (
              <tr key={task.id} className={task.completed ? 'table-success' : ''}>
                <td className={task.completed ? 'text-decoration-line-through text-start' : 'text-start'}>{task.title}</td>
                <td className="text-start">{task.period}</td>
                <td className="text-start">
                  {task.urgency && <span className="badge bg-danger">Urgente</span>}
                </td>
                <td className="text-start">{task.date.toLocaleDateString('pt-BR')}</td> {/* Convertendo a data para string */}
                <td className="text-end">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm" className="btn-action">
                      Ações
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toggleTaskCompletion(task.id)}>
                        {task.completed ? 'Desfazer' : 'Concluir'}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => editTask(task)}>Editar</Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteTask(task.id)}>Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
