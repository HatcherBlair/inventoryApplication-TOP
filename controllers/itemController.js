const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const category = require("../models/category");

// Renders home page
exports.index = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).exec(),
    Category.find({}).exec(),
  ]);

  res.render("index", { title: "Index", items: items, categories: categories });
});

// Display list of items
exports.itemList = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).exec(),
    Category.find({}).exec(),
  ]);

  res.render("itemPage", {
    title: "All Items",
    items: items,
    categories: categories,
  });
});

// Displays items in a category
exports.itemListPOST = asyncHandler(async (req, res, next) => {
  // Don't need to validate input because value comes from select
  let itemFilter = {};
  if (req.body.category) {
    itemFilter = { category: req.body.category };
  }

  const [items, categories] = await Promise.all([
    Item.find(itemFilter).exec(),
    Category.find({}).exec(),
  ]);

  res.render("itemPage", {
    title: "Item List",
    items: items,
    categories: categories,
  });
});

// Displays item detail
exports.itemDetail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) res.redirect("/item");

  res.render("itemDetail", { title: item.name, item: item });
});

// Add a new item
exports.createItemGET = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();

  res.render("itemForm", { title: "New Item", categories: categories });
});

exports.createItemPOST = [
  // Convert category to array
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  // Validate Inputs
  body("itemName", "Item must have a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemDescription", "Item must have a description")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemPrice", "Item must have a price").trim().escape(),
  body("numInStock", "Must set a quantity").trim().escape(),
  body("category.*").escape(),

  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.itemName,
      description: req.body.itemDescription,
      price: req.body.itemPrice,
      numInStock: req.body.numInStock,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find({}).exec();

      for (category of categories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("itemForm", {
        title: "New Item",
        categories: categories,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Update existing item
exports.updateItemGET = asyncHandler(async (req, res, next) => {
  // Get stuff I need
  const [item, categories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find({}).exec(),
  ]);

  // Check Categories
  for (i of categories) {
    if (item.category.includes(i._id)) {
      i.checked = "true";
    }
  }

  // Render
  res.render("itemForm", {
    title: "Update Item",
    categories: categories,
    item: item,
  });
});

exports.updateItemPOST = [
  // Convert category to array
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  // Validate Inputs
  body("itemName", "Item must have a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemDescription", "Item must have a description")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemPrice", "Item must have a price").trim().escape(),
  body("numInStock", "Must set a quantity").trim().escape(),
  body("category.*").escape(),

  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.itemName,
      description: req.body.itemDescription,
      price: req.body.itemPrice,
      numInStock: req.body.numInStock,
      category: req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find({}).exec();

      for (category of categories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("itemForm", {
        title: "Update Item",
        categories: categories,
        item: item,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  }),
];

// Delete an item
exports.deleteItemGET = asyncHandler(async (req, res, next) => {
  // Items dont depend on anything, so just confirm delete request
  const item = await Item.findById(req.params.id).exec();

  if (item === null) res.redirect("/inventory/items");

  res.render("itemDelete", {
    title: "Delete Item",
    item: item,
  });
});

exports.deleteItemPOST = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/items");
});
