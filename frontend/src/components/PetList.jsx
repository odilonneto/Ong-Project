import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function PetList() {
    const { ongId } = useParams(); 
    const [pets, setPets] = useState([]);

    useEffect(() => {
        console.log('Fetching pets for ONG ID:', ongId); 
        if (ongId) {
            api.get(`/api/pets/ong/${ongId}/`)
                .then(response => response.data)
                .then(data => setPets(data))
                .catch(err => alert(err));
        }
    }, [ongId]);

    return (
        <div>
            <h3>Pets disponíveis para adoção:</h3>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <h4>{pet.pet_name}</h4>
                        <p>Idade: {pet.pet_age} meses</p>
                        <p>Tamanho: {pet.pet_size}</p>
                        <p>Vacinas: {pet.pet_vaccines}</p>
                        <p>{pet.is_pet_neutered ? "Castrado" : "Não castrado"}</p>
                        <img src={pet.pet_photos} width="200" height="200" alt={pet.pet_name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PetList;
