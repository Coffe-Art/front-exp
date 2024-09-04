import React, { useEffect, useState, useContext } from 'react';
import { useEmpresa } from '../../../Context/contextEmpresa';
import ProductoContext from '../../../Context/contextProducto';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import banner from '../../../assets/FondoEmpresas.png'; 
import { FaCoffee } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


export const CompaniesComprador = () => {
    const { empresas, setEmpresas } = useEmpresa();
    const { getProductosByCodigoEmpresa } = useContext(ProductoContext);
    const navigate = useNavigate();
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [error, setError] = useState('');
    const [loadingMessage, setLoadingMessage] = useState(''); // Estado para el mensaje de carga

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            // Aquí no se usa token de autenticación
            const response = await fetch('https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresas');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                console.log('Datos recibidos del servidor:', data);

                if (Array.isArray(data[0])) {
                    setEmpresas(data[0]);
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } else {
                const text = await response.text();
                console.error('Respuesta no es JSON:', text);
                throw new Error('Respuesta no es JSON');
            }
        } catch (error) {
            console.error('Error al obtener empresas:', error.message);
        }
    };

    const viewEmpresa = async (codigoempresa) => {
        if (!codigoempresa) {
            console.error('codigoempresa no está definido');
            return;
        }

        try {
            setLoadingMessage(`Obteniendo datos de la empresa con código: ${codigoempresa}`); // Establece el mensaje de carga

            // Aquí no se usa token de autenticación
            const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresaAdmin/${codigoempresa}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const empresaData = await response.json();
            console.log('Datos de la empresa:', empresaData); 

            // Asegúrate de extraer correctamente los datos relevantes de la empresa
            if (Array.isArray(empresaData) && empresaData.length > 0) {
                const empresa = empresaData[0][0]; // Accede al primer objeto en el primer array
                setSelectedEmpresa(empresa);
            } else {
                console.error('Estructura de datos inesperada');
            }

            setLoadingMessage(''); // Limpia el mensaje de carga después de obtener los datos

        } catch (error) {
            console.error('Error al obtener la información de la empresa:', error.message);
            setLoadingMessage(''); // Limpia el mensaje de carga en caso de error
        }
    };

    const closeEmpresaModal = () => {
        setSelectedEmpresa(null);
        setLoadingMessage(''); 
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="flex flex-col">
                    <div className="flex flex-col items-center justify-center text-justify p4">
                        <div className='flex flex-row'>
                        <br /> <p className=' text-darkyellow md:text-4xl font-bold mt-5'>¡Bienvenido a empresas!</p> <br /><br />
                        </div>
                        <span className="text-black text-sm text-center mt-7 px-96 md:text-lg">
                        En esta sección, podrás explorar todas las empresas registradas en la aplicación. No solo podrás ver la información básica de cada empresa, sino que también tendrás acceso a una lista completa de los productos que están vinculados a ellas. Esto te permitirá tener una visión clara y completa de todo lo que ocurre en la plataforma.
                        <br /><br />
    ¡Le deseamos un excelente y productivo día!
    <br /><br />
</span>
                    </div>
                </div>
            <div className="container mx-auto my-8 flex-grow grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {empresas.length === 0 ? (
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                        <div className="flex flex-col items-center">
                            <span className="text-black text-sm text-center">No hay empresas para mostrar</span>
                        </div>
                    </div>
                ) : (
                    empresas.map((empresa) => (
                        <div
                            key={empresa.codigoempresa}
                            className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
                            onClick={() => viewEmpresa(empresa.codigoempresa)}
                        >
                        <div className='flex flex-row'>
                        <svg className="w-6 h-6 mr-2 text-2xl text-darkyellow"><FaCoffee /></svg>
                        <br /> <br/> 
                        <p className=' text-darkyellow'>{empresa.nombre}</p> <br /><br />
                        </div>
                        <hr className='w-52 h-1 my-3 bg-darkyellow opacity-50 border-0 '/>
                        <br/> <br/> 
                        <p className="text-center text-gray-600 mb-4">{empresa.direccion}</p>
                        <br/> <br/> 
                        <p className="text-center line-clamp-5 mb-5">{empresa.descripcion}</p>
                        <br/> 
                        <p className="text-center text-gray-600">ID: {empresa.codigoempresa}</p>
                        
                            
                        </div>
                       
                    ))
                )}
            </div>
            {(selectedEmpresa || loadingMessage) && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <div className="relative w-full h-40 bg-gray-300 rounded-t-lg overflow-hidden">
                <img
                    src={banner}
                    alt="Banner de Empresa"
                    className="w-full h-full object-cover"
                />
            
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                    <h2 className="text-white md:text-3xl font-bold"> 
                        {selectedEmpresa ? selectedEmpresa.nombre_empresa : 'Cargando...'}
                    </h2>
                </div>
                
            </div>
            {loadingMessage && (
                <p className="text-center mb-4 text-darkyellow mt-2 ">{loadingMessage}</p>
            )}
            {selectedEmpresa && (
                <div className='flex flex-col '>
                    <p className="mb-4 mt-2"> <span className='font-bold'>ID de la Empresa: </span> {selectedEmpresa.codigoempresa}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Nombre de la Empresa: </span> {selectedEmpresa.nombre_empresa}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Descripción: </span> <br/>  {selectedEmpresa.descripcion}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Dirección: </span>  {selectedEmpresa.direccion}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Fecha de Creación: </span>{new Date(selectedEmpresa.fecha_creacion).toLocaleDateString()}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Teléfono: </span> {selectedEmpresa.telefono}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Correo Electrónico: </span> {selectedEmpresa.correo_electronico}</p>
                    <p className="mb-4 mt-2"><span  className='font-bold'>Nombre del Encargado:  </span>{selectedEmpresa.nombre_administrador}</p>
                    <NavLink
    to={`/CompaniesProducts/${selectedEmpresa.codigoempresa}`}
    className="bg-transparent text-darkyellow rounded text-lg font-semibold underline"
    activeClassName="font-bold"
>
    Ver productos  
</NavLink>
                    <div className="flex justify-between mt-5">
                    
<button
          onClick={closeEmpresaModal}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Cerrar
        </button>

</div>
                    
                </div>
            )}
        </div>
    </div>
)}

            <Footer />
        </div>
    );
};
