const db = require("../models");
const Post = db.Post;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "Title and content can not be empty!" });
  }

  // Create a Post
  const post = {
    title: req.body.title,
    content: req.body.content,
    // Add more fields as needed
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "Some error occurred while creating the Post." });
    });
};

// Retrieve all Posts from the database
exports.findAll = (req, res) => {
  Post.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "Some error occurred while retrieving posts." });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `Post with id ${id} not found.` });
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error retrieving post with id ${id}.` });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Post was updated successfully." });
      } else {
        res.status(404).json({ message: `Cannot update Post with id ${id}. Post not found or request body is empty!` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error updating post with id ${id}.` });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Post was deleted successfully." });
      } else {
        res.status(404).json({ message: `Cannot delete Post with id ${id}. Post not found.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message || `Error deleting post with id ${id}.` });
    });
};
