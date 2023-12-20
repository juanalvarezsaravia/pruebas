import React, { useContext } from 'react';
import './SearchHistory.css';
import { SearchContext } from '../SearchContext';
import { FaTrash } from 'react-icons/fa';
import { deleteSearch } from '../api/search';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SearchHistory = () => {
  const { historial, setHistorial, refresh,setSearch } = useContext(SearchContext);

  const handleBorrarElemento = async (id) => {
    await deleteSearch({ id })
    refresh();
  };
  const handleEdit = async ({id, username}) => 
  {
    const body = {
      username
    };
    await setSearch({ id, data: body })
    refresh();
  }

  return (
    <div className="historial-container">
      <h2>
        Historial de Búsquedas
      </h2>
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
              <span className="borrar-elemento" onClick={() => handleEdit({id:item._id,username:"aqui va el upDate"})}>
              <FaTrash />
            </span>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
