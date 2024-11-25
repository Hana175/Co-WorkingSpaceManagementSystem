const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const validateToken = require("../middleware/validateToken");
const {createBooking, getBookingById, getAllBookings, updateBookingStatus} = require("../controllers/bookingController");

//public end points
router.post("/", createBooking); //book a space (unauthenticated anyone can book)
router.get("/:id", getBookingById); //get bookings by id (if user has a booking id, they can view it)

//routes for authorized users(admins)
router.get("/", validateToken, getAllBookings); //get all bookings
router.patch("/:id", validateToken, updateBookingStatus); //update booking status

module.exports = router;
