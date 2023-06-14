const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    userBuying: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
        type: Schema.Types.ObjectId,
        ref: "Illustration",
        }
    ],
    itemsAuthors: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    totalPrice: {
        type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
