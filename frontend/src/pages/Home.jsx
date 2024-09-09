import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Pet from "../components/Pet";
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

    const handleHomeClick = () => navigate('/');

    return (
        <div className="bodyhome">
            <div className="cabecaButton">
            <h3 className="Nome">Nomeong</h3>
                <div><button onClick={() => navigate("/create/pet")}> Cadastrar Pet </button></div>
                <div><button onClick={() => navigate("/edit/ong")}> Editar informações</button></div>
                <button onClick={handleHomeClick}>Home</button>
            </div>
            <div>
                {pets.length > 0 ? (<h2 className="Petsh">Pets Cadastrados</h2>) : (<h2 className="Petsh">Ainda não há Pets cadastrados</h2>)}
                {pets.map((pet) => (
                    <Pet pet={pet} onDelete={deletePet} onEdit={editPet} key={pet.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;