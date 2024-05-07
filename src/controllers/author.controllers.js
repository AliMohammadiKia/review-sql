const Author = require("../models/author.models");

const getAllAuthors = async (req, res) => {
  const { limit, page, search } = req.query;
  try {
    const authors = await Author.getAllAuthors(limit, page, search);
    res.status(200).json({ success: true, ...authors });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.getAuthorById(id);

    if (!author) {
      return res
        .status(404)
        .json({ success: false, message: "author not found!" });
    }

    res.status(200).json({ success: true, data: author });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

const createAuthor = async (req, res) => {
  const data = req.body;
  try {
    const authorId = await Author.createAuthor(data);
    res.status(201).json({ success: true, data: { authorId, ...req.body } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

const updateAuthor = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "author id is required." });
    }

    const changedRows = await Author.updateAuthor({ ...data, authorId: id });

    if (changedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "author not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "update author was successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "author id is required." });
    }

    const affectedRows = await Author.deleteAuthor(id);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "author not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "update author was successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  getAuthorById,
  deleteAuthor,
};
