const express = require("express");
const courseCategoriesController = require("../controllers/courseCategoriesController");
const verify = require("../middlewares/verify");
const router = express.Router();

router.post("/createCategory", courseCategoriesController.createCetegory);

router.get("/getCategories", courseCategoriesController.getCategories);

router.put(
  "/updateCategory/:category_id",
  courseCategoriesController.updateCategory
);

router.put(
  "/deleteCategory/:category_id",
  courseCategoriesController.deleteCategory
);

module.exports = router;
