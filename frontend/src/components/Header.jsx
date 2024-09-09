import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Pet from "../components/Pet";
import "../styles/Home.css";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

function Header({}){
    const [ongData, setOngData] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        getOngName();
    }, []);

    const getOngName = () => {
        const decoded = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const ongId = decoded["ong_id"];
        const data = api.get(`/ongs/${ongId}`).then((res) => res.data)
        .then((data) => setOngData(data))
        .catch((err) => alert(err));
    }
    const handleHomeClick = () => navigate('/');

return(
    <div className="cabecaButton">
        <h3 className="Nome">{ongData.ong_name}</h3>
        <div><button onClick={() => navigate("/create/pet")}> Cadastrar Pet </button></div>
        <div><button onClick={() => navigate("/edit/ong")}> Editar informações</button></div>
        <button onClick={handleHomeClick}>Home</button>
        <div><button onClick={() => navigate("/logout")}>Logout</button></div>
    </div>
);
    }
export default Header;