import React, { useState, useEffect } from "react";
import "../static/updatepatientform.css";
import api from "../axios";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UserUpdateForm() {
  const { patientId } = useParams();
  const { AccessToken } = useAuth();

  const [PatientData, setPatientData] = useState({
    first_name: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await api.get(`/lab/patient/?labPatientId=${patientId}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
        });
        setPatientData(res.data);
      } catch (error) {
        toast.error("Failed to fetch patient details");
      }
    };
    fetchPatientData();
  }, [patientId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .put(`/lab/patient/?labPatientId=${patientId}`, PatientData, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((res) => toast.success("Patient Updated"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="create-form">
      <h2>Update Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Full Name</label>
          <input
            type="text"
            className="inputs"
            id="first_name"
            name="first_name"
            value={PatientData.first_name}
            onChange={(e) =>
              setPatientData({ ...PatientData, first_name: e.target.value })
            }
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
            value={PatientData.email}
            onChange={(e) => setPatientData({ ...PatientData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            className="inputs"
            name="contact"
            value={PatientData.contact}
            onChange={(e) =>
              setPatientData({ ...PatientData, contact: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            className="inputs"
            name="gender"
            value={PatientData.gender}
            onChange={(e) =>
              setPatientData({ ...PatientData, gender: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            className="inputs"
            name="dob"
            value={PatientData.dob}
            onChange={(e) => setPatientData({ ...PatientData, dob: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="inputs"
            name="address"
            value={PatientData.address}
            onChange={(e) =>
              setPatientData({ ...PatientData, address: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            className="inputs"
            name="city"
            value={PatientData.city}
            onChange={(e) => setPatientData({ ...PatientData, city: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            className="inputs"
            name="state"
            value={PatientData.state}
            onChange={(e) => setPatientData({ ...PatientData, state: e.target.value })}
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
