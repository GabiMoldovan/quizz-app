import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import { UserContext } from "../../user_context/UserProvider";


const TopBar = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useContext(UserContext); // Accesam utilizatorul și functia de logout din context

    const handleLogoClick = () => {
        navigate("/"); // Navighează catre pagina principala
    };

    const handleLogout = () => {
        logoutUser(); // Apelam functia de logout din context
        navigate("/login"); // Redirectionăm utilizatorul catre pagina de login
    };

    return (
        <div className="top-bar">
            <div 
                className="logo-container" 
                onClick={handleLogoClick} 
                style={{ cursor: "pointer" }}
            >
                <div className="logo-image"></div> {/* Imaginea logo */}
            </div>
            <div className={`welcome-text ${user ? 'logged-in' : ''}`}>
                Bine ați venit la examenul auto!
            </div>
            {user ? (
                <div className="user-info">
                    <span>{`Salut, ${user.prenume} ${user.nume}`}</span>
                    <button 
                        className="logout-button" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button 
                        className="login-button" 
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button 
                        className="register-button" 
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopBar;
