const { Router } = require("express");
const controller = require("../controllers/author.controllers");

const router = Router();

router.get("/", controller.getAllAuthors);
router.get("/:id", controller.getAuthorById);
router.post("/", controller.createAuthor);
router.patch("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);

module.exports = router;
