import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import api from "../api"
import Pet from "../components/Pet";
import "../styles/Home.css"


function Home() {
    const [pets, setPets] = useState([]);
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petVaccines, setPetVaccines] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petNeutered, setPetNeutered] = useState("");
    const [petAvailable, setPetAvailable] = useState("");
    const [petPhotos, setPetPhotos] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getPets();
    }, []);

    const getPets = () => {
        api.get("/ongs/pets/list")
        .then((res) => res.data)
        .then((data) => setPets(data))
        .catch((err) => alert(err));
    };

    const deletePet = (id) => {
        api.delete(`/ongs/pets/delete/${id}`).then((res) => {
            if (res.status === 204) alert("Pet deleted!")
            else alert("Failed to delete pet.")
            getPets();
        }).catch((error) => alert(error));
    };


    const createPet = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('pet_name', petName);
        bodyFormData.append('pet_age', petAge);
        bodyFormData.append('is_pet_available', petAvailable);
        bodyFormData.append('is_pet_neutered', petNeutered);
        bodyFormData.append('pet_photos', petPhotos);
        bodyFormData.append('pet_size', petSize);
        bodyFormData.append('pet_vaccines', petVaccines);

        api
            .post("/ongs/pets/", bodyFormData)
            .then((res) => {
                if (res.status === 201) alert("Pet created!");
                else alert("Failed to make pet.");
                getPets();
            }).catch((err) => alert(err));
    };

    return <div>
        <div>
        <div>
                <h2>Pets</h2>
                {pets.map((pet) => (
                    <Pet pet={pet} onDelete={deletePet} key={pet.id} />
                ))}
            </div>
        </div>
        <h2>Create a Pet</h2>
        <form onSubmit={createPet}>
            <label htmlFor="pet name">Pet name:</label>
            <br></br>
            <input
                type="text"
                id="pet name"
                name="pet name"
                required
                onChange={(e) => setPetName(e.target.value)}>
            </input>

            <label htmlFor="pet age">Age:</label>
            <br/>
            <input id="pet age" name="pet age" required onChange={(e) => setPetAge(e.target.value)}></input>
            <br/>
            
            <label htmlFor="pet vaccines">Vaccines:</label>
            <br/>
            <input id="pet vaccines" name="pet vaccines" required onChange={(e) => setPetVaccines(e.target.value)}></input>
            <br/>

            <label> 
                Size:
            <select required onChange={(e) => setPetSize(e.target.value)}>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
            </select>

            </label>
            <br></br>

            <label> 
                Is neutered:
            <select required onChange={(e) => setPetNeutered(e.target.value)}>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </select>
            </label>
            <br></br>

            <label> 
                Is available:
            <select required onChange={(e) => setPetAvailable(e.target.value)}>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </select>
            </label>
            <br></br>
            
            <label>Add Image:</label>
            <input type="file" onChange={(e) => setPetPhotos(e.target.files[0])} />


            <input type= "submit" value="Submit"></input>
        </form>
    </div>
}

export default Home