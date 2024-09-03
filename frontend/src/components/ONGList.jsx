// src/components/ONGList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Ajuste o caminho para onde está o seu arquivo de configuração do Axios

function ONGList() {
  const [ongs, setOngs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOngs();
  }, []);

  const getOngs = () => {
    api.get('/ongs/all_ongs') // Verifique se este endpoint está correto
      .then(response => setOngs(response.data))
      .catch(err => alert(err));
  };

  const handleOngClick = (id) => {
    if (!id) {
      console.error("ONG ID is undefined"); // Log para depuração
      return;
    }
    navigate(`/ong/${id}/pets`);
  };

  return (
    <div>
      <h1>ONGs</h1>
      {ongs.map((ong) => (
        <div
          key={ong.id}
          onClick={() => handleOngClick(ong.id)}
          style={{ cursor: 'pointer' }}
        >
          <h2>{ong.ong_name}</h2>
        </div>
      ))}
    </div>
  );
}

export default ONGList;
