import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import Header from "../components/header";
import UserRegisterForm from "../components/UserRegisterForm";
import { Navigate } from "react-router-dom";

function UserEditPage(){
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setAuthorized] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("account_type") === "Usuário") {
            setAuthorized(true);
          }
        else{
            setAuthorized(false);
        }
      }, []);
    const handleUserDelete = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.");

        if (!confirmation) {

            return;
        }

        setLoading(true);
            try{
                const token = localStorage.getItem(ACCESS_TOKEN);
                const decoded = jwtDecode(token);
                const user_id = decoded['customer_id'];
                const res = await api.delete(`/ongs/customer/delete/${user_id}`);
                alert("Perfil excluído com sucesso.");
                }
                catch (error){
                    alert("Erro ao excluir perfil: " + error);
                }
                finally{
                    setLoading(false);
                    navigate("/logout");
                }
    }
    return (
        isAuthorized ? (
            <div>
                <Header />
                <div className="bodylogin">
                    <UserRegisterForm header="Informações" button_text="Salvar alterações" isEditing={true} />
                    <button className="excluir" onClick={handleUserDelete}>Excluir Perfil</button>
                </div>
            </div>
        ) : (
            <Navigate to="/ongs"></Navigate>
        )
    );
}
export default UserEditPage;