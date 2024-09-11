import {useState, useEffect} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import "../styles/Form.css"

function OngRegisterForm( {isEditing, header, button_text }){
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
    const [ongData, setOngData] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (isEditing) {
          const token = localStorage.getItem(ACCESS_TOKEN);
          if (token) {
            const decoded = jwtDecode(token);
            const ong_id = decoded['ong_id'];
    
            api.get(`/ongs/${ong_id}`)
              .then((res) => {
                setOngData(res.data);
              })
              .catch((err) => alert(err));
          }
        }
      }, [isEditing]);
    
      useEffect(() => {
        if (ongData) {
          setOngEmail(ongData.ong_email || "");
          setCustomUrl(ongData.custom_url || "");
          setOngAddress(ongData.ong_address || "");
          setOngPhoneNumber(ongData.ong_phone_number || "");
        }
      }, [ongData]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (isEditing){
            try{
                const res = await api.patch(`/ongs/update/${ongData.id}`, {"custom_url": customUrl, "ong_address": ongAddress,
                    "ong_phone_number": ongPhoneNumber, "ong_email": ongEmail});
                navigate("/admin");
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
    }

    return(
    <div className="bodylogin">
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{header}</h1>
        <>{isEditing ? (
                <></>
        ) : (
            <>
            <input className="form-input"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"/>
            
            <input className="form-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"/>
            </>
        )}
        </>
        <input className="form-input"
        type="text"
        required
        value={ongEmail}
        onChange={(e) => setOngEmail(e.target.value)}
        placeholder="E-mail"/>

        <>
        {isEditing ? (
                <></>
        ) : (
        <input className="form-input"
        type="text"
        required
        value={ongName}
        onChange={(e) => setOngName(e.target.value)}
        placeholder="Nome da ong"/>
        )}
        </>
        <input className="form-input"
        type="text"
        required
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="URL Personalizável"/>

        <input className="form-input"
        type="text"
        value={ongAddress}
        onChange={(e) => setOngAddress(e.target.value)}
        placeholder="Endereço"/>

        {isEditing ? (
                <></>
        ) : (
            <input className="form-input"
            type="text"
            value={ongCnpj}
            onChange={(e) => setOngCnpj(e.target.value)}
            placeholder="CNPJ"/>
        )}


        <input className="form-input"
        type="text"
        value={ongPhoneNumber}
        onChange={(e) => setOngPhoneNumber(e.target.value)}
        placeholder="Telefone"/>

        <button className="form-button" type="submit">
            {button_text}
        </button>
    </form>
    </div>
)}

export default OngRegisterForm