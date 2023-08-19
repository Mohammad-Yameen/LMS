import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import "../static/table.css";
import api from "../axios";
import { toast } from "react-toastify";

export default function LabPatients() {
  const navigate = useNavigate();
  const { AccessToken, user } = useAuth();
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/lab/patient/", {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      setPatients(res.data);
    } catch (error) {
      toast.error("Failed to fetch personal users");
    }
  };

  const handleDelete = (patientId) => {
    api
      .delete(`/lab/patient/?labPatientId=${patientId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(() => {
        toast.success("Patient deleted");
        fetchData();
      })
      .catch((error) => {
        toast.error("Failed to delete Patient");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user-table" id="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.email}</td>
              <td>{patient.contact}</td>
              <td>{patient.gender}</td>
              <td>{patient.dob}</td>
              <td>{patient.address}</td>
              <td>{patient.city}</td>
              <td>{patient.state}</td>
              <td>
                <button
                  className="patient-btns"
                  id="btn1"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </button>
                <button
                  className="patient-btns"
                  id="btn2"
                  onClick={() =>
                    navigate(`/lab/dashboard/patient/update/${patient.id}`)
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link id="create" className="c-button" to="/lab/dashboard/patient/create">
        + Create Patient
      </Link>
    </div>
  );
}
