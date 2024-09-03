// src/components/PetList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Certifique-se que está usando a instância correta de Axios ou API

function PetList({ ongId }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!ongId) {
      console.error('ONG ID is missing');
      return;
    }

    axios.get(`/api/pets/?ong=${ongId}`)
      .then(response => setPets(response.data))
      .catch(error => {
        console.error('Erro ao buscar pets:', error);
      });
  }, [ongId]);

  return (
    <div>
      <h3>Pets disponíveis para adoção:</h3>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>
            <h4>{pet.pet_name}</h4>
            <p>Idade: {pet.pet_age} anos</p>
            <img src={pet.pet_photos} alt={pet.pet_name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
