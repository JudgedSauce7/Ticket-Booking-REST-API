const customer = require("../models/customer.model");
const ticket = require("../models/ticket.model");

const ticketController = {
  getAll: async (req, res) => {
    const all = await ticket.find();
    res.status(200).json(all);
  },

  forTime: async (req, res) => {
  	if(req.params.time == undefined){
  		res.status(400).json({err: "Provide a time field"});
  	}
    const tickets = await ticket.find({ time: req.params.time });
    if (parseInt(tickets.length) == 0) {
      res.status(404).json({ err: "No tickets found for that time." });
    } else {
      res.status(200).json(tickets);
    }
  },

  add: async (req, res) => {
  	if(req.body.time == undefined){
  		res.status(400).json({err: "Provide a time field"});
  	}
    const tickets = await ticket.find({ time: req.body.time });
    if (parseInt(tickets.length) >= 20) {
      res.status(400).json({
        err: `20 Tickets already exist for time ${req.body.time}. Cannot create more than 20 tickets.`,
      });
    } else {
      const newTicket = new ticket(req.body);
      const savedTicket = await newTicket.save();
      res.status(201).json({
        success: `Ticket with ID: ${savedTicket._id} created for time ${req.body.time}`,
      });
    }
  },

  updateTime: async (req, res) => {
  	if(req.body.time == undefined || req.body.id == undefined || req.body.id.length != 24){
  		res.status(400).json({err: "Provide correct fields"});
  	}
    const newTime = req.body.newTime;
    const found = await ticket.findOne({ _id: req.body.id });
    if (found == null) {
      res.status(404).json({ err: "No ticket with that ID exists." });
    }
    const oldTime = found.time;
    await ticket.updateOne({ _id: req.body.id }, { time: req.body.time });
    res.status(201).json({
      success: `Successfully updated time from ${oldTime} to ${req.body.time}`,
    });
  },

  delete: async (req, res) => {
  	if(req.body.time == undefined){
  		res.status(400).json({err: "Provide a proper id"});
  	}
    const found = await ticket.findOne({ _id: req.body.id });
    if (found == null) {
      res.status(404).json({ err: "No ticket with that ID exists." });
    } else {
      const cust = found.customer;
      if (cust != undefined) {
        await customer.updateOne(
          { _id: cust },
          { $pull: { tickets: found._id } }
        );
      }
      await ticket.deleteOne({ _id: req.body.id });
      res.status(200).json({
        success: `Successfully deleted ticket with ID: ${req.body.id}`,
      });
    }
  },

  getCustomer: async (req, res) => {
  	if(req.params.id == undefined || req.params.id.length != 24){
  		res.status(400).json({err: "Provide a proper id"});
  	}
    const found = await ticket.findOne({ _id: req.params.id });
    if (found == null) {
      res.status(404).json({ err: "No ticket with that ID exists." });
    } else if (found.booked == false) {
      res.status(400).json({ err: "That ticket hasn't been booked yet!" });
    } else {
      const cust = await customer.findOne({ _id: found.customer });
      res.status(200).json(cust);
    }
  },
};

module.exports = ticketController;
