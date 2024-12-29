import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import TopBar from '../TopBar/TopBar';

const RegisterPage = () => {
    const [form, setForm] = useState({
        nume: "",
        prenume: "",
        email: "",
        parola: "",
        confirmParola: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (form.parola !== form.confirmParola) {
            setErrorMessage("Parolele nu coincid.");
            return;
        }

        try {
            const emailCheckResponse = await axios.post("http://localhost:5000/api/check-email", {
                email: form.email,
            });

            if (!emailCheckResponse.data.available) {
                setErrorMessage("Există deja un cont cu acest email.");
                return;
            }

            await axios.post("http://localhost:5000/api/register", form);
            navigate("/login");
        } catch (error) {
            setErrorMessage("Eroare la înregistrare.");
        }
    };

    return (
        <div className="register-container">
            <TopBar /> {/* Adauga TopBar */}
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Înregistrare</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="form-group">
                    <input
                        name="nume"
                        placeholder="Nume"
                        value={form.nume}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        name="prenume"
                        placeholder="Prenume"
                        value={form.prenume}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        name="parola"
                        type="password"
                        placeholder="Parola"
                        value={form.parola}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        name="confirmParola"
                        type="password"
                        placeholder="Confirma Parola"
                        value={form.confirmParola}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="register-button">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;