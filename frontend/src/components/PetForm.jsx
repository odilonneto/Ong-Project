import { useState, useEffect } from "react";
import api from "../api";

function PetForm({ onSubmit, pet }) {
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petVaccines, setPetVaccines] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petNeutered, setPetNeutered] = useState("");
    const [petAvailable, setPetAvailable] = useState("");
    const [petPhotos, setPetPhotos] = useState("");

    useEffect(() => {
        if (pet != null){
        setPetName(pet.pet_name);
        setPetAge(pet.pet_age);
        setPetVaccines(pet.pet_vaccines);
        setPetAvailable(pet.is_pet_available);
        setPetSize(pet.pet_size);
        setPetNeutered(pet.is_pet_neutered);
    }
}, [pet])

    const createFormData = () => {
        var bodyFormData = new FormData();
        bodyFormData.append('pet_name', petName);
        bodyFormData.append('pet_age', petAge);
        bodyFormData.append('is_pet_available', petAvailable);
        bodyFormData.append('is_pet_neutered', petNeutered);
        bodyFormData.append('pet_size', petSize);
        bodyFormData.append('pet_vaccines', petVaccines);
        if (pet == null){
            bodyFormData.append('pet_photos', petPhotos);
        }
        return bodyFormData
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = createFormData();
        onSubmit(data);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="pet name">Pet name:</label>
            <br></br>
            <input
                type="text"
                id="pet name"
                name="pet name"
                value={petName}
                required
                onChange={(e) => setPetName(e.target.value)}>
            </input>

            <label htmlFor="pet age">Age:</label>
            <br />
            <input id="pet age" name="pet age" value={petAge} required onChange={(e) => setPetAge(e.target.value)}></input>
            <br />

            <label htmlFor="pet vaccines">Vaccines:</label>
            <br />
            <input id="pet vaccines" name="pet vaccines" value={petVaccines} required onChange={(e) => setPetVaccines(e.target.value)}></input>
            <br />

            <label>
                Size:
                <select required value={petSize} onChange={(e) => setPetSize(e.target.value)}>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                </select>
            </label>
            <br></br>

            <label>
                Is neutered:
                <select required value={petNeutered} onChange={(e) => setPetNeutered(e.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </label>
            <br></br>

            <label>
                Is available:
                <select required value={petAvailable} onChange={(e) => setPetAvailable(e.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </label>
            <br></br>

            {pet == null ? (
            <div>
                <label>Add Image:</label>
                <input type="file" onChange={(e) => setPetPhotos(e.target.files[0])} />  
            </div>
        ) : null} {/* Corrige a condicional para não entrar em loop */}

            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default PetForm;
