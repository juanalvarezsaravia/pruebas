import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [language, setLanguage] = useState('');
    const [sortBy, setSortBy] = useState('');

    return (
        <SearchContext.Provider value={{ results, setResults, language, setLanguage, sortBy, setSortBy }}>
            {children}
        </SearchContext.Provider>
    );
};

