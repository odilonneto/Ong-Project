import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css"
import { jwtDecode } from "jwt-decode";

function LoginForm(){
    const route = '/ongs/login/';
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                navigate("/admin")
            }
            else if ("cpf" in decoded){
                navigate("/ongs")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
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
