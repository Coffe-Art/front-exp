import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Función para decodificar JWT
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    const [notification, setNotification] = useState('');

    const login = async (tipoUsuario, correo_electronico, contrasena) => {
        try {
            const response = await fetch('https://backtesteo.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipoUsuario, correo_electronico, contrasena })
            });

            const data = await response.json();
            console.log('Server response:', data);

            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);

                const decodedToken = decodeToken(data.token);
                if (decodedToken) {
                    setUserId(decodedToken.id);
                    setUserType(decodedToken.tipoUsuario);
                    localStorage.setItem('userId', decodedToken.id);
                    localStorage.setItem('userType', decodedToken.tipoUsuario);
                    setNotification('Inicio de sesión exitoso');
                    return { success: true };
                } else {
                    throw new Error('Error decoding token');
                }
            } else {
                throw new Error(data.error || data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            setNotification(error.message);
            return { success: false, error: error.message };
        }
    };

    const register = async (tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia) => {
        try {
            const response = await fetch('https://backtesteo.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Usuario registrado con éxito');
                return { success: true };
            } else {
                throw new Error(data.error || data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al intentar registrar el usuario:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setUserId(null);
        setUserType(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        setNotification('Has cerrado sesión exitosamente');
    };

    useEffect(() => {
        // Recuperar el token y el id del usuario del local storage al iniciar la aplicación
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);

            // Decodificar el token y almacenar el id del usuario
            const decodedToken = decodeToken(storedToken);
            if (decodedToken) {
                setUserId(decodedToken.id);
                setUserType(decodedToken.tipoUsuario);
                localStorage.setItem('userId', decodedToken.id);
                localStorage.setItem('userType', decodedToken.tipoUsuario);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, userId, userType, login, register, logout, notification }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
