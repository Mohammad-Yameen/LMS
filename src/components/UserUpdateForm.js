import React, { useState, useEffect } from "react";
import "../static/createuserform.css";
import api from "../axios";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UserUpdateForm() {
  const { userId } = useParams();
  const { AccessToken } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get(`/lab/member/?labUserId=${userId}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
        });
        setFirstName(res.data.user.first_name);
        setUserName(res.data.user.username);
        setEmail(res.data.user.email);
      } catch (error) {
        toast.error("Failed to fecth user data");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      first_name: firstName,
      username: userName,
      email: email,
    };
    api
      .put(`/lab/member/?labUserId=${userId}`, payload, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((res) => toast.success("User Updated"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="create-form">
      <h2>Update User</h2>
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
          Update
        </button>
      </form>
    </div>
  );
}
