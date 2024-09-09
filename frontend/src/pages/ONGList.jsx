import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import "../styles/ONGList.css";

function ONGList() {
    const [ongs, setOngs] = useState([]);
    const [currentIcon, setCurrentIcon] = useState('fas fa-home'); // Ícone inicial
    const navigate = useNavigate();

    // Lista de ícones
    const icons = [
        'fas fa-home',
        'fas fa-cat',
        'fas fa-dog',
        'fas fa-shield-alt',
        'fas fa-paw'
    ];

    useEffect(() => {
        getOngs();
        
        // Função que altera o ícone aleatoriamente a cada 1 segundo (1000ms)
        const intervalId = setInterval(() => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            setCurrentIcon(randomIcon);
        }, 1000); // Troca o ícone a cada 1000 milissegundos (1 segundo)

        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmonta
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

    const handleHomeClick = () => navigate('/'); // Voltar para a Home Page

    return (
        <div className='bodyhome'>
            <div className="buttons-ped">
                <div className="buttons-container1">
                    <button onClick={handleHomeClick}>Home</button>
                </div>
            </div>
            <div className="Upper">
                <h1 className="hpets">ONGs</h1>
            </div>
            <div className="ong-list-container">
                {ongs.map(ong => (
                    <div 
                        key={ong.id} 
                        className="ong-item-container"
                        onClick={() => handleOngClick(ong.id)}
                    >
                        <div className="ong-item">
                            <h2>
                                {ong.ong_name}
                                <i className={currentIcon + " ong-icon"}></i>
                            </h2>
                            <p><strong>Email:</strong> {ong.ong_email}</p>
                            <p><strong>Telefone:</strong> {ong.ong_phone_number}</p>
                            <p><strong>Endereço:</strong> {ong.ong_address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ONGList;
