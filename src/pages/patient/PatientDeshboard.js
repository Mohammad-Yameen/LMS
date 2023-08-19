import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export default function PatientDeshboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.user_type !== 'patient') {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <h1>Patient Dashboard</h1>
            <Outlet />
        </>

    );
}
