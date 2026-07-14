import React from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { Navigate } from 'react-router-dom';

const Protection = ({ children, lvlAuth }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user || (lvlAuth && !lvlAuth.includes(user.nivel))) {
        console.log('El usuario no posee los permisos requeridos.');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default Protection;