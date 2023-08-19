import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/navbar.css';
import { useAuth } from '../hooks/auth';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    if (isLoading) {
        return null;
    }

    return (
        <nav className="nav navbar navbar-dark navbar-expand-lg bg-primary" style={{ color: 'black' }}>
            <div className="container-fluid">
                <Link className="navbar-brand logo" to="/">
                    LMS
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link navlink" onClick={logout} style={{ color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link navlink" to="/login" style={{ color: 'black', fontWeight: 'bold' }}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link navlink" to="/patient/signup" style={{ color: 'black', fontWeight: 'bold' }}>
                                    Patient Registration
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
