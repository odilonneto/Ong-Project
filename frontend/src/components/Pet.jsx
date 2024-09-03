import React from "react";
import "../styles/Pet.css"

function Pet({ pet, onDelete }) {
    return (
        <div className="pet-container">
            <p className="pet-name">{pet.pet_name}</p>
            <p className="pet-content">{pet.pet_age}</p>
            <button className="delete-button" onClick={() => onDelete(pet.id)}>
                Delete
            </button>
        </div>
    );
}

export default Pet