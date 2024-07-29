import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Artesanías.png';
import BackgroundImage from '../../assets/FondoMenu.png';
import Background from '../../assets/Fondo.png';

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const initialQuestions = [
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos tarjetas de crédito y débito, transferencias bancarias y pagos en efectivo en tienda.',
  },
  {
    question: '¿Cuánto tiempo tarda en llegar mi pedido?',
    answer: 'El tiempo de entrega depende de tu ubicación y del método de envío seleccionado. Normalmente, los pedidos son entregados en 3-5 días hábiles.',
  },
  {
    question: '¿Cómo puedo cambiar mi dirección de envío?',
    answer: 'Puedes cambiar tu dirección de envío en la sección de perfil de usuario o contactando a nuestro servicio al cliente.',
  },
];

const mockContextualAnswers = {
  'envio': 'Nuestros envíos son rápidos y confiables, y ofrecemos varias opciones para adaptarnos a tus necesidades.',
  'pago': 'Aceptamos múltiples métodos de pago, incluyendo tarjetas y transferencias.',
  'devoluciones': 'Las devoluciones se pueden realizar dentro de los 30 días posteriores a la compra.',
};

export const Help = () => {
  const navigate = useNavigate();
  const [userQuestion, setUserQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(initialQuestions);
  const [contextualAnswer, setContextualAnswer] = useState('');

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/#');
  };

  const handleLoginClick = () => {
    navigate('/#');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const normalizedQuery = removeAccents(searchQuery).toLowerCase();
    const filtered = initialQuestions.filter(q => 
      removeAccents(q.question).toLowerCase().includes(normalizedQuery)
    );
    setFilteredQuestions(filtered);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const normalizedQuestion = removeAccents(userQuestion).toLowerCase();
    const answer = Object.keys(mockContextualAnswers).find(keyword =>
      normalizedQuestion.includes(removeAccents(keyword))
    );

    if (answer) {
      setContextualAnswer(mockContextualAnswers[answer]);
    } else {
      setContextualAnswer('No tenemos una respuesta para tu pregunta en este momento. Por favor, contacta a nuestro soporte.');
    }
    setUserQuestion('');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div
        className="md:w-1/5 lg:w-1/6 bg-cover bg-center p-4 text-white flex justify-center items-center"
        style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex flex-col items-center">
          <a href="/#" onClick={handleLogoClick} className="mb-6">
            <img src={Logo} alt="Logo" className="h-32 w-32" />
          </a>
          <nav className="flex flex-col items-center space-y-6">
            <NavLink to="/menu" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Menú</NavLink>
            <NavLink to="/profile" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Perfil</NavLink>
            <NavLink to="/product" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Producto</NavLink>
            <NavLink to="/help" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Ayuda</NavLink>
            <button
              className="bg-darkyellow text-white px-4 py-2 rounded hover:bg-lightyellow mt-4 text-lg font-bold"
              onClick={handleLoginClick}
            >
              Regresar
            </button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:w-4/5 lg:w-5/6">
        <div className="w-full h-full flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-col items-center justify-center text-center p-8 bg-white bg-opacity-70 rounded-lg max-w-lg mx-auto md:max-w-2xl w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Ayuda y Preguntas Frecuentes</h1>
            
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-8 w-full max-w-lg">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ml-2 bg-darkyellow text-white px-4 py-2 rounded hover:bg-lightyellow text-xl font-bold"
              >
                Buscar
              </button>
            </form>
            
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <div key={index} className="mb-6 w-full max-w-lg">
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">{q.question}</h2>
                  <p className="text-lg text-gray-700">{q.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-700 mb-6">Pregunta no encontrada. Puedes hacer una pregunta enviándonos un mensaje a través del formulario de contacto o directamente en la sección de soporte.</p>
            )}
            
            <form onSubmit={handleQuestionSubmit} className="w-full max-w-lg">
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Escribe tu pregunta aquí..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-darkyellow text-white px-4 py-2 rounded hover:bg-lightyellow mt-4 text-xl font-bold"
              >
                Enviar Pregunta
              </button>
            </form>
            
            {contextualAnswer && (
              <div className="mt-8 w-full max-w-lg text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Respuesta:</h2>
                <p className="text-lg text-gray-700">{contextualAnswer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
