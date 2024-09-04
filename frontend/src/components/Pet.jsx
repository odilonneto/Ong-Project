import React from "react";
import PetForm from "./PetForm";
import { useState } from "react";
import "../styles/Pet.css"

function Pet({ pet, onDelete, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);


    const handleSubmit = (bodyFormData) => {
        onEdit(pet.id, bodyFormData);
        setIsEditing(false);
    };

    return (
        <div className="pet-container">
            {isEditing ? (
                <PetForm onSubmit={handleSubmit}></PetForm>
            ) : (
                <>
                    <p className="pet-name">{pet.pet_name}</p>
                    <p className="pet-content">{pet.pet_age}</p>
                    <img src={pet.pet_photos} width="200" height="200" alt="Pet" />
                    <button className="delete-button" onClick={() => onDelete(pet.id)}>
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