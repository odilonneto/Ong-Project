import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../constants';
import "../styles/PetList.css"; // Importando o CSS para manter o estilo

function PetList( {ong} ) { 
    const [pets, setPets] = useState([]);
    const navigate = useNavigate(); // Para navegação
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);


    const handleOpenReviewPopup = () => {
        setIsReviewPopupOpen(true);
    };

    const handleCloseReviewPopup = () => {
        setIsReviewPopupOpen(false);
    };

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem(ACCESS_TOKEN)
            const decoded = jwtDecode(token);
            const user_id = decoded["user_id"];
            try {
                await api.post("ongs/ratings/create", {
                    "ong_id": ong.id,
                    "user_id": user_id,
                    "rating": rating,
                    "comment": comment
                });

            } catch (error) {

                if (error.response && error.response.data) {
                    alert(`Erro: ${error.response.data.error}`);
                } else {
                    alert("Ocorreu um erro desconhecido.");
                }
            }
        }
        catch(error){
            alert("Faça login para continuar.")
            navigate("/login")
        }
        finally{
            setIsReviewPopupOpen(false);
        }
    };
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
                    <button onClick={handleOpenReviewPopup} className="review-button">Deixar uma Avaliação</button>

                    {isReviewPopupOpen && (
                        <div className="review-popup">
                            <div className="review-popup-content">
                                <h3>Deixe sua Avaliação</h3>
                                <form onSubmit={handleSubmitReview}>
                                    <textarea
                                        placeholder="Comentário"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={star <= rating ? "star selected" : "star"}
                                                onClick={() => handleStarClick(star)}
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </div>
                                    <div className="button-container">
                                        <button type="submit" className="submit-button">Enviar</button>
                                        <button type="button" onClick={handleCloseReviewPopup} className="cancel-button">Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="Upper">
                <h1 className="hnome">{ong.ong_name}</h1> {/* Exibe o nome da ONG */}
                {pets.length > 0 ? (
                    <h4 className="hpets">Pets disponíveis para adoção:</h4>
                ) : (
                    <div className="no-pets-message">
                        <h4 className="hpets">Esta ONG ainda não tem pets disponíveis para adoção.</h4>
                    </div>
                )}
            </div>

            <ul className="pet-list">
                {pets.map(pet => (
                    <li key={pet.id} className={`pet-container ${!pet.is_pet_available ? 'adopted' : ''}`}>
                        {!pet.is_pet_available && (
                            <div className="adopted-banner">Adotado</div>
                        )}
                        <p className="pet-name">{pet.pet_name}</p>
                        <i className="fas fa-paw"></i>
                        <div className="pet-details">
                            <p className="pet-content">Idade: {pet.pet_age} meses</p>
                            <p className="pet-vaccines">Vacinas: {pet.pet_vaccines}</p>
                            <p className="pet-neutered">Castrado: {pet.is_pet_neutered ? "Sim" : "Não"}</p>
                            <p className="pet-availability">Disponível para adoção: {pet.is_pet_available ? "Sim" : "Não"}</p>
                        </div>
                        <img className="image1" src={`http://localhost:8000${pet.pet_photos}`} width="200" height="200" alt={pet.pet_name} />
                    </li>
                ))}
            </ul>

            <footer className="footer">
                <h4 className="gostou">Gostou de algum Pet e deseja adotar? Entre em contato com nossa ONG!</h4>
                <p className="contato">Telefone: {ong.ong_phone_number}</p>
                <p className="email">Email: {ong.ong_email}</p>
            </footer>
        </div>
    );
}

export default PetList;
