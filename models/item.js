const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  price: { type: Schema.Types.Decimal128, required: true, min: 0.0 },
  numInStock: { type: Number, required: true, min: 0 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

// Virtual for URL
ItemSchema.virtual("url").get(function () {
  return `/PLACEHOLDER/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
