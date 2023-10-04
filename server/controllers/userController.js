const User = require("../model/userModel"); // Import the User model
const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing

// Controller function for user registration
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is already in use
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already in use", status: false });
    }

    // Check if the email is already in use
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already in use", status: false });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Remove password from the response
    delete user.password;

    // Send a success response with the user data
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex); // Handle any exceptions that occur during registration
  }
};

// Controller function for user login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is not found, return an error message
    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error message
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    // Remove password from the response
    delete user.password;

    // Send a success response with the user data
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex); // Handle any exceptions that occur during login
  }
};
