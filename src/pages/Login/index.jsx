import React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { login } from '../../api/auth';
import "./Login.css";

const Login = () => {

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: login,
        onSuccess: () => navigate('/'),
    });

    const handleChange = ({ target }) => {
        setFormState((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const onLoginButtonClick = () => {
        mutate(formState);
    };

    return (
        <>
            <div className='Login'>
                <h2>Acceso</h2>
                <div>
                    <TextField
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={formState.email}
                        required
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        value={formState.password}
                        required
                        fullWidth
                        type="password"
                        onChange={handleChange}
                    />

                    <Button onClick={onLoginButtonClick} disabled={isLoading} variant="contained" color="success">{isLoading ? 'Cargando...' : 'Iniciar Sesión'}</Button>
                </div>
                <Link to="/register">
                    <span >
                        Crea una cuenta
                    </span>
                </Link>
            </div>
        </>
    );
}

export default Login;
