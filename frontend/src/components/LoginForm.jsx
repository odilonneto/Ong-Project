import {isValidElement, useEffect, useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css"
import { jwtDecode } from "jwt-decode";
import { Navigate} from "react-router-dom";

function LoginForm(){
    const route = '/ongs/login/';
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [isOngUser, setIsOngUser] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState("");

    useEffect(() => {
        if (localStorage.getItem("name") !== null) {
            setIsLoggedIn(true);
            if (localStorage.getItem("account_type") == "ONG"){
                setIsOngUser(true);
            }
            else{
                setIsOngUser(false);
            }
        } else {
          setIsLoggedIn(false);
        }
      }, []);

    const getOngData = ( ongId ) => {
        api.get(`/ongs/${ongId}`).then((res) => {
            const data = res.data;
            setData(data);
            localStorage.setItem("name", data.ong_name);
            localStorage.setItem("account_id", data.id);
            localStorage.setItem("account_type", "ONG");
            navigate("/admin");
        }).catch((err) => alert(err));
    }

    const getUserData = ( customerId ) => {
        api.get(`/ongs/customer/${customerId}`).then((res) => {
            const data = res.data;
            setData(data);
            localStorage.setItem("name", data.name);
            localStorage.setItem("account_id", data.id);
            localStorage.setItem("account_type", "Usuário");
            navigate("/ongs");
        }).catch((err) => alert(err));
    }
    const handleOngClick = () => {
        navigate("/register/ong");
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            const token = localStorage.getItem(ACCESS_TOKEN)
            const decoded = jwtDecode(token);

            if ("cnpj" in decoded){
                getOngData(decoded['ong_id']);
            }
            else if ("cpf" in decoded){
                getUserData(decoded['customer_id']);

            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        isLoggedIn ? (isOngUser ? <Navigate to="/admin"/>: <Navigate to="/ongs"/>) : 
        <div className="bodylogin">
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Login
            </button>
            <button className="form2-button" onClick={handleOngClick}>
                    Cadastre-se
            </button>
        </form>
        </div>
        
    );
}
export default LoginForm;
