import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function Dashboard() {
const token = localStorage.getItem("token");

const [grievances, setGrievances] = useState([]);
const [search, setSearch] = useState("");

const [form, setForm] = useState({
title: "",
description: "",
category: ""
});

const fetchGrievances = useCallback(async () => {
const res = await axios.get(
"https://grievance-system-w5ao.onrender.com/api/grievances",
{
headers: {
Authorization: token
}
}
);
setGrievances(res.data);
}, [token]);

useEffect(() => {
if (!token) {
window.location.href = "/login";
} else {
fetchGrievances();
}
}, [token, fetchGrievances]);

const submitGrievance = async () => {
await axios.post(
"https://grievance-system-w5ao.onrender.com/api/grievances",
form,
{
headers: {
Authorization: token
}
}
);
fetchGrievances();
};

const deleteGrievance = async (id) => {
await axios.delete(
`https://grievance-system-w5ao.onrender.com/api/grievances/${id}`,
{
headers: {
Authorization: token
}
}
);
fetchGrievances();
};

const updateGrievance = async (id) => {
await axios.put(
`https://grievance-system-w5ao.onrender.com/api/grievances/${id}`,
{ status: "Resolved" },
{
headers: {
Authorization: token
}
}
);
fetchGrievances();
};

const searchGrievance = async () => {
const res = await axios.get(
`https://grievance-system-w5ao.onrender.com/api/grievances/search?title=${search}`,
{
headers: {
Authorization: token
}
}
);
setGrievances(res.data);
};

const logout = () => {
localStorage.removeItem("token");
window.location.href = "/login";
};

return ( <div className="container"> <h2>Student Dashboard</h2>

```
  <input
    placeholder="Title"
    onChange={(e) => setForm({ ...form, title: e.target.value })}
  />

  <input
    placeholder="Description"
    onChange={(e) => setForm({ ...form, description: e.target.value })}
  />

  <input
    placeholder="Category"
    onChange={(e) => setForm({ ...form, category: e.target.value })}
  />

  <button onClick={submitGrievance}>Submit Grievance</button>

  <input
    placeholder="Search grievance"
    onChange={(e) => setSearch(e.target.value)}
  />

  <button onClick={searchGrievance}>Search</button>

  <button onClick={logout}>Logout</button>

  {grievances.map((g) => (
    <div className="card" key={g._id}>
      <h3>{g.title}</h3>
      <p>{g.description}</p>
      <p>{g.category}</p>
      <p>{g.status}</p>

      <div className="actions">
        <button onClick={() => updateGrievance(g._id)}>Resolve</button>
        <button onClick={() => deleteGrievance(g._id)}>Delete</button>
      </div>
    </div>
  ))}
</div>


);
}

export default Dashboard;
