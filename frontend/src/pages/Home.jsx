import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import Pet from "../components/Pet";
import "../styles/Home.css";
import Header from "../components/header";

function Home() {
    const [pets, setPets] = useState([]);
    const [ongData, setOngData] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // adicionei para o useLocation funcionar

    useEffect(() => {
        if (location.pathname === "/admin") {
            getPets();
        }
    }, [location.pathname]);

    const getPets = () => {
        api.get("/ongs/pets/list")
            .then((res) => res.data)
            .then((data) => {
                // Ordenar pets: disponíveis para doação primeiro
                const sortedPets = data.sort((a, b) => b.is_pet_available - a.is_pet_available);
                setPets(sortedPets);
            })
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

    return (
        <div className="bodyhome">
            <Header />
            <div>
                {pets.length > 0 ? (
                    <h2 className="Petsh">Pets Cadastrados</h2>
                ) : (
                    <h2 className="Petsh">Ainda não há Pets cadastrados</h2>
                )}
                {pets.map((pet) => (
                    <Pet pet={pet} onDelete={deletePet} onEdit={editPet} key={pet.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
