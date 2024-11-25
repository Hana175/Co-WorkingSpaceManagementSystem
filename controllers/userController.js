const { User } = require("../models");
const jwt = require("jsonwebtoken");

//new user registration
const registerUser = async (req, res) => {
  const { name, email, role } = req.body;
  console.log("Request Body:", req.body);
  console.log("Attempting to create user...");

  //check if all fields are provided
  if (!name || !email || !role) {
    return res
      .status(400)
      .json({ message: "All fields (name, email, role) are required" });
  }

  if (!["admin", "member"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role provided. Allowed roles are 'admin' or 'member'.",
    });
  }

  try {
    //check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    //create new user
    const newUser = await User.create({ name, email, role });
    res.status(201).json(newUser);
  } catch (error) {
    //console.error("Error during user registration:", error); 
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
//user login (will return token if user is admin)
const loginUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required for login." });
  }

  try {
    //console.log("Login Request Body:", req.body); // Log request body for debugging

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //jwt token
    if (user.role === "admin") {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      //console.log("JWT_SECRET2:", process.env.JWT_SECRET);

      res.json({ token, user });
    }
  } catch (error) {
    //console.log("JWT_SECRET 1:", process.env.JWT_SECRET);

    console.error("Error during user login:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

//current user details
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};
module.exports = { registerUser, loginUser, getCurrentUser };
