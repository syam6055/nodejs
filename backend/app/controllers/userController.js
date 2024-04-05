const db = require("../models");
const User = db.User;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ message: "Username and email can not be empty!" });
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    // Add more fields as needed
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "Some error occurred while creating the User." });
    });
};
