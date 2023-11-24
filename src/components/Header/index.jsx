import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1>Buscador GitHub</h1>
            <nav>
                <Button onClick={() => navigate('/login')}> Iniciar sesion</Button>
                <Button onClick={() => navigate('/signUp')}> Registrarse</Button>
            </nav>
        </header>
    );
};

export default Header;