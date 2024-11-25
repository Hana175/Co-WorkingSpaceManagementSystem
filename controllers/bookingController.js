const { Booking, Space } = require("../models");
const { Op } = require("sequelize");

//book space
const createBooking = async (req, res) => {
  const { userName, userEmail, spaceId, startTime, endTime } = req.body;

  //validate dates
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    //check if space exists and is available
    const space = await Space.findByPk(spaceId);

    if (!space || !space.availability) {
      return res
        .status(400)
        .json({ message: "Space is not available for booking" });
    }

    //check if overlapping
    let overlappingBookings;
    try {
      overlappingBookings = await Booking.findOne({
        where: {
          spaceId,
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [start, end],
              },
            },
            {
              endTime: {
                [Op.between]: [start, end],
              },
            },
            {
              [Op.and]: [
                { startTime: { [Op.lte]: start } },
                { endTime: { [Op.gte]: end } },
              ],
            },
          ],
        },
      });
      console.log("Overlap query result:", overlappingBookings);
    } catch (error) {
      console.error("Error in overlap query:", error);
      return res
        .status(500)
        .json({ message: "Error checking overlapping bookings", error });
    }

    if (overlappingBookings) {
      return res.status(400).json({ message: "Time slot is unavailable" });
    }

    //create the neew booking
    const newBooking = await Booking.create({
      userName,
      userEmail,
      spaceId,
      startTime: start,
      endTime: end,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};


//get specific booking by id
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

//get all bookings 
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

//update booking's status
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await Booking.update({ status }, { where: { id } });
    if (updated[0]) {
      res.json({ message: "Booking status updated successfully" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBookingStatus,
};
