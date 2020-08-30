const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
    },
    tickets: {
      type: [ObjectId],
      ref: "Ticket",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
