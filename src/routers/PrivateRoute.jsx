import React from "react";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children, user }) => {
    return (user?.logged)
        ? children
        : <Navigate to="/login" />
};


