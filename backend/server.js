const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

const app = express();

app.use(cors({
origin: "*"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api", authRoutes);
app.use("/api/grievances", grievanceRoutes);

app.get("/", (req, res) => {
res.send("Backend Running");
});

app.listen(5000, () => {
console.log("Server running on port 5000");
});
