import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { AuthContext } from '../context/AuthUser';

export default function AuthenticatedRoute({ component: Component, ...rest }) {
	const { isAuthenticated, isLoading } = useContext(AuthContext);

	if (isLoading)
		return (
			<div>
				<CircularProgress />
			</div>
		);

	return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}
