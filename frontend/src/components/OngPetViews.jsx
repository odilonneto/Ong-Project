/*

import React, { useEffect, useState } from 'react';
import api from '../api';

function ONGList() {
    const [ongs, setOngs] = useState([]);

    useEffect(() => {
        getOngs();
    }, []);

    const getOngs = () => {
        api.get('/ongs/all_ongs') // O endpoint que retorna as ONGs
            .then(response => response.data)
            .then(data => setOngs(data))
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h1>ONGs</h1>
            {ongs.map(ong => (
                <div key={ong.id}>
                    <h2>{ong.ong_name}</h2>
                </div>
            ))}
        </div>
    );
}

function PetList({ ongId }) {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch(`/api/pets/?ong=${ongId}`) // O endpoint que retorna os pets de uma ONG específica
            .then(response => response.json())
            .then(data => setPets(data));
    }, [ongId]);

    return (
        <div>
            <h3>Pets disponíveis para adoção:</h3>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <h4>{pet.pet_name}</h4>
                        <p>Idade: {pet.pet_age} anos</p>
                        <p>Tamanho: {pet.pet_size}</p>
                        <p>Vacinas: {pet.pet_vaccines}</p>
                        <p>{pet.is_pet_neutered ? "Castrado" : "Não castrado"}</p>
                        <img src={pet.pet_photos} alt={pet.pet_name} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ONGList;

*/

// src/pages/ONGPetsPage.jsx
// src/components/ONGPetsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PetList from './PetList';

function ONGPetsPage() {
  const { ong_id } = useParams(); // Certifique-se de capturar o nome correto

  if (!ong_id) {
    console.error('ONG ID is undefined');
    return <p>Erro ao capturar o ID da ONG.</p>;
  }

  return (
    <div>
      <h1>Pets da ONG</h1>
      <PetList ongId={ong_id} />
    </div>
  );
}

export default ONGPetsPage;
