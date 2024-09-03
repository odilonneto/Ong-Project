import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"

function UserRegisterForm(){
    const route = "/ongs/user/register/";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [cpf, setCPF] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try{
            const res = await api.post(route, { user: {"username": username, "password": password}, 
            "name": name, "email": userEmail, "phone_number": phoneNumber, "gender": gender,
        "birth_date": birthDate, "user_cpf": cpf});
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"/>

        <input className="form-input"
        type="text"
        value={email}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="E-mail"/>

        
        <input className="form-input"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Telefone"/>

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

export default UserRegisterForm