const courseCategoriesModel = require("../models/course_categories");

exports.createCetegory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const newCategoryId = await courseCategoriesModel.addCategory(
      category_name
    );
    res.status(201).json({
      message: "Course catagory created successfully",
      category: {
        category_id: newCategoryId,
        category_name: category_name
      },
    });
  } catch (error) {
    console.error("Failed to create course category: ", error);
    res.status(500).json({ error: "Failed to create course category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await courseCategoriesModel.getCategories();
    res.status(200).json({
      message: "Course categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.error("Failed to retrieve course categories: ", error);
    res.status(500).json({ error: "Failed to retrieve course categories" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;
    const updatedCategory = await courseCategoriesModel.updateCategory(
      category_id,
      category_name
    );
    res.status(200).json({
      message: "Course catagory updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Failed to update course category: ", error);
    res.status(500).json({ error: "Failed to update course category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const deletedCategory = await courseCategoriesModel.deleteCategory(
      category_id
    );
    res.status(200).json({
      message: "Course category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    console.error("Failed to delete course category: ", error);
    res.status(500).json({ error: "Failed to delete course category" });
  }
};
