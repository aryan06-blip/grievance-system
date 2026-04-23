const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await Student.findOne({ email });

  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    email,
    password: hashed
  });

  res.json(student);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ message: "Invalid login" });
  }

  const match = await bcrypt.compare(password, student.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: student._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};