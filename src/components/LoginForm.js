import React, { useState } from 'react'
import { useAuth } from '../hooks/auth'
import '../static/labregisterform.css'


export default function LoginForm() {
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({username, password});
    };
    return (
        <>
            <h1> Login</h1>
            <div className="container d-flex justify-content-center align-items-center">
                <form className="labform d-flex flex-wrap" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => SetUsername(e.target.value)}
                            className="form-control"
                            id="username"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="mb-3 col-12">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
