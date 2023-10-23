import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const AdminHome = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  }

  useEffect(() => {
    const localItem = localStorage.getItem("username");
    if (localItem === null) {
      navigate("/admin");
    }
  }, [])

  return (
    <>
      <h1>Admin Home</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default AdminHome