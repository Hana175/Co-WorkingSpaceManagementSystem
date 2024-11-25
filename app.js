const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const spaceRoutes = require("./routes/spaceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("./models");
const dbConnection = require("./dbConnection/dbConnection");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/spaces", spaceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

sequelize
  .sync({ alter: true }) //alter to synchronize the db with models
  .then(() => {
    console.log("Database synced with 'alter'.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
dbConnection();
//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred." });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
