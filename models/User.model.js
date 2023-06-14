const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
    type: String,
    unique: true,
    required: [true, "username is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Illustration",
      }
    ],
    balance: {
      type: Number,
      min: 0,
    },
    bought: [
      {
        type: Schema.Types.ObjectId,
        ref: "Illustration",
      }
    ]
  }
);

const User = model("User", userSchema);

module.exports = User;
