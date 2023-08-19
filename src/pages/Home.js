import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LabForm from '../components/LabRegisterForm';
import { useAuth } from '../hooks/auth';

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            if (user.user_type === 'lab') {
                navigate('/lab/dashboard');
            } else {
                navigate('/patient/dashboard');
            }
        } else {
            setIsLoading(false);
        }
    }, [user, navigate]);

    return isLoading ? null : <LabForm />

}
