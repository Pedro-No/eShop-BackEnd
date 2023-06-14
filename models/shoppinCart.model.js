const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
  {
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Illustration",
        }
    ],
  }
);

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;