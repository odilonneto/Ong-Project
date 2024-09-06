import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import OngRegisterForm from "../components/OngRegisterForm";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

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
    return(<div>
        <OngRegisterForm header="Informações" button_text="Salvar alterações" isEditing={true}></OngRegisterForm>
        <button onClick={handleOngDelete}> Excluir Perfil </button>
        </div>)
}
export default EditPage;