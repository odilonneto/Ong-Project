import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import OngRegisterForm from "../components/OngRegisterForm";

function EditPage(){
    return <OngRegisterForm header="Informações" button_text="Salvar alterações" isEditing={true}></OngRegisterForm>
}
export default EditPage;