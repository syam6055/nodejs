const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Create a new Comment
router.post("/", commentController.create);

// Retrieve all Comments
router.get("/", commentController.findAll);

// Retrieve a single Comment with id
router.get("/:id", commentController.findOne);

// Update a Comment with id
router.put("/:id", commentController.update);

// Delete a Comment with id
router.delete("/:id", commentController.delete);

module.exports = router;
