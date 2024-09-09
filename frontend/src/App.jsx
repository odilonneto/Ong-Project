import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import OngRegister from "./pages/Register";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OngProtectedRoute from "./components/OngProtectedRoute";
import UserRegisterForm from "./components/UserRegisterForm";
import ONGList from './pages/ONGList';
import PetList from './pages/PetList';
import EditPage from "./pages/EditPage";
import CreatePet from "./pages/CreatePet"


function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <OngProtectedRoute>
              <Home/>
            </OngProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register/ong" element={<OngRegister />} />
        <Route path="/register/user" element={<UserRegisterForm />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/edit/ong" element={<OngProtectedRoute> <EditPage /> </OngProtectedRoute>}></Route>
        <Route path="/ongs" element={<ONGList />} />
        <Route path="/pets/:ongId" element={<PetList />} />
        <Route path="/create/pet" element={<CreatePet />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
