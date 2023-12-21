import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import { SearchContext } from '../../SearchContext';
import SearchHistory from '../../components/SearchHistory';
import './Search.css';
import { setSearch } from '../../api/search';

const Search = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const { setResults, language, setLanguage, sortBy, setSortBy, historial, setHistorial, refresh, searchType, setSearchType } = useContext(SearchContext);

  const handleSearch = async () => {
    try {
      let baseUrl = `https://api.github.com/search/`;
      let query = `${baseUrl}${searchType}?q=${username}`;

      if (language && searchType === 'repositories') {
        query += `&language=${language}`;
      }

      if (sortBy && searchType === 'repositories') {
        query += `&sort=${sortBy}`;
      }

      const response = await axios.get(query);
      const results = response.data.items;

      if (results.length > 0) {
        const body = {
          //results: results?.slice(0, 5), 
          results,
          username,
          language,
          searchType,
          sortBy
        };
        await setSearch({ data: body })
        refresh();
      }

      setResults(results);
      navigate(`/results`);
    } catch (error) {
      console.log(error)
      alert('An error occurred.');
    }
  };

  const borrarHistorial = () => {
    setHistorial([]);
    setResults([]);
  };

  return (
    <div className='Search'>
      <h1>BUSCADOR</h1>
      <input
        type="text"
        placeholder="Search"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
  <option value="" disabled>Choose here</option>
  <option value="repositories">Repositories</option>
  <option value="users">Users</option>
</select>


      {searchType === 'repositories' && (
        <>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">Elija Lenguaje</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="CSS">CSS</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="updated">Recientemente Actualizado</option>
            <option value="stars">Estrellas</option>
          </select>
        </>
      )}

      <Button onClick={handleSearch}>Buscar</Button>
      <SearchHistory historial={historial} onBorrarHistorial={borrarHistorial} onBuscar={(term) => setUsername(term)} />
    </div>
  );
}

export default Search;