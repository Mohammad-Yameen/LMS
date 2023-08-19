import React, { useEffect, useState } from "react";
import "../static/table.css";
import api from "../axios";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function LabUsers() {
  const navigate = useNavigate();
  const { AccessToken, user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const res = await api
      .get("/lab/member/", {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((res) => res.data)
      .catch((error) => toast.error("Failed to fetch users"));
    setUsers(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (userId) => {
    api
      .delete(`/lab/member/?labUserId=${userId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(() => {
        toast.success("User deleted");
        fetchData();
      })
      .catch((error) => {
        toast.error("Failed to delete user");
      });
  };

  return (
    <div className="user-table" id="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => {
            return (
              row.user.id !== user.user_id && (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.user.first_name}</td>
                  <td>{row.user.username}</td>
                  <td>{row.user.email}</td>
                  <td>
                    <button
                      className="btns"
                      id="btn1"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btns"
                      id="btn2"
                      onClick={() =>
                        navigate(`/lab/dashboard/users/update/${row.id}`)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <Link id="create" className="c-button" to="/lab/dashboard/users/create">
        + Create User
      </Link>
    </div>
  );
}
