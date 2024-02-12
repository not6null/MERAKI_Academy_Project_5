const pool = require("../models/db");

const createNewComment = (req, res) => {
  const post_id = req.params.id;
  const commenter = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter, postId) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter, post_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};


module.exports = {
  createNewComment,
};
