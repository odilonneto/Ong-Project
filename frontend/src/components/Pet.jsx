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
        <div className="pet-container">
            {isEditing ? (
                <PetForm onSubmit={handleSubmit} pet={pet} />
            ) : (
                <>
                    <p className="pet-name">{pet.pet_name}</p>
                    <i className="fas fa-paw"></i>
                    <div className="pet-details">
                        <p className="pet-content">
                            Idade: {pet.pet_age} meses
                        </p>
                        <p className="pet-vaccines">
                            Vacinas: {pet.pet_vaccines}
                        </p>
                        <p className="pet-neutered">
                            Castrado: {pet.is_pet_neutered ? "Sim" : "Não"}
                        </p>
                    </div>

                    <img  className="image1" src={pet.pet_photos} width="200" height="200" alt="Pet" />
                    <button className="delete-button" onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </>
            )}
        </div>
    );
}

export default Pet;