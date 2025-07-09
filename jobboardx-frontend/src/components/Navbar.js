import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
      {user && user.role === "recruiter" && (
        <>
          <Link to="/recruiter" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/jobs/post" style={{ marginRight: 10 }}>Post Job</Link>
          <Link to="/jobs/my-posts" style={{ marginRight: 10 }}>My Jobs</Link>
        </>
      )}
      {user && user.role === "candidate" && (
        <>
          <Link to="/candidate" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/jobs/all" style={{ marginRight: 10 }}>Browse Jobs</Link>
        </>
      )}
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
