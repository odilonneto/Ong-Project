// src/components/ONGList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ONGList() {
    const [ongs, setOngs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOngs();
    }, []);

    const getOngs = () => {
        api.get('/api/pets/all_ongs')
            .then(response => response.data)
            .then(data => setOngs(data))
            .catch(err => alert(err));
    };

    const handleOngClick = (ongId) => {
        navigate(`/pets/${ongId}`);
    };

    return (
        <div>
            <h1>ONGs</h1>
            {ongs.map(ong => (
                <div 
                    key={ong.id} 
                    className="ong-item"
                    onClick={() => handleOngClick(ong.id)}
                >
                    <h2>{ong.ong_name}</h2>
                </div>
            ))}
        </div>
    );
}

export default ONGList;
