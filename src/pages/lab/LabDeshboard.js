import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import Sidebar from "../../components/SideBar";

export default function LabDeshboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.user_type !== "lab") {
        navigate("/");
      }
      setIsLoading(false);
    }else{
      navigate('/')
    }
  }, [user, navigate]);

  return (
    <>
      {isLoading ? null : (
        <>
          <Sidebar />
          <Outlet />
        </>
      )}
    </>
  );
}
