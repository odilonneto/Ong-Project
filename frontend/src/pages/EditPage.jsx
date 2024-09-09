import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import OngRegisterForm from "../components/OngRegisterForm";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import Header from "../components/header";

function EditPage(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleOngDelete = async (e) => {
        e.preventDefault();

        // Exibir uma mensagem de confirmação antes de deletar
        const confirmation = window.confirm("Tem certeza de que deseja excluir o perfil? Esta ação não pode ser desfeita.");

        if (!confirmation) {
            // Se o usuário clicar em "Cancelar", não faz nada e retorna
            return;
        }

        setLoading(true);
            try{
                const token = localStorage.getItem(ACCESS_TOKEN);
                const decoded = jwtDecode(token);
                const ong_id = decoded['ong_id'];
                const res = await api.delete(`/ongs/delete/${ong_id}`);
                // Mensagem de sucesso após a exclusão (opcional)
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
    return(
        <div>
            <Header></Header>
    <div className="bodylogin">
        <OngRegisterForm header="Informações" button_text="Salvar alterações" isEditing={true}>        </OngRegisterForm>
        <button className="excluir" onClick={handleOngDelete}> Excluir Perfil </button>

        </div>
        </div>)
}
export default EditPage;