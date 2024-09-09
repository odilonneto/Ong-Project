import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import "../styles/PetList.css"; // Importando o CSS para manter o estilo

function PetList( {ong} ) { 
    const [pets, setPets] = useState([]);
    const navigate = useNavigate(); // Para navegação

    useEffect(() => {
        if (ong) {
            // Primeira requisição: busca os pets relacionados à ONG
            api.get(`ongs/${ong.id}/pets`)
                .then(response => response.data)
                .then(data => {
                    setPets(data);
                })
                .catch(err => alert(err));

        }
    }, [ong]);

    // Funções para navegação
    const handleHomeClick = () => navigate('/'); // Voltar para a Home Page
    const handleOngsClick = () => navigate('/ongs'); // Voltar para a página das ONGs

    return (
        <div className="PetBody">
            <div className="buttons-ped">
            <div className="buttons-container1">
                    <button onClick={handleHomeClick}>Home</button>
                    <button onClick={handleOngsClick}>Voltar para ONGs</button>
            </div>
            </div>
            <div className="Upper">
            <h1 className="hnome">{ong.ong_name}</h1> {/* Exibe o nome da ONG */}
                {pets.length > 0 ? (<h4 className="hpets">Pets disponíveis para adoção:</h4>) : (<div className="no-pets-message">
                <h4 className="hpets">Esta ONG ainda não tem pets disponíveis para adoção.</h4>
            </div>)}
                
            </div>

                <ul className="pet-list">
                    {pets.map(pet => (
                        <li key={pet.id} className="pet-container">
                            <p className="pet-name">{pet.pet_name}</p>
                            <i className="fas fa-paw"></i>
                            <div className="pet-details">
                                <p className="pet-content">Idade: {pet.pet_age} meses</p>
                                <p className="pet-vaccines">Vacinas: {pet.pet_vaccines}</p>
                                <p className="pet-neutered">Castrado: {pet.is_pet_neutered ? "Sim" : "Não"}</p>
                            </div>
                            <img className="image1" src={`http://localhost:8000${pet.pet_photos}`} width="200" height="200" alt={pet.pet_name} />
                        </li>
                    ))}
                </ul>

            
            <footer className="footer">
                <h4 className="gostou">Gostou de algum Pet e deseja adotar? Entre em contato com nossa ONG!</h4>
                <p className="contato">Telefone: {ong.ong_phone_number}</p>
                <p className="email">email: {ong.ong_email}</p>
            </footer>
        </div>
    );
}

export default PetList;
