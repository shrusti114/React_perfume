const express = require("express");
const router = express.Router();
const { 
  loginAdmin, 
  getDashboardStats, 
  getAllUsers, 
  updateUserStatus, 
  approveSeller,
  getAllFeedback,
  deleteFeedback,
  getAllPayments,
  deleteUser,
  sendNotification
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public
router.post("/login", loginAdmin);

// Protected Admin Routes
router.get("/stats", protect, admin, getDashboardStats);
router.get("/users", protect, admin, getAllUsers);
router.put("/users/:id/status", protect, admin, updateUserStatus);
router.put("/sellers/:id/approve", protect, admin, approveSeller);
router.get("/feedback", protect, admin, getAllFeedback);
router.delete("/feedback/:id", protect, admin, deleteFeedback);
router.get("/payments", protect, admin, getAllPayments);
router.delete("/users/:id", protect, admin, deleteUser);
router.post("/notifications", protect, admin, sendNotification);

module.exports = router;