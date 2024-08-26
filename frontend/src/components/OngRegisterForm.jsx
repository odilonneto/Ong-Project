import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"

function OngRegisterForm(){
    const route = "/ongs/register/";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ongName, setOngName] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [ongAddress, setOngAddress] = useState("");
    const [ongCnpj, setOngCnpj] = useState("");
    const [ongPhoneNumber, setOngPhoneNumber] = useState("");
    const [ongEmail, setOngEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try{
            const res = await api.post(route, { user: {"username": username, "password": password}, 
            "ong_name": ongName, "custom_url": customUrl, "ong_address": ongAddress, "ong_cnpj": ongCnpj,
        "ong_phone_number": ongPhoneNumber, "ong_email": ongEmail});
            navigate("/login");
        }
        catch (error){
            alert(error);
        }
        finally{
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>Formulário de Registro</h1>
        <input className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"/>
        
        <input className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"/>

        <input className="form-input"
        type="text"
        value={ongEmail}
        onChange={(e) => setOngEmail(e.target.value)}
        placeholder="E-mail"/>

        <input className="form-input"
        type="text"
        value={ongName}
        onChange={(e) => setOngName(e.target.value)}
        placeholder="Nome da ong"/>
        
        <input className="form-input"
        type="text"
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="URL Personalizável"/>

        <input className="form-input"
        type="text"
        value={ongAddress}
        onChange={(e) => setOngAddress(e.target.value)}
        placeholder="Endereço"/>

        <input className="form-input"
        type="text"
        value={ongCnpj}
        onChange={(e) => setOngCnpj(e.target.value)}
        placeholder="CNPJ"/>

        <input className="form-input"
        type="text"
        value={ongPhoneNumber}
        onChange={(e) => setOngPhoneNumber(e.target.value)}
        placeholder="Telefone"/>

        <button className="form-button" type="submit">
            Registre-se
        </button>
    </form>
}

export default OngRegisterForm