import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Pet from "../components/Pet";
import PetForm from "../components/PetForm"
import "../styles/Home.css";

function Home() {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPets();
    }, []);

    const getPets = () => {
        api.get("/ongs/pets/list")
            .then((res) => res.data)
            .then((data) => setPets(data))
            .catch((err) => alert(err));
    };

    const deletePet = (id) => {
        api.delete(`/ongs/pets/delete/${id}`)
            .then((res) => {
                if (res.status === 204) alert("Pet deleted!");
                else alert("Failed to delete pet.");
                getPets();
            })
            .catch((error) => alert(error));
    };

    const editPet = (id, bodyFormData) => {
        api.patch(`/ongs/pets/update/${id}`, bodyFormData)
            .then((res) => {
                if (res.status == 200) alert("Pet updated!");
                else alert("Failed to update pet.");
                getPets();
            })
            .catch((error) => alert(error));
    };

    const createPet = (bodyFormData) => {
        api.post("/ongs/pets/", bodyFormData)
        .then((res) => {
            if (res.status === 201) {
                alert("Pet created!");
            } else {
                alert("Failed to make pet.");
            }
            getPets();
        })
        .catch((err) => alert(err));
    }

    return (
        <div>
            <div>
                <h2>Pets</h2>
                {pets.map((pet) => (
                    <Pet pet={pet} onDelete={deletePet} onEdit={editPet} key={pet.id} />
                ))}
            </div>
            <h2>Create a Pet</h2>
            <PetForm onPetCreated={getPets} onSubmit={createPet} /> {/* Novo componente de formulário */}
        </div>
    );
}

export default Home;
