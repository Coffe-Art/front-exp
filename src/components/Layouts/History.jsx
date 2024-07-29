import React, { useState } from 'react';
import person1 from '../../assets/Hanna.jpg';
import person2 from '../../assets/Saject.jpg';
import person3 from '../../assets/Erick.jpg';
import Mallihands from '../../assets/Mallihands.jpg';
import Rumans from '../../assets/Rumans.jpg';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavLink } from 'react-router-dom';

const people = [
    {
        id: 1,
        name: 'Hanna',
        photo: person1,
        description: 'Hanna is an experienced entrepreneur with a strong background in technology and innovation.',
        companies: [
            { name: 'Tech Innovations', image: Mallihands, description: 'A leading company in technology innovations.' },
            { name: 'Future Ventures', image: Rumans, description: 'Investing in the future of technology and business.' }
        ]
    },
    {
        id: 2,
        name: 'Saject',
        photo: person2,
        description: 'Saject is a visionary leader known for his work in sustainable development and green technologies.',
        companies: [
            { name: 'Green Solutions', image: Mallihands, description: 'Pioneering green technologies for a sustainable future.' },
            { name: 'Eco Projects', image: Rumans, description: 'Projects focused on environmental sustainability.' }
        ]
    },
    {
        id: 3,
        name: 'Erick',
        photo: person3,
        description: 'Erick has a diverse portfolio with expertise in finance and business strategy.',
        companies: [
            { name: 'Finance Group', image: Mallihands, description: 'Experts in financial planning and management.' },
            { name: 'Strategic Growth', image: Rumans, description: 'Helping businesses grow with strategic planning.' }
        ]
    }
];

export const History = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setSelectedCompany(null); // Reset selected company when selecting a person
    };

    const handleCompanyClick = (company) => {
        setSelectedCompany(company);
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
                    selectedCompany ? (
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                            <button onClick={handleBackClick} className="text-darkyellow text-lg mb-4">
                                &larr; Back
                            </button>
                            <h1 className="text-3xl font-bold mb-4">{selectedCompany.name}</h1>
                            <img src={selectedCompany.image} alt={selectedCompany.name} className="w-32 h-32 rounded-full mb-4 mx-auto" />
                            <p className="text-lg mb-4">{selectedCompany.description}</p>
                            <p className="text-blue-500 hover:underline">
                            <span className="text-black text-sm">¿Quieres saber más de esta empresa?</span>
                    <NavLink to="/Companies" className="text-darkyellow hover:underline text-sm ml-2">
                        Ver Empresa
                    </NavLink>
                            </p>
                            <button onClick={() => setSelectedCompany(null)} className="text-darkyellow text-lg mt-4">
                                &larr; Back to Person
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                            <button onClick={handleBackClick} className="text-darkyellow text-lg mb-4">
                                &larr; Back
                            </button>
                            <h1 className="text-3xl font-bold mb-4">{selectedPerson.name}</h1>
                            <img src={selectedPerson.photo} alt={selectedPerson.name} className="w-32 h-32 rounded-full mb-4 mx-auto" />
                            <p className="text-lg mb-4">{selectedPerson.description}</p>
                            <h2 className="text-2xl font-semibold mb-4">Companies:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPerson.companies.map((company, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                        onClick={() => handleCompanyClick(company)}
                                    >
                                        <img src={company.image} alt={company.name} className="w-16 h-16 rounded-full mr-4" />
                                        <div>
                                            <h3 className="text-lg font-medium">{company.name}</h3>
                                            <p className="text-gray-700">{company.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
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

