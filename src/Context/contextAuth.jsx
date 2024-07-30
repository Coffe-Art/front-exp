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

    const login = async (tipoUsuario, correo_electronico, contrasena) => {
        try {
            const response = await fetch('https://backexperimental.onrender.com/api/auth/login', {
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
                    localStorage.setItem('userId', decodedToken.id);
                }
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
        }
    };

    const register = async (tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal) => {
        try {
            const response = await fetch('https://backexperimental.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal })
            });

            if (response.ok) {
                console.log('Usuario registrado con éxito');
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al intentar registrar el usuario:', error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
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
                localStorage.setItem('userId', decodedToken.id);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, userId, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
