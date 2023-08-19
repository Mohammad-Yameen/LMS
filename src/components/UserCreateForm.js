import React, { useState } from "react";
import "../static/createuserform.css";
import api from "../axios";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";

export default function CreateUserForm() {
  const { AccessToken } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      first_name: firstName,
      username: userName,
      password: password,
      email: email,
    };
    api
      .post("/lab/member/", payload, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((res) => toast.success("User created"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="create-form">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Full Name</label>
          <input
            type="text"
            className="inputs"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="inputs"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="inputs"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="inputs"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="create-btn">
          Create
        </button>
      </form>
    </div>
  );
}
