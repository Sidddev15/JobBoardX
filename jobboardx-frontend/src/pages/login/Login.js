import { useState, useContext } from "react";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/login", form);

    localStorage.setItem("token", res.data.token); // ✅

    login(res.data.token);

    const role = JSON.parse(atob(res.data.token.split(".")[1])).role;
    navigate(`/${role}`);
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="input-container">
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
