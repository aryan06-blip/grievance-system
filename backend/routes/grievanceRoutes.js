const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance
} = require("../controllers/grievanceController");

router.post("/grievances", auth, createGrievance);
router.get("/grievances", auth, getGrievances);
router.get("/grievances/:id", auth, getGrievanceById);
router.put("/grievances/:id", auth, updateGrievance);
router.delete("/grievances/:id", auth, deleteGrievance);
router.get("/grievances/search", auth, searchGrievance);

module.exports = router;