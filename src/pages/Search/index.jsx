import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from '../context/AuthUser';
import Button from '../../components/Button';
import "./Search.css";

const Search = () => {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { setResults, language, setLanguage, sortBy, setSortBy } = useContext(SearchContext);

    const handleSearch = async () => {
        try {
            let query = `https://api.github.com/search/repositories?q=`;

            if (username) {
                query += `user:${username}+`;
            }

            if (language) {
                query += `language:${language}+`;
            }

            if (sortBy) {
                query += `&sort=${sortBy}`;
            }

            const response = await axios.get(query);
            setResults(response.data.items);
            navigate(`/results`);
        } catch (error) {
            alert('An error occurred.');
        }
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

            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="">Elija Lenguaje</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="CSS">CSS</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Odenar por</option>
                <option value="updated">Recientemente Actualizado</option>
                <option value="stars">Estrellas</option>
            </select>

            <Button onClick={handleSearch}> Buscar</Button>
        </div>
    );
}

export default Search;