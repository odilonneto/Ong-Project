import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Pet from "../components/Pet";
import "../styles/Home.css";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import Header from "../components/header";
function Home() {
    const [pets, setPets] = useState([]);
    const [ongData, setOngData] = useState("");
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
   

    return (
        <div className="bodyhome">
            <Header></Header>
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