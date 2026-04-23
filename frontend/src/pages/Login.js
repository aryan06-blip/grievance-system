import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://grievance-system-w5ao.onrender.com/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch {
      alert("Invalid Login");
    }
  };

return (
  <div className="container">
    <h2>Student Login</h2>

    <input placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <input placeholder="Password"
      type="password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <button onClick={handleSubmit}>Login</button>
  </div>
);
}

export default Login;