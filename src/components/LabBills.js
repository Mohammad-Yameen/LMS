import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import "../static/table.css";
import api from "../axios";
import { toast } from "react-toastify";

export default function LabBills() {
  const navigate = useNavigate();
  const { AccessToken } = useAuth();
  const [bills, setBills] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/lab/bill/", {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      setBills(res.data);
    } catch (error) {
      toast.error("Failed to fetch personal users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEvent = (e) => {
    e.currentTarget.style.cursor = "pointer";
    e.currentTarget.classList.add("hovered-row");
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.cursor = "default";
    e.currentTarget.classList.remove("hovered-row");
  };
  return (
    <div className="user-table" id="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Payment Mode</th>
            <th>Advance</th>
            <th>Payment Status</th>
            <th>Total Amount</th>
            <th>Due</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr
              key={bill.id}
              onMouseEnter={handleMouseEvent}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/lab/dashboard/bill/${bill.id}`)}
            >
              <td>{bill.id}</td>
              <td>{bill.payment_mode.toUpperCase()}</td>
              <td>{bill.advance}</td>
              <td>{bill.payment_status.toUpperCase()}</td>
              <td>{bill.total_amount}</td>
              <td>{bill.due}</td>
              <td>{new Date(bill.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link id="create" className="c-button" to="/lab/dashboard/bill/create">
        + Create
      </Link>
    </div>
  );
}
