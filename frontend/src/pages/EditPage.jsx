import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import OngRegisterForm from "../components/OngRegisterForm";

function EditPage(){
    return <OngRegisterForm></OngRegisterForm>
}
export default EditPage;