import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import OngRegister from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OngProtectedRoute from "./components/OngProtectedRoute";
import UserRegisterForm from "./components/UserRegisterForm";
  //import ONGList from "./components/OngPetViews";
import ONGPetsPage from "./components/OngPetViews";
import ONGList from './components/ONGList';


function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <OngProtectedRoute>
              <Home />
            </OngProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register/ong" element={<OngRegister />} />
        <Route path="/register/user" element={<UserRegisterForm />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/viewOng" element={<ONGList />} />
        <Route path="/ong/:ong_id/pets" element={<ONGPetsPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
