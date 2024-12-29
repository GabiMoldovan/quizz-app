import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

// Cream un provider care ofera datele contextului in toata aplicatia
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Starea utilizatorului logat

    // Verificam daca exista un utilizator in localStorage la inceput
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Incarcam utilizatorul din localStorage
        }
    }, []);

    // Functie pentru logare
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Salvam user-ul in localStorage
    };

    // Functie pentru delogare
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user"); // Stergem user-ul din localStorage
    };

    // Returnam contextul cu valorile necesare
    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
