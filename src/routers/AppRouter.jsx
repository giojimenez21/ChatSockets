import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../components/login/Login';
import { login, startChecking } from '../actions/auth';
import { adapterLogin } from '../adapters/adapters';
import { Home } from '../components/Home';
import { initiateSocket } from '../actions/socket';

export const AppRouter = () => {
    const { user, dispatch } = useContext(AuthContext);

    const check = async () => {
        const res = await startChecking();
        if (res?.user) {
            dispatch(login(adapterLogin(res?.user)));
            localStorage.setItem('token', res?.token);
            initiateSocket();
        }
    }

    useEffect(() => {
        check();
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path='/login'
                    element={
                        <PublicRoute user={user}>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    exact
                    path='/*'
                    element={
                        <PrivateRoute user={user}>
                            <Home />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='*'
                    element={
                        <Navigate to='/' />
                    }
                />
            </Routes>
        </Router>
    )
}
