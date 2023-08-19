import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import "../static/BillDetailPage.css";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";

export default function BillDetailPage() {
  const navigate = useNavigate();
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const { AccessToken } = useAuth();

  useEffect(() => {
    const fetchBillDetail = async () => {
      try {
        const response = await api.get(`/lab/bill/?billId=${billId}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
        });
        setBill(response.data);
      } catch (error) {
        console.error("Error fetching bill detail:", error);
      }
    };

    fetchBillDetail();
  }, [billId]);

  if (!bill) {
    return null;
  }

  const handleTestPriceChange = (testId, newPrice) => {
    const parsedPrice = parseFloat(newPrice);
    const updatedTests = bill.tests.map((test) =>
      test.id === testId
        ? { ...test, price: isNaN(parsedPrice) ? 0 : parsedPrice }
        : test
    );
    setBill((prevBill) => ({ ...prevBill, tests: updatedTests }));
  };

  const handleTestUpdate = async (e, billId) => {
    try {
      const response = await api.put(`/lab/bill/?billId=${billId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      toast.success("Test Updated");
      setBill(response.data);
    } catch (error) {
      toast.error("Something went wring");
    }
  };

  return (
    <div className="bill-details-container">
      <h2>Bill Details</h2>
      <div className="bill-details">
        <p>ID: {bill.id}</p>
        <p>Payment Mode: {bill.payment_mode.toUpperCase()}</p>
        <p>Advance: {bill.advance}</p>
        <p>Payment Status: {bill.payment_status.toUpperCase()}</p>
        <p>Total Amount: {bill.total_amount}</p>
        <p>Due: {bill.due}</p>
        <p>Created At: {new Date(bill.created_at).toLocaleString()}</p>
      </div>
      <h2>Tests</h2>
      <table className="tests-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.tests.map((test) => (
            <tr key={test.id}>
              <td>{test.name.toUpperCase()}</td>
              <td>
                <input
                  type="text"
                  value={test.price}
                  onChange={(e) =>
                    handleTestPriceChange(test.id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
          <td colSpan="2">
            <div className="update-button-container">
              <button
                className="patient-btns"
                id="btn2"
                onClick={(e) => handleTestUpdate(e, bill.id)}
              >
                Update
              </button>
            </div>
          </td>
        </tbody>
      </table>
    </div>
  );
}
