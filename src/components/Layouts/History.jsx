import React, { useState } from 'react';
import person1 from '../../assets/Hanna.jpg';
import person2 from '../../assets/Saject.jpg';
import person3 from '../../assets/Erick.jpg';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Importa el ícono

const people = [
    {
        id: 1,
        name: 'Hanna',
        photo: person1,
        description: 'Hanna is an experienced entrepreneur with a strong background in technology and innovation.',
        companies: [
            { name: 'Tech Innovations', address: '123 Tech Lane' },
            { name: 'Future Ventures', address: '456 Future Road' }
        ]
    },
    {
        id: 2,
        name: 'Saject',
        photo: person2,
        description: 'Saject is a visionary leader known for his work in sustainable development and green technologies.',
        companies: [
            { name: 'Green Solutions', address: '789 Green Blvd' },
            { name: 'Eco Projects', address: '101 Eco Avenue' }
        ]
    },
    {
        id: 3,
        name: 'Erick',
        photo: person3,
        description: 'Erick has a diverse portfolio with expertise in finance and business strategy.',
        companies: [
            { name: 'Finance Group', address: '202 Finance St' },
            { name: 'Strategic Growth', address: '303 Growth Way' }
        ]
    }
];

export const History = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setSelectedCompany(null); // Reset selected company when selecting a person
    };

    const handleBackClick = () => {
        setSelectedPerson(null);
        setSelectedCompany(null);
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-200 p-4">
                {selectedPerson ? (
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                        <button 
                            onClick={handleBackClick} 
                            className="absolute top-4 left-4 text-darkyellow text-lg"
                        >
                            <FaHome className="text-2xl" />
                        </button>
                        <div className="pt-10 text-center">
                            <h1 className="text-3xl font-bold mb-4">{selectedPerson.name}</h1>
                            <img src={selectedPerson.photo} alt={selectedPerson.name} className="w-32 h-32 rounded-full mb-4 mx-auto" />
                            <p className="text-lg mb-4">{selectedPerson.description}</p>
                            <h2 className="text-2xl font-semibold mb-4">Companies:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPerson.companies.map((company, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <h3 className="text-lg font-medium">{company.name}</h3>
                                        <p className="text-gray-700">{company.address}</p>
                                        <NavLink to="/Companies" className="text-darkyellow hover:underline text-sm mt-2">
                                            Ver más sobre esta empresa
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {people.map(person => (
                            <div
                                key={person.id}
                                className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                onClick={() => handlePersonClick(person)}
                            >
                                <img src={person.photo} alt={person.name} className="w-24 h-24 rounded-full mr-4" />
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
                                    <p className="text-gray-700">{person.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="fixed bottom-4 right-4">
                    <div className="relative">
                        <button
                            className="bg-darkpurple text-white p-3 rounded-full shadow-md"
                            onClick={() => navigate('/craft')}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8l1.1 5H19m-7-5a2 2 0 100 4 2 2 0 000-4zm-5 2a2 2 0 100 4 2 2 0 000-4z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
