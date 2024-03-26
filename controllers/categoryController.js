const asyncHandler = require("express-async-handler");

const Category = require("../models/category");

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.categoryList");
});

// Detail page for pacific category
exports.categoryDetail = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.categoryDetail");
});

// Create new category
exports.createCategoryGET = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.createCategoryGET");
});

exports.createCategoryPOST = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.createCategoryPOST");
});
// Update category
exports.updateCategoryGET = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.updateCategoryGET");
});

exports.updateCategoryPOST = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.updateCategoryPOST");
});

// Delete category
exports.deleteCategoryGET = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.deleteCategoryGET");
});

exports.deleteCategoryPOST = asyncHandler(async (req, res, next) => {
  res.send("DNE: categoryController.deleteCategoryPOST");
});
