// components/SearchHistory.jsx
import React, { useContext } from 'react';
import './SearchHistory.css';
import { SearchContext } from '../SearchContext';
import { FaTrash } from 'react-icons/fa';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SearchHistory = () => {
  const { historial, setHistorial, setResults } = useContext(SearchContext);

  const handleBorrarElemento = (index) => {
    const term = historial[index];
    const nuevoHistorial = [...historial];
    nuevoHistorial.splice(index, 1);
    setHistorial(nuevoHistorial);

    // Filtrar los resultados y mantener solo aquellos que no coinciden con el término borrado
    setResults((prevResults) => prevResults.filter((result) => result !== term));
  };

  const handleBorrarTodo = () => {
    setResults([]);
    setHistorial([]);
  };

  return (
    <div className="historial-container">
      <h2>
        Historial de Búsquedas
        {historial.length > 0 && (
          <span className="borrar-historial" onClick={handleBorrarTodo}>
            <FaTrash />
          </span>
        )}
      </h2>
      <ul className="historial-list">
        {historial.map((item, index) => (
          <li key={index} className="historial-item">
            <div>
              <span className="historial-texto" onClick={() => setResults([item])}>
                {item}
              </span>
              <span className="historial-fecha">{formatDate(new Date())}</span>
            </div>
            <span className="borrar-elemento" onClick={() => handleBorrarElemento(index)}>
              <FaTrash />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
