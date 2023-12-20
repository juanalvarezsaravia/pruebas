import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import "./Results.css";
import { SearchContext } from '../../SearchContext';

const Results = () => {
    const { results, searchType = 'user' } = useContext(SearchContext);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;


    const [searchTerm, setSearchTerm] = useState('');



    const paginatedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const propertyName = searchType === 'repositories' ? 'name' : 'login';

    const filteredResults = searchTerm
        ? results.filter(repo => repo[propertyName]?.includes(searchTerm))
        : paginatedResults;

    if (!results || results.length === 0) {
        return <div>No se encontraron resultados.</div>;
    }

    const goBackToSearch = () => {
        navigate('/');
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className='Results'>
            <h2>RESULTADOS DE BUSQUEDA</h2>

            {results[0]?.owner?.avatar_url && (
                <div className="single-avatar">
                    <img src={results[0].owner.avatar_url} alt={`${results[0].owner.login}'s avatar`} className="avatar" />
                </div>
            )}

            <input
                type="text"
                placeholder="Filtrar nombre de repositorio"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setSearchTerm('')}>Limpiar Filtros</Button>

            <ul>
                {filteredResults.map((result) => (
                    <li key={result.id}>
                        
                        <Link to={`/details/${result.login || result.name}`}>{result[propertyName]}</Link>
                    </li>
                ))}
            </ul>

            <Button onClick={goBackToSearch}> Volver</Button>

            <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination
                    count={Math.ceil(results.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                />
            </Stack>
        </div>
    );
}

export default Results;