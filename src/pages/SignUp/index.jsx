import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { TextField, Button } from '@mui/material';

import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./SignUp.css";

const SignUp = () => {
	const [formState, setFormState] = useState({
		email: '',
		name: '',
		password: '',
	});

	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation({
		mutationFn: register,
		onSuccess: () => navigate('/'),
	});

	const handleChange = ({ target }) => {
		setFormState((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onRegisterButtonClick = () => {
		mutate(formState);
	};

	return (
		<div className='SignUp'>
			<h2>Registro</h2>
			<TextField
				label="Nombre"
				name="name"
				type="text"
				value={formState.name}
				required
				fullWidth
				onChange={handleChange}
			/>
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

			<Button
				onClick={onRegisterButtonClick}
				disabled={isLoading}
				variant="contained"
				fullWidth
			>
				{isLoading ? 'Cargando...' : 'Crear cuenta'}
			</Button>

			<Link to="/login">
				<span>
					Iniciar sesión
				</span>
			</Link>

		</div>
	)
}

export default SignUp;