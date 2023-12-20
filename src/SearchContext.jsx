// SearchContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getSearches, setSearch } from './api/search';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [historial, setHistorial] = useState([]);
  const [resultsCount, setResultsCount] = useState([]); // Agregar estado para resultsCount
  const [searchType, setSearchType] = useState('repositories'); // New state for search type


  // Definir la función getSearches
  // async function getSearches() {
  //   // Aquí va tu lógica para obtener las búsquedas
  // }

  useEffect(() => {
    getSearches().then((data) => {
      setHistorial(data)
    })
  }, [])

  const refresh = () => {
    getSearches().then((data) => {
      setHistorial(data)
    });
  }

  return (
    <SearchContext.Provider
      value={{
        refresh,
        results,
        setResults,
        language,
        setLanguage,
        sortBy,
        setSortBy,
        historial,
        setHistorial,
        resultsCount, // Agregar resultsCount al contexto
        setResultsCount, // Agregar setResultsCount al contexto
        searchType,
        setSearchType,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
