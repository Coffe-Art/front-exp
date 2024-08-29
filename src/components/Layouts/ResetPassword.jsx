import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/EventsContext';

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Verifica si el token es válido aquí, si es necesario
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: 'Las contraseñas no coinciden' });
            return;
        }

        try {
            const result = await resetPassword(token, newPassword);
            if (result.success) {
                setNotification('Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...');
                setTimeout(() => navigate('/signin'), 2000);
            } else {
                setNotification(result.error || 'Error en el restablecimiento de la contraseña.');
            }
        } catch (error) {
            setNotification('Error en el restablecimiento de la contraseña.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <h1 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h1>
                {notification && (
                    <div className={`border px-4 py-3 rounded relative mb-4 ${notification.startsWith('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`} role="alert">
                        <span className="block sm:inline">{notification}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="newPassword">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline ${errors.newPassword ? 'border-red-500' : ''}`}
                            placeholder="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && <p className="text-red-500 text-xs italic">{errors.newPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Restablecer Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
