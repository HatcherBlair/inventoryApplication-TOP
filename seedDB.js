#! /usr/bin/env node

console.log(
  "This script populates the db with some fake items and item categories.  The DB URI is specidied as as argument"
);

// Get CLI args
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

// Connect to db and call functions to seed DB
const mongoose = require("mongoose");
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
  console.log("Connecting to DB...");
  await mongoose.connect(mongoDB);
  console.log("Connected");
  await createCategories();
  await createItems();
  console.log("Closing Mongoose");
  mongoose.connection.close();
}

// Creates individual categories and adds them to the array
async function categoryCreate(i, name, desc) {
  const category = new Category({ name: name, description: desc });
  await category.save();
  categories[i] = category;
  console.log(`Added Category: ${name}`);
}

// Makes the list of categories
async function createCategories() {
  console.log("Creating categories");
  await Promise.all([
    categoryCreate(
      0,
      "Keyboards",
      "Keyboards of all sizes, switch types, and completeness"
    ),
    categoryCreate(
      1,
      "Keycaps",
      "Full sets, custom sets, specialty keys, and more"
    ),
    categoryCreate(2, "Switches", "Cherry, Drop, Kailh, and Gateron"),
    categoryCreate(
      3,
      "Accessories & Components",
      "Custom Cables, Desk Mats, etc."
    ),
  ]);
}

// Creates individual items and add them to list
async function itemCreate(i, name, desc, price, numInStock, category) {
  const item = new Item({
    name: name,
    description: desc,
    price: price,
    numInStock: numInStock,
    category: category,
  });
  await item.save();
  items[i] = item;
  console.log(`Created Item: ${name}`);
}

// Make the list of items
async function createItems() {
  console.log("Creating Items");
  await Promise.all([
    itemCreate(
      0,
      "Stack Overflow Macropad",
      "ctrl, c, and v. What else do you need?",
      29.0,
      1500,
      [categories[0], categories[3]]
    ),
    itemCreate(
      1,
      "Drop SHIFT V2",
      "Offered as a kit of fully assembled",
      199.99,
      100,
      [categories[0]]
    ),
    itemCreate(
      2,
      "Artifact Bloom Series Keycap Set",
      "Shine through ABS keycaps that are compatible with Cherry MX switches and clones",
      39.0,
      19,
      [categories[1], categories[3]]
    ),
    itemCreate(
      3,
      "Drop Holy Panda X Mechanical Switches",
      "The best tactile swith in the world. Sold in increments of 35",
      35.0,
      16000,
      [categories[2]]
    ),
    itemCreate(
      4,
      "Cherry MX Red Mechanical Switches",
      "The OG switch, nuff said.  Sold in increments of 35.",
      14.99,
      1200,
      [categories[2]]
    ),
    itemCreate(
      5,
      "Custom Coiled Aviator USB",
      "Made to order, available in all different colors",
      69.99,
      10,
      [categories[3]]
    ),
    itemCreate(
      6,
      "Black Crystal Wrist Rest",
      "Fits 65% keyboards, Super comfy",
      42.0,
      138,
      [categories[3]]
    ),
  ]);
}
