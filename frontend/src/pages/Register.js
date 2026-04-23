import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("https://grievance-system-w5ao.onrender.com/api/register", form);

      alert("Registered Successfully");

      navigate("/login");
    } catch (err) {
      alert("Duplicate Email");
    }
  };

 return (
  <div className="container">
    <h2>Student Register</h2>

    <input placeholder="Name"
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    <input placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <input placeholder="Password"
      type="password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <button onClick={handleSubmit}>Register</button>
  </div>
);
}

export default Register;