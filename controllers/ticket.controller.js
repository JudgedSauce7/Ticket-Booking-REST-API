const ticket = require("../models/ticket.model");

const ticketController = {
  getAll: async (req, res) => {
    const all = await ticket.find();
    res.json(all);
  },

  forTime: async (req, res) => {
    const tickets = await ticket.find({ time: req.params.time });
    res.json(tickets);
  },

  add: async (req, res) => {
    const newTicket = new ticket(req.body);
    const savedTicket = await newTicket.save();

    res.send(savedTicket);
  },
};

module.exports = ticketController;
