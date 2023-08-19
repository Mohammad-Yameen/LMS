import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import api from '../axios';

const UserContext = createContext();

const TOKEN_STORAGE_KEY = 'accessToken';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [AccessToken, setAccessToken] = useState(null);


    const logout = useCallback(() => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        navigate('/login');
        
    }, [navigate]);


    const login = useCallback(async ({ username, password }) => {
        try {
            const response = await api.post('/login/', {
                username: username,
                password: password
            });
            const AccessToken = response.data.access
            const decodedAccessToken = jwt_decode(AccessToken);

            setUser(decodedAccessToken);
            setAccessToken(AccessToken);


            localStorage.setItem(TOKEN_STORAGE_KEY, AccessToken);

            if (decodedAccessToken.user_type === 'lab') {
                navigate('/lab/dashboard');
            } else {
                navigate('/patient/dashboard');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [navigate]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (storedAccessToken) {
            const decodedAccessToken = jwt_decode(storedAccessToken);
            const currentTime = Date.now() / 1000;

            if (currentTime < decodedAccessToken.exp) {
                setUser(decodedAccessToken)
                setAccessToken(storedAccessToken);

                const expiresInMilliseconds = (decodedAccessToken.exp - currentTime) * 1000;
                setTimeout(logout, expiresInMilliseconds - 30000);

            } else {
                localStorage.removeItem(TOKEN_STORAGE_KEY);
            }
        }
    }, [logout]);


    const value = useMemo(() => ({
        user,
        login,
        logout,
        AccessToken
    }), [user, login, logout, AccessToken]);

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
