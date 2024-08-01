import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (tipoUsuario, correo_electronico, contrasena) => {
        try {
            const response = await fetch('https://backexperimental.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipoUsuario, correo_electronico, contrasena })
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                // Aquí puedes añadir lógica para obtener información del usuario con el token si es necesario
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
        }
    };

    const register = async (tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal) => {
        try {
            const response = await fetch('https://backexperimental.onrender.com/register', {
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
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
