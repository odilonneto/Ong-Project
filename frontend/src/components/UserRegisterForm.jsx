import {useState, useEffect} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"

function UserRegisterForm( {isEditing, header, button_text } ){
    const route = "/ongs/customer/register";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("M");
    const [birthDate, setBirthDate] = useState("");
    const [cpf, setCPF] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        if (isEditing) {
          const userId = localStorage.getItem("account_id");
            api.get(`/ongs/customer/${userId}`)
              .then((res) => {
                setData(res.data);
              })
              .catch((err) => alert(err));
          }
      }, [isEditing]);
      useEffect(() => {
        if (data) {
          setUserEmail(data.email || "");
          setPhoneNumber(data.phone_number || "");
          setUserAddress(data.address || "");
        }
      }, [data]);
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (isEditing){
            try{
            const userId = localStorage.getItem("account_id");
            const res = await api.patch(`/ongs/customer/update/${userId}`, {"email": userEmail,
                "phone_number": phoneNumber, "address": userAddress});
            alert('Alterações salvas com sucesso');
            navigate("/ongs");
            }
            catch (error){
                alert(error);
            }
            finally{
                setLoading(false);
            }
        }
        else{
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
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{header}</h1>
        <>{isEditing ? (<></>) : (
            <>
        <input className="form-input"
        required
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"/>
        
        <input className="form-input"
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"/>
        
        <input className="form-input"
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"/>
        </>
        )
        }
        </>
        <input className="form-input"
        required
        type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="E-mail"/>

        
        <input className="form-input"
        required
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Telefone"/>

        <input className="form-input"
        required
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Endereço"/>

        {isEditing ? <></> : 
        <>
        <input className="form-input"
        required
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

        <input type="date" id="birth_date" name="trip-start" required value={birthDate} min="1900-01-01" max="2006-09-04"
        onChange={(e) => setBirthDate(e.target.value)}/>
        </>
}
        <button className="form-button" type="submit">
            {button_text}
        </button>
    </form>
}

export default UserRegisterForm