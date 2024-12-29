import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../user_context/UserProvider";
import "./LoginPage.css";
import TopBar from "../TopBar/TopBar";

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        parola: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Stare pentru butonul de incarcare
    const { loginUser } = useContext(UserContext); // Folosim functia de logare din context
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");  // Resetam mesajul de eroare
        setLoading(true);  // Pornim starea de incarcare
    
        // console.log("Datele trimise catre server:", form);  // Log pentru datele trimise
    
        try {
            // Trimiterea cererii de POST pentru login
            const response = await axios.post("http://localhost:5000/api/login", form);
    
            // console.log("Răspunsul de la server:", response.data);  // Log pentru raspunsul de la server
    
            // Verificam succesul login-ului
            if (response.data && response.data.token) {
                const userData = {
                    email: form.email,
                    token: response.data.token,  // Tokenul primit de la server
                    id: response.data.user.id,  // ID-ul utilizatorului
                    nume: response.data.user.nume,
                    prenume: response.data.user.prenume
                };
                loginUser(userData);  // Setam utilizatorul in context
                navigate("/");  // Navigam catre pagina principala/dashboard
            } else {
                // Daca nu există un ID, inseamna ca login-ul nu a fost valid
                setErrorMessage("Email sau parola incorecte.");
            }
        } catch (error) {
            console.error("Eroare la autentificare:", error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);  // Mesaj de eroare detaliat din server
            } else {
                setErrorMessage("Eroare la autentificare. Te rugam sa incerci din nou.");
            }
        } finally {
            setLoading(false);  // Resetam starea de incarcare
        }
    };

    return (
        <div className="login-container">
            <TopBar /> {/* Adauga TopBar */}
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Autentificare</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Afișează mesajul de eroare dacă exista */}

                <div className="form-group">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        name="parola"
                        type="password"
                        placeholder="Parola"
                        value={form.parola}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Se autentifica..." : "Login"} {/* Modifică textul în functie de starea de incarcare */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
