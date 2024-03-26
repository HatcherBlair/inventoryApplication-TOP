const asyncHandler = require("express-async-handler");

const Item = require("../models/item");
const Category = require("../models/category");

// Display list of items
exports.itemList = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.itemList");
});

// Displays item detail
exports.itemDetail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.itemDetail");
});

// Display items in category
exports.itemListCategory = asyncHandler(async (req, res, next) => {
  res.send("Not ImplementedL itemController.itemListCategory");
});

// Add a new item
exports.createItemGET = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.createItemGET");
});

exports.createItemPOST = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.createItemPOST");
});

// Update existing item
exports.updateItemGET = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.updateItemGET");
});

exports.updateItemPOST = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.updateItemPOST");
});

// Delete an item
exports.deleteItemGET = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.deleteItemGET");
});

exports.deleteItemPOST = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: itemController.deleteItemPOST");
});
