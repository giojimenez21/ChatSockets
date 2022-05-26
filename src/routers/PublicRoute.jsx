import React from "react";
import { Navigate } from "react-router-dom";


export const PublicRoute = ({ children, user }) => {
    return (user?.logged)
        ? <Navigate to="/" />
        : children
};


