import React from 'react'
import { useState } from 'react'
import api from '../axios'
import { toast } from "react-toastify";
import '../static/labregisterform.css'


export default function LabRegisterForm() {
    const [first_name, SetFirstName] = useState('')
    const [email, SetEmail] = useState('')
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [name, SetName] = useState('')
    const [address, SetAddress] = useState('')
    const [pincode, SetPincode] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            address: address,
            pincode: pincode,
            user: {
                first_name: first_name,
                email: email,
                username: username,
                password: password,
            }
        };
        try {
            await api.post("/lab/", payload)
            toast.success("Lab Registered ")
            SetFirstName('');
            SetEmail('');
            SetUsername('');
            SetPassword('');
            SetName('');
            SetAddress('');
            SetPincode('');

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <h1>Create Your Lab</h1>
            <div className="container d-flex justify-content-center align-items-center">
                <form className="d-flex flex-wrap" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3 col-md-6 field divs">
                        <label htmlFor="first_name" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => SetFirstName(e.target.value)}
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 col-md-6 divs">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => SetEmail(e.target.value)}
                            aria-describedby="emailHelp"
                        />
                    </div>
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
                    <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">
                            Lab Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => SetName(e.target.value)}
                            className="form-control"
                            id="name"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="pincode" className="form-label">
                            Pincode
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => SetPincode(e.target.value)}
                            className="form-control"
                            id="pincode"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="textarea"
                            name="address"
                            value={address}
                            onChange={(e) => SetAddress(e.target.value)}
                            className="form-control"
                            id="address"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 col-12">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
