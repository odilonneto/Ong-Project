import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import "../styles/Pet.css"; // Importando o CSS para manter o estilo

function PetList() {
    const { ongId } = useParams();
    const [pets, setPets] = useState([]);
    const [ongName, setOngName] = useState(''); // Estado para armazenar o nome da ONG

    useEffect(() => {
        if (ongId) {
            // Busca os pets relacionados à ONG
            api.get(`/api/pets/ong/${ongId}/`)
                .then(response => response.data)
                .then(data => {
                    setPets(data);
                    if (data.length > 0) {
                        setOngName(data[0].ong_name); // Assume que o nome da ONG está nos dados dos pets
                    }
                })
                .catch(err => alert(err));
        }
    }, [ongId]);
    
    return (
        <div>
            <h1>A{ongName}</h1> {/* Exibe o nome da ONG */}
            <h3>Pets disponíveis para adoção:</h3>
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
        </div>
    );
}

export default PetList;
