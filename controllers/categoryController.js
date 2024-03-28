const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Item = require("../models/item");

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();

  res.render("categoryPage", { title: "Categories", categories: categories });
});

// Detail page for pacific category
exports.categoryDetail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) res.redirect("/categories");

  res.render("categoryDetail", { title: category.name, category: category });
});

// Create new category
exports.createCategoryGET = asyncHandler(async (req, res, next) => {
  res.render("categoryForm", { title: "New Category" });
});

exports.createCategoryPOST = [
  // Validate inputs
  body("categoryName", "Category must have a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("categoryDescription", "Category must have a description")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.categoryName,
      description: req.body.categoryDescription,
    });

    if (!errors.isEmpty()) {
      res.render("categoryForm", {
        title: "New Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

// Update category
exports.updateCategoryGET = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.render("categoryForm", { title: "Update Category", category: category });
});

exports.updateCategoryPOST = [
  // Validate inputs
  body("categoryName", "Category must have a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("categoryDescription", "Category must have a description")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.categoryName,
      description: req.body.categoryDescription,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("categoryForm", {
        title: "New Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];

// Delete category
exports.deleteCategoryGET = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    res.redirect("/inventory/categories");
  }

  res.render("categoryDelete", {
    title: "Delete Category",
    category: category,
    items: items,
  });
});

exports.deleteCategoryPOST = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (items.length > 0) {
    res.render("categoryDelete", {
      title: "Delete Category",
      category: category,
      items: items,
    });
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/inventory/categories");
  }
});
