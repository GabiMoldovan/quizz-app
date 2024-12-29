import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from "../user_context/UserProvider";


const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route 
            {...rest} 
            element={user ? <Element /> : <Navigate to="/login" />} 
        />
    );
};

export default PrivateRoute;
