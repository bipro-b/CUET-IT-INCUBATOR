const express = require("express")
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/")
.post(categoryController.createCategory)
.get(categoryController.getCategory)

router.route("/:id")
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)

module.exports = router;