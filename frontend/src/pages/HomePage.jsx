import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Arquivo CSS para estilização


import logo from "../assets/logo.png"; 
import userImage from "../assets/user.png"; // Imagem padrão de usuário
import ongImage from "../assets/ong.png"; // Imagem padrão de ONG

function HomePage() {
    const navigate = useNavigate(); // Para redirecionar ao clicar nos botões

    const handleUserClick = () => {
        navigate("/ongs"); // Redireciona para a página de adoção
    };

    const handleOngClick = () => {
        navigate("/login"); // Redireciona para a página de login de ONG
    };

    return (
        <div className="home-container">
             <div className="center-column">
                {/* Logo centralizado */}
                <img src={logo} alt="Logo" className="logo" />

                {/* Imagens redondas */}
                <div className="images-container">
                    <div className="image-wrapper">
                        <img src={userImage} alt="Usuário" className="round-image" />
                    </div>
                    <div className="image-wrapper">
                        <img src={ongImage} alt="ONG" className="round-image" />
                    </div>
                </div>

                {/* Botões */}
                <div className="buttons-container">
                    <button className="home-button" onClick={handleUserClick}>
                        Sou usuário, quero adotar
                    </button>
                    <button className="home-button" onClick={handleOngClick}>
                        Sou ONG, quero administrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
