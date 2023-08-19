import React, { useState } from "react";
import "../static/patient-form.css";
import api from "../axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/auth";

export default function PatientForm() {
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const { AccessToken } = useAuth();

  const handleGenderChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setGender(selectedOption.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      first_name,
      email,
      contact,
      gender,
      dob,
      address,
      state,
      city,
    };
    api
      .post("/lab/patient/", formData, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((res) => toast.success("Patient registered successfully"))
      .catch((error) => toast.error(error.message));
    setFirstName("");
    setEmail("");
    setContact("");
    setGender("");
    setDob("");
    setAddress("");
    setState("");
    setCity("");
  };

  return (
    <div className="patient-form-container" id="patient-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">Full Name</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              required
            >
              <option value="" disabled defaultValue>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
