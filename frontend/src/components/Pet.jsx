import React from "react";
import "../styles/Pet.css"

function Pet({ pet, onDelete }) {
    return (
        <div className="pet-container">
            <p className="pet-name">{note.title}</p>
            <p className="pet-content">{note.content}</p>
            <button className="delete-button" onClick={() => onDelete(pet.id)}>
                Delete
            </button>
        </div>
    );
}

export default Pet