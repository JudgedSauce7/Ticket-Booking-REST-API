const customer = require("../models/customer.model");
const ticket = require("../models/ticket.model");

const ticketController = {
  getAll: async (req, res) => {
    const all = await ticket.find();
    res.json(all);
  },

  forTime: async (req, res) => {
    const tickets = await ticket.find({ time: req.params.time });
    if (tickets.length == 0) {
      res.json({ err: "No tickets found for that time." });
    }
    res.json(tickets);
  },

  add: async (req, res) => {
    const newTicket = new ticket(req.body);
    const savedTicket = await newTicket.save();

    res.send(savedTicket);
  },

  updateTime: async (req, res) => {
    const newTime = req.body.newTime;
    const found = await ticket.findOne({ _id: req.body.id });
    if (found == null) {
      res.json({ err: "No ticket with that ID exists." });
    }
    const oldTime = found.time;
    await ticket.updateOne({ _id: req.body.id }, { time: req.body.time });
    res.json({
      success: `Successfully updated time from ${oldTime} to ${req.body.time}`,
    });
  },

  delete: async (req, res) => {
    const found = await ticket.findOne({ _id: req.body.id });
    if (found == null) {
      res.json({ err: "No ticket with that ID exists." });
    } else {
      const cust = found.customer;
      if (cust != undefined) {
        await customer.updateOne(
          { _id: cust },
          { $pull: { tickets: found._id } }
        );
      }
      await ticket.deleteOne({ _id: req.body.id });
      res.json({
        success: `Successfully deleted ticket with ID: ${req.body.id}`,
      });
    }
  },

  getCustomer: async (req, res) => {
    const found = await ticket.findOne({ _id: req.params.id });
    if (found == null) {
      res.json({ err: "No ticket with that ID exists." });
    } else if (found.booked == false) {
      res.json({ err: "That ticket hasn't been booked yet!" });
    } else {
      const cust = await customer.findOne({ _id: found.customer });
      res.json(cust);
    }
  },
};

module.exports = ticketController;
