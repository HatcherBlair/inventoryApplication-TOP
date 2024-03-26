const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

/* Item Routes */

// Add new item
router.get("/item/new", itemController.createItemGET);
router.post("/item/new", itemController.createItemPOST);

// Update Existing Item
router.get("/item/:id/update", itemController.updateItemGET);
router.post("/item/:id/update", itemController.updateItemPOST);

// Delete Existing Item
router.get("/item/:id/delete", itemController.deleteItemGET);
router.post("/item/:id/delete", itemController.deleteItemPOST);

// Detail page for single item
router.get("/item/:id", "test"); //Not IMplremented cause issures)

// Lists all items
router.get("/items", itemController.itemList);

// Lists all items in category
router.get("/items/:category", itemController.itemListCategory);
// This will have a post eventually

/* Category Routes */

// Add new category
router.get("/category/new", categoryController.createCategoryGET);
router.post("/category/new", categoryController.createCategoryPOST);

// Update Existing category
router.get("/category/:id/update", categoryController.updateCategoryGET);
router.post("/category/:id/update", categoryController.updateCategoryPOST);

// Delete existing category
router.get("/category/:id/delete", categoryController.deleteCategoryGET);
router.post("/category/:id/delete", categoryController.deleteItemPOST);

// Detail page for category
router.get("/category/:id", categoryController.categoryDetail);

// LList all categories
router.get("/categories", categoryController.categoryList);

module.exports = router;
