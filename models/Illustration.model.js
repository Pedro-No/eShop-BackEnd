const { Schema, model } = require("mongoose");

const illustrationSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
    },
    date: {
      type: Number,
    }
  }
);

const Illustration = model("Illustration", illustrationSchema);

module.exports = Illustration;