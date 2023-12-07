import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1>Buscador GitHub</h1>

        </header>
    );
};

export default Header;