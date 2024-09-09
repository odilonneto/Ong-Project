import { useState, useEffect } from "react";
import api from "../api";
import "../styles/CreatePet.css"
import { useNavigate } from "react-router-dom";
import Header
 from "../components/header";
function PetForm({ pet }) {
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petVaccines, setPetVaccines] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petNeutered, setPetNeutered] = useState(true);
    const [petAvailable, setPetAvailable] = useState(true);
    const [petPhotos, setPetPhotos] = useState("");
    const navigate = useNavigate();
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
        api.post("/ongs/pets/", data)
        .then((res) => {
            if (res.status === 201) alert("Pet created!");
            else alert("Failed to make pet.");
        }).catch((err) => alert(err));
        navigate("/admin");

    }
    return (
        <div> <Header></Header>
        <div className="bodycreatepet">

    <form onSubmit={handleSubmit} className="pet-form">
    <h2 className="nomecabe">Cadastrar Pet</h2>
    <label htmlFor="pet-name">Pet name:</label>
    <input
        type="text"
        id="pet-name"
        name="pet-name"
        value={petName}
        required
        onChange={(e) => setPetName(e.target.value)}
        className="form-input"
    />

    <label htmlFor="pet-age">Age (months):</label>
    <input
        id="pet-age"
        name="pet-age"
        value={petAge}
        required
        onChange={(e) => setPetAge(e.target.value)}
        className="form-input"
    />

    <label htmlFor="pet-vaccines">Vaccines:</label>
    <input
        id="pet-vaccines"
        name="pet-vaccines"
        value={petVaccines}
        required
        onChange={(e) => setPetVaccines(e.target.value)}
        className="form-input"
    />

    <label>Size:</label>
    <select
        required
        value={petSize}
        onChange={(e) => setPetSize(e.target.value)}
        className="form-select"
    >
        <option value="P">P</option>
        <option value="M">M</option>
        <option value="G">G</option>
    </select>

    <label>Is neutered:</label>
    <select
        required
        value={petNeutered}
        onChange={(e) => setPetNeutered(e.target.value)}
        className="form-select"
    >
        <option value={true}>True</option>
        <option value={false}>False</option>
    </select>

    <label>Is available:</label>
    <select
        required
        value={petAvailable}
        onChange={(e) => setPetAvailable(e.target.value)}
        className="form-select"
    >
        <option value={true}>True</option>
        <option value={false}>False</option>
    </select>

    {pet == null ? (
        <div>
            <label>Add Image:</label>
            <input
                type="file"
                onChange={(e) => setPetPhotos(e.target.files[0])}
                className="form-input"
            />
        </div>
    ) : null}

    <input type="submit" value="Submit" className="form-button" />
</form>
</div>
        </div>
    );
}

export default PetForm;
