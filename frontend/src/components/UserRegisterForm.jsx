import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"

function UserRegisterForm(){
    const route = "/ongs/customer/register";
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
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="E-mail"/>

        
        <input className="form-input"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Telefone"/>

        <input className="form-input"
        type="text"
        value={cpf}
        onChange={(e) => setCPF(e.target.value)}
        placeholder="CPF"/>

        <label> 
        Gênero:
        <select required onChange={(e) => setGender(e.target.value)}>
                <option value={"M"}>Homem</option>
                <option value={"W"}>Mulher</option>
                <option value={"O"}>Outro</option>
        </select>
        </label>
        <br></br>

        <label htmlFor="birth_date">Nascimento:</label>

        <input type="date" id="birth_date" name="trip-start" value={birthDate} min="1900-01-01" max="2006-09-04"
        onChange={(e) => setBirthDate(e.target.value)}/>


        <button className="form-button" type="submit">
            Registre-se
        </button>
    </form>
}

export default UserRegisterForm