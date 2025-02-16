import React from 'react';

const Dashboard = ({ tasks, completedCount, animate }) => {
  return (
    <div className="row">
      <div className="col">
        <div className={`card text-white bg-success mb-3 ${animate ? 'animate-border' : ''}`}>
          <div className="card-header">Tarefas Concluídas</div>
          <div className="card-body">
            <h5 className="card-title">{completedCount}</h5>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-danger mb-3">
          <div className="card-header">Total de Tarefas</div>
          <div className="card-body">
            <h5 className="card-title">{tasks.length}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
