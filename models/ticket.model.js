const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectID } = Schema;

const ticketSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: ObjectID,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
