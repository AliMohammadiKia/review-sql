const db = require("../db/connection");

const getAllAuthors = async (limit = 10, page = 1, search = "") => {
  limit = Number(limit);
  page = Number(page);

  const offset = (page - 1) * limit; // page2 => (2 - 1) * 10 = 10
  const [authors] = await db.query(
    "select * from authors where author_name like ? limit ? offset ?",
    [`%${search}%`, limit, offset]
  );

  const [[{ count }]] = await db.query(
    "select count(*) as count from authors where author_name like ?",
    [`%${search}%`]
  );
  const totalPage = Math.ceil(count / limit); // 16 / 10 => 1.6 => 2

  return { data: authors, pagination: { limit, page, totalPage } };
};

const getAuthorById = async (id) => {
  const [authors] = await db.query(
    "select author_name, title, price from authors natural join books where author_id = ?",
    [id]
  );
  return authors;
};

const createAuthor = async ({ authorName, biography }) => {
  const [{ insertId }] = await db.query(
    "insert into authors(author_name, biography) values(?, ?)",
    [authorName, biography]
  );
  return insertId;
};

const updateAuthor = async ({ authorName, biography, authorId }) => {
  const [{ changedRows }] = await db.query(
    "update authors set author_name = ?, biography = ? where author_id = ?",
    [authorName, biography, authorId]
  );
  return changedRows;
};

const deleteAuthor = async (id) => {
  const [{ affectedRows }] = await db.query(
    "delete from authors where author_id = ?",
    [+id]
  );
  return affectedRows;
};

module.exports = {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  getAuthorById,
  deleteAuthor,
};
