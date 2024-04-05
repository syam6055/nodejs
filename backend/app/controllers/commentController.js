const db = require("../models");
const Comment = db.Comment;

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).json({ message: "Content can not be empty!" });
  }

  // Create a Comment
  const comment = {
    content: req.body.content,
    // Add more fields as needed
  };

  // Save Comment in the database
  Comment.create(comment)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "Some error occurred while creating the Comment." });
    });
};

// Retrieve all Comments from the database
exports.findAll = (req, res) => {
  Comment.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "Some error occurred while retrieving comments." });
    });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `Comment with id ${id} not found.` });
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error retrieving comment with id ${id}.` });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Comment was updated successfully." });
      } else {
        res.status(404).json({ message: `Cannot update Comment with id ${id}. Comment not found or request body is empty!` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error updating comment with id ${id}.` });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Comment was deleted successfully." });
      } else {
        res.status(404).json({ message: `Cannot delete Comment with id ${id}. Comment not found.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error deleting comment with id ${id}.` });
    });
};
