import React, { useState } from "react";
import PetForm from "./PetForm";
import "../styles/Pet.css";

function Pet({ pet, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (bodyFormData) => {
        onEdit(pet.id, bodyFormData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmation = window.confirm("Tem certeza de que deseja excluir este pet?");
        if (confirmation) {
            onDelete(pet.id);
        }
    };

    return (
        <div className={`pet-container ${!pet.is_pet_available ? 'adopted' : ''}`}>
          {!pet.is_pet_available && (
            <div className="adopted-banner">Adotado</div>
          )}
          {isEditing ? (
            <PetForm onSubmit={handleSubmit} pet={pet} />
          ) : (
            <>
              <div>
                <p className="pet-name">{pet.pet_name}</p>
              </div>
              <div>
                <i className="fas fa-paw"></i>
              </div>
              <div className="pet-details">
                <p className="pet-content">Idade: {pet.pet_age} meses</p>
                <p className="pet-vaccines">Vacinas: {pet.pet_vaccines}</p>
                <p className="pet-neutered">
                  Castrado: {pet.is_pet_neutered ? "Sim" : "Não"}
                </p>
                <p className="pet-availability">
                  Disponível para adoção: {pet.is_pet_available ? "Sim" : "Não"}
                </p>
              </div>
              <div>
                <img className="image1" src={pet.pet_photos} width="200" height="200" alt="Pet" />
              </div>
              <div>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
                <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            </>
          )}
        </div>
      );
}

export default Pet;
