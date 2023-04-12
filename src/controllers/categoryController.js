const {
  createCategoryService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully created data.",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fails",
      message: "Couldn't create data",
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const result = await getCategoryService();

    res.status(200).json({
      status: "Success",
      message: "Successfully fetched data.",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fails",
      message: "Couldn't fetched data",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateCategoryService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully updated data.",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fails",
      message: "Couldn't update data",
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteCategoryService(id);

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted data.",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fails",
      message: "Couldn't delete data",
      error: error.message,
    });
  }
};
