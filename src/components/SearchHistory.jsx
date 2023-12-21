import  { useContext, useState } from 'react';
import './SearchHistory.css';
import { SearchContext } from '../SearchContext';
import { FaTrash, FaSync } from 'react-icons/fa';
import { deleteSearch } from '../api/search';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SearchHistory = () => {
  const { historial, setHistorial, refresh, setSearch, setResults } = useContext(SearchContext);
  const [editValue, setEditValue] = useState(""); // Nuevo estado local

  const handleBorrarElemento = async (id) => {
    await deleteSearch({ id });
    refresh();
  };

  const handleEdit = async ({ id }) => {
    const body = {
      username: editValue, // Usar el valor del estado local
    };
    await setSearch({ id, data: body });
    refresh();
    setEditValue(""); // Limpiar el valor después de la edición
  };

  return (
    <div className="historial-container">
      <h2>Historial de Búsquedas</h2>
      <ul className="historial-list">
        {historial?.map((item, index) => (
          <li key={index} className="historial-item">
            <div>
              <span className="historial-texto" onClick={() => setResults([item])}>
                {item.username}
              </span>
              <span className="historial-fecha">{formatDate(new Date())}</span>
            </div>
            <span className="borrar-elemento" onClick={() => handleBorrarElemento(item._id)}>
              <FaTrash />
            </span>
            <div>
              <input
                type="text"
                placeholder="Nuevo valor"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)} // Actualizar el estado local al cambiar el input
              />
              <span className="borrar-elemento" onClick={() => handleEdit({ id: item._id })}>
                <FaSync /> {/* Cambiar el icono de tacho de basura por el icono de actualizar */}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
