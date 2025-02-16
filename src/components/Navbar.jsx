import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric', locale: 'pt-BR' };
    const formattedDate = date.toLocaleDateString('pt-BR', options).replace(' ', ' de ');
    setCurrentDate(formattedDate);
  }, []);

  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid d-flex justify-content-between">
        <span className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-journal" viewBox="0 0 16 16">
            <path d="M3.5 0A.5.5 0 0 1 4 0.5V1h8V.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a.5.5 0 0 1 .5-.5h1zM1 1v14h14V1H1zm2 1h10v1H3V2zm0 2h10v1H3V4zm0 2h10v1H3V6zm0 2h10v1H3V8zm0 2h10v1H3v-1zm0 2h10v1H3v-1z"/>
          </svg>
          <span className="ms-2">Lista de Tarefas</span>
        </span>
        <span className="navbar-text">
          {currentDate}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
