import React from 'react';
import FrontPage from './pages/FrontPage/FrontPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { UserProvider } from './user_context/UserProvider';




const App = () => {
    const handleStartTest = (selectedCategory) => {
        console.log(`Testul pentru categoria ${selectedCategory} a inceput!`);
    };

    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Ruta FrontPage */}
                    <Route path="/" element={<FrontPage onStartTest={handleStartTest} />} />

                    {/* Ruta LoginPage */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Ruta RegisterPage */}
                    <Route path="/register" element={<RegisterPage />} />
                    
                </Routes>
            </Router>
        </UserProvider>
    );
};

/*
node server.js
npm start
*/

export default App;
