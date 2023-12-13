// SearchContext.jsx
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [historial, setHistorial] = useState([]);
  const [resultsCount, setResultsCount] = useState([]); // Agregar estado para resultsCount

  return (
    <SearchContext.Provider
      value={{
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
