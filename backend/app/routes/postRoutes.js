const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new Post
router.post("/", postController.create);

// Retrieve all Posts
router.get("/", postController.findAll);

// Retrieve a single Post with id
router.get("/:id", postController.findOne);

// Update a Post with id
router.put("/:id", postController.update);

// Delete a Post with id
router.delete("/:id", postController.delete);

module.exports = router;
