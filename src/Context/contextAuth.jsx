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
            const response = await fetch('https://checkpoint-9tp4.onrender.com/api/auth/login', {
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

    const register = async (tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador) => {
        try {
            // Verificar si el usuario ya existe antes de registrar
            const userExists = await checkIfUserExists(correo_electronico, tipoUsuario);
            console.log('User exists:', userExists); // Añadir esta línea para depuración
            if (userExists) {
                setNotification('El correo electrónico ya está en uso');
                return { success: false, error: 'El correo electrónico ya está en uso' };
            }
    
            // Log de los datos enviados
            console.log('Datos enviados:', { tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador });
    
            const response = await fetch('https://checkpoint-9tp4.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipoUsuario: tipoUsuario.toLowerCase(),
                    nombre: nombre,
                    contrasena: contrasena,
                    correo_electronico: correo_electronico,
                    telefono: telefono
                })
            });
    
            const data = await response.json();
            console.log('Server response:', data); // Añadir esta línea para depuración
    
            if (response.ok) {
                console.log('Usuario registrado con éxito');
                setNotification('Registro exitoso');
                return { success: true };
            } else {
                throw new Error(data.error || data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al intentar registrar el usuario:', error);
            setNotification(error.message);
            return { success: false, error: error.message };
        }
    };

    const checkIfUserExists = async (correo_electronico, tipoUsuario) => {
        try {
            const response = await fetch('https://checkpoint-9tp4.onrender.com/api/auth/checkIfUserExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo_electronico, tipoUsuario })
            });

            const data = await response.json();

            if (response.ok) {
                return data.exists; // Asegúrate de que la respuesta tenga esta propiedad
            } else {
                throw new Error(data.error || data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al verificar si el usuario existe:', error);
            return false;
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
