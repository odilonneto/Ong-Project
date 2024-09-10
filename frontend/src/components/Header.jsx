import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import Pet from "../components/Pet";
import "../styles/Home.css";


function Header({}){
    const navigate = useNavigate();
    const [isLoggedIn, setLogin] = useState("");
    const [userIsOng, setUser] = useState("");

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setLogin(true);
            }else{
                setLogin(false);
                localStorage.clear();
            }
        }catch (error){
            console.log(error);
            setLogin(false);
            localStorage.clear();
        }
    }
    useEffect(() => {
        auth();
        if (localStorage.getItem("name") !== null) {
            setLogin(true);
            if (localStorage.getItem("account_type") == "ONG"){
                setUser(true);
            }
            else{
                setUser(false);
            }
        } else {
          setLogin(false);
        }
      }, []);

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        
        if (!token){
            setLogin(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now){
            await refreshToken();
        }else{
            setLogin(true);
        }
    }

return(
    isLoggedIn? (userIsOng ? <div className="cabecaButton">
        <h3 className="Nome">{localStorage.getItem("account_type")}: {localStorage.getItem("name")}</h3>
        <div><button onClick={() => navigate("/ongs")}> ONGs </button></div>
        <div><button onClick={() => navigate("/create/pet")}> Cadastrar Pet </button></div>
        <div><button onClick={() => navigate("/edit/ong")}> Editar informações</button></div>
        <div><button onClick={() => navigate("/admin")}> Pets</button></div>
        <button onClick={() => navigate("/")}>Home</button>
        <div><button onClick={() => navigate("/logout")}>Logout</button></div>
    </div> : <>
    <div className="cabecaButton">
        <h3 className="Nome">{localStorage.getItem("account_type")}: {localStorage.getItem("name")}</h3>
        <div><button onClick={() => navigate("/edit/customer")}> Editar informações</button></div>
        <div><button onClick={() => navigate("/ongs")}> ONGs</button></div>
        <button onClick={() => navigate("/")}>Home</button>
        <div><button onClick={() => navigate("/logout")}>Logout</button></div>
    </div> </>) :
         <div className="cabecaButton">
        <div> <button onClick={() => navigate("/login")}>Login </button></div>
        <div><button onClick={() => navigate("/ongs")}> ONGs</button></div>
        <button onClick={() => navigate("/")}>Home</button>
    </div>

);
    }
export default Header;